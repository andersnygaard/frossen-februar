import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { userEvent, within, expect } from 'storybook/test';
import MonthSelector from '../components/MonthSelector/MonthSelector.vue';

const meta = {
  title: 'Components/MonthSelector',
  component: MonthSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MonthSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    month: 2,
    year: 2026,
  },
};

export const January: Story = {
  args: {
    month: 1,
    year: 2026,
  },
};

export const December: Story = {
  args: {
    month: 12,
    year: 2025,
  },
};

export const EmitBehavior: Story = {
  args: {
    month: 2,
    year: 2026,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    // Verify buttons are clickable
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    // Click prev button
    await step('Click prev button', async () => {
      await userEvent.click(prevButton);
    });

    // Click next button
    await step('Click next button', async () => {
      await userEvent.click(nextButton);
    });

    // Buttons should still be in the DOM
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  },
};
