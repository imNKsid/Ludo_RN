import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";

interface PlayerProps {
  color: string;
  name: string;
  position: string;
}

interface PlayerBoxProps {
  colorName: string;
  one: PlayerProps;
  two: PlayerProps;
  three: PlayerProps;
  four: PlayerProps;
  customStyle?: any;
}

const PlayerBox = (props: PlayerBoxProps) => {
  const { colorName, one, two, three, four, customStyle } = props;

  return (
    <View style={[styles.player, customStyle, { backgroundColor: colorName }]}>
      <View style={styles.innerContainer}>
        <View style={styles.piecesContainer}>
          <Player piece={one} />
          <Player piece={two} />
        </View>
        <View style={styles.piecesContainer}>
          <Player piece={three} />
          <Player piece={four} />
        </View>
      </View>
    </View>
  );
};

export default PlayerBox;

const Player = ({ piece }: { piece: PlayerProps }) => {
  const { color, position } = piece;

  return (
    <TouchableOpacity style={{ flex: 1 }}>
      <View
        style={[
          styles.pieceStyle,
          { backgroundColor: position === "home" ? color : COLORS.white },
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
