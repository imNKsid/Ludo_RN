import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PLAYER, PLAYER_COUNT, POSITION, WindowDimensions } from "../utils";
import { PlayerBox, VerticalCellsContainer } from "../components";
import { COLORS } from "../assets";

const Game = () => {
  const { RED, YELLOW, GREEN, BLUE } = PLAYER;
  const { ONE, TWO, THREE, FOUR } = PLAYER_COUNT;
  const { HOME, TOP_VERTICAL, BOTTOM_VERTICAL } = POSITION;

  const {
    redPlayerColor,
    yellowPlayerColor,
    greenPlayerColor,
    bluePlayerColor,
  } = COLORS;

  const [red, setRed] = useState({});
  const [yellow, setYellow] = useState({});
  const [green, setGreen] = useState({});
  const [blue, setBlue] = useState({});

  useEffect(() => {
    const redPlayer = initPlayer(RED, redPlayerColor);
    setRed(redPlayer);
    const yellowPlayer = initPlayer(YELLOW, yellowPlayerColor);
    setYellow(yellowPlayer);
    const greenPlayer = initPlayer(GREEN, greenPlayerColor);
    setGreen(greenPlayer);
    const bluePlayer = initPlayer(BLUE, bluePlayerColor);
    setBlue(bluePlayer);
  }, []);

  const initPlayer = (playerType: string, color: string) => {
    return {
      pieces: initPieces(color),
      color,
      player: playerType,
    };
  };

  const initPieces = (playerColor: string) => {
    return {
      one: { position: HOME, name: ONE, color: playerColor },
      two: { position: HOME, name: TWO, color: playerColor },
      three: { position: HOME, name: THREE, color: playerColor },
      four: { position: HOME, name: FOUR, color: playerColor },
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.twoPlayersContainer}>
          <RenderPlayer player={red} customStyle={styles.redBox} />
          <VerticalCellsContainer position={TOP_VERTICAL} />
          <RenderPlayer player={yellow} customStyle={styles.yellowBox} />
        </View>
        <View style={styles.horizontalCellsContainer} />
        <View style={styles.twoPlayersContainer}>
          <RenderPlayer player={green} customStyle={styles.greenBox} />
          <VerticalCellsContainer position={BOTTOM_VERTICAL} />
          <RenderPlayer player={blue} customStyle={styles.blueBox} />
        </View>
      </View>
    </View>
  );
};

export default Game;

const RenderPlayer = (props: any) => {
  const { player, customStyle } = props;
  const { color, pieces } = player;
  const { one, two, three, four } = pieces;

  return (
    <PlayerBox
      colorName={color}
      one={one}
      two={two}
      three={three}
      four={four}
      customStyle={customStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    width: WindowDimensions.WIDTH,
    height: WindowDimensions.WIDTH,
  },
  twoPlayersContainer: {
    flex: 3,
    // backgroundColor: "#DDD",
    flexDirection: "row",
  },
  horizontalCellsContainer: {
    flex: 2,
    backgroundColor: COLORS.white,
  },
  redBox: { borderTopLeftRadius: 20 },
  yellowBox: { borderTopRightRadius: 20 },
  greenBox: { borderBottomLeftRadius: 20 },
  blueBox: { borderBottomRightRadius: 20 },
});
