import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import PlayerBox from "./player-box";
import { PieceEntity } from "../entities/PieceEntity";
import { PlayerEntity } from "../entities/PlayerEntity";

interface PlayerContainerProps {
  playerData: PlayerEntity;
  customStyle: ViewStyle;
  turn: string;
  moves: number[];
  animateForSelection: boolean;
  onPieceSelection: (selectedPiece: PieceEntity) => void;
}

const PlayerContainer = ({
  playerData,
  customStyle,
  turn,
  moves,
  animateForSelection,
  onPieceSelection,
}: PlayerContainerProps) => {
  const { color, pieces, player: playerTurn } = playerData;
  const { one, two, three, four } = pieces;

  const opacity = turn === playerTurn ? 1 : 0.3;
  const customStyles = { ...customStyle, opacity };

  const hasSix = moves.some((move) => move === 6);
  // console.log("hasSix =>", hasSix);

  return (
    <PlayerBox
      colorName={color}
      one={one}
      two={two}
      three={three}
      four={four}
      customStyle={customStyles}
      animateForSelection={animateForSelection && turn === playerTurn && hasSix}
      onPieceSelection={(selectedPiece: PieceEntity) => {
        console.log("turn =>", turn);
        console.log("playerTurn =>", playerTurn);
        if (turn === playerTurn) {
          console.log("selectedPiece 1 =>", selectedPiece);
          onPieceSelection(selectedPiece);
        }
      }}
    />
  );
};

export default PlayerContainer;

const styles = StyleSheet.create({});
