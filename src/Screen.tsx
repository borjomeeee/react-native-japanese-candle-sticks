import React from 'react';
import * as RN from 'react-native';

import data from "./data.json"
import { IPoint } from './models';
import {processData} from "./utils"
import Chart from "./Chart"
import ChartNew from "./ChartNew"

const points: IPoint[] = processData(data)

const Screen = () => {
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>GAZP</RN.Text>
      <Chart dataSet={points} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',

    marginTop: 20,
    marginBottom: 20,
  },
});

export default Screen;
