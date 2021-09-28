import React, { Component } from "react";
import { BottomNavigation } from "react-native-paper";
import { Home } from "./../screens/Home/Home";
import { Cart } from "../screens/Cart/Cart";
import { OrderHistory } from "../screens/OrderHistory/OrderHistory";
import { Profile } from "../screens/Profile/Profile";

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "Home", title: "Home", icon: "home-circle", color: "#26988A" },

        {
          key: "Cart",
          title: "My Cart",
          icon: "shopping",
          color: "#26988A",
        },
        {
          key: "OrderHistory",
          title: "Orders",
          icon: "package",
          color: "#26988A",
        },

        {
          key: "Profile",
          title: "Profile",
          icon: "account-circle",
          color: "#26988A",
        },
      ],
    };
  }

  render() {
    const renderScene = BottomNavigation.SceneMap({
      Home: Home,
      Cart: Cart,
      OrderHistory: OrderHistory,
      Profile: Profile,
    });
    return (
      <BottomNavigation
        navigationState={{ index: this.state.index, routes: this.state.routes }}
        onIndexChange={(ind) => this.setState({ index: ind })}
        renderScene={renderScene}
        shifting={false}
        labeled={true}
        keyboardHidesNavigationBar={true}
        barStyle={{
          borderRadius: 100,
          overflow: "hidden",
          marginBottom: 5,
          marginTop: 5,
          marginHorizontal: 20,
          position: 'absolute',
         
        }}
      />
    );
  }
}
