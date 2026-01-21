import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { userEvent, within, expect } from 'storybook/test';
import DayCell from '../components/DayCell/DayCell.vue';
import type { DayState } from '../types';

const meta = {
  title: 'Components/DayCell',
  component: DayCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DayCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: 15,
    state: null,
    isToday: false,
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    day: 15,
    state: 'success' as DayState,
    isToday: false,
    disabled: false,
  },
};

export const Warning: Story = {
  args: {
    day: 15,
    state: 'warning' as DayState,
    isToday: false,
    disabled: false,
  },
};

export const Fail: Story = {
  args: {
    day: 15,
    state: 'fail' as DayState,
    isToday: false,
    disabled: false,
  },
};

export const Today: Story = {
  args: {
    day: 15,
    state: null,
    isToday: true,
    disabled: false,
  },
};

export const TodayWithSuccess: Story = {
  args: {
    day: 15,
    state: 'success' as DayState,
    isToday: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    day: 15,
    state: null,
    isToday: false,
    disabled: true,
  },
};

export const DisabledWithState: Story = {
  args: {
    day: 15,
    state: 'success' as DayState,
    isToday: false,
    disabled: true,
  },
};

export const ClickBehavior: Story = {
  args: {
    day: 15,
    state: null,
    isToday: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Verify button is clickable
    expect(button).toBeEnabled();

    // Click the button
    await userEvent.click(button);

    // Button should still be in the DOM after click
    expect(button).toBeInTheDocument();
  },
};

export const DisabledClickBehavior: Story = {
  args: {
    day: 15,
    state: null,
    isToday: false,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Verify button is disabled
    expect(button).toBeDisabled();
  },
};
