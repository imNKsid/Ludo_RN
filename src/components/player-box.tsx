import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";
import { PieceProps } from "../utils";

interface SinglePlayerProps {
  piece: PieceProps;
  onPieceSelection: (piece: any) => void;
}

interface PlayerBoxProps {
  colorName: string;
  one: PieceProps;
  two: PieceProps;
  three: PieceProps;
  four: PieceProps;
  customStyle?: any;
  onPieceSelection: (piece: any) => void;
}

const PlayerBox = (props: PlayerBoxProps) => {
  const { colorName, one, two, three, four, customStyle, onPieceSelection } =
    props;

  return (
    <View style={[styles.player, customStyle, { backgroundColor: colorName }]}>
      <View style={styles.innerContainer}>
        <View style={styles.piecesContainer}>
          <SinglePlayer piece={one} onPieceSelection={onPieceSelection} />
          <SinglePlayer piece={two} onPieceSelection={onPieceSelection} />
        </View>
        <View style={styles.piecesContainer}>
          <SinglePlayer piece={three} onPieceSelection={onPieceSelection} />
          <SinglePlayer piece={four} onPieceSelection={onPieceSelection} />
        </View>
      </View>
    </View>
  );
};

export default PlayerBox;

const SinglePlayer = (props: SinglePlayerProps) => {
  const { piece, onPieceSelection } = props;
  const { color, position } = piece;

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => onPieceSelection(piece)}
    >
      <View
        style={[
          styles.pieceStyle,
          { backgroundColor: position === "HOME" ? color : COLORS.white },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  player: {
    flex: 3,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 20,
  },
  piecesContainer: {
    flex: 1,
    flexDirection: "row",
  },
  pieceStyle: {
    flex: 1,
    margin: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.black,
  },
});
