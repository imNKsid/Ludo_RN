import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BLUE_CELLS,
  GREEN_CELLS,
  PieceProps,
  PLAYER,
  PLAYER_COUNT,
  PlayerProps,
  POSITION,
  RED_CELLS,
  WindowDimensions,
  YELLOW_CELLS,
} from "../utils";
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
  const { HOME, TOP_VERTICAL, BOTTOM_VERTICAL, FINISHED } = POSITION;

  const { R1, R9 } = RED_CELLS;
  const { Y1, Y9 } = YELLOW_CELLS;
  const { G1, G9 } = GREEN_CELLS;
  const { B1, B9 } = BLUE_CELLS;

  const {
    redPlayerColor,
    yellowPlayerColor,
    greenPlayerColor,
    bluePlayerColor,
  } = COLORS;

  const [red, setRed] = useState<PlayerProps | {}>({});
  const [yellow, setYellow] = useState<PlayerProps | {}>({});
  const [green, setGreen] = useState<PlayerProps | {}>({});
  const [blue, setBlue] = useState<PlayerProps | {}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [diceNum, setDiceNum] = useState(2);
  const [bonusCount, setBonusCount] = useState(0);
  const [turn, setTurn] = useState("");
  const [moves, setMoves] = useState<number[]>([]);
  const [animateForSelection, setAnimateForSelection] = useState(false);

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
    const time = new Date().getTime();

    return {
      one: { position: HOME, name: ONE, color: playerColor, updateTime: time },
      two: { position: HOME, name: TWO, color: playerColor, updateTime: time },
      three: {
        position: HOME,
        name: THREE,
        color: playerColor,
        updateTime: time,
      },
      four: {
        position: HOME,
        name: FOUR,
        color: playerColor,
        updateTime: time,
      },
    };
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  const handleDiceRoll = () => {
    console.log("Dice Pressed");
    setIsRolling(true);
    setDiceNum(getRandomInt());
    setTimeout(() => {
      let turns: any = moves;
      turns.push(diceNum);
      setMoves(turns);

      if (diceNum === 6) {
        if (moves.length === 3) {
          setIsRolling(false);
          setMoves([]);
          setTurn(getNextTurn());
        } else {
          setIsRolling(false);
          setMoves(turns);
        }
      } else {
        setIsRolling(false);
        setMoves(turns);
        const player = { red, yellow, green, blue }[turn] as PlayerProps;
        updatePlayerPieces(player); // Here I've used an object map to retrieve current player's data.
        // "{ red, yellow, green, blue }[turn]" dynamically selects the player data based on the turn value.
      }
      setIsRolling(false);
    }, 100);
  };

  const isPlayerFinished = (player: any) => {
    const { one, two, three, four } = player.pieces;
    return (
      one.position === FINISHED &&
      two.position === FINISHED &&
      three.position === FINISHED &&
      four.position === FINISHED
    );
  };

  const getNextTurn = () => {
    const isYellowNext = yellowName !== "" && !isPlayerFinished(yellow);
    const isGreenNext = greenName !== "" && !isPlayerFinished(green);
    const isBlueNext = blueName !== "" && !isPlayerFinished(blue);
    const isRedNext = redName !== "" && !isPlayerFinished(red);

    if (bonusCount > 0) {
      setBonusCount(bonusCount - 1);
      if (isPlayerFinished({ red, yellow, green, blue }[turn])) {
        return turn;
      }
    }
    switch (turn) {
      case RED:
        return isYellowNext
          ? YELLOW
          : isGreenNext
          ? GREEN
          : isBlueNext
          ? BLUE
          : turn;

      case YELLOW:
        return isGreenNext ? GREEN : isBlueNext ? BLUE : isRedNext ? RED : "";

      case GREEN:
        return isBlueNext ? BLUE : isRedNext ? RED : isYellowNext ? YELLOW : "";

      case BLUE:
        return isRedNext
          ? RED
          : isYellowNext
          ? YELLOW
          : isGreenNext
          ? GREEN
          : "";

      default:
        return "";
    }
  };

  const playerHasOptionsForMoves = (player: PlayerProps) => {
    let countMoveOptions = getCountMoveOptions(player);
    return countMoveOptions > 1;
  };

  const getCountMoveOptions = (player: any) => {
    const { one, two, three, four } = player.pieces;
    let hasSix = moves.filter((move) => move === 6).length > 0;

    const isMovePossibleForPosition = (position: any) => {
      if (position === FINISHED) {
        return false;
      }
      if (position === HOME) {
        if (hasSix) {
          return true;
        }
        return false;
      }

      let isMovePossible = false;
      let positionToCheckFor = parseInt(position.substring(1, position.length));

      moves.forEach((move) => {
        if (!isMovePossible) {
          let possiblePosition =
            move === 1
              ? 18
              : move === 2
              ? 17
              : move === 3
              ? 16
              : move === 4
              ? 15
              : move === 5
              ? 16
              : undefined;

          if (possiblePosition) {
            isMovePossible = positionToCheckFor <= possiblePosition;
          } else if (move === 6 && positionToCheckFor < 14) {
            isMovePossible = true;
          }
        }
      });
      return isMovePossible;
    };

    let countOfOptions = 0;
    isMovePossibleForPosition(one.position) ? countOfOptions + 1 : undefined;
    isMovePossibleForPosition(two.position) ? countOfOptions + 1 : undefined;
    isMovePossibleForPosition(three.position) ? countOfOptions + 1 : undefined;
    isMovePossibleForPosition(four.position) ? countOfOptions + 1 : undefined;

    return countOfOptions;
  };

  const playerHasSinglePossibleMove = (player: PlayerProps) => {
    const countMoveOptions = getCountMoveOptions(player);
    return countMoveOptions === 1;
  };

  const playerHasSingleUnfinishedPiece = (player: any) => {
    const { one, two, three, four } = player.pieces;
    let countOfUnFinishedPieces = 0;

    one.position !== FINISHED ? countOfUnFinishedPieces++ : undefined;
    two.position !== FINISHED ? countOfUnFinishedPieces++ : undefined;
    three.position !== FINISHED ? countOfUnFinishedPieces++ : undefined;
    four.position !== FINISHED ? countOfUnFinishedPieces++ : undefined;

    return countOfUnFinishedPieces === 1;
  };

  const getSinglePossibleMove = (player: any) => {
    const { one, two, three, four } = player.pieces;
    let hasSix = moves.filter((move) => move === 6).length > 0;
    let possibleMove;

    const isMovePossibleForPosition = (position: any) => {
      if (position === FINISHED) {
        return false;
      }
      if (position === HOME) {
        if (hasSix) {
          return true;
        }
        return false;
      }

      let isMovePossible = false;
      let positionToCheckFor = parseInt(position.substring(1, position.length));

      moves.forEach((move) => {
        if (!isMovePossible) {
          let possiblePosition =
            move === 1
              ? 18
              : move === 2
              ? 17
              : move === 3
              ? 16
              : move === 4
              ? 15
              : move === 5
              ? 16
              : undefined;

          if (possiblePosition) {
            isMovePossible = positionToCheckFor <= possiblePosition;
            if (isMovePossible) {
              possibleMove = move;
            }
          } else if (move === 6 && positionToCheckFor < 14) {
            isMovePossible = true;
            possibleMove = moves;
          }
        }
      });
      return isMovePossible;
    };

    if (isMovePossibleForPosition(one.position)) {
      return {
        move: possibleMove,
        piece: one,
      };
    }
    if (isMovePossibleForPosition(two.position)) {
      return {
        move: possibleMove,
        piece: two,
      };
    }
    if (isMovePossibleForPosition(three.position)) {
      return {
        move: possibleMove,
        piece: three,
      };
    }
    if (isMovePossibleForPosition(four.position)) {
      return {
        move: possibleMove,
        piece: four,
      };
    }
    return undefined;
  };

  const getPieceWithPossibleMove = (player: any) => {
    const { one, two, three, four } = player.pieces;
    let hasSix = moves.filter((move) => move === 6).length > 0;

    const isMovePossibleForPosition = (position: any) => {
      if (position === FINISHED) {
        return false;
      }
      if (position === HOME) {
        if (hasSix) {
          return true;
        }
        return false;
      }

      let isMovePossible = false;
      let positionToCheckFor = parseInt(position.substring(1, position.length));

      moves.forEach((move) => {
        if (!isMovePossible) {
          let possiblePosition =
            move === 1
              ? 18
              : move === 2
              ? 17
              : move === 3
              ? 16
              : move === 4
              ? 15
              : move === 5
              ? 16
              : undefined;

          if (possiblePosition) {
            isMovePossible = positionToCheckFor <= possiblePosition;
          } else if (move === 6 && positionToCheckFor < 14) {
            isMovePossible = true;
          }
        }
      });
      return isMovePossible;
    };

    if (isMovePossibleForPosition(one.position)) {
      return one;
    }
    if (isMovePossibleForPosition(two.position)) {
      return two;
    }
    if (isMovePossibleForPosition(three.position)) {
      return three;
    }
    if (isMovePossibleForPosition(four.position)) {
      return four;
    }
    return undefined;
  };

  // Function for moving the pieces in the board
  const movePieceByPosition = (piece: PieceProps, move: number) => {
    let newPosition = "";
    let position = parseInt(piece.position.substring(1, piece.position.length));
    let cellAreaIndicator = piece.position.substring(0, 1);

    if (piece.position === HOME && move === 6) {
      newPosition =
        piece.color === RED
          ? R1
          : piece.color === YELLOW
          ? Y1
          : piece.color === GREEN
          ? G1
          : piece.color === BLUE
          ? B1
          : "";
    } else if (position <= 13) {
      if (
        (cellAreaIndicator === "B" && piece.color === RED) ||
        (cellAreaIndicator === "R" && piece.color === YELLOW) ||
        (cellAreaIndicator === "Y" && piece.color === GREEN) ||
        (cellAreaIndicator === "G" && piece.color === BLUE)
      ) {
        if (position + move <= 12) {
          newPosition = cellAreaIndicator + position + move;
        } else {
          let updatedPosition = position + move + 1;
          if (updatedPosition === 19) {
            newPosition = FINISHED;
          } else {
            let updatedCellAreaIndicator =
              cellAreaIndicator === "R"
                ? "Y"
                : cellAreaIndicator === "Y"
                ? "G"
                : cellAreaIndicator === "G"
                ? "B"
                : cellAreaIndicator === "B"
                ? "R"
                : "";

            newPosition = updatedCellAreaIndicator + updatedPosition;
          }
        }
      } else {
        if (position + move <= 13) {
          newPosition = cellAreaIndicator + position + move;
        } else {
          let nextPosition = position + move - 13;
          let updatedCellAreaIndicator =
            cellAreaIndicator === "R"
              ? "Y"
              : cellAreaIndicator === "Y"
              ? "G"
              : cellAreaIndicator === "G"
              ? "B"
              : cellAreaIndicator === "B"
              ? "R"
              : "";

          newPosition = updatedCellAreaIndicator + nextPosition;
        }
      }
    } else {
      if (position + move <= 19) {
        if (position + move === 19) {
          newPosition = FINISHED;
        } else {
          newPosition = cellAreaIndicator + position + move;
        }
      }
    }
    if (newPosition !== "") {
      piece.position = newPosition;
      piece.updateTime = new Date().getTime();
    }
    const player = { red, yellow, green, blue }[turn] as PlayerProps;

    if (player && !isPlayerFinished(player)) {
      if (didGetBonusWithNewPosition(piece)) {
        const count = bonusCount + 1;
        setBonusCount(count);
        if (moves.length === 1) {
          updatePlayerPieces(player);
        } else if (moves.length === 0 || isPlayerFinished(player)) {
          setAnimateForSelection(false);
          setMoves([]);
          setTurn(getNextTurn());
        }
      } else {
        if (moves.length === 1) {
          updatePlayerPieces(player);
        } else if (moves.length === 0 || isPlayerFinished(player)) {
          setAnimateForSelection(false);
          setMoves([]);
          setTurn(getNextTurn());
        }
      }
    }
  };

  const didGetBonusWithNewPosition = (piece: PieceProps) => {
    if (piece.position === FINISHED) {
      return true;
    }

    if (
      piece.position === R1 ||
      piece.position === R9 ||
      piece.position === Y1 ||
      piece.position === Y9 ||
      piece.position === G1 ||
      piece.position === G9 ||
      piece.position === B1 ||
      piece.position === B9
    ) {
      return false;
    }

    const checkIfPositionMatchesExistingPiece = (
      piece: PieceProps,
      player: PlayerProps
    ) => {
      const { one, two, three, four } = player.pieces;
      let positionMatched = false;

      if (piece.position === one.position) {
        one.position = HOME;
        positionMatched = true;
      }
      if (piece.position === two.position) {
        two.position = HOME;
        positionMatched = true;
      }
      if (piece.position === three.position) {
        three.position = HOME;
        positionMatched = true;
      }
      if (piece.position === four.position) {
        four.position = HOME;
        positionMatched = true;
      }
      return positionMatched;
    };

    if (
      checkIfPositionMatchesExistingPiece(piece, red as PlayerProps) &&
      piece.color !== (red as PlayerProps).player
    ) {
      return true;
    }
    if (
      checkIfPositionMatchesExistingPiece(piece, yellow as PlayerProps) &&
      piece.color !== (yellow as PlayerProps).player
    ) {
      return true;
    }
    if (
      checkIfPositionMatchesExistingPiece(piece, green as PlayerProps) &&
      piece.color !== (green as PlayerProps).player
    ) {
      return true;
    }
    if (
      checkIfPositionMatchesExistingPiece(piece, blue as PlayerProps) &&
      piece.color !== (blue as PlayerProps).player
    ) {
      return true;
    }
    return false;
  };

  const updatePlayerPieces = (player: PlayerProps) => {
    if (moves.length >= 1) {
      if (!isPlayerFinished(player)) {
        if (playerHasOptionsForMoves(player)) {
          setAnimateForSelection(true);
        } else if (playerHasSinglePossibleMove(player)) {
          if (playerHasSingleUnfinishedPiece(player)) {
            let singlePossibleMove = getSinglePossibleMove(player);
            if (singlePossibleMove?.move) {
              const indexOf = moves.indexOf(singlePossibleMove.move);
              if (indexOf >= 1) {
                moves.splice(indexOf, 1);
              }
              movePieceByPosition(
                singlePossibleMove.piece,
                singlePossibleMove.move
              );
            }
          } else {
            if (moves.length === 1) {
              let piece = getPieceWithPossibleMove(player);
              const move = moves.shift();
              if (move !== undefined) {
                movePieceByPosition(piece, move);
              }
            } else {
              setAnimateForSelection(true);
            }
          }
        } else {
          setTurn(getNextTurn());
          setMoves([]);
        }
      } else {
        setTurn(getNextTurn());
        setMoves([]);
      }
    } else {
      setTurn(getNextTurn());
    }
  };

  const RenderPlayer = (props: any) => {
    const { player, customStyle } = props;
    const { color, pieces } = player;
    const { one, two, three, four } = pieces;

    const opacity = turn === player.player ? 1 : 0.6;
    const customStyles = { ...customStyle, opacity };

    return (
      <PlayerBox
        colorName={color}
        one={one}
        two={two}
        three={three}
        four={four}
        customStyle={customStyles}
      />
    );
  };

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
          handleDiceRoll={handleDiceRoll}
        />
        <View style={styles.twoPlayersContainer}>
          <RenderPlayer player={blue} customStyle={styles.blueBox} />
          <VerticalCellsContainer position={BOTTOM_VERTICAL} />
          <RenderPlayer player={green} customStyle={styles.greenBox} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Game;

const getRandomInt = () => {
  const randomNum = Math.floor(Math.random() * Math.floor(6));
  return randomNum + 1;
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
    flexDirection: "row",
  },
  redBox: { borderTopLeftRadius: 18 },
  yellowBox: { borderTopRightRadius: 18 },
  blueBox: { borderBottomLeftRadius: 18 },
  greenBox: { borderBottomRightRadius: 18 },
});
