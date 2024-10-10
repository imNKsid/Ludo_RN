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
  fieldColor: string;
  onChangeText: () => void;
}

const PlayerField = (props: PlayerFieldProps) => {
  const { text, textColor, val, fieldColor, onChangeText } = props;
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.playerName, { color: textColor }]}>{text}</Text>
      <TextInput
        value={val}
        onChangeText={onChangeText}
        style={[
          styles.playerField,
          { borderColor: textColor, backgroundColor: fieldColor },
        ]}
      />
    </View>
  );
};

export default PlayerField;

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  playerName: {
    fontSize: 16,
  },
  playerField: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
