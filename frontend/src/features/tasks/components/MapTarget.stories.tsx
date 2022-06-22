import { Meta, Story } from '@storybook/react';

import { MapTargets, MapTargetsProps } from './MapTargets';

const meta: Meta = {
  title: 'Features/Tasks/Components/MapTargets',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<MapTargetsProps> = (props) => <MapTargets {...props} />;

export const Default = Template.bind({});
Default.args = {
  targets: ['road', 'map'],
};
