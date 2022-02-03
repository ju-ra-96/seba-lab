import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Chart from './charts';
import Gauge from './gauge';
import Heatmap from './heatmap'
import LineChart from './linechart'
import Radarchart from './radarchart';
import Treemap from './treemap';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Graphs() {
  return (
    <div style={{ width: '100%' }}>
     <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'dark',
          maxWidth: 2160
          , 
          borderRadius: 1,
        }}
      >
          <Item><Gauge /></Item>
          <Item><Gauge /></Item>
          <Item><Gauge /></Item>
        <Item><Chart /></Item>
        <Item><Heatmap /></Item>
        <Item></Item>
        <Item><LineChart /></Item>
        <Item><Radarchart /></Item>
        <Item><Treemap /> </Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
      </Box>
    </div>
  );
}
