import React, { useState, Fragment } from 'react';
import { color, fontSize } from 'lib/variables';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyButton = (props) => {
  const {environment} = props
  const [copied, setCopied] = useState(false);

  return (
    <Fragment>
        <span className="copied" style={copied ? { bottom: '40px', opacity: '0' } : null  }>
            Copied
        </span>
        <CopyToClipboard
            text={environment}
            onCopy={() => {
            setCopied(true)
            setTimeout(function() {
                setCopied(false);
            }, 750);
            }}
        >
            <span className="copy" />
        </CopyToClipboard>
        <style jsx>{`
            .copied {
                background-color: ${color.midGrey};
                ${fontSize(9, 16)};
                border-radius: 3px;
                padding: 0 4px;
                position: absolute;
                left: 0;
                text-transform: uppercase;
                bottom: 10px;
                transition: bottom 0.5s, opacity 0.75s ease-in;
            }
            .copy {
                background: url('/static/images/copy.svg') center center
                no-repeat ${color.white};
                background-size: 16px;
                border-left: 1px solid ${color.lightestGrey};
                bottom: 0;
                height: 33px;
                position: absolute;
                left: 0;
                width: 37px;
                transform: all 0.5s;
                z-index: 20;

                &:hover {
                background-color: ${color.midGrey};
                cursor: pointer;
                }
            }
        `}</style>
     </Fragment>
  )
};

export default CopyButton;
