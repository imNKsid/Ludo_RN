import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { getCellBgColor } from "../utils";
import CellBox from "./cell-box";
import { PlayerStateEntity } from "../entities/PlayerStateEntity";
import { PieceEntity } from "../entities/PieceEntity";

interface CellRowSegmentProps {
  posArray: string[];
  state: PlayerStateEntity;
  turn: string;
  moves: number[];
  isWaitingForDiceRoll: boolean;
  onPieceSelection: (selectedPiece: PieceEntity) => void;
}

const CellRowSegment = ({
  posArray,
  state,
  turn,
  moves,
  isWaitingForDiceRoll,
  onPieceSelection,
}: CellRowSegmentProps) => {
  return (
    <>
      {posArray.map((cellPosition: any) => (
        <View style={styles.cellContainer} key={cellPosition}>
          <CellBox
            bgColor={getCellBgColor(cellPosition)}
            state={state}
            position={cellPosition}
            turn={turn}
            moves={moves}
            isWaitingForDiceRoll={isWaitingForDiceRoll}
            onPieceSelection={onPieceSelection}
          />
        </View>
      ))}
    </>
  );
};

// **Optimized Memoization Logic**
const arePropsEqual = (
  prevProps: CellRowSegmentProps,
  nextProps: CellRowSegmentProps
) => {
  return (
    prevProps.turn === nextProps.turn &&
    prevProps.isWaitingForDiceRoll === nextProps.isWaitingForDiceRoll &&
    prevProps.state === nextProps.state && // Assuming state is immutable
    prevProps.onPieceSelection === nextProps.onPieceSelection && // Function references don't change
    prevProps.posArray.length === nextProps.posArray.length &&
    prevProps.moves.length === nextProps.moves.length &&
    prevProps.posArray.every(
      (value, index) => value === nextProps.posArray[index]
    ) &&
    prevProps.moves.every((value, index) => value === nextProps.moves[index])
  );
};

const CellRowSegmentComponent = memo(CellRowSegment, arePropsEqual);

export default CellRowSegmentComponent;

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
