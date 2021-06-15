import React, { useRef } from "react";
import * as RN from "react-native";
import { IChartPoint, IPoint } from "./models";
import Bar from "./Bar";
import { CHART_HEIGHT, CHART_WIDTH } from "./const";

import Animated, {
  abs,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { map, pipe, props, reduce, slice } from "rambda";
import SvgChart from "./SvgChart";
import * as SVG from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(SVG.G);
const AnimatedSvg = Animated.createAnimatedComponent(SVG.Svg);

interface IChartProps {
  dataSet: IPoint[];
}

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

const Chart: React.FC<IChartProps> = ({ dataSet }) => {
  // prepare
  const pointsScale = React.useMemo(() => getPointsScale(dataSet), []);
  const preparedPoints = React.useMemo(
    () => preparePoints(dataSet, pointsScale),
    []
  );

  // scroll
  const scrollOffset = useSharedValue(0);
  const startBarNum = useDerivedValue(() => {
    return Math.ceil(scrollOffset.value / 7);
  });
  const currBars = useDerivedValue(() => {
    return preparedPoints.slice(
      startBarNum.value,
      numItemsPerPage + startBarNum.value
    );
  });

  // datas
  const maxValueChartBars = React.useMemo(
    () => Math.max(...preparedPoints.map((point) => point.high)),
    []
  );

  const maxValueVisibleBars = useDerivedValue(() => {
    return Math.max(...currBars.value.map((point) => point.high));
  });
  const minValueVisibleBars = useDerivedValue(() => {
    return Math.min(...currBars.value.map((item) => item.low));
  });
  const possibleHeightVisibleChart = useDerivedValue(() => {
    return (
      (maxValueVisibleBars.value - minValueVisibleBars.value) * pointsScale
    );
  });
  const k = useDerivedValue(() => {
    return CHART_HEIGHT / possibleHeightVisibleChart.value;
  });

  const renderBar = (item: IChartPointData, index: number) => {
    return <Bar key={index} {...item} />;
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  const styles = useAnimatedStyle(() => {
    const a = ((possibleHeightVisibleChart.value - CHART_HEIGHT) / 2) * k.value;
    const b =
      (maxValueChartBars - maxValueVisibleBars.value) * k.value * pointsScale;

    return {
      transform: [
        {
          scaleY: withTiming(k.value, {
            duration: 99,
          }),
        },
        // translateY not working, but why? ...
        // {
        //   translateY: withTiming(-(a + b), {
        //     duration: 99,
        //   }),
        // },
        // {
        //   translateY: withTiming(a + b, {
        //     duration: 99,
        //   }),
        // },
      ],

      // marginBottom: 30

      paddingLeft: 0,
      paddingRight: 0,

      marginTop: withTiming(-(a + b), {
        duration: 99,
      }),
      marginBottom: withTiming(a + b, {
        duration: 99,
      }),
    };
  });

  // const svgProps = useAnimatedProps(() => {
  //   const a = ((possibleHeightVisibleChart.value - CHART_HEIGHT) / 2) * k.value;
  //   const b =
  //     (maxValueChartBars - maxValueVisibleBars.value) * k.value * pointsScale;

  //   return {
  //     scaleY: k.value.toString(),

  //     translateY: withTiming(-(a + b), {
  //       duration: 99,
  //     }),
  //   };
  // });

  return (
    <>
      <Animated.ScrollView
        horizontal={true}
        onScroll={scrollHandler}
        scrollEventThrottle={50}
        bounces={false}
        style={{
          maxHeight: CHART_HEIGHT,
          borderWidth: 1,
        }}
      >
        <Animated.View style={[styles, { flexDirection: "row" }]}>
          {preparedPoints.map(renderBar)}
          {/* <SvgChart dataSet={preparedPoints} /> */}
        </Animated.View>
      </Animated.ScrollView>
      {/* <RN.View style={{ height: 300, borderWidth: 1, paddingTop: -75 }}>
        <RN.View
          style={{
            flex: 1,
            transform: [{ scaleY: 0.5 }],
            backgroundColor: '#ff0000',
            marginBottom: 75,
            marginTop: -75
          }}
        />
      </RN.View> */}
    </>
  );
};

export default Chart;

/**

        <Animated.View style={[styles, { flexDirection: 'row'}]}>
          {preparedPoints.map(renderBar)}
          <SvgChart dataSet={preparedPoints} />
          </Animated.View>

*/
