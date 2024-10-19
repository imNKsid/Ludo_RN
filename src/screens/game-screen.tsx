import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PLAYER, PLAYER_COUNT, POSITION, WindowDimensions } from "../utils";
import {
  HorizontalCellsContainer,
  PlayerBox,
  VerticalCellsContainer,
} from "../components";
import { COLORS, IMAGES } from "../assets";

interface GameProps {
  redName: string;
  yellowName: string;
  greenName: string;
  blueName: string;
}

const Game = (props: GameProps) => {
  const { redName, yellowName, greenName, blueName } = props;

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
  const [isLoading, setIsLoading] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [diceNum, setDiceNum] = useState(2);
  const [turn, setTurn] = useState("");

  const getUserTurn = () => {
    if (redName !== "") {
      return RED;
    }
    if (yellowName !== "") {
      return YELLOW;
    }
    if (greenName !== "") {
      return GREEN;
    }
    if (blueName !== "") {
      return BLUE;
    }
    return "";
  };

  useEffect(() => {
    const redPlayer = initPlayer(RED, redPlayerColor);
    setRed(redPlayer);
    const yellowPlayer = initPlayer(YELLOW, yellowPlayerColor);
    setYellow(yellowPlayer);
    const greenPlayer = initPlayer(GREEN, greenPlayerColor);
    setGreen(greenPlayer);
    const bluePlayer = initPlayer(BLUE, bluePlayerColor);
    setBlue(bluePlayer);

    const userTurn = getUserTurn();
    setTurn(userTurn);

    setIsLoading(false);
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

  if (isLoading) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  return (
    <ImageBackground source={IMAGES.home} style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.twoPlayersContainer}>
          <RenderPlayer player={red} customStyle={styles.redBox} />
          <VerticalCellsContainer position={TOP_VERTICAL} />
          <RenderPlayer player={yellow} customStyle={styles.yellowBox} />
        </View>
        <HorizontalCellsContainer
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          diceNum={diceNum}
          setDiceNum={setDiceNum}
          turn={turn}
          setTurn={setTurn}
        />
        <View style={styles.twoPlayersContainer}>
          <RenderPlayer player={green} customStyle={styles.greenBox} />
          <VerticalCellsContainer position={BOTTOM_VERTICAL} />
          <RenderPlayer player={blue} customStyle={styles.blueBox} />
        </View>
      </View>
    </ImageBackground>
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
  redBox: { borderTopLeftRadius: 20 },
  yellowBox: { borderTopRightRadius: 20 },
  greenBox: { borderBottomLeftRadius: 20 },
  blueBox: { borderBottomRightRadius: 20 },
});
