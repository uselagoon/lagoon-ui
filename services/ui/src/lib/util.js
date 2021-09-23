import * as R from 'ramda';
import moment from 'moment';
import { getFromNowTime } from "components/Dates";
import Highlighter from 'react-highlight-words';
import SiteStatus from 'components/SiteStatus';
import Label from 'components/Label';

export const queryStringToObject = R.pipe(
  R.defaultTo(''),
  R.replace(/^\?/, ''),
  R.split('&'),
  R.map(R.split('=')),
  R.fromPairs
);

// Project utilities
const environmentCount = (project) => project && R.countBy(R.prop('environmentType'))(
  project.environments
);

export {
  environmentCount
}


// Environments
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

export {
  getProductionEnvironments,
  getProductionEnvironmentSiteStatus,
  ProductionRouteFromEnvironments
};


// Deployments
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
    return lastCreated ? <>{moment.utc(lastCreated).local().format('HH:mm:ss (DD-MM-YYYY)')}</> : false
  }
}

const getLastCompletedDeployment = (deployments, unformatted = false) => {
  const lastDeployment = deployments && getLastDeployment(deployments);
  const lastCompleted = lastDeployment && lastDeployment.completed;

  if (unformatted) {
    return lastCompleted ? lastCompleted : false
  }
  else {
    return lastCompleted ? <>{moment.utc(lastCompleted).local().format('HH:mm:ss (DD-MM-YYYY)')}</> : false
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
    return lastDeployment ? <Label basic className={"deployment"} color={"green"} text="Completed" text={getFromNowTime(lastDeployment.completed)} />: null;
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
        icon: "circle thhin",
        color: "grey"
      }
  }
}

export {
  getLastDeployment,
  getLastCreatedDeployment,
  ProductionDeploymentsFromEnvironments,
  ProductionDeployments,
  getDeploymentIconFromStatus
};


// Facts
const ProductionFrameworkFromEnvironments = ({environments}) => {
  const produtionEnvs = getProductionEnvironments(environments);
  const framework = produtionEnvs && produtionEnvs.length && [...produtionEnvs].shift().facts.filter(f => f.category === 'Framework');
  const frameworkFact = framework && [...framework].shift();

  return (
    frameworkFact ?
      <Label icon={frameworkFact.name} text={`${frameworkFact.name} ${frameworkFact.value}`} /> : null
  )
}

const ProductionFramework = ({ environment }) => {
  const framework = environment && environment.facts.filter(f => f.category === 'Framework');
  const frameworkFact = framework && [...framework].shift();

  return (
    frameworkFact ?
      <Label icon={frameworkFact.name} text={`${frameworkFact.name} ${frameworkFact.value}`} /> : null
  )
}

const ProductionLanguageFromEnvironments = ({environments}) => {
  const produtionEnvs = getProductionEnvironments(environments);
  const language = produtionEnvs.length && [...produtionEnvs].shift().facts.filter(f => f.category === 'Programming language');
  const languageFact = language && [...language].shift();

  return (
    languageFact ? <Label icon={languageFact.name} text={`${languageFact.name} ${languageFact.value}`} /> : null
  )
}

const ProductionLanguage = ({ environment }) => {
  const language = environment && environment.facts.filter(f => f.category === 'Programming language');
  const languageFact = language && [...language].shift();

  return (
    languageFact ? <Label icon={languageFact.name} text={`${languageFact.name} ${languageFact.value}`} /> : null
  )
}

export {
  ProductionFrameworkFromEnvironments,
  ProductionFramework,
  ProductionLanguageFromEnvironments,
  ProductionLanguage
}