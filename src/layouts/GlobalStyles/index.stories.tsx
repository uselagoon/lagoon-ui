import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import GlobalStyles from './index';

/** Some of the default HTML components with style resets */
const meta: Meta<typeof React.Component> = {
  component: GlobalStyles,
  tags: ['autodocs'],
  title: 'Layouts/Global Styles',
  parameters: {
    controls: { hideNoControlsWarning: true },
    options: {
      showPanel: false,
    },
  },
  decorators: [
    Story => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
};

type Story = StoryObj<typeof GlobalStyles>;

export const Default: Story = {
  render: () => <p>Sample content to demonstrate the global styles.</p>,
};

export const Headings: Story = {
  render: () => (
    <>
      <div>Text is placed around the headings to demonstrate margins.</div>
      <h1>A primary heading</h1>
      <div>Text is placed around the headings to demonstrate margins.</div>
      <h2>A secondary heading</h2>
      <div>Text is placed around the headings to demonstrate margins.</div>
      <h3>A tertiary heading</h3>
      <div>Text is placed around the headings to demonstrate margins.</div>
      <h4>An h4 heading</h4>
      <div>Text is placed around the headings to demonstrate margins.</div>
    </>
  ),
  parameters: {
    docs: {
      storyDescription: 'Heading 1-4 are defined in GlobalStyles.',
    },
  },
};

export const Links: Story = {
  render: () => (
    <>
      <p>
        <a href="#">This link is a standard link</a>.
      </p>
      <p>
        <a href="#" className="hover-state">
          This link has a special hover state
        </a>
        .
      </p>
    </>
  ),
};

export const Texts: Story = {
  render: () => (
    <>
      <p>
        <strong>This is bolded.</strong> <em>And this is italicized.</em>
      </p>
    </>
  ),
};

export const Lists: Story = {
  render: () => (
    <>
      <ul>
        <li>A list item</li>
        <li>Another list item</li>
        <li>
          <a href="#">A list item containing a link</a>
        </li>
      </ul>
      <ol>
        <li>A list item</li>
        <li>Another list item</li>
        <li>
          <a href="#">A list item containing a link</a>
        </li>
      </ol>
    </>
  ),
};

export const Labels: Story = {
  render: () => (
    <>
      <div>
        <label htmlFor="example-input">This is a label for a form element:</label>
        <input id="example-input" />
      </div>
    </>
  ),
};

export const Containers: Story = {
  render: () => (
    <>
      <div className="field-wrapper">
        <div className="field">
          <p>These divs are in a ".field-wrapper" container.</p>
        </div>
        <div className="field">
          This is a ".field" div. <a href="#">It contains a link</a>.
        </div>
      </div>
      <div id="__next">
        <div>
          <p>This div is in the "#__next" container.</p>
        </div>
        <div className="content-wrapper">
          <p>This ".content-wrapper" container is in the "#__next" container.</p>
        </div>
        <div className="content-wrapper">
          <p>This ".content-wrapper" container is in the "#__next" container.</p>
        </div>
        <div>
          <p>This div is in the "#__next" container.</p>
        </div>
      </div>
    </>
  ),
};

export default meta;
