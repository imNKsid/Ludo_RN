import { COLORS } from "../assets";
import { PLAYER } from "../utils/app-constants";
import {
  defaultPlayerPiecesEntity,
  PlayerPiecesEntity,
} from "./PlayerPiecesEntity";

export interface PlayerEntity {
  pieces: PlayerPiecesEntity;
  color: string;
  player: string;
}

export const defaultPlayerEntity: PlayerEntity = {
  pieces: defaultPlayerPiecesEntity,
  color: COLORS.redPlayerColor,
  player: PLAYER.RED,
};
