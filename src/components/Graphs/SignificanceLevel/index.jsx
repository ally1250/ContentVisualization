// chart height: 370, width: 440
// chart margin: 6 all sides
// x-axis height: 30, y-axis width: 60
// overall height: 412, width: 512

import React from 'react';
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
} from 'recharts';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import { formatData } from '../../../Utils';

const initialGraph = formatData();
const CHART_WIDTH = 730;
const CHART_HEIGHT = 300;
const MARGIN = 6;
const Y_WIDTH = 60;
const calculateBlocks = (blocks) => ((CHART_WIDTH - MARGIN * 2 - Y_WIDTH) / 8) * blocks;

const animationStart = {
  left: calculateBlocks(3) + Y_WIDTH + MARGIN,
  width: calculateBlocks(2),
};
const animation = {
  left: -calculateBlocks(1),
  width: calculateBlocks(4),
};

const AnimatedBlock = () => (
  <Controller>
    <Scene duration={CHART_HEIGHT + 80} triggerElement="#trigger" indicators>
      {(progress) => (
        <Tween
          to={{
            x: animation.left,
            y: 0,
            height: CHART_HEIGHT,
            width: animation.width,
          }}
          totalProgress={progress}
          paused
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: animationStart.left,
              width: animationStart.width,
              height: CHART_HEIGHT,
              backgroundColor: '#fafafa',
            }}
            id="animated-block"
          />
        </Tween>
      )}
    </Scene>
  </Controller>
);

const SignificanceLevel = () => (
  <div>
    <div id="trigger" />
    <div
      id="container"
      style={{
        backgroundColor: '#fafafa', margin: 40, height: CHART_HEIGHT, width: CHART_WIDTH, position: 'relative', paddingTop: 20,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <AreaChart
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          data={initialGraph.data}
          margin={{
            top: 6, right: 6, bottom: 6, left: 6,
          }}
        >
          <XAxis
            axisLine={false}
            tickLine={false}
            tick={false}
            domain={[-4, 4]}
          />
          <YAxis
            tick={false}
            axisLine={false}
            tickLine={false}
            domain={[0, 0.5]}
          />
          <Area
            type="monotone"
            dataKey="y"
            fill="#8884d8"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </AreaChart>
      </div>
      <AnimatedBlock />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <LineChart
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          data={initialGraph.data}
          margin={{
            top: 6, right: 6, bottom: 6, left: 6,
          }}
        >
          <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#e1e1e1" />
          <XAxis
            dataKey="x"
            domain={[-4, 4]}
            tick={{ fontSize: 12 }}
            tickCount={initialGraph.ticks}
            interval={1}
            stroke="#aaaaaa"
          />
          <YAxis
            dataKey="y"
            domain={[0, 0.5]}
            tick={{ fontSize: 10 }}
            tickCount={11}
            interval={0}
            type="number"
            stroke="#aaaaaa"
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#ff9933"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </div>
  </div>
);

export default SignificanceLevel;
