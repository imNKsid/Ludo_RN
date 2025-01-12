import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
  animateForSelection: boolean;
  onPieceSelection: (piece: any) => void;
}

const PlayerBox = (props: PlayerBoxProps) => {
  const {
    colorName,
    one,
    two,
    three,
    four,
    customStyle,
    animateForSelection,
    onPieceSelection,
  } = props;

  const [bgColor, setBgColor] = useState(colorName);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [intervalId,setIntervalId] = useState(undefined);

  let shouldRenderBackgroundColor = 1;

  const applyAnimationIfNeeded = () => {
    let intervalId;
    if (animateForSelection) {
      if (!isAnimating) {
        setIsAnimating(true);
        intervalId = setInterval(() => {
          shouldRenderBackgroundColor++;
          shouldRenderBackgroundColor % 2 == 0
            ? setBgColor(colorName)
            : setBgColor(COLORS.white);
        }, 400);
      }
    } else {
      clearInterval(intervalId);
      if (isAnimating) {
        setIsAnimating(false);
        setBgColor(colorName);
      }
    }
  };

  applyAnimationIfNeeded();

  return (
    <View style={[styles.player, customStyle, { backgroundColor: bgColor }]}>
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
      disabled={position === "HOME" ? false : true}
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
