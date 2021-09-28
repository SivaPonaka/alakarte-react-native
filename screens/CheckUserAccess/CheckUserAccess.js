import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Register } from "./../Register/Register";

export default class CheckUserAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserExist: false,
    };
  }
  async componentDidMount() {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      this.setState({
        isUserExist: true,
      });
    } else {
      this.setState({
        isUserExist: false,
      });
    }
  }
  render() {
    return (
      <>
        {this.state.isUserExist ? (
          <>{this.props.children}</>
        ) : (
          <>
            <Register></Register>
          </>
        )}
      </>
    );
  }
}
