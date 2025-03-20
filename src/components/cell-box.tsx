import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { COLORS } from "../assets";
import { PLAYER } from "../utils";
import { PieceEntity } from "../entities/PieceEntity";
import { PlayerStateEntity } from "../entities/PlayerStateEntity";
import { PlayerEntity } from "../entities/PlayerEntity";

interface CellBoxProps {
  position: string;
  bgColor: string;
  onPieceSelection: (selectedPiece: PieceEntity) => void;
  state: PlayerStateEntity;
  turn: string;
  moves: number[];
  isWaitingForDiceRoll: boolean;
}

const CellBox = memo(
  ({
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
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();

    let shouldRenderBackgroundColor = 1;

    useEffect(() => {
      applyAnimationIfNeeded();
      return () => intervalId && clearInterval(intervalId);
    }, [state]);

    const shouldAnimateForSelection = () => {
      const playerToCheckFor: PlayerEntity | undefined = getPlayerToConsider();
      // console.log("CellBox playerToCheckFor =>", playerToCheckFor);
      // console.log('CellBox positionMatchesPlayerPosition =>', playerToCheckFor && positionMatchesPlayerPosition(playerToCheckFor)); /* prettier-ignore */
      // console.log('CellBox isMovePossibleFromCurrentPosition =>', isMovePossibleFromCurrentPosition()); /* prettier-ignore */
      return (
        playerToCheckFor &&
        positionMatchesPlayerPosition(playerToCheckFor) &&
        isMovePossibleFromCurrentPosition()
      );
    };

    const applyAnimationIfNeeded = useCallback(() => {
      // console.log('CellBox shouldAnimateForSelection =>', shouldAnimateForSelection()); /* prettier-ignore */
      if (shouldAnimateForSelection()) {
        if (!isAnimating) {
          setIsAnimating(true);
          const id = setInterval(() => {
            let color = bgColor === COLORS.white ? COLORS.grey : COLORS.white;
            shouldRenderBackgroundColor++;
            shouldRenderBackgroundColor % 2 == 0
              ? setHighlightColor(bgColor)
              : setHighlightColor(color);
          }, 400);
          setIntervalId(id);
        }
      } else {
        intervalId && clearInterval(intervalId);
        if (isAnimating) {
          setIsAnimating(false);
          setHighlightColor(bgColor);
        }
      }
    }, [shouldAnimateForSelection, isAnimating, intervalId, bgColor]);

    const positionMatchesPlayerPosition = (playerToCheckFor: PlayerEntity) => {
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
      let matchedPieces: PieceEntity[] = [];

      red.pieces.one.position == position
        ? matchedPieces.push(red.pieces.one)
        : undefined;
      red.pieces.two.position == position
        ? matchedPieces.push(red.pieces.two)
        : undefined;
      red.pieces.three.position == position
        ? matchedPieces.push(red.pieces.three)
        : undefined;
      red.pieces.four.position == position
        ? matchedPieces.push(red.pieces.four)
        : undefined;

      yellow.pieces.one.position == position
        ? matchedPieces.push(yellow.pieces.one)
        : undefined;
      yellow.pieces.two.position == position
        ? matchedPieces.push(yellow.pieces.two)
        : undefined;
      yellow.pieces.three.position == position
        ? matchedPieces.push(yellow.pieces.three)
        : undefined;
      yellow.pieces.four.position == position
        ? matchedPieces.push(yellow.pieces.four)
        : undefined;

      green.pieces.one.position == position
        ? matchedPieces.push(green.pieces.one)
        : undefined;
      green.pieces.two.position == position
        ? matchedPieces.push(green.pieces.two)
        : undefined;
      green.pieces.three.position == position
        ? matchedPieces.push(green.pieces.three)
        : undefined;
      green.pieces.four.position == position
        ? matchedPieces.push(green.pieces.four)
        : undefined;

      blue.pieces.one.position == position
        ? matchedPieces.push(blue.pieces.one)
        : undefined;
      blue.pieces.two.position == position
        ? matchedPieces.push(blue.pieces.two)
        : undefined;
      blue.pieces.three.position == position
        ? matchedPieces.push(blue.pieces.three)
        : undefined;
      blue.pieces.four.position == position
        ? matchedPieces.push(blue.pieces.four)
        : undefined;

      let colorToReturn = COLORS.white;
      let timeUpdated = 0;

      matchedPieces.filter((pieceMatched: PieceEntity) => {
        if (pieceMatched.updateTime > timeUpdated) {
          timeUpdated = pieceMatched.updateTime;

          colorToReturn =
            pieceMatched.color === red.color
              ? red.color
              : pieceMatched.color === yellow.color
              ? yellow.color
              : pieceMatched.color === green.color
              ? green.color
              : pieceMatched.color === blue.color
              ? blue.color
              : COLORS.white;
        }
      });
      return colorToReturn;
    };

    const getPlayerToConsider = (): PlayerEntity | undefined => {
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

    const getPiece = useCallback(() => {
      const playerToCheckFor: PlayerEntity | undefined = getPlayerToConsider();

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
    }, [getPlayerToConsider, position]);

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
        {/* <>{console.log("shouldRenderPiece =>", shouldRenderPiece())}</> */}
        {/* View to render Cell box on the board when the position matches the piece's position */}
        {shouldRenderPiece() ? (
          <View style={[styles.piece, { backgroundColor: getPieceColor() }]} />
        ) : null}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.position === nextProps.position &&
      prevProps.bgColor === nextProps.bgColor &&
      prevProps.turn === nextProps.turn &&
      prevProps.isWaitingForDiceRoll === nextProps.isWaitingForDiceRoll &&
      prevProps.moves.length === nextProps.moves.length &&
      JSON.stringify(prevProps.state) === JSON.stringify(nextProps.state)
    );
  }
);

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
