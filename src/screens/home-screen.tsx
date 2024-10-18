import { Image, ImageBackground, StyleSheet, Text } from "react-native";
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
    <ImageBackground source={IMAGES.home} style={styles.container}>
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
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    color: COLORS.redPlayerColor,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 100,
    fontWeight: "bold",
  },
  ludoBoard: {
    marginTop: 150,
    width: "70%",
    height: "33%",
    resizeMode: "stretch",
    alignSelf: "center",
    borderRadius: 20,
  },
});
