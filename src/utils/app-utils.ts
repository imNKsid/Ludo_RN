import { COLORS } from "../assets";
import {
  BLUE_CELLS,
  GREEN_CELLS,
  RED_CELLS,
  YELLOW_CELLS,
} from "./app-constants";

export const getCellBgColor = (position: string) => {
  const { R1, R9, R14, R15, R16, R17, R18 } = RED_CELLS;
  const { Y1, Y9, Y14, Y15, Y16, Y17, Y18 } = YELLOW_CELLS;
  const { G1, G9, G14, G15, G16, G17, G18 } = GREEN_CELLS;
  const { B1, B9, B14, B15, B16, B17, B18 } = BLUE_CELLS;

  switch (position) {
    case R1:
    case R9:
    case R14:
    case R15:
    case R16:
    case R17:
    case R18:
      return COLORS.redPlayerColor;
    case Y1:
    case Y9:
    case Y14:
    case Y15:
    case Y16:
    case Y17:
    case Y18:
      return COLORS.yellowPlayerColor;
    case G1:
    case G9:
    case G14:
    case G15:
    case G16:
    case G17:
    case G18:
      return COLORS.greenPlayerColor;
    case B1:
    case B9:
    case B14:
    case B15:
    case B16:
    case B17:
    case B18:
      return COLORS.bluePlayerColor;
    default:
      return COLORS.white;
  }
};
