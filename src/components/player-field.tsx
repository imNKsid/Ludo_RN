import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

interface PlayerFieldProps {
  text: string;
  textColor: string;
  val: string;
  fieldBorderColor: string;
  fieldColor: string;
  onChangeText: (txt: any) => void;
}

const PlayerField = (props: PlayerFieldProps) => {
  const { text, textColor, val, fieldBorderColor, fieldColor, onChangeText } =
    props;
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.playerName, { color: textColor }]}>{text}</Text>
      <TextInput
        value={val}
        onChangeText={onChangeText}
        style={[
          styles.playerField,
          { borderColor: fieldBorderColor, backgroundColor: fieldColor },
        ]}
      />
    </View>
  );
};

export default PlayerField;

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  playerName: {
    fontSize: 16,
    marginBottom: 5,
  },
  playerField: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
