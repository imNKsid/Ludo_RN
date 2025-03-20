import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BLUE_CELLS,
  GREEN_CELLS,
  PLAYER,
  PLAYER_COUNT,
  POSITION,
  RED_CELLS,
  WindowDimensions,
  YELLOW_CELLS,
} from "../utils";
import {
  HorizontalCellsContainer,
  VerticalCellsContainer,
} from "../components";
import { COLORS, IMAGES } from "../assets";
import PlayerContainer from "../components/player-container";
import { defaultPlayerState } from "../entities/PlayerStateEntity";
import { PlayerEntity } from "../entities/PlayerEntity";
import { PieceEntity } from "../entities/PieceEntity";

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

  const [red, setRed] = useState<PlayerEntity>(defaultPlayerState.red);
  const [yellow, setYellow] = useState<PlayerEntity>(defaultPlayerState.yellow);
  const [green, setGreen] = useState<PlayerEntity>(defaultPlayerState.green);
  const [blue, setBlue] = useState<PlayerEntity>(defaultPlayerState.blue);
  const [isLoading, setIsLoading] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [diceNum, setDiceNum] = useState(0);
  const [bonusCount, setBonusCount] = useState(0);
  const [turn, setTurn] = useState("");
  const [moves, setMoves] = useState<number[]>([]);
  const [shouldAnimateForSelection, setShouldAnimateForSelection] =
    useState(false);
  const [isWaitingForDiceRoll, setIsWaitingForDiceRoll] = useState(false);

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
      three: { position: HOME, name: THREE, color: playerColor, updateTime: time} /* prettier-ignore */,
      four: { position: HOME, name: FOUR, color: playerColor, updateTime: time} /* prettier-ignore */,
    };
  };

  const getUserTurn = () => {
    if (redName !== "") return RED;
    if (yellowName !== "") return YELLOW;
    if (greenName !== "") return GREEN;
    if (blueName !== "") return BLUE;
    return "";
  };

  const _handleDiceRoll = () => {
    console.log("Dice Pressed");
    if (shouldAnimateForSelection) return;

    setIsRolling(true);
    setDiceNum(getRandomInt());
    setTimeout(() => {
      let turns: number[] = moves;
      turns.push(diceNum);
      setMoves(turns);

      if (diceNum === 6) {
        if (moves.length === 3) {
          //When 3 consecutive sixes come, then set moves as blank & next user's turn will come
          setMoves([]);
          setTurn(getNextTurn());
        } else {
          setMoves(moves);
        }
      } else {
        setIsWaitingForDiceRoll(false);
        setMoves(moves);
        const player = { red, yellow, green, blue }[turn] as PlayerEntity;
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
    // setIsWaitingForDiceRoll(true);
    const isYellowNext = yellowName !== "" && !isPlayerFinished(yellow);
    const isGreenNext = greenName !== "" && !isPlayerFinished(green);
    const isBlueNext = blueName !== "" && !isPlayerFinished(blue);
    const isRedNext = redName !== "" && !isPlayerFinished(red);

    if (bonusCount > 0) {
      setBonusCount(bonusCount - 1);
      const player = { red, yellow, green, blue }[turn] as PlayerEntity;
      if (isPlayerFinished(player)) {
        return turn;
      }
    }
    switch (turn) {
      case RED:
        return isYellowNext ? YELLOW : isGreenNext ? GREEN : isBlueNext ? BLUE : ""; /* prettier-ignore */

      case YELLOW:
        return isGreenNext ? GREEN : isBlueNext ? BLUE : isRedNext ? RED : "";

      case GREEN:
        return isBlueNext ? BLUE : isRedNext ? RED : isYellowNext ? YELLOW : "";

      case BLUE:
        return isRedNext ? RED : isYellowNext ? YELLOW : isGreenNext ? GREEN : ""; /* prettier-ignore */

      default:
        return turn;
    }
  };

  const playerHasOptionsForMoves = (player: PlayerEntity) => {
    let countMoveOptions = getCountMoveOptions(player);
    return countMoveOptions > 1;
  };

  const playerHasSinglePossibleMove = (player: PlayerEntity) => {
    const countMoveOptions = getCountMoveOptions(player);
    return countMoveOptions === 1;
  };

  const getCountMoveOptions = (player: PlayerEntity) => {
    const { one, two, three, four } = player.pieces;
    let hasSix = moves.filter((move) => move === 6).length > 0;

    const isMovePossibleForPosition = (position: string) => {
      if (position === FINISHED) {
        return false;
      }
      if (position === HOME) {
        if (hasSix) return true;
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
    if (isMovePossibleForPosition(one.position)) countOfOptions++;
    if (isMovePossibleForPosition(two.position)) countOfOptions++;
    if (isMovePossibleForPosition(three.position)) countOfOptions++;
    if (isMovePossibleForPosition(four.position)) countOfOptions++;

    return countOfOptions;
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
      if (position === FINISHED) return false;

      if (position === HOME) {
        if (hasSix) return true;
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
      if (position === FINISHED) return false;

      if (position === HOME) {
        if (hasSix) return true;
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

    if (isMovePossibleForPosition(one.position)) return one;

    if (isMovePossibleForPosition(two.position)) return two;

    if (isMovePossibleForPosition(three.position)) return three;

    if (isMovePossibleForPosition(four.position)) return four;

    return undefined;
  };

  // Function for moving the pieces in the board
  const movePieceByPosition = (piece: PieceEntity, move: number) => {
    let newPosition = "";
    let position = parseInt(piece.position.substring(1, piece.position.length));
    let cellAreaIndicator = piece.position.substring(0, 1);

    if (piece.position === HOME && move === 6) {
      newPosition =
        piece.color === redPlayerColor
          ? R1
          : piece.color === yellowPlayerColor
          ? Y1
          : piece.color === greenPlayerColor
          ? G1
          : piece.color === bluePlayerColor
          ? B1
          : "";
    } else if (position <= 13) {
      if (
        (cellAreaIndicator === "B" && piece.color === redPlayerColor) ||
        (cellAreaIndicator === "R" && piece.color === yellowPlayerColor) ||
        (cellAreaIndicator === "Y" && piece.color === greenPlayerColor) ||
        (cellAreaIndicator === "G" && piece.color === bluePlayerColor)
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

    const player = { red, yellow, green, blue }[turn] as PlayerEntity;

    if (player && !isPlayerFinished(player)) {
      if (didGetBonusWithNewPosition(piece)) {
        const count = bonusCount + 1;
        setBonusCount(count);
        if (moves.length === 1) {
          updatePlayerPieces(player);
        } else if (moves.length === 0 || isPlayerFinished(player)) {
          setShouldAnimateForSelection(false);
          setMoves([]);
          setTurn(getNextTurn());
        }
      } else {
        if (moves.length === 1) {
          updatePlayerPieces(player);
        } else if (moves.length === 0 || isPlayerFinished(player)) {
          setShouldAnimateForSelection(false);
          setMoves([]);
          setTurn(getNextTurn());
        }
      }
    }
  };

  const didGetBonusWithNewPosition = (piece: PieceEntity) => {
    if (piece.position === FINISHED) return true;

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
      piece: PieceEntity,
      player: PlayerEntity
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
      piece.color !== (red as PlayerEntity).player &&
      checkIfPositionMatchesExistingPiece(piece, red as PlayerEntity)
    ) {
      return true;
    }
    if (
      piece.color !== (yellow as PlayerEntity).player &&
      checkIfPositionMatchesExistingPiece(piece, yellow as PlayerEntity)
    ) {
      return true;
    }
    if (
      piece.color !== (green as PlayerEntity).player &&
      checkIfPositionMatchesExistingPiece(piece, green as PlayerEntity)
    ) {
      return true;
    }
    if (
      piece.color !== (blue as PlayerEntity).player &&
      checkIfPositionMatchesExistingPiece(piece, blue as PlayerEntity)
    ) {
      return true;
    }
    return false;
  };

  const updatePlayerPieces = (player: PlayerEntity) => {
    if (moves.length >= 1) {
      if (!isPlayerFinished(player)) {
        if (playerHasOptionsForMoves(player)) {
          setShouldAnimateForSelection(true);
        } else if (playerHasSinglePossibleMove(player)) {
          if (playerHasSingleUnfinishedPiece(player)) {
            let singlePossibleMove = getSinglePossibleMove(player);
            if (singlePossibleMove?.move) {
              const indexOf = moves.indexOf(singlePossibleMove.move);
              if (indexOf > -1) {
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
              setShouldAnimateForSelection(true);
            }
          }
        } else {
          setTurn(getNextTurn());
          setMoves([]);
          setShouldAnimateForSelection(false);
        }
      } else {
        setTurn(getNextTurn());
        setMoves([]);
        setShouldAnimateForSelection(false);
      }
    } else {
      setTurn(getNextTurn());
      setMoves([]);
      setShouldAnimateForSelection(false);
    }
  };

  const isMovePossibleForPosition = (position: string, move: number) => {
    let isMovePossible = false;
    let positionToCheckFor = parseInt(position.substring(1, position.length));

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
    return isMovePossible;
  };

  const _handlePieceSelection = (selectedPiece: PieceEntity) => {
    console.log("GAME isWaitingForDiceRoll =>", isWaitingForDiceRoll);
    // If the game is waiting for the dice roll to complete, do nothing
    if (isWaitingForDiceRoll) {
      return;
    }

    // Get the current player's state based on whose turn it is
    const player = { red, yellow, green, blue }[turn] as PlayerEntity;
    const { one, two, three, four } = player.pieces;

    // If there is only one move available
    if (moves.length === 1) {
      // If the piece is at HOME and the move is not a 6, do nothing (can't leave HOME without rolling a 6)
      if (selectedPiece.position === HOME && moves[0] !== 6) {
        return;
      }

      let tempMoves = moves;
      const move = tempMoves.shift();
      if (move !== undefined) {
        tempMoves.push(move);
        setMoves(tempMoves);
        movePieceByPosition(selectedPiece, move); // Move the selected piece by the given move value
      }
    }
    // If there are multiple moves available
    else if (moves.length > 1) {
      // If the selected piece is at HOME, it must move to its starting position
      if (selectedPiece.position === HOME) {
        moves.shift();
        // Assign the piece to its starting position based on its color
        selectedPiece.position =
          selectedPiece.color === RED
            ? R1
            : selectedPiece.color === YELLOW
            ? Y1
            : selectedPiece.color === GREEN
            ? G1
            : selectedPiece.color === BLUE
            ? B1
            : "";
        selectedPiece.updateTime = new Date().getTime();

        if (moves.length === 1) {
          // If only one move is left, check if the player has other move options
          if (playerHasOptionsForMoves(player)) {
            const move = moves.shift();
            if (move !== undefined) {
              movePieceByPosition(selectedPiece, move);
            }
          } else {
            // If no move options are available, check if all active pieces are in the same positio
            const isActivePiece = (piece: PieceEntity) =>
              piece.position !== HOME && piece.position !== FINISHED;

            let activePieces = [];
            if (isActivePiece(one)) activePieces.push(one);
            if (isActivePiece(two)) activePieces.push(two);
            if (isActivePiece(three)) activePieces.push(three);
            if (isActivePiece(four)) activePieces.push(four);

            let isSamePositionForAllActivePieces = activePieces.every(
              (piece: PieceEntity) =>
                piece.position === activePieces[0].position
            );

            // If all active pieces are at the same position, move the selected piece
            if (isSamePositionForAllActivePieces) {
              const move = moves.shift();
              if (move !== undefined) {
                movePieceByPosition(selectedPiece, move);
              }
            }
          }
        }
      } else {
        // If the piece is not at HOME, prompt the user to select a move
        const onMoveSelected = (selectedMove: string) => {
          if (
            isMovePossibleForPosition(
              selectedPiece.position,
              parseInt(selectedMove)
            )
          ) {
            const index = moves.indexOf(parseInt(selectedMove));
            if (index > -1) {
              moves.splice(index, 1);
            }
            movePieceByPosition(selectedPiece, parseInt(selectedMove));
          } else {
            Alert.alert("Move not possible");
          }
        };

        // Generate move options for the user
        let moveOptions = [];
        let optionOne = moves[0].toString();
        moveOptions.push({
          text: optionOne,
          onPress: () => {
            onMoveSelected(optionOne);
          },
        });
        let optionTwo = moves.length > 1 ? moves[1].toString() : undefined;
        if (optionTwo) {
          moveOptions.push({
            text: optionTwo,
            onPress: () => {
              onMoveSelected(optionTwo);
            },
          });
        }
        let optionThree = moves.length > 2 ? moves[2].toString() : undefined;
        if (optionThree) {
          moveOptions.push({
            text: optionThree,
            onPress: () => {
              onMoveSelected(optionThree);
            },
          });
        }

        Alert.alert("Select Your Move", "", moveOptions, {
          cancelable: true,
        });
      }
    }
  };

  const getPlayerState = () => {
    const state = red?.pieces &&
      yellow?.pieces &&
      green?.pieces &&
      blue?.pieces && { red, yellow, green, blue };

    return state;
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  return (
    <ImageBackground source={IMAGES.home} style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.twoPlayersContainer}>
          {/* red player box */}
          <PlayerContainer
            playerData={red}
            customStyle={styles.redBox}
            turn={turn}
            moves={moves}
            animateForSelection={shouldAnimateForSelection}
            onPieceSelection={_handlePieceSelection}
          />
          <VerticalCellsContainer
            position={TOP_VERTICAL}
            state={getPlayerState()}
            turn={turn}
            moves={moves}
            isWaitingForDiceRoll={isWaitingForDiceRoll}
            onPieceSelection={_handlePieceSelection}
          />
          {/* yellow player box */}
          <PlayerContainer
            playerData={yellow}
            customStyle={styles.yellowBox}
            turn={turn}
            moves={moves}
            animateForSelection={shouldAnimateForSelection}
            onPieceSelection={_handlePieceSelection}
          />
        </View>
        <HorizontalCellsContainer
          isRolling={isRolling}
          diceNum={diceNum}
          turn={turn}
          state={getPlayerState()}
          moves={moves}
          isWaitingForDiceRoll={isWaitingForDiceRoll}
          onDiceRoll={_handleDiceRoll}
          onPieceSelection={_handlePieceSelection}
        />
        <View style={styles.twoPlayersContainer}>
          {/* blue player box */}
          <PlayerContainer
            playerData={blue}
            customStyle={styles.blueBox}
            turn={turn}
            moves={moves}
            animateForSelection={shouldAnimateForSelection}
            onPieceSelection={_handlePieceSelection}
          />
          <VerticalCellsContainer
            position={BOTTOM_VERTICAL}
            state={getPlayerState()}
            turn={turn}
            moves={moves}
            isWaitingForDiceRoll={isWaitingForDiceRoll}
            onPieceSelection={_handlePieceSelection}
          />
          {/* green player box */}
          <PlayerContainer
            playerData={green}
            customStyle={styles.greenBox}
            turn={turn}
            moves={moves}
            animateForSelection={shouldAnimateForSelection}
            onPieceSelection={_handlePieceSelection}
          />
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
