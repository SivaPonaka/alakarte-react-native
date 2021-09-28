import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { connect } from "react-redux";
import { userActions } from "./../../actions";
import { Card, Paragraph } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: null,
      errorMessage: null,
      submitted: false,
      visible: false,
      customer_email: "",
      customer_name: "",
      taxID: "",
      phone_number: "",
      errorMessageSnackbar: false
    };
  }


  async componentDidUpdate(prevProps) {
    if (prevProps.userRegistered !== this.props.userRegistered) {
      if (this.props.userRegistered === true) {
        await this.setUserDetails();
        RootNavigation.navigate("Cart");
      }
    }
    if(prevProps.errorMessageOnRegister !== this.props.errorMessageOnRegister) {
      this.setState({
        errorMessageSnackbar: true
      })
    }
  }

  async setUserDetails() {
    await AsyncStorage.setItem("user", JSON.stringify(this.props.userDetails));
  }

  registerUser() {
    this.setState({
      submitted: true,
    });
    const { customer_email, customer_name, taxID, phone_number } = this.state;
    if (customer_name && customer_email && taxID && phone_number) {
      this.props.registerUser({
        name: customer_name,
        description: JSON.stringify(this.state.address),
        tax_id: taxID,
        phone_number: phone_number + "",
        contact_name: customer_name,
        contact_email: customer_email,
        contact_phone_number: phone_number + "",
        country: "IN",
        active: true,
      });
    }
  }

  componentDidMount() {

  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  render() {
    const styles = StyleSheet.create({
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1
      },
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
        <Appbar.Header style={styles.appHeaderStyle}>
          <Appbar.BackAction
            onPress={() => {
              this.navigateTo();
            }}
            style={{ marginTop: 10, backgroundColor: "#fff" }}
          />

          <Appbar.Content
            title="Register yourself"
            titleStyle={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#424242",
            }}
            style={{ marginLeft: -13 }}
          />
        </Appbar.Header>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={{ position: "relative" }}>
              {this.props.isRegistering ? (
                <View
                  style={{
                    backgroundColor: "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    animating={true}
                    color={Colors.red800}
                  />
                </View>
              ) : (
                <View></View>
              )}

              <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={{elevation: 0}}>
                  <Card.Content>
                    <Paragraph style={{fontWeight: "bold", marginBottom: 5, color: "#424242"}}> Name </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 50,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 0
                      }}
                      value={this.state.customer_name}
                      onChangeText={(text) =>
                        this.setState({ customer_name: text })
                      }
                    />
                    {this.state.submitted && !this.state.customer_name && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your name.{" "}
                      </Text>
                    )}
                    <Paragraph style={{fontWeight: "bold", marginBottom: 5, color: "#424242", marginTop: 10}}>Tax ID</Paragraph>
                    <View>
                      <TextInput
                         style={{
                          backgroundColor: "#f5f5f5",
                          height: 50,
                          paddingHorizontal: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          borderWidth: 0
                        }}

                        value={this.state.taxID}
                        onChangeText={(text) => this.setState({ taxID: text })}
                      />
                    </View>
                    {this.state.submitted && !this.state.taxID && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your TaxID.{" "}
                      </Text>
                    )}

                    <Paragraph style={{fontWeight: "bold", marginBottom: 5, color: "#424242", marginTop: 10}}>
                      Phone Number
                    </Paragraph>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 50,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 0
                      }}
                      value={this.state.phone_number}
                      onChangeText={(text) =>
                        this.setState({ phone_number: text })
                      }
                    />

                    {this.state.submitted && !this.state.phone_number && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please add your phone number
                      </Text>
                    )}

                    <Paragraph style={{fontWeight: "bold", marginBottom: 5, color: "#424242", marginTop: 10}}> Email </Paragraph>
                    <TextInput
                       style={{
                        backgroundColor: "#f5f5f5",
                        height: 50,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 0
                      }}
                      value={this.state.customer_email}
                      onChangeText={(text) =>
                        this.setState({ customer_email: text })
                      }
                    />
                    {this.state.submitted && !this.state.customer_email && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your email.{" "}
                      </Text>
                    )}

                    <Button
                      mode="contained"
                      labelStyle={{ fontWeight: "bold" }}
                      style={{ marginTop: 20, borderRadius: 20 }}
                      onPress={(e) => this.registerUser()}
                    >
                      {!this.props.isRegistering
                        ? "Register"
                        : "Registering ..."}
                    </Button>
                  </Card.Content>
                </Card>

                <View style={{ height: 150 }}></View>
              </ScrollView>
            </View>
            <Snackbar
              visible={this.state.errorMessageSnackbar}
              onDismiss={() => this.setState({ errorMessageSnackbar: false })}
              duration={2000}
            >
              Please check errors
            </Snackbar>
          </ScrollView>
        </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapState(state) {
  const { user } = state;
  const { userDetails, isRegistering, userRegistered, errorMessageOnRegister } = user;
  return {
    userDetails,
    isRegistering,
    userRegistered,
    errorMessageOnRegister
  };
}

const actionCreators = {
  registerUser: userActions.registerUser,
};
const connectedApp = connect(mapState, actionCreators)(Register);
export { connectedApp as Register };
