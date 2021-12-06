import React, { useState } from 'react'
import { Group } from '@visx/group'
import { hierarchy, Tree } from '@visx/hierarchy'
import { LinkVerticalLine } from '@visx/shape'
import { Text } from '@visx/text'
// import { pointRadial } from 'd3-shape'
import useForceUpdate from './useForceUpdate'
import { Timespan } from '../../types';
import { nb } from 'date-fns/locale'
import { format } from 'date-fns'

interface TreeNode {
  name: any;
  children?: TreeNode[];
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 30 };

export type LinkTypesProps = {
  data: Timespan;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function TreeNode({
  data,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [orientation, setOrientation] = useState<string>('vertical');
  const [stepPercent, setStepPercent] = useState<number>(0.3);
  const forceUpdate = useForceUpdate();

  const getTimeSpanAsTreeNodes = (input) => {
    const treeData: TreeNode = {
      name: 'Timespan',
      children: [],
    };

    if (data.date) {
      let precise = {
        name: 'Date',
        children: [
          { name: format(new Date(data.date), "PPpp", { locale: nb }) }
        ],
      }
      return precise
    }

    if (data.beginOfTheBegin) {
      let start = {
        name: 'Start',
        children: [],
      }

      if (data.beginOfTheBegin) {
        start.children.push(
          { name: format(new Date(data.beginOfTheBegin), "PPpp", { locale: nb }) }
        )
      }
      if (data.endOfTheBegin) {
        start.children.push(
          { name: format(new Date(data.endOfTheBegin), "PPpp", { locale: nb }) }
        )
      }
      treeData.children.push(start)
    } else {
      let start = {
        name: 'Uncertain start',
      }
      treeData.children.push(start)
    }

    if (data.endOfTheEnd) {
      let end = {
        name: 'End',
        children: [],
      }

      if (data.beginOfTheEnd) {
        end.children.push(
          { name: format(new Date(data.beginOfTheEnd), "PPpp", { locale: nb }) }
        )
      }
      if (data.endOfTheEnd) {
        end.children.push(
          { name: format(new Date(data.endOfTheEnd), "PPpp", { locale: nb }) }
        )
      }
      treeData.children.push(end)
    } else {
      let end = {
        name: 'Uncertain end',
      }
      treeData.children.push(end)
    }

    return treeData
  }

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;


  origin = { x: 0, y: 0 };
  sizeWidth = innerWidth;
  sizeHeight = innerHeight;

  const LinkComponent = LinkVerticalLine

  return totalWidth < 10 ? null : (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        <rect width={totalWidth} height={totalHeight} rx={14} fill="transparent" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(getTimeSpanAsTreeNodes(data), (d) => (d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    // percent={stepPercent}
                    stroke="rgb(254,113,113)"
                    strokeWidth="1"
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
                      {node.data.children && (
                        <circle
                          r={4}
                        />
                      )}
                      {/* {node.depth === 1 && (
                        <circle
                          r={4}
                        />
                      )} */}
                      {node.data.children && (<Text
                        width={120}
                        dy="-0.8em"
                        fontSize={14}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill='#000'
                      >
                        {node.data.name}
                      </Text>)}
                      {!node.data.children && (<Text
                        width={120}
                        dy="1em"
                        fontSize={14}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill='#000'
                      >
                        {node.data.name}
                      </Text>)}
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
