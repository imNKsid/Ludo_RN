import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#FFF",
    width: 200,
    padding: 10,
    borderColor: "#DDD",
    borderWidth: 2,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
});
