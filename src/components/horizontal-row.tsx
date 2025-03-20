import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import CellRowSegment from "./cell-row-segment";
import { PlayerStateEntity } from "../entities/PlayerStateEntity";
import { PieceEntity } from "../entities/PieceEntity";

interface HorizontalRowProps {
  leftArr: string[];
  rightArr: string[];
  moves: number[];
  isWaitingForDiceRoll: boolean;
  onPieceSelection: (selectedPiece: PieceEntity) => void;
  state: PlayerStateEntity;
  turn: string;
}

const HorizontalRow = ({
  leftArr,
  rightArr,
  moves,
  isWaitingForDiceRoll,
  onPieceSelection,
  state,
  turn,
}: HorizontalRowProps) => {
  return (
    <View style={styles.rowsContainer}>
      <CellRowSegment
        posArray={leftArr}
        state={state}
        turn={turn}
        moves={moves}
        isWaitingForDiceRoll={isWaitingForDiceRoll}
        onPieceSelection={onPieceSelection}
      />
      <View style={{ flex: 3 }} />
      <CellRowSegment
        posArray={rightArr}
        state={state}
        turn={turn}
        moves={moves}
        isWaitingForDiceRoll={isWaitingForDiceRoll}
        onPieceSelection={onPieceSelection}
      />
    </View>
  );
};

// **Optimized Memoization Logic**
const arePropsEqual = (
  prevProps: HorizontalRowProps,
  nextProps: HorizontalRowProps
) => {
  return (
    prevProps.turn === nextProps.turn &&
    prevProps.isWaitingForDiceRoll === nextProps.isWaitingForDiceRoll &&
    prevProps.state === nextProps.state && // Assuming state is a reference-checked object
    prevProps.onPieceSelection === nextProps.onPieceSelection && // Function references don't change
    prevProps.leftArr.length === nextProps.leftArr.length &&
    prevProps.rightArr.length === nextProps.rightArr.length &&
    prevProps.moves.length === nextProps.moves.length &&
    prevProps.leftArr.every(
      (value, index) => value === nextProps.leftArr[index]
    ) &&
    prevProps.rightArr.every(
      (value, index) => value === nextProps.rightArr[index]
    ) &&
    prevProps.moves.every((value, index) => value === nextProps.moves[index])
  );
};

const HorizontalRowComponent = memo(HorizontalRow, arePropsEqual);

export default HorizontalRowComponent;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  cellContainer: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
});
