import * as R from 'ramda';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import SiteStatus from 'components/SiteStatus';
import Label from 'components/Label';
import { DangerousChangeType } from 'graphql';

export const queryStringToObject = R.pipe(
  R.defaultTo(''),
  R.replace(/^\?/, ''),
  R.split('&'),
  R.map(R.split('=')),
  R.fromPairs
);

// Dates
export const getFromNowTime = (date) => {
  return moment.utc(date).fromNow();
};

export const getCreatedDate = (date) => {
    return moment.utc(date).format('DD MM YYYY, HH:mm:ssZ');
};

// Project utilities
const environmentCount = (project) => project && R.countBy(R.prop('environmentType'))(
  project.environments
);

export {
  environmentCount
}

// Environments
const RESULTS_LIMIT_OPTIONS = ["10", "25", "50", "100", "All"];

const getProductionEnvironments = (environments) => {
  return environments && environments.filter(e => e.environmentType === "production");
}

const getProductionEnvironmentSiteStatus = (environments) => {
  if (!environments || environments.length === 0) {
    return null;
  }

  const productionEnvironment = environments.filter(e => e.environmentType === "production").shift();
  return <SiteStatus iconOnly={true} environment={productionEnvironment}/>;
}

const ProductionRouteFromEnvironments = ({ environments, route, searchInput }) => {
  let prodRoute = "";
  const produtionEnvs = getProductionEnvironments(environments);
  if (!route) {
    prodRoute = produtionEnvs && produtionEnvs.length && [...produtionEnvs].shift().route;
  }

  return prodRoute ? <Highlighter searchWords={[searchInput]} autoEscape={true} textToHighlight={prodRoute}/> : null
}

const DEPLOYMENT_TYPES = ["BRANCH", "PULLREQUEST", "PROMOTE"];
const ENVIRONMENT_TYPES = ["PRODUCTION", "DEVELOPMENT"];

export {
  RESULTS_LIMIT_OPTIONS,
  DEPLOYMENT_TYPES, ENVIRONMENT_TYPES,
  getProductionEnvironments,
  getProductionEnvironmentSiteStatus,
  ProductionRouteFromEnvironments
};


// Deployments
const DEFAULT_DEPLOYMENTS_LIMIT = 25;

const getLastDeployment = (deployments) => {
  if (deployments.length === 0) {
    return null;
  }

  const sortCreated = deployments && deployments.filter(d => d.created).sort((a, b) => Date.parse(a.created) > Date.parse(b.created));
  return sortCreated && sortCreated.slice(0,1).shift();
}

const getLastCreatedDeployment = (deployments, unformatted = false) => {
  const lastDeployment = deployments && getLastDeployment(deployments);
  const lastCreated = lastDeployment && lastDeployment.created;

  if (unformatted) {
    return lastCreated ? lastCreated : false
  }
  else {
    return lastCreated ? getFromNowTime(lastCreated) : false
  }
}

const getLastCompletedDeployment = (deployments, unformatted = false) => {
   if (deployments.length === 0) {
    return null;
  }

  const sortCompleted = deployments && deployments.filter(d => d.completed).sort((a, b) => Date.parse(a.completed) > Date.parse(b.completed));
  const lastCompleted = sortCompleted && sortCompleted.slice(0,1).shift().completed;

  if (unformatted) {
    return lastCompleted ? lastCompleted : false
  }
  else {
    return lastCompleted ? getFromNowTime(lastCompleted) : false
  }
}

