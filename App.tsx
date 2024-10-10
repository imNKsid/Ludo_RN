import { View, StyleSheet } from "react-native";
import React from "react";
import { Game, Home } from "./src/screens";

const App = () => {
  const isGameInProgress = false;

  return (
    <View style={styles.container}>
      <>{isGameInProgress ? <Game /> : <Home />}</>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
