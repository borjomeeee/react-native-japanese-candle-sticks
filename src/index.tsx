import React from "react";
import * as RN from "react-native";

import { Path, Defs, Svg, G, Circle, Rect, Use } from "react-native-svg";
import { path as d3Path } from "d3-path";

import dataSet from "./dataset.json";
import { processData } from "./utils";

export interface IPoint {
  date: number;
  low: number;
  open: number;
  high: number;
  close: number;
}

const CHART_WIDTH = RN.Dimensions.get("screen").width - 24 * 2;
const CHART_HEIGHT = 300;

const DATA_SET = processData(dataSet);

export interface IChartPointData extends IPoint {
  absHigh: number;
  scale: number;
}

const numItemsPerPage = Math.ceil(CHART_WIDTH / 7 - 1);
const getPointsScale = (points: IPoint[]) => {
  let minHeight = Number.POSITIVE_INFINITY;
  for (let i = 0; i < points.length; i++) {
    if (points[i].high - points[i].low < minHeight) {
      minHeight = points[i].high - points[i].low;
    }
  }
  return CHART_HEIGHT / minHeight;
};
const preparePoints = (points: IPoint[], scale: number): IChartPointData[] => {
  let absHigh = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < points.length; i++) {
    if (points[i].high > absHigh) absHigh = points[i].high;
  }

  return points.map((point): IChartPointData => ({ ...point, scale, absHigh }));
};

export function Screen() {
  const renderBar = (item: any, index: number) => {
    const radius = 5;
    const gap = 10;
    const width = 10;

    const startX = index * (gap + width);
    const [minY, maxY] = [
      Math.min(item.open, item.close),
      Math.max(item.open, item.close) * 1.5,
    ];

    const path = d3Path();
    path.moveTo(startX, minY);
    path.lineTo(startX + width, minY);
    path.lineTo(startX + width, maxY - radius);
    path.bezierCurveTo(
      startX + width,
      maxY - radius,
      startX + width,
      maxY,
      startX + width / 2,
      maxY
    );
    path.bezierCurveTo(
      startX + width / 2,
      maxY,
      startX,
      maxY,
      startX,
      maxY - radius
    );
    // path.lineTo(startX, maxY);
    path.lineTo(startX, minY);
    path.moveTo(startX + width / 2, item.high * 10);
    path.lineTo(startX + width / 2, item.low);

    return <Path key={index.toString()} d={path.toString()} fill={"green"} />;
  };
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>GAZP</RN.Text>

      <RN.View style={{ transform: [{ scaleY: 1 }] }}>
        <Svg height="400" width="50000">
          <G id="shape">
            <G>
              <Circle cx="50" cy="50" r="50" />
              <Rect x="50" y="50" width="50" height="50" />
              <Circle cx="50" cy="50" r="5" fill="blue" />

              {dataSet.map(renderBar)}
            </G>
          </G>
        </Svg>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",

    marginTop: 20,
    marginBottom: 20,
  },
});
