import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IMAGES } from "../assets";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoStyle}>Ludo Classic</Text>
      <TouchableOpacity style={styles.newBtn}>
        <Text>New Game</Text>
      </TouchableOpacity>
      <Image source={IMAGES.board} style={styles.ludoBoard} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF0",
  },
  logoStyle: {
    color: "#F00",
    fontSize: 40,
    alignSelf: "center",
    marginTop: 100,
    fontWeight: "bold",
  },
  newBtn: {
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
  ludoBoard: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
