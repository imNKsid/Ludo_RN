import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, IMAGES } from "../assets";
import { CustomButton, NewGameModal } from "../components";

interface HomeProps {
  showStartGameModal: boolean;
  onNewGameBtnPress: () => void;
  onCancel: () => void;
  onStartGameBtnPress: () => void;
  playerRed: any;
  playerYellow: any;
  playerGreen: any;
  playerBlue: any;
  onRedInput: (txt: any) => void;
  onYellowInput: (txt: any) => void;
  onGreenInput: (txt: any) => void;
  onBlueInput: (txt: any) => void;
}

const Home = (props: HomeProps) => {
  const {
    showStartGameModal,
    onNewGameBtnPress,
    onCancel,
    onStartGameBtnPress,
    playerRed,
    playerYellow,
    playerGreen,
    playerBlue,
    onRedInput,
    onYellowInput,
    onGreenInput,
    onBlueInput,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.logoStyle}>Ludo Classic</Text>
      <CustomButton title={"New Game"} onPress={onNewGameBtnPress} />
      <Image source={IMAGES.board} style={styles.ludoBoard} />
      <NewGameModal
        isVisible={showStartGameModal}
        onClose={onCancel}
        onStartGamePress={onStartGameBtnPress}
        redPlayer={playerRed}
        yellowPlayer={playerYellow}
        greenPlayer={playerGreen}
        bluePlayer={playerBlue}
        onRedInput={onRedInput}
        onYellowInput={onYellowInput}
        onGreenInput={onGreenInput}
        onBlueInput={onBlueInput}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  logoStyle: {
    color: COLORS.redPlayerColor,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 100,
    fontWeight: "bold",
  },
  ludoBoard: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
