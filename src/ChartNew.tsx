import React from "react";
import * as RN from "react-native";

import { CHART_HEIGHT, CHART_WIDTH } from "./const";
import { IPoint } from "./models";

import { path as d3Path } from "d3-path";
import { scaleLinear } from "d3-scale";
import Animated from "react-native-reanimated";
import * as SVG from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(SVG.Svg);

interface IChartNewProps {
  dataSet: IPoint[];
}

const ChartNew: React.FC<IChartNewProps> = ({ dataSet }) => {
  const { minVolume, maxVolume, initialScale, minBarHeight } =
    React.useMemo(() => {
      const minBarHeight = Math.min(
        ...dataSet.map((item) => item.high - item.low)
      );
      const minVolume = Math.min(...dataSet.map((item) => item.low));
      const maxVolume = Math.max(...dataSet.map((item) => item.high));

      const initialScale = CHART_HEIGHT / minBarHeight;
      return { initialScale, minVolume, maxVolume, minBarHeight };
    }, []);

  const renderBar = (bar: IPoint, index: number) => {
    const scaleY = scaleLinear()
      .domain([minVolume, maxVolume])
      .range([(maxVolume - minVolume) * initialScale, 0]);

    const path = d3Path();
    path.moveTo(index * 7, scaleY(bar.high));
    path.lineTo(index * 7 + 5, scaleY(bar.high));
    path.lineTo(index + 7 + 5, scaleY(bar.low));
    path.lineTo(index + 7, scaleY(bar.low));
    path.lineTo(index + 7, scaleY(bar.high));

    console.log(scaleY(bar.low));
    return <SVG.Path key={index} d={path.toString()} fill={"#ff0000"} />;
  };

  return (
    <RN.ScrollView
      style={{
        maxHeight: CHART_HEIGHT,
        minHeight: CHART_HEIGHT,

        borderWidth: 1,
      }}
      horizontal={true}
    >
      <AnimatedSvg
        width={1000}
        styles={{
          transform: [{ scaleY: 1 }, { translateY: -10000 }],
        }}
      >
        {dataSet.map(renderBar)}
      </AnimatedSvg>
    </RN.ScrollView>
  );
};

export default ChartNew;
