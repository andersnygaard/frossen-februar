import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { userEvent, within, expect } from 'storybook/test';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid.vue';
import type { DayState } from '../types';

const meta = {
  title: 'Components/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    month: 1,
    year: 2024,
    dayStates: {
      5: 'success' as DayState,
      10: 'warning' as DayState,
      15: 'fail' as DayState,
      20: 'success' as DayState,
    },
    today: new Date(2024, 0, 15), // January 15, 2024
  },
};

export const CurrentMonth: Story = {
  args: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dayStates: {
      5: 'success' as DayState,
      10: 'warning' as DayState,
    },
    today: new Date(),
  },
};

export const NoStates: Story = {
  args: {
    month: 1,
    year: 2024,
    dayStates: {},
    today: new Date(2024, 0, 15),
  },
};

export const AllStates: Story = {
  args: {
    month: 1,
    year: 2024,
    dayStates: {
      1: 'success' as DayState,
      2: 'warning' as DayState,
      3: 'fail' as DayState,
      4: 'success' as DayState,
      5: 'warning' as DayState,
      6: 'fail' as DayState,
      7: 'success' as DayState,
      8: 'warning' as DayState,
      9: 'fail' as DayState,
      10: 'success' as DayState,
    },
    today: new Date(2024, 0, 5),
  },
};

export const DayClickInteraction: Story = {
  args: {
    month: 1,
    year: 2024,
    dayStates: {
      5: 'success' as DayState,
      10: 'warning' as DayState,
      15: 'fail' as DayState,
    },
    today: new Date(2024, 0, 10),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find a clickable day (not disabled, not today if we're trying to click past)
    const buttons = canvas.getAllByRole('button');

    // Expect buttons to exist
    expect(buttons.length).toBeGreaterThan(0);

    // Click on a day
    if (buttons.length > 0) {
      await userEvent.click(buttons[7]); // Click on a day button
    }

    // Verify buttons are still in the DOM after click
    const buttonsAfter = canvas.getAllByRole('button');
    expect(buttonsAfter.length).toBeGreaterThan(0);
  },
};

export const GridLayout: Story = {
  args: {
    month: 1,
    year: 2024,
    dayStates: {
      5: 'success' as DayState,
      10: 'warning' as DayState,
      15: 'fail' as DayState,
      20: 'success' as DayState,
    },
    today: new Date(2024, 0, 15),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the calendar grid container
    const gridContainer = canvasElement.querySelector('.calendar-grid');
    expect(gridContainer).toBeInTheDocument();

    // Verify grid has the correct structure (7 columns for weekdays)
    const headers = canvasElement.querySelectorAll('.calendar-grid__header');
    expect(headers.length).toBe(7); // 7 weekdays
  },
};
