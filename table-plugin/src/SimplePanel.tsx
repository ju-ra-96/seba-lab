/* eslint-disable */
import React from 'react';
/* import { FieldType, PanelProps, dateTimeParse } from '@grafana/data'; */
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const { limit } = options;

  return (
    <div style={{ overflow: 'auto', width, height }}>
      {data.series.map((frame) => {
        return (
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                {frame.fields.map((field) => (
                  <th>{field.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: frame.length > limit ? limit : frame.length }).map((_, i) => {
                return (
                  <tr key={i}>
                    {frame.fields.map((field) => {
                      //commented out to avoid duplicate date columns
                      /* if (field.type === FieldType.time) {
                        return <td>{dateTimeParse(field.values.get(i)).toISOString()}</td>;
                      } */
                      return <td>{field.values.get(i)}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
};
