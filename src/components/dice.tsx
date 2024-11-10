import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../assets";
import { PLAYER } from "../utils";

interface DiceProps {
  isRolling: boolean;
  setIsRolling: (val: boolean) => void;
  diceNum: number;
  setDiceNum: (val: number) => void;
  turn: string;
  setTurn: (val: string) => void;
  onDiceRoll: () => void;
}

const Dice = (props: DiceProps) => {
  const {
    isRolling,
    setIsRolling,
    diceNum,
    setDiceNum,
    turn,
    setTurn,
    onDiceRoll,
  } = props;

  const { RED, YELLOW, GREEN, BLUE } = PLAYER;
  const {
    redPlayerColor,
    yellowPlayerColor,
    greenPlayerColor,
    bluePlayerColor,
  } = COLORS;

  //   let isRolling = false;
  //   let turn = RED;

  const getColor = () => {
    switch (turn) {
      case RED:
        return redPlayerColor;

      case YELLOW:
        return yellowPlayerColor;

      case GREEN:
        return greenPlayerColor;

      case BLUE:
        return bluePlayerColor;

      default:
        return redPlayerColor;
    }
  };

  return (
    <View style={styles.diceContainer}>
      <Text style={styles.txtStyle}>Roll Dice</Text>
      {isRolling ? (
        <View style={styles.rolling}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onDiceRoll}
          style={[styles.dice, { backgroundColor: getColor() }]}
        >
          <RenderDiceSurface face={diceNum} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Dice;

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

const styles = StyleSheet.create({
  txtStyle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 5,
  },
  diceContainer: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 5,
  },
  dice: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    width: 50,
    height: 50,
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
  rolling: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 40,
  },
});
