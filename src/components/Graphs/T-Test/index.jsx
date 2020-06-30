// chart height: 370, width: 440
// chart margin: 6 all sides
// x-axis height: 30, y-axis width: 60
// overall height: 412, width: 512

import React, { Component } from 'react';
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
import { formatData, getY } from '../../../Utils';

const CHART_WIDTH = 730;
const CHART_HEIGHT = 300;
const MARGIN = 6;
const Y_WIDTH = 60;
const X_HEIGHT = 30;
const LEVEL_LOW = -1.5;
const LEVEL_HIGH = 1.5;
const FAIL_COLOR = 'red';
const PASS_COLOR = '#82ca9d';
const ANIMATION_DURATION = CHART_HEIGHT + 80;

const initialGraph = formatData({ levelLow: LEVEL_LOW, levelHigh: LEVEL_HIGH });

// calculate pixel from x-axis step
// const calculateBlocks = (blocks) => ((CHART_WIDTH - MARGIN * 2 - Y_WIDTH) / 8) * blocks;

// calcualte pixel for left from x coordinate
const calcualteLeft = (x) => (
  (CHART_WIDTH - MARGIN * 2 - Y_WIDTH) / 8) * (x + 4) + Y_WIDTH + MARGIN;

// calculate pixel for height from x coordinate
const calculateLineHeight = (x) => (getY(x, 1, 0) / 0.5) * (CHART_HEIGHT - MARGIN * 2 - X_HEIGHT);

// convert y coordinate to pixel
// const convertToPx = (coordVal) => (coordVal / 0.5) * (CHART_HEIGHT - MARGIN * 2 - X_HEIGHT);

const animationStart = {
  leftX: calcualteLeft(-2) - 0.5,
  rightX: calcualteLeft(2) - 0.5,
  xCoord: -2,
  height: calculateLineHeight(-2),
};

const animationEnd = {
  leftX: calcualteLeft(-1) - 0.5,
  rightX: calcualteLeft(1) - 0.5,
  xCoord: -1,
  height: calculateLineHeight(-1),
};

class TTest extends Component {
  updateLines = (progress) => {
    const { displayLeft = true, displayRight = true } = this.props;
    const start = animationStart;
    const end = animationEnd;
    const changeX = animationEnd.leftX - animationStart.leftX;
    const changeXCoord = animationEnd.xCoord - animationStart.xCoord;
    const x = progress * changeX;
    const xCoord = progress * changeXCoord + start.xCoord;
    const height = calculateLineHeight(xCoord);
    let animation;
    let lineColor = PASS_COLOR;
    if (start.leftX + x > end.leftX) {
      animation = {
        leftX: end.leftX,
        rightX: end.rightX,
        height: end.height,
      };
    }

    if (start.leftX + x <= end.leftX) {
      animation = {
        leftX: start.leftX + x,
        rightX: start.rightX - x,
        height,
      };
      if (xCoord > LEVEL_LOW) {
        lineColor = FAIL_COLOR;
      }
    }

    return (
      <div>
        {displayLeft ? (
          <div style={{
            position: 'absolute',
            bottom: X_HEIGHT + MARGIN,
            width: 2,
            height: animation.height,
            left: animation.leftX,
            backgroundColor: lineColor,
          }}
          />
        ) : null}
        {displayRight ? (
          <div style={{
            position: 'absolute',
            bottom: X_HEIGHT + MARGIN,
            width: 2,
            height: animation.height,
            left: animation.rightX,
            backgroundColor: lineColor,
          }}
          />
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div id="trigger" />
        <div
          id="container"
          style={{
            margin: 40,
            backgroundColor: '#fafafa',
            height: CHART_HEIGHT,
            width: CHART_WIDTH,
            position: 'relative',
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
                dataKey="area"
                fill="#82ca9d"
                stroke="#8884d8"
                legendType="circle"
                isAnimationActive={false}
              />
            </AreaChart>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <LineChart
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              data={initialGraph.data}
              onClick={this.toggleData}
              margin={{
                top: 6, right: 6, bottom: 6, left: 6,
              }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
                vertical={false}
                stroke="#e1e1e1"
              />
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
                stroke="#333333"
                dot={false}
                strokeWidth={1}
                isAnimationActive={false}
              />
            </LineChart>
            <Controller>
              <Scene
                duration={ANIMATION_DURATION}
                triggerElement="#trigger"
                indicators
              >
                {(progress) => this.updateLines(progress)}
              </Scene>
            </Controller>
          </div>
        </div>
      </div>
    );
  }
}

export default TTest;
