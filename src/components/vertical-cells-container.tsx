import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";
import { BLUE_CELLS, GREEN_CELLS, RED_CELLS, YELLOW_CELLS } from "../utils";

interface VerticalCellsContainerProps {
  position: string;
}

const VerticalCellsContainer = (props: VerticalCellsContainerProps) => {
  const { position } = props;
  const { R6, R7, R8, R9, R10, R11, R12, R13 } = RED_CELLS;
  const { Y1, Y2, Y3, Y4, Y5, Y14, Y15, Y16, Y17, Y18 } = YELLOW_CELLS;
  const { G6, G7, G8, G9, G10, G11, G12, G13 } = GREEN_CELLS;
  const { B1, B2, B3, B4, B5, B14, B15, B16, B17, B18 } = BLUE_CELLS;

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R11 : B5}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R10 : B4}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R9 : B3}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R8 : B2}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R7 : B1}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R6 : G13}</Text>
        </View>
      </View>
      <View style={styles.columnContainer}>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R12 : B18}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y14 : B17}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y15 : B16}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y16 : B15}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y17 : B14}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y18 : G12}</Text>
        </View>
      </View>
      <View style={styles.columnContainer}>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? R13 : G6}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y1 : G7}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y2 : G8}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y3 : G9}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y4 : G10}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text>{position === "TOP_VERTICAL" ? Y5 : G11}</Text>
        </View>
      </View>
    </View>
  );
};

export default VerticalCellsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.white,
    flexDirection: "row",
  },
  columnContainer: {
    flex: 1,
  },
  cellContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
});
