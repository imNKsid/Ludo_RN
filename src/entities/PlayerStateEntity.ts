import { COLORS } from "../assets";
import { PLAYER } from "../utils/app-constants";
import { defaultPlayerEntity, PlayerEntity } from "./PlayerEntity";

export interface PlayerStateEntity {
  red: PlayerEntity;
  yellow: PlayerEntity;
  green: PlayerEntity;
  blue: PlayerEntity;
}

export const defaultPlayerState: PlayerStateEntity = {
  red: defaultPlayerEntity,
  yellow: {
    ...defaultPlayerEntity,
    color: COLORS.yellowPlayerColor,
    player: PLAYER.YELLOW,
  },
  green: {
    ...defaultPlayerEntity,
    color: COLORS.greenPlayerColor,
    player: PLAYER.GREEN,
  },
  blue: {
    ...defaultPlayerEntity,
    color: COLORS.bluePlayerColor,
    player: PLAYER.BLUE,
  },
};
