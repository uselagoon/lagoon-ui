import React, { FC, Fragment, useRef } from 'react';

import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Collapse, Colors } from '@uselagoon/ui-library';

import ScrollableLog from './_components/ScrollableLog';
import { AccordionTitle, StyledLogs } from './styles';

interface SectionMetadata {
  get: (key: string) => [string, boolean] | undefined;
}

type SectionType =
  | { type: 'log-text'; text: string; key: number; details?: string }
  | { type: 'section-opener'; details: string; key: number }
  | SectionNode;

type Token = SectionType;

interface SectionNode {
  type: 'section';
  key: number;
  details: string;
  metadata: [string, boolean];
  nodes: Token[];
}

type LogNode = Token | SectionNode;

interface RootNode {
  type: 'root';
  nodes: LogNode[];
}

interface LogViewerProps {
  logs: string | null;
  status: string;
  showParsed: boolean;
  highlightWarnings: boolean;
  showSuccessSteps: boolean;
  forceLastSectionOpen: boolean;
  logsTarget?: string;
}
const LogViewer: FC<LogViewerProps> = ({
  logs,
  status = 'NA',
  showParsed,
  highlightWarnings,
  showSuccessSteps,
  forceLastSectionOpen = true,
  logsTarget = 'Deployments',
}) => (
  <React.Fragment>
    <StyledLogs className="logs">
      {logs !== null ? (
        showParsed ? (
          <div className="log-viewer">
            {logPreprocessor(logs, status, forceLastSectionOpen, logsTarget, showSuccessSteps, highlightWarnings)}
          </div>
        ) : (
          <div className="log-viewer with-padding">{logs}</div>
        )
      ) : (
        <div className="log-viewer with-padding">Logs are not available.</div>
      )}
    </StyledLogs>
  </React.Fragment>
);

const shouldLastSectionBeOpen = (status: string) => {
  const openstates = ['RUNNING', 'ERROR', 'FAILED'];
  return openstates.includes(status.toUpperCase());
};

const isLogStateBad = (status: string) => {
  const badstates = ['ERROR', 'FAILED'];
  return badstates.includes(status.toUpperCase());
};

/**
 *
 * @param {*} logs the actual logs we're processing
 * @param {*} status a status for the build - if not complete, we open the very last item
 * @param {*} status a status for the build - if not complete, we open the very last item
 * @returns
 */
const logPreprocessor = (
  logs: string,
  status: string,
  forceLastSectionOpen = true,
  logsTarget: string,
  showSuccessSteps: boolean,
  highlightWarnings: boolean
) => {
  let ret = null;

  let statusBad = isLogStateBad(status);
  let openLastSection = forceLastSectionOpen || shouldLastSectionBeOpen(status);

  try {
    let tokens = logPreprocessorTokenize(logs, logsTarget);
    let sectionMetadata = logPreprocessorExtractSectionEndDetails(logs);
    let AST = logPreprocessorProcessParse(tokens, sectionMetadata);
    return logPreprocessorProcessASTToReact(AST, openLastSection, statusBad, showSuccessSteps, highlightWarnings);
  } catch (e) {
    // if there are any errors parsing and transforming, we just return the logs as is.
    console.log('Error processing logs for display: ' + e);
    return (
      <div className="processed-logs" data-cy="processed-logs">
        <div key="logerror" className="log-text" data-cy="log-text">
          {logs}
        </div>
      </div>
    );
  }
};

const logPreprocessorRenderLogNode = (
  node: LogNode,
  visible = false,
  errorState = false,
  showSuccessSteps: boolean,
  highlightWarnings: boolean
) => {
  return (
    <LogNodeRenderer
      node={node}
      visible={visible}
      errorState={errorState}
      showSuccessSteps={showSuccessSteps}
      highlightWarnings={highlightWarnings}
    />
  );
};

const LogNodeRenderer: React.FC<{
  node: LogNode;
  visible: boolean;
  errorState: boolean;
  showSuccessSteps: boolean;
  highlightWarnings: boolean;
}> = ({ node, visible, errorState, showSuccessSteps, highlightWarnings }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const logsContentRef = useRef(null);

  if (node.type === 'log-text') {
    return (
      <div key={node.key} ref={logsContentRef} className="log-text">
        {node.text}
      </div>
    );
  }
  if (node.type === 'section') {
    let classes = ['data-row', 'row-heading'];
    if (errorState) {
      classes.push('log-error-state');
    }

    const hasWarning = !!node.metadata[1];
    if (hasWarning) {
      classes.push('log-warning-state');
      // also add a classname if we don't want warning highlighting
      if (!highlightWarnings) {
        classes.push('log-highlight-disabled');
      }
    }

    const nodeChildren = node.nodes.map(element => {
      return (
        <LogNodeRenderer
          key={element.key}
          node={element}
          visible={visible}
          errorState={errorState}
          showSuccessSteps={showSuccessSteps}
          highlightWarnings={highlightWarnings}
        />
      );
    });

    const isSuccessfulStep = !(classes.includes('log-warning-state') || classes.includes('log-error-state'));

    const accordion = (
      <Collapse
        bordered={false}
        className="log-accordion"
        useArrowIcons
        size="small"
        type="default"
        defaultActiveKey={visible || hasWarning ? [node.key] : []}
        icon={
          errorState ? (
            <CloseCircleOutlined style={{ color: Colors.pink }} />
          ) : hasWarning ? (
            <ExclamationCircleOutlined style={{ color: Colors.orange }} />
          ) : (
            <CheckCircleOutlined style={{ color: Colors.green }} />
          )
        }
        ref={logsContentRef}
        items={[
          {
            children: (
              <ScrollableLog>
                <div className={classes.join(' ')}>{nodeChildren}</div>
              </ScrollableLog>
            ),

            key: node.key,
            label: <AccordionTitle>{node.details}</AccordionTitle>,
          },
        ]}
      />
    );

    if (showSuccessSteps) {
      return accordion;
    } else {
      if (!isSuccessfulStep) {
        return accordion;
      } else {
        return null;
      }
    }
  }
  return <div></div>;
};

