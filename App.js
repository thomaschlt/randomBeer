import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function App() {
  const [beer, setBeer] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchBeer = async () => {
    setLoading(true);
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const data = await response.json();
    setBeer(data[0]);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchBeer}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Get a Random Beer"}
        </Text>
      </TouchableOpacity>
      {beer.id ? (
        <View style={styles.beerContainer}>
          <Image style={styles.image} source={{ uri: beer.image_url }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{beer.name}</Text>
            <Text style={styles.tagline}>{beer.tagline}</Text>
            <Text style={styles.description}>{beer.description}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    backgroundColor: "#DDB771",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  beerContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 200,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});
