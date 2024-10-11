import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Game, Home } from "./src/screens";

const App = () => {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [redPlayer, setRedPlayer] = useState({ name: "" });
  const [yellowPlayer, setYellowPlayer] = useState({ name: "" });
  const [greenPlayer, setGreenPlayer] = useState({ name: "" });
  const [bluePlayer, setBluePlayer] = useState({ name: "" });

  return (
    <View style={styles.container}>
      <>
        {gameInProgress ? (
          <Game />
        ) : (
          <Home
            showStartGameModal={showStartModal}
            onNewGameBtnPress={() => setShowStartModal(true)}
            onCancel={() => setShowStartModal(false)}
            onStartGameBtnPress={() => {
              setShowStartModal(false);
              setGameInProgress(true);
            }}
            playerRed={redPlayer}
            playerYellow={yellowPlayer}
            playerGreen={greenPlayer}
            playerBlue={bluePlayer}
            onRedInput={(text: any) =>
              setRedPlayer({ ...redPlayer, name: text })
            }
            onYellowInput={(text: any) =>
              setYellowPlayer({ ...yellowPlayer, name: text })
            }
            onGreenInput={(text: any) =>
              setGreenPlayer({ ...greenPlayer, name: text })
            }
            onBlueInput={(text: any) =>
              setBluePlayer({ ...bluePlayer, name: text })
            }
          />
        )}
      </>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