const logPreprocessorProcessASTToReact = (
  ast: RootNode,
  lastOpen: boolean,
  errorState: boolean,
  showSuccessSteps: boolean,
  highlightWarnings: boolean
) => {
  if (ast.type != 'root') {
    throw "Expecting root node to be of type 'root'";
  }
  let lastElement = ast.nodes.length - 1;
  return (
    <div className="processed-logs" data-cy="processed-logs">
      {ast.nodes.map((element, i) => (
        <Fragment key={`logNode-${element.key}`}>
          {logPreprocessorRenderLogNode(
            element,
            i === lastElement ? lastOpen : undefined,
            i === lastElement ? errorState : undefined,
            showSuccessSteps,
            highlightWarnings
          )}
        </Fragment>
      ))}
    </div>
  );
};

// Produce relatively flat AST from tokens
const logPreprocessorProcessParse = (tokens: Token[], sectionMetadata: SectionMetadata) => {
  let root: RootNode = { type: 'root', nodes: [] };

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i].type) {
      case 'log-text':
        root.nodes.push(tokens[i]);
        break;
      case 'section-opener':
        let metadataForSection = sectionMetadata.get((tokens[i].details ?? '').trim());
        if (metadataForSection == undefined) {
          metadataForSection = ['', false];
        }

        let node = {
          type: 'section',
          key: tokens[i].key,
          details: tokens[i].details,
          metadata: metadataForSection,
          nodes: [] as Token[],
        };
        if (tokens[i + 1].type == 'log-text') {
          node.nodes.push(tokens[i + 1]);
          i++; //increment `i` so that we're dealing with the _next_ token
        }
        root.nodes.push(node as SectionNode);
        break;
      default:
        throw 'Unexpected type found in tokens';
        break;
    }
  }
  return root;
};

// Rather than parsing section end details into their own tokens, we'll simply extract the metadata
// from the logs as a whole, and use it to enhance the 'section' type
const logPreprocessorExtractSectionEndDetails = (logs: string) => {
  let ret = new Map();
  // STEP Initial Environment Setup: Completed at 2022-08-29 08:00:07 (UTC) Duration 00:00:02 Elapsed 00:00:02
  const regexp =
    /##############################################\n(STEP) (.+): (.+)\n##############################################/;
  const durationRegexp = /.* Duration (\d\d:\d\d:\d\d) .*/;
  let tokens = logs.split(regexp);
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] == 'STEP') {
      // ret.set(tokens[])
      i++;
      let stepName = tokens[i].trim();
      i++;
      let stepDetails = tokens[i].trim();
      if (stepName != '' && stepDetails != '') {
        let durationArray = stepDetails.match(durationRegexp);
        let hasWarnings = false;
        if (stepDetails.match(/.* WithWarnings$/)) {
          hasWarnings = true;
        }
        if (durationArray) {
          let payload = [`Duration: ${durationArray[1]}`, hasWarnings];
          if (durationArray?.length == 2) {
            ret.set(stepName, payload);
          }
        }
      }
    }
  }
  return ret;
};

const logPreprocessorTokenize = (logs: string, logsTarget: string) => {
  // tokenize
  const regexp =
    /##############################################\n(BEGIN) (.+)\n##############################################/;
  const beginningSectionDefaultDetails = logsTarget === 'Deployments' ? 'Build Setup' : 'Task Setup';
  // The regex above will split the logs into three separate token types
  // 1. standard blocks of text
  // 2. markers for section starts containing "SECTION" only
  // 3. section header details (the second capture in the regex above)
  let tokens = logs.split(regexp);

  // if the first element is an empty string, we can discard it because
  // it's an artifact of the split
  if (tokens.length > 0 && tokens[0].length == 0) {
    tokens.shift();
  }

  let tokenizedLogs: Token[] = [];

  let sectionIsOpen = false;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] == 'BEGIN') {
      let sectionDetails = tokens[i + 1]; //we're guaranteed to have this given the match criteria

      // let sectionOpening = `<div class="logsection"><div class="logsection-details>${sectionDetails}</div><pre>`;
      tokenizedLogs.push({ type: 'section-opener', key: i, details: sectionDetails });
      // tokenizedLogs.push(sectionCloser + sectionOpening);
      sectionIsOpen = true;

      //we also need to _skip_ the next token, since we've already used it, and continue on
      i++;
      continue;
    }
    tokenizedLogs.push({ type: 'log-text', text: tokens[i].trim(), key: i });
  }

  // if the first element is an empty log-text, we add a section to it
  // this will ensure that everything is eventually wrapped in a section
  // even if there's one massive log
  if (tokenizedLogs.length > 0 && tokenizedLogs[0].type == 'log-text') {
    tokenizedLogs.unshift({
      type: 'section-opener',
      key: -1,
      details: beginningSectionDefaultDetails,
    });
  }

  return tokenizedLogs;
};

export default LogViewer;
