import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StatsCard from '../components/StatsCard/StatsCard.vue';

const meta = {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    value: 42,
    label: 'Active Days',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 8,
    label: 'Pending Tasks',
    variant: 'warning',
  },
};

export const Fail: Story = {
  args: {
    value: 3,
    label: 'Failed Tests',
    variant: 'fail',
  },
};

export const Zero: Story = {
  args: {
    value: 0,
    label: 'Errors',
    variant: 'fail',
  },
};
