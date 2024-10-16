import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface PlayerProps {
  color: string;
  name: string;
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
      <View style={styles.innerContainer}></View>
    </View>
  );
};

export default PlayerBox;

const styles = StyleSheet.create({
  player: {
    flex: 3,
  },
  innerContainer: {},
});
