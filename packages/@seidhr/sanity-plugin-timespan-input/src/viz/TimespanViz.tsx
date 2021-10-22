import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinkVerticalStep } from '@visx/shape'
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const defaultMargin = { top: 20, left: 30, right: 30, bottom: 20 };

export type LinkTypesProps = {
  data: Timespan;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function TimespanViz({
  data,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [orientation, setOrientation] = useState<string>('vertical');
  const [stepPercent, setStepPercent] = useState<number>(0.3);
  const forceUpdate = useForceUpdate();

  const treeData: TreeNode = {
    name: 'Timespan',
    children: [
      ...{
        data.begin && {
          name: 'Start',
          children: [{ name: data.begin.beginOfTheBegin }, { name: data.begin.endOfTheBegin }],
        }
      },
      {
        name: 'End',
        children: [{ name: '2016-01-20T00:00:00.000Z' }, { name: '2016-09-29T23:59:59.999Z' }],
      },
    ],
  };
  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;


  origin = { x: 0, y: 0 };
  sizeWidth = innerWidth;
  sizeHeight = innerHeight;

  const LinkComponent = LinkVerticalStep

  return totalWidth < 10 ? null : (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        <rect width={totalWidth} height={totalHeight} rx={14} fill="transparent" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(treeData, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="rgb(254,3,3)"
                    strokeWidth="2"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 40;
                  const height = 20;

                  let top: number;
                  let left: number;

                  top = node.y;
                  left = node.x;

                  return (
                    <Group top={top} left={left} key={key}>
                      {/* {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#links-gradient')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )} */}
                      {/* {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="#000"
                          stroke='#fff'
                          strokeWidth={1}
                          strokeDasharray={node.data.children ? '0' : '2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )} */}
                      <text
                        dy=".33em"
                        fontSize={14}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill='#000'
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}
