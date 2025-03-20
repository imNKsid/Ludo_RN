import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { COLORS } from "../assets";
import { BLUE_CELLS, GREEN_CELLS, RED_CELLS, YELLOW_CELLS } from "../utils";
import Dice from "./dice";
import HorizontalRow from "./horizontal-row";
import { PlayerStateEntity } from "../entities/PlayerStateEntity";
import { PieceEntity } from "../entities/PieceEntity";

interface HorizontalCellsContainerProps {
  isRolling: boolean;
  diceNum: number;
  turn: string;
  state: PlayerStateEntity;
  moves: number[];
  isWaitingForDiceRoll: boolean;
  onDiceRoll: () => void;
  onPieceSelection: (selectedPiece: PieceEntity) => void;
}

const HorizontalCellsContainer = memo(
  (props: HorizontalCellsContainerProps) => {
    const {
      isRolling,
      diceNum,
      turn,
      state,
      moves,
      isWaitingForDiceRoll,
      onDiceRoll,
      onPieceSelection,
    } = props;

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
        <HorizontalRow
          leftArr={topLeftArray}
          rightArr={topRightArray}
          moves={moves}
          isWaitingForDiceRoll={isWaitingForDiceRoll}
          onPieceSelection={onPieceSelection}
          state={state}
          turn={turn}
        />
        <HorizontalRow
          leftArr={midLeftArray}
          rightArr={midRightArray}
          moves={moves}
          isWaitingForDiceRoll={isWaitingForDiceRoll}
          onPieceSelection={onPieceSelection}
          state={state}
          turn={turn}
        />
        <HorizontalRow
          leftArr={bottomLeftArray}
          rightArr={bottomRightArray}
          moves={moves}
          isWaitingForDiceRoll={isWaitingForDiceRoll}
          onPieceSelection={onPieceSelection}
          state={state}
          turn={turn}
        />

        <Dice
          isRolling={isRolling}
          diceNum={diceNum}
          turn={turn}
          onDiceRoll={onDiceRoll}
        />
      </View>
    );
  }
);

// export default HorizontalCellsContainer;

// Custom comparison function to optimize memoization
export default memo(HorizontalCellsContainer, (prevProps, nextProps) => {
  return (
    prevProps.isRolling === nextProps.isRolling &&
    prevProps.diceNum === nextProps.diceNum &&
    prevProps.turn === nextProps.turn &&
    prevProps.isWaitingForDiceRoll === nextProps.isWaitingForDiceRoll &&
    prevProps.onDiceRoll === nextProps.onDiceRoll &&
    prevProps.onPieceSelection === nextProps.onPieceSelection &&
    prevProps.state === nextProps.state &&
    JSON.stringify(prevProps.moves) === JSON.stringify(nextProps.moves)
  );
});

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
    borderColor: COLORS.black,
    borderWidth: 1,
  },
});
