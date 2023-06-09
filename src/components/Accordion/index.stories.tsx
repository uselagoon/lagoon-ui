import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {expect} from "@storybook/jest";
import Accordion from './index';

/**
 * Multi column header accordion component, rendering a single child element
 */
const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: 'Controls visibility',
    },
    columns: {
      description: 'Array of columns',
    },
    children: {
      description: 'Valid ReactNode',
    },
  },
};

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    columns: ['Column 1', 'Column 2', 'Column 3'],
  },
};

export const Minified: Story = {
  args: {
    ...Default.args,
    minified: true,
  },
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    defaultValue:false,
    children: (
      <ul style={{ border: '1px solid #999' }}>
        <li>List item</li>
        <li>Another list item</li>
      </ul>
    )
  },
  play:async ({canvasElement})=>{
    // toggle functionality
    const canvas = within(canvasElement)
    const element = await Promise.resolve(canvas.getByTestId("storybook-accordion"));
    await Promise.resolve(userEvent.click(element));
    expect(await Promise.resolve(canvas.getAllByRole("listitem").length)).toBe(2);

    // toggle visibility
    await Promise.resolve(userEvent.click(element));
    expect(await Promise.resolve(canvas.queryByRole("list"))).toBeNull();
  }
};

export default meta;
