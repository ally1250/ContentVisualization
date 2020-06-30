import _ from 'lodash';

export const getY = (
  x, sd, mean,
) => Math.E ** ((x - mean) ** 2 / (-2 * (sd ** 2))) / (Math.sqrt(2 * Math.PI) * sd);

export const defaultNormalDis = {
  xLow: -4,
  xHigh: 4,
  step: 0.5,
  sd: 1,
  mean: 0,
  levelLow: -2,
  levelHigh: 2,
};

export const defaultArea = {
  step: 0.01,
  levelLow: -2,
  levelHigh: 2,
};

export const formatData = (params) => {
  const {
    xLow, xHigh, step, sd, mean, levelLow, levelHigh,
  } = { ...defaultNormalDis, ...params };
  const data = _.range(xLow, xHigh + step, step).map((x) => {
    const y = getY(x, sd, mean);
    if (x <= levelLow || x >= levelHigh) {
      return ({ x, y, area: y });
    }
    return ({ x, y });
  });
  return {
    data,
    ticks: (xHigh - xLow) / step,
  };
};
