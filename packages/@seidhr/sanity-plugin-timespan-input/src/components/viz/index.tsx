import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import TimespanViz from './TimespanViz';
import { Timespan } from '../types';

const TimespanWrapper = ({ data }) => {

  return (
    <ParentSize>{({ width, height }) => <TimespanViz width={width} height={height} data={data} />}</ParentSize>
  )
}

export default TimespanWrapper