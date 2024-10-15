import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlayerField from "./player-field";
import CustomButton from "./custom-button";
import { COLORS } from "../assets";

interface NewGameModalProps {
  isVisible: boolean;
  onClose: () => void;
  onStartGamePress: () => void;
  redPlayer: any;
  yellowPlayer: any;
  greenPlayer: any;
  bluePlayer: any;
  onRedInput: (txt: any) => void;
  onYellowInput: (txt: any) => void;
  onGreenInput: (txt: any) => void;
  onBlueInput: (txt: any) => void;
}

const NewGameModal = (props: NewGameModalProps) => {
  const {
    isVisible,
    onClose,
    onStartGamePress,
    redPlayer,
    yellowPlayer,
    greenPlayer,
    bluePlayer,
    onRedInput,
    onYellowInput,
    onGreenInput,
    onBlueInput,
  } = props;

  const startGame = () => {
    let minPlayersCount = 0;

    if (redPlayer.name !== "") {
      minPlayersCount++;
    }
    if (yellowPlayer.name !== "") {
      minPlayersCount++;
    }
    if (greenPlayer.name !== "") {
      minPlayersCount++;
    }
    if (bluePlayer.name !== "") {
      minPlayersCount++;
    }

    minPlayersCount >= 2
      ? onStartGamePress()
      : Alert.alert("Please enter atleast 2 player names!");
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType={"none"}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <PlayerField
              text={"Red Player Name"}
              textColor={COLORS.redPlayerColor}
              val={redPlayer.name}
              fieldBorderColor={COLORS.redFieldBorder}
              fieldColor={COLORS.redField}
              onChangeText={onRedInput}
            />
            <PlayerField
              text={"Yellow Player Name"}
              textColor={COLORS.yellowPlayerColor}
              val={yellowPlayer.name}
              fieldBorderColor={COLORS.yellowFieldBorder}
              fieldColor={COLORS.yellowField}
              onChangeText={onYellowInput}
            />
            <PlayerField
              text={"Green Player Name"}
              textColor={COLORS.greenPlayerColor}
              val={greenPlayer.name}
              fieldBorderColor={COLORS.greenFieldBorder}
              fieldColor={COLORS.greenField}
              onChangeText={onGreenInput}
            />
            <PlayerField
              text={"Blue Player Name"}
              textColor={COLORS.bluePlayerColor}
              val={bluePlayer.name}
              fieldBorderColor={COLORS.blueFieldBorder}
              fieldColor={COLORS.blueField}
              onChangeText={onBlueInput}
            />
            <CustomButton title={"Start Game"} onPress={startGame} />
            <CustomButton title={"Cancel"} onPress={onClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewGameModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#bfbebb80",
  },
  modalView: {
    backgroundColor: "#FFF",
    marginHorizontal: 30,
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
});
