import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";

const HorizontalCellsContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowsContainer}>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>

        <View style={{ flex: 3 }} />

        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
      </View>
      <View style={styles.rowsContainer}>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>

        <View style={{ flex: 3 }} />

        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
      </View>
      <View style={styles.rowsContainer}>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>

        <View style={{ flex: 3 }} />

        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
        <View style={styles.cellContainer}></View>
      </View>
    </View>
  );
};

export default HorizontalCellsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.white,
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  cellContainer: {
    flex: 1,
    // flexDirection: "row",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
});
