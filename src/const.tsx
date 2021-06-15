import * as RN from "react-native"

export const DEVICE_WIDTH = RN.Dimensions.get('window').width
export const DEVICE_HEIGHT = RN.Dimensions.get('window').height

export const CHART_WIDTH = DEVICE_WIDTH - 24 * 2
export const CHART_HEIGHT = 300