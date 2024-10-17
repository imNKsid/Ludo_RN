import { FlatList, StyleSheet, Text, View } from "react-native";
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

  const column1 =
    position === "TOP_VERTICAL"
      ? [R11, R10, R9, R8, R7, R6]
      : [B5, B4, B3, B2, B1, G13];

  const column2 =
    position === "TOP_VERTICAL"
      ? [R12, Y14, Y15, Y16, Y17, Y18]
      : [B18, B17, B16, B15, B14, G12];

  const column3 =
    position === "TOP_VERTICAL"
      ? [R13, Y1, Y2, Y3, Y4, Y5]
      : [G6, G7, G8, G9, G10, G11];

  const renderCell = (item: any) => {
    return (
      <View style={styles.cellContainer} key={item}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        {column1.map((item) => renderCell(item))}
      </View>
      <View style={styles.columnContainer}>
        {column2.map((item) => renderCell(item))}
      </View>
      <View style={styles.columnContainer}>
        {column3.map((item) => renderCell(item))}
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
