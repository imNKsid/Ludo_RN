import { COLORS } from "../assets";
import { PieceEntity } from "./PieceEntity";

export interface PlayerPiecesEntity {
  one: PieceEntity;
  two: PieceEntity;
  three: PieceEntity;
  four: PieceEntity;
}

export const defaultPlayerPiecesEntity: PlayerPiecesEntity = {
  one: {
    position: "HOME",
    name: "one",
    color: COLORS.redPlayerColor,
    updateTime: Date.now(),
  },
  two: {
    position: "HOME",
    name: "two",
    color: COLORS.redPlayerColor,
    updateTime: Date.now(),
  },
  three: {
    position: "HOME",
    name: "three",
    color: COLORS.redPlayerColor,
    updateTime: Date.now(),
  },
  four: {
    position: "HOME",
    name: "four",
    color: COLORS.redPlayerColor,
    updateTime: Date.now(),
  },
};
