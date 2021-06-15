import React from 'react';
import * as RN from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { IChartPoint, IPoint } from './models';
import { IChartPointData } from './Chart';
import Rect from './Rect';

const Bar: React.FC<IChartPointData> = ({
  open,
  close,
  low,
  high,
  absHigh,
  scale,
}) => {
  const isUp = open < close;

  const topMargin = (absHigh - high) * scale;
  const topHeight = (high - (isUp ? close : open)) * scale;
  const bodyHeight = (isUp ? close - open : open - close) * scale;
  const bottomHeight = ((isUp ? open : close) - low) * scale;

  console.log(topMargin, topMargin + topHeight + bodyHeight + bottomHeight);

  return (
    <RN.View style={{ paddingTop: topMargin }}>
      <RN.View
        style={{
          paddingTop: topHeight,
          paddingBottom: bottomHeight,
        }}
      >
        <RN.View
          style={{
            width: 5,
            marginHorizontal: 1,
            height: bodyHeight,
            backgroundColor: isUp ? '#34C759' : '#FF3B30',
            borderRightColor: '#000',
            borderTopRightRadius: 3 * scale * 10,
            borderTopLeftRadius: 3 * scale * 10,
          }}
        />
        <RN.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 3,
            width: 1,
            backgroundColor: isUp ? '#34C759' : '#FF3B30',
          }}
        />
      </RN.View>
    </RN.View>
  );
};

export default Bar;
