import React, { useState, useMemo } from 'react';
import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, ScaleInput, coerceNumber } from '@visx/scale';
import { Axis, Orientation, SharedAxisProps, AxisScale } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { AnimatedAxis, AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { getSeededRandom } from '@visx/mock-data';
import { timeFormat } from 'd3-time-format';
import { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';
import { Timespan } from '../../types';
import useForceUpdate from './useForceUpdate';
import { LinearGradient } from '@visx/gradient';

export const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = '#340098';
const gridColor = '#6e0fca';
const seededRandom = getSeededRandom(0.5);
const margin = {
  top: 40,
  right: 150,
  bottom: 20,
  left: 50,
};

const tickLabelProps = () =>
({
  fill: tickLabelColor,
  fontSize: 12,
  fontFamily: 'sans-serif',
  textAnchor: 'middle',
} as const);

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export type AxisProps = {
  data: Timespan;
  width: number;
  height: number;
  showControls?: boolean;
};

type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;

type AxisComponent = React.FC<
  SharedAxisProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridRowsComponent = React.FC<
  GridRowsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridColumnsComponent = React.FC<
  GridColumnsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;

export default function AxisVis({
  data,
  width: outerWidth = 800,
  height: outerHeight = 800,
}: AxisProps) {
  // use non-animated components if prefers-reduced-motion is set
  const prefersReducedMotionQuery =
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;
  const [useAnimatedComponents, setUseAnimatedComponents] = useState(!prefersReducedMotion);
  const forceUpdate = useForceUpdate();

  // in svg, margin is subtracted from total width/height
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  const [dataToggle, setDataToggle] = useState(true);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory>('center');

  // define some types
  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }

  const AxisComponent: AxisComponent = useAnimatedComponents ? AnimatedAxis : Axis;
  const GridRowsComponent: GridRowsComponent = useAnimatedComponents ? AnimatedGridRows : GridRows;
  const GridColumnsComponent: GridColumnsComponent = useAnimatedComponents
    ? AnimatedGridColumns
    : GridColumns;

  const axes: AxisDemoProps<AxisScale<number>>[] = useMemo(() => {
    // toggle between two value ranges to demo animation
    const timeValues = [
      data.beginOfTheBegin ? new Date(data.beginOfTheBegin) : undefined,
      data.endOfTheBegin ? new Date(data.endOfTheBegin) : undefined,
      data.date ? new Date(data.date) : undefined,
      data.beginOfTheEnd ? new Date(data.beginOfTheEnd) : undefined,
      data.endOfTheEnd ? new Date(data.endOfTheEnd) : undefined
    ].filter(Boolean);
    console.log(timeValues)
    return [
      {
        scale: scaleUtc({
          domain: getMinMax(timeValues),
          range: [0, width],
        }),
        values: timeValues,
        tickFormat: (v: Date, i: number) =>
          timeFormat('% %B %Y')(v),
      },
    ];
  }, [width]);

  if (width < 10) return null;

  const scalePadding = 40;
  const scaleHeight = height / axes.length - scalePadding;

  const yScale = scaleLinear({
    domain: [100, 0],
    range: [scaleHeight, 0],
  });

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="visx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={'url(#visx-axis-gradient)'}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axes.map(({ scale, values, label, tickFormat }, i) => (
            <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
              <GridRowsComponent
                // force remount when this changes to see the animation difference
                key={`gridrows-${animationTrajectory}`}
                scale={yScale}
                stroke={gridColor}
                width={width}
                numTicks={dataToggle ? 1 : 3}
                animationTrajectory={animationTrajectory}
              />
              <GridColumnsComponent
                // force remount when this changes to see the animation difference
                key={`gridcolumns-${animationTrajectory}`}
                scale={scale}
                stroke={gridColor}
                height={scaleHeight}
                numTicks={dataToggle ? 5 : 2}
                animationTrajectory={animationTrajectory}
              />
              <AreaClosed
                data={values.map((x) => [
                  (scale(x) ?? 0) +
                  // offset point half of band width for band scales
                  ('bandwidth' in scale && typeof scale!.bandwidth !== 'undefined'
                    ? scale.bandwidth!() / 2
                    : 0),
                  yScale(10 + seededRandom() * 90),
                ])}
                yScale={yScale}
                curve={curveMonotoneX}
                fill={gridColor}
                fillOpacity={0.2}
              />
              <AxisComponent
                // force remount when this changes to see the animation difference
                key={`axis-${animationTrajectory}`}
                orientation={Orientation.bottom}
                top={scaleHeight}
                scale={scale}
                tickFormat={tickFormat}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={tickLabelProps}
                numTicks={5}
                label={label}
                labelProps={{
                  x: width + 30,
                  y: -10,
                  fill: labelColor,
                  fontSize: 18,
                  strokeWidth: 0,
                  stroke: '#fff',
                  paintOrder: 'stroke',
                  fontFamily: 'sans-serif',
                  textAnchor: 'start',
                }}
                animationTrajectory={animationTrajectory}
              />
            </g>
          ))}
        </g>
      </svg>
    </>
  );
}
