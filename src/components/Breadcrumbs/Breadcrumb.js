import React from "react";
import Router from "next/router";
import { BreadCrumbLink, StyledBreadCrumb } from "./StyledBreadCrumb";

const Breadcrumb = ({ header, title, urlObject, asPath }) => (
  <>
    <BreadCrumbLink
      href={asPath}
      onClick={(e) => {
        e.preventDefault();
        Router.push(urlObject, asPath);
      }}
    >
      <StyledBreadCrumb className="breadcrumb">
        <div>
          <label>{header}</label>
          <h2>{title}</h2>
        </div>
      </StyledBreadCrumb>
    </BreadCrumbLink>
  </>
);

export default Breadcrumb;
