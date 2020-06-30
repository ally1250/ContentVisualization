import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from 'recharts';
import { Controller, Scene } from 'react-scrollmagic';
import { formatData } from '../../../Utils';

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active) {
//     return (
//       <div style={{ background: "white", height: 100, width: 50, borderWidth: 2 }}>
//         <div>{payload[0].payload.x}</div>
//         <div>{_.round(payload[0].payload.y, 4).toFixed(4)}</div>
//       </div>
//     );
//   }
//   return null;
// };

const CHART_WIDTH = 730;
const CHART_HEIGHT = 300;
const ANIMATION_DURATION = CHART_HEIGHT + 80;

const NormalDistribution = ({ endSD, startSD }) => {
  let graph = formatData({ sd: startSD });
  const changeSD = endSD - startSD;
  return (
    <div>
      <div id="trigger" />
      <div
        id="container"
        style={{
          margin: 40,
          height: CHART_HEIGHT,
          width: CHART_WIDTH,
          position: 'relative',
        }}
      >
        <div style={{ backgroundColor: '#fafafa', paddingTop: 20 }}>
          <Controller>
            <Scene
              duration={ANIMATION_DURATION}
              triggerElement="#trigger"
              indicators
            >
              {(progress) => {
                const newSD = changeSD * progress + startSD;
                graph = formatData({ sd: newSD });
                return (
                  <LineChart
                    width={CHART_WIDTH}
                    height={CHART_HEIGHT}
                    data={graph.data}
                    margin={{
                      top: 6, right: 6, bottom: 6, left: 6,
                    }}
                  >
                    <XAxis
                      dataKey="x"
                      domain={[-4, 4]}
                      tick={{ fontSize: 12 }}
                      tickCount={graph.ticks}
                      interval={1}
                    />
                    <YAxis
                      dataKey="y"
                      domain={[0, 0.5]}
                      tick={{ fontSize: 10 }}
                      tickCount={11}
                      interval={0}
                      type="number"
                    />
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#e1e1e1" />
                    <Tooltip content={<div />} />
                    {/* <Tooltip content={<CustomTooltip />}/> */}
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#ff9933"
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                );
              }}
            </Scene>
          </Controller>
        </div>
      </div>
    </div>
  );
};

export default NormalDistribution;
