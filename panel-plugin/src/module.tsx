import { PanelPlugin } from '@grafana/data';
import { SimplePanel } from './GraphPanel';
import { SimpleOptions as SimplePanelOptions } from './types';

export const plugin = new PanelPlugin<SimplePanelOptions>(SimplePanel).setPanelOptions(builder => {
  return builder.addRadio({
    path: 'graphType',
    defaultValue: 'line',
    name: 'Graph Type',
    settings: {
      options: [
        {
          value: 'line',
          label: 'Line',
        },
        {
          value: 'bar',
          label: 'Bar',
        },
      ],
    },
  });
});
