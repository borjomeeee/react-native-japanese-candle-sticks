import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Circle, Path, Rect as RectSVG } from 'react-native-svg';
import d3 from 'd3-path';

interface IRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

const Rect: React.FC<IRectProps> = ({ x, y, width, height, fill }) => {
  // const d = d3.path();
  // d.moveTo(x, y);
  // d.lineTo(x + width, y);
  // d.lineTo(x + width, y + height);
  // d.lineTo(x, y + height);
  // d.lineTo(x, y);

  return (
    <Svg width={width} height={height}>
      {/* <Path fill={fill} d={""} /> */}
      <RectSVG rx={10} ry={} />
    </Svg>
  );
};

export default Rect;
