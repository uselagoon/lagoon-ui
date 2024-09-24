'use client';

import React from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';

interface AntdRegistryProps {
  children: React.ReactNode;
}

const AntdRegistry = ({ children }: AntdRegistryProps) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default AntdRegistry;
