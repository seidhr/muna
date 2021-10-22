import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import TimespanViz from './TimespanViz';

const Timespan = (data: Timespan) => {

  return (
    <ParentSize>{({ width, height }) => <TimespanViz width={width} height={height} data={data} />}</ParentSize>
  )
}

export default Timespan