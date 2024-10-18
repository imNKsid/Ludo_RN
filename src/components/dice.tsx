import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../assets";

const Dice = () => {
  const RenderSurfaceOne = () => {
    return (
      <>
        <View style={styles.diceDot} />
      </>
    );
  };

  const RenderSurfaceTwo = () => {
    return (
      <View>
        <RenderSurfaceOne />
        <RenderSurfaceOne />
      </View>
    );
  };

  const RenderSurfaceThree = () => {
    return (
      <View>
        <RenderSurfaceTwo />
        <RenderSurfaceOne />
      </View>
    );
  };

  const RenderSurfaceFour = () => {
    return (
      <View style={styles.diceFour}>
        <RenderSurfaceTwo />
        <RenderSurfaceTwo />
      </View>
    );
  };

  const RenderSurfaceFive = () => {
    return (
      <View style={styles.diceFour}>
        <RenderSurfaceTwo />
        <RenderSurfaceOne />
        <RenderSurfaceTwo />
      </View>
    );
  };

  const RenderSurfaceSix = () => {
    return (
      <View style={styles.diceFour}>
        <RenderSurfaceThree />
        <RenderSurfaceThree />
      </View>
    );
  };

  const RenderDiceSurface = ({ face }: { face: number }) => {
    switch (face) {
      case 1:
        return <RenderSurfaceOne />;

      case 2:
        return <RenderSurfaceTwo />;

      case 3:
        return <RenderSurfaceThree />;

      case 4:
        return <RenderSurfaceFour />;

      case 5:
        return <RenderSurfaceFive />;

      case 6:
        return <RenderSurfaceSix />;
    }
  };

  return (
    <View>
      <Text style={styles.txtStyle}>Roll Dice</Text>
      <View style={styles.diceContainer}>
        <RenderDiceSurface face={6} />
      </View>
    </View>
  );
};

export default Dice;

const styles = StyleSheet.create({
  txtStyle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 5,
  },
  diceContainer: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 35,
    width: 50,
    height: 50,
    backgroundColor: COLORS.redPlayerColor,
    borderRadius: 5,
  },
  diceDot: {
    backgroundColor: COLORS.white,
    alignSelf: "center",
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 2,
  },
  diceFour: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
