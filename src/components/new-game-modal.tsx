import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlayerField from "./player-field";
import CustomButton from "./custom-button";

interface NewGameModalProps {
  isVisible: boolean;
  onClose: () => void;
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
    redPlayer,
    yellowPlayer,
    greenPlayer,
    bluePlayer,
    onRedInput,
    onYellowInput,
    onGreenInput,
    onBlueInput,
  } = props;

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
              textColor={"#F00"}
              val={redPlayer.name}
              fieldBorderColor={"#FFCCCC"}
              fieldColor={"#FFEFEF"}
              onChangeText={onRedInput}
            />
            <PlayerField
              text={"Yellow Player Name"}
              textColor={"#dbba23"}
              val={yellowPlayer.name}
              fieldBorderColor={"#FFD520"}
              fieldColor={"#FFD"}
              onChangeText={onYellowInput}
            />
            <PlayerField
              text={"Green Player Name"}
              textColor={"#27cf27"}
              val={greenPlayer.name}
              fieldBorderColor={"#68f768"}
              fieldColor={"#DFD"}
              onChangeText={onGreenInput}
            />
            <PlayerField
              text={"Blue Player Name"}
              textColor={"#00F"}
              val={bluePlayer.name}
              fieldBorderColor={"#4e4ef5"}
              fieldColor={"#DDF"}
              onChangeText={onBlueInput}
            />
            <CustomButton title={"Start Game"} onPress={() => {}} />
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
  },
  modalView: {
    backgroundColor: "#FFF",
    marginHorizontal: 30,
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
});
