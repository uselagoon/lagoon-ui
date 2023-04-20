// import React from 'react'
import getConfig from 'next/config';

import withState from 'recompose/withState';

const { publicRuntimeConfig } = getConfig();

const generateElementsForPlugins = (def) => {
  if (def.type) {
    switch (def.type) {
      case 'script':
        return <script src={def.location} async={true} />;
        break;
      case 'link':
        return <link href={def.href} rel="stylesheet" />;
        break;
    }
  }
  return null;
};

const Plugins = (props) => {
  const { hook = '' } = props;
  let retPlugins = [];
  const plugins = publicRuntimeConfig.PLUGIN_SCRIPTS;
  if (!plugins) {
    return null;
  }

  switch (hook) {
    case 'head':
      if (plugins.head && plugins.head.length > 0) {
        plugins.head.forEach((element) => {
          retPlugins.push(generateElementsForPlugins(element));
        });
      }
      break;
    case 'body':
      if (plugins.body && plugins.body.length > 0) {
        plugins.body.forEach((element) => {
          retPlugins.push(generateElementsForPlugins(element));
        });
      }
      break;
  }
  return retPlugins;
};

export default Plugins;
