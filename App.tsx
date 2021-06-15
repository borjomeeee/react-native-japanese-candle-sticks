import React from "react";
import * as RN from "react-native";

import Screen from "./src/Screen";

export default function App() {
  return (
    <RN.SafeAreaView style={styles.container}>
      <Screen />
    </RN.SafeAreaView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
