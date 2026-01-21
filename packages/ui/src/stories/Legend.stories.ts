import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Legend from '../components/Legend/Legend.vue';

const meta = {
  title: 'Components/Legend',
  component: Legend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Legend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
