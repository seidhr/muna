import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import TreeNode from './TreeNode';

const TimespanWrapper = ({ data }) => {
  return (
    <>
      <ParentSize>{({ width, height }) => <TreeNode width={width} height={height} data={data} />}</ParentSize>
    </>
  )
}

export default TimespanWrapper