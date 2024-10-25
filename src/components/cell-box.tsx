import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";

const CellBox = () => {
  return <View style={styles.container}>{/* <Text>CellBox</Text> */}</View>;
};

export default CellBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
