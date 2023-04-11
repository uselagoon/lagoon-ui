import React from 'react';
import EnvironmentLink from 'components/link/Environment';
import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import TasksLink from 'components/link/Tasks';
import ProblemsLink from 'components/link/Problems';
import FactsLink from 'components/link/Facts';
import InsightsLink from 'components/link/Insights';
import {StyledNavigation} from "./StylednavTabs";
import useTranslation from "lib/useTranslation";

const NavTabs = ({ activeTab, environment }) => {

  const t = useTranslation()

 return (
   <StyledNavigation className="navigation">
     <li
       className={`overview ${
         activeTab == "overview" ? "active" : ""
       } deployLink`}
     >
       <EnvironmentLink
         environmentSlug={environment.openshiftProjectName}
         projectSlug={environment.project.name}
         className="deployLink"
       >
         {t("environment.nav.overview")}
       </EnvironmentLink>
     </li>
     <li
       className={`deployments ${
         activeTab == "deployments" ? "active" : ""
       } deployLink`}
     >
       <DeploymentsLink
         environmentSlug={environment.openshiftProjectName}
         projectSlug={environment.project.name}
         className="deployLink"
       >
         {t("environment.nav.deployments")}
       </DeploymentsLink>
     </li>
     <li
       className={`backups ${
         activeTab == "backups" ? "active" : ""
       } deployLink`}
     >
       <BackupsLink
         environmentSlug={environment.openshiftProjectName}
         projectSlug={environment.project.name}
         className="deployLink"
       >
         {t("environment.nav.backups")}
       </BackupsLink>
     </li>
     <li
       className={`tasks ${
         activeTab == "tasks" ? "active" : ""
       } ${"deployLink"}`}
     >
       <TasksLink
         environmentSlug={environment.openshiftProjectName}
         projectSlug={environment.project.name}
         className="deployLink"
       >
         {t("environment.nav.tasks")}
       </TasksLink>
     </li>
     {environment.project.problemsUi == 1 && (
       <li
         className={`problems ${
           activeTab == "problems" ? "active" : ""
         } deployLink`}
       >
         <ProblemsLink
           environmentSlug={environment.openshiftProjectName}
           projectSlug={environment.project.name}
           className="deployLink"
         >
           {t("environment.nav.problems")}
         </ProblemsLink>
       </li>
     )}
     {environment.project.factsUi == 1 && (
       <li
         className={`facts ${
           activeTab == "facts" ? "active" : ""
         } ${"deployLink"}`}
       >
         <FactsLink
           environmentSlug={environment.openshiftProjectName}
           projectSlug={environment.project.name}
           className="deployLink"
         >
           {t("environment.nav.facts")}
         </FactsLink>
       </li>
     )}
     {environment.project.factsUi == 1 && (
       <li
         className={`insights ${
           activeTab == "insights" ? "active" : ""
         } deployLink`}
       >
         <InsightsLink
           environmentSlug={environment.openshiftProjectName}
           projectSlug={environment.project.name}
           className="deployLink"
         >
           {t("environment.nav.insights")}
         </InsightsLink>
       </li>
     )}
   </StyledNavigation>
 );
};

export default NavTabs;
