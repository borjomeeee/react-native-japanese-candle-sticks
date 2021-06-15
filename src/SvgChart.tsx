import React from "react";
import * as RN from "react-native";

import d3, { path } from "d3-path";
import * as SVG from "react-native-svg";

import { CHART_HEIGHT } from "./const";
import { IChartPointData } from "./Chart";

const WIDTH = 5;
const HEIGHT = 100;

const SvgChart = ({ dataSet }: { dataSet: IChartPointData[] }) => {
  return (
    <>
      {dataSet.map((item, index) => {
        const startX = 7 * index;
        const endX = startX + WIDTH;
        const startY = (item.absHigh - item.high) * item.scale;

        const startBodyY =
          startY + (item.high - Math.max(item.open, item.close)) * item.scale;
        const endBodyY =
          startBodyY +
          (Math.max(item.open, item.close) - Math.min(item.open, item.close)) *
            item.scale;

        const endY = endBodyY;

        const dRect = path();
        dRect.moveTo(startX, startY);
        dRect.lineTo(endX, startY);
        // dRect.arcTo(endX, startY, endX, startY, 3);
        dRect.lineTo(endX, endY);
        // dRect.arcTo(endX, endY, startX + WIDTH / 2, endY, 3);
        dRect.lineTo(startX, endY);
        dRect.lineTo(startX, startY);

        return <SVG.Path d={dRect.toString()} fill={"#ff0000"} />;
      })}
    </>
  );
};

export default SvgChart;