const productionEnvironment = (deployments) => {
  let capitaliseString = s => s.replace(/./, c => c.toUpperCase());
  const lastDeployment = getLastDeployment(deployments, true);

  if (lastDeployment && lastDeployment.status === "running") {
    return <Label loading basic className={"deployment"} icon="circle notch" color={"blue"} text="Running..." />;
  }
  else if (lastDeployment && lastDeployment.status === "pending") {
    return <Label basic className={"deployment"} icon="pause circle outline" color={"purple"} text="Pending..." />;
  }
  else if (lastDeployment && lastDeployment.status === "new") {
    return <Label basic className={"deployment"} icon={"circle outline"} color={"blue"} text="New..." />;
  }
  else if (lastDeployment && (lastDeployment.status === "failed" || lastDeployment.status === "error")) {
    return <Label basic className={"deployment"} icon="times circle outline" color={"red"} text={capitaliseString(lastDeployment.status)} />;
  }
  else if (lastDeployment && lastDeployment.status === "cancelled") {
    return <Label basic className={"deployment"} icon="times circle outline" color={"grey"} text={"Cancelled"} />;
  }
  else {
    return lastDeployment ? <Label basic className={"deployment"} icon="check circle outline" color={"green"} text="Completed" text={getFromNowTime(lastDeployment.completed)} />: null;
  }
}

const ProductionDeploymentsFromEnvironments = ({ environments }) => {
  const produtionEnvs = getProductionEnvironments(environments);
  const deployments = produtionEnvs.length && [...produtionEnvs].shift().deployments;

  return productionEnvironment(deployments);
}

const ProductionDeployments = ({ environment }) => {
  const deployments = environment && environment.deployments;
  return productionEnvironment(deployments);
}

const getDeploymentIconFromStatus = (status) => {
  switch (status) {
    case "running":
      return {
        icon: "circle thin",
        color: "orange"
      }

    case "complete":
      return {
        icon: "circle thin",
        color: "green"
      }

    case "failed":
      return {
        icon: "circle thin",
        color: "red"
      }

    default:
      return {
        icon: "circle thin",
        color: "grey"
      }
  }
}

export {
  DEFAULT_DEPLOYMENTS_LIMIT,
  getLastDeployment,
  getLastCreatedDeployment,
  getLastCompletedDeployment,
  ProductionDeploymentsFromEnvironments,
  ProductionDeployments,
  getDeploymentIconFromStatus
};


// Tasks
const DEFAULT_TASKS_LIMIT = 0;

export {
  DEFAULT_TASKS_LIMIT
};


// Facts
const ProductionFrameworkFromEnvironments = ({environments}) => {
  const produtionEnvs = getProductionEnvironments(environments);
  const framework = produtionEnvs && produtionEnvs.length && [...produtionEnvs].shift().facts.filter(f => f.category === 'Framework');
  const frameworkFact = framework && [...framework].shift();

  return (
    frameworkFact ?
      <Label factIcon={frameworkFact.name} text={`${frameworkFact.name} ${frameworkFact.value}`} /> : null
  )
}

const ProductionFramework = ({ environment }) => {
  const framework = environment && environment.facts.filter(f => f.category === 'Framework');
  const frameworkFact = framework && [...framework].shift();

  return (
    frameworkFact ?
      <Label factIcon={frameworkFact.name} text={`${frameworkFact.name} ${frameworkFact.value}`} /> : null
  )
}

const ProductionLanguageFromEnvironments = ({environments}) => {
  const produtionEnvs = getProductionEnvironments(environments);
  const language = produtionEnvs.length && [...produtionEnvs].shift().facts.filter(f => f.category === 'Programming language');
  const languageFact = language && [...language].shift();

  return (
    languageFact ? <Label factIcon={languageFact.name} text={`${languageFact.name} ${languageFact.value}`} /> : null
  )
}

const ProductionLanguage = ({ environment }) => {
  const language = environment && environment.facts.filter(f => f.category === 'Programming language');
  const languageFact = language && [...language].shift();

  return (
    languageFact ? <Label factIcon={languageFact.name} text={`${languageFact.name} ${languageFact.value}`} /> : null
  )
}

export {
  ProductionFrameworkFromEnvironments,
  ProductionFramework,
  ProductionLanguageFromEnvironments,
  ProductionLanguage
}

// Backups
const DEFAULT_BACKUPS_LIMIT = 25;

export {
  DEFAULT_BACKUPS_LIMIT
};


// Environment Variables
const envVariableTypes = ["PROJECT", "ENVIRONMENT"];
const envVariableScopes = ["BUILD", "RUNTIME", "GLOBAL", "CONTAINER_REGISTRY", "INTERNAL_CONTAINER_REGISTRY"];

export {
  envVariableTypes,
  envVariableScopes
}