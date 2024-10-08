'use client';

import React from 'react';

import { useEnvContext } from 'next-runtime-env';

type ParsedPlugins = {
  head?: HeadScript[];
  body?: BodyScript[];
};

type HeadScript = {
  type: 'link';
  href: string;
};

type BodyScript = {
  type: 'script';
  location: string;
};
type ScriptDef = HeadScript | BodyScript;

type GeneratedScript = JSX.Element | null;

const generateElementsForPlugins = (def: ScriptDef): GeneratedScript => {
  if (def.type) {
    switch (def.type) {
      case 'script':
        return <script src={def.location} async={true} />;
      case 'link':
        return <link href={def.href} rel="stylesheet" />;
      default:
        return null;
    }
  }
  return null;
};

const Plugins = ({ hook = '' }: { hook: string }) => {
  const { PLUGIN_SCRIPTS } = useEnvContext();

  let retPlugins: GeneratedScript[] = [];

  const plugins = JSON.parse(PLUGIN_SCRIPTS as string) as ParsedPlugins;
  if (!plugins) {
    return null;
  }

  switch (hook) {
    case 'head':
      if (plugins.head && plugins.head.length > 0) {
        plugins.head.forEach(element => {
          retPlugins.push(generateElementsForPlugins(element));
        });
      }
      break;
    case 'body':
      if (plugins.body && plugins.body.length > 0) {
        plugins.body.forEach(element => {
          retPlugins.push(generateElementsForPlugins(element));
        });
      }
      break;
  }
  return retPlugins;
};

export default Plugins;
