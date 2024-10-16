import { Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export const WindowDimensions = {
  HEIGHT: height,
  WIDTH: width,
};

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
