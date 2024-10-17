import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";
import { BLUE_CELLS, GREEN_CELLS, RED_CELLS, YELLOW_CELLS } from "../utils";

const HorizontalCellsContainer = () => {
  const { R1, R2, R3, R4, R5, R14, R15, R16, R17, R18 } = RED_CELLS;
  const { Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13 } = YELLOW_CELLS;
  const { G1, G2, G3, G4, G5, G14, G15, G16, G17, G18 } = GREEN_CELLS;
  const { B6, B7, B8, B9, B10, B11, B12, B13 } = BLUE_CELLS;

  const topLeftArray = [B13, R1, R2, R3, R4, R5];
  const midLeftArray = [B12, R14, R15, R16, R17, R18];
  const bottomLeftArray = [B11, B10, B9, B8, B7, B6];
  const topRightArray = [Y6, Y7, Y8, Y9, Y10, Y11];
  const midRightArray = [G18, G17, G16, G15, G14, Y12];
  const bottomRightArray = [G5, G4, G3, G2, G1, Y13];

  return (
    <View style={styles.container}>
      <View style={styles.rowsContainer}>
        <RenderCell posArray={topLeftArray} />
        <View style={{ flex: 3 }} />
        <RenderCell posArray={topRightArray} />
      </View>

      <View style={styles.rowsContainer}>
        <RenderCell posArray={midLeftArray} />
        <View style={{ flex: 3 }} />
        <RenderCell posArray={midRightArray} />
      </View>

      <View style={styles.rowsContainer}>
        <RenderCell posArray={bottomLeftArray} />
        <View style={{ flex: 3 }} />
        <RenderCell posArray={bottomRightArray} />
      </View>
    </View>
  );
};

export default HorizontalCellsContainer;

const RenderCell = ({ posArray }: any) => {
  return (
    <>
      {posArray.map((item: any) => {
        return (
          <View style={styles.cellContainer} key={item}>
            <Text>{item}</Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.white,
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  cellContainer: {
    flex: 1,
    // flexDirection: "row",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
});
