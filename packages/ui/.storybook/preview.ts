import type { Preview } from '@storybook/vue3';

// Import tokens.css (placeholder created in task 005, populated in task 006)
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;