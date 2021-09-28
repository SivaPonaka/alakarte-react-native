import React, { Component } from "react";
import { Text, View, Dimensions, Image } from "react-native";

const height = Dimensions.get("window").height - 100;
export default class EmptyCart extends Component {
  render() {
    return (
      <View
        style={{
          display: "flex",
          height: height,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={require("./../../assets/add.png")}
            style={{ height: 80 }}
            resizeMode="contain"
          ></Image>
          <Text style={{ fontSize: 18, color: "#a9a9a9", textAlign: 'center' }}>
            {" "}
            Your cart awaits your next order{" "}
          </Text>
        </View>
      </View>
    );
  }
}
