import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { COLORS } from "../assets";
import { PieceProps, PlayerProps, PlayerState } from "../utils/interfaces";
import { PLAYER } from "../utils";

interface CellBoxProps {
  position: string;
  bgColor: string;
  onPieceSelection: (selectedPiece: PieceProps) => void;
  state: PlayerState;
  turn: string;
  moves: number[];
  isWaitingForDiceRoll: boolean;
}

const CellBox = ({
  bgColor,
  position,
  onPieceSelection,
  state,
  turn,
  moves,
  isWaitingForDiceRoll,
}: CellBoxProps) => {
  const { RED, YELLOW, GREEN, BLUE } = PLAYER;
  const { red, yellow, green, blue } = state;

  const [highlightColor, setHighlightColor] = useState(bgColor);
  const [isAnimating, setIsAnimating] = useState(false);

  let shouldRenderBackgroundColor = 1;
  const applyAnimationIfNeeded = () => {
    let intervalId;
    if (shouldAnimateForSelection()) {
      if (!isAnimating) {
        setIsAnimating(true);
        let color = bgColor === COLORS.white ? COLORS.grey : COLORS.white;
        intervalId = setInterval(() => {
          shouldRenderBackgroundColor++;
          shouldRenderBackgroundColor % 2 == 0
            ? setHighlightColor(highlightColor)
            : setHighlightColor(color);
        }, 400);
      }
    } else {
      clearInterval(intervalId);
      if (isAnimating) {
        setIsAnimating(false);
        setHighlightColor(highlightColor);
      }
    }
  };

  const shouldAnimateForSelection = () => {
    const playerToCheckFor: PlayerProps | undefined = getPlayerToConsider();
    return (
      playerToCheckFor &&
      positionMatchesPlayerPosition(playerToCheckFor) &&
      isMovePossibleFromCurrentPosition()
    );
  };

  const positionMatchesPlayerPosition = (playerToCheckFor: PlayerProps) => {
    const { one, two, three, four } = playerToCheckFor.pieces;
    return (
      one.position === position ||
      two.position === position ||
      three.position === position ||
      four.position === position
    );
  };

  const shouldRenderPiece = () => {
    return (
      red.pieces.one.position === position ||
      red.pieces.two.position === position ||
      red.pieces.three.position === position ||
      red.pieces.four.position === position ||
      yellow.pieces.one.position === position ||
      yellow.pieces.two.position === position ||
      yellow.pieces.three.position === position ||
      yellow.pieces.four.position === position ||
      green.pieces.one.position === position ||
      green.pieces.two.position === position ||
      green.pieces.three.position === position ||
      green.pieces.four.position === position ||
      blue.pieces.one.position === position ||
      blue.pieces.two.position === position ||
      blue.pieces.three.position === position ||
      blue.pieces.four.position === position
    );
  };

  const getPieceColor = () => {
    let matched: PieceProps[] = [];

    red.pieces.one.position == position
      ? matched.push(red.pieces.one)
      : undefined;
    red.pieces.two.position == position
      ? matched.push(red.pieces.two)
      : undefined;
    red.pieces.three.position == position
      ? matched.push(red.pieces.three)
      : undefined;
    red.pieces.four.position == position
      ? matched.push(red.pieces.four)
      : undefined;

    yellow.pieces.one.position == position
      ? matched.push(yellow.pieces.one)
      : undefined;
    yellow.pieces.two.position == position
      ? matched.push(yellow.pieces.two)
      : undefined;
    yellow.pieces.three.position == position
      ? matched.push(yellow.pieces.three)
      : undefined;
    yellow.pieces.four.position == position
      ? matched.push(yellow.pieces.four)
      : undefined;

    green.pieces.one.position == position
      ? matched.push(green.pieces.one)
      : undefined;
    green.pieces.two.position == position
      ? matched.push(green.pieces.two)
      : undefined;
    green.pieces.three.position == position
      ? matched.push(green.pieces.three)
      : undefined;
    green.pieces.four.position == position
      ? matched.push(green.pieces.four)
      : undefined;

    blue.pieces.one.position == position
      ? matched.push(blue.pieces.one)
      : undefined;
    blue.pieces.two.position == position
      ? matched.push(blue.pieces.two)
      : undefined;
    blue.pieces.three.position == position
      ? matched.push(blue.pieces.three)
      : undefined;
    blue.pieces.four.position == position
      ? matched.push(blue.pieces.four)
      : undefined;

    let colorToReturn = COLORS.white;
    let timeUpdated = 0;

    matched.filter((matchedPiece: PieceProps) => {
      if (matchedPiece.updateTime > timeUpdated) {
        timeUpdated = matchedPiece.updateTime;

        colorToReturn =
          matchedPiece.color === red.color
            ? red.color
            : matchedPiece.color === yellow.color
            ? yellow.color
            : matchedPiece.color === green.color
            ? green.color
            : matchedPiece.color === blue.color
            ? blue.color
            : COLORS.white;
      }
    });
    return colorToReturn;
  };

  const getPlayerToConsider = (): PlayerProps | undefined => {
    switch (turn) {
      case RED:
        return red;
      case YELLOW:
        return yellow;
      case GREEN:
        return green;
      case BLUE:
        return blue;
      default:
        return undefined;
    }
  };

  const getPiece = () => {
    const playerToCheckFor: PlayerProps | undefined = getPlayerToConsider();

    if (playerToCheckFor) {
      const { one, two, three, four } = playerToCheckFor.pieces;
      switch (position) {
        case one.position:
          return one;
        case two.position:
          return two;
        case three.position:
          return three;
        case four.position:
          return four;
        default:
          return undefined;
      }
    }
  };

  const isMovePossibleFromCurrentPosition = (): boolean => {
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
            ? 14
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

  applyAnimationIfNeeded();
  const bgColorToConsider = isWaitingForDiceRoll ? bgColor : highlightColor;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColorToConsider }]}
      onPress={() => {
        if (isMovePossibleFromCurrentPosition()) {
          let piece = getPiece();
          if (piece) {
            onPieceSelection(piece);
          }
        }
      }}
    >
      {/* View to render Cell box on the board when the position matches the piece's position */}
      {shouldRenderPiece() ? (
        <View style={[styles.piece, { backgroundColor: getPieceColor() }]} />
      ) : null}
    </TouchableOpacity>
  );
};

export default CellBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  piece: {
    width: 15,
    height: 15,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 5,
  },
});
