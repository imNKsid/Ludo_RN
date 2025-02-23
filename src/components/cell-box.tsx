import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";
import { PlayerState } from "../utils/interfaces";

interface CellBoxProps {
  position: string;
  bgColor: string;
  onPieceSelection?: () => void;
  state: PlayerState;
}

const CellBox = ({
  bgColor,
  position,
  onPieceSelection,
  state,
}: CellBoxProps) => {
  const shouldRenderPiece = () => {
    const { red, yellow, green, blue } = state;

    return (
      red.pieces.one.position === position ||
      red.pieces.two.position === position ||
      red.pieces.three.position === position ||
      red.pieces.four.position === position ||
      yellow.pieces.one.position === position ||
      yellow.pieces.two.position === position ||
      yellow.pieces.three.position === position ||
      yellow.pieces.four.position === position ||
      green.pieces.one.position === position ||
      green.pieces.two.position === position ||
      green.pieces.three.position === position ||
      green.pieces.four.position === position ||
      blue.pieces.one.position === position ||
      blue.pieces.two.position === position ||
      blue.pieces.three.position === position ||
      blue.pieces.four.position === position
    );
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]}>
      {/* View to render Cell box on the board when the position matches the piece's position */}
      {shouldRenderPiece() ? <View style={[styles.piece]} /> : null}
    </TouchableOpacity>
  );
};

export default CellBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  piece: {
    width: 15,
    height: 15,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 5,
  },
});
