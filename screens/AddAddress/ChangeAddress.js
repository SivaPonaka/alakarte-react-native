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
import { userActions, addressActions } from "./../../actions";
import { Card, Paragraph } from "react-native-paper";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";
import { ActivityIndicator, Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


class ChangeAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_type: "",
      name: "",
      contact_number: "",
      street_address: "",
      landmark: "",
      city: "",
      postal_code: "",
      customer_id: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addressAdded !== this.props.addressAdded) {
      if (this.props.addressAdded === true) {
        this.props.getUserDetails(this.state.customer_id);
        RootNavigation.navigate("Address");
      }
    }
  }

  registerUser() {
    this.setState({
      submitted: true,
    });
    const {
      address_type,
      name,
      contact_number,
      street_address,
      landmark,
      city,
      postal_code,
      customer_id
    } = this.state;
    if (
      address_type &&
      name &&
      contact_number &&
      street_address &&
      landmark &&
      city &&
      postal_code &&
      customer_id
    ) {
      this.props.addAddress({
        address_type: address_type,
        name: name,
        contact_number: contact_number,
        street_address: street_address,
        landmark: landmark,
        city: city,
        postal_code: postal_code,
        customer_id: customer_id
      });
    }
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem("user");
    let userObj = JSON.parse(user);
    let userId = userObj?.id;
    if (userId) {
      this.setState({
        customer_id: userId,
      });
    }
    // if (Platform.OS === "android" && !Constants.default.isDevice) {
    //   this.setState({
    //     errorMessage:
    //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
    //   });
    // } else {
    //   await this._getLocationAsync();
    // }
  }

  navigateTo = () => {
    RootNavigation.navigate("Order");
  };

  //   _getLocationAsync = async () => {
  //     try {
  //       let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //       if (status !== "granted") {
  //         this.setState({
  //           errorMessage: "Permission to access location was denied",
  //         });
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       let lat = await location.coords.latitude;
  //       let lng = await location.coords.longitude;
  //       let address = await Location.reverseGeocodeAsync({
  //         latitude: lat,
  //         longitude: lng,
  //       });

  //       this.setState({ address });
  //     } catch (error) {
  //       let status = Location.getProviderStatusAsync();
  //       if (!status.locationServicesEnabled) {
  //         this.setState({ isLocationModalVisible: true });
  //       }
  //     }
  //   };

  render() {
    const styles = StyleSheet.create({
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }
    });

    return (
    <CheckUserAccess>
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

          <Appbar.Content title="Add Address" style={{ marginLeft: -13 }} titleStyle={{
             fontSize: 18,
             fontWeight: "bold",
             color: "#424242",
          }} />
        </Appbar.Header>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={{ position: "relative" }}>
              {this.props.isAddingAddress ? (
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
                <Card style={{ elevation: 0 }}>
                  <Card.Content>
                    <Paragraph style={{fontWeight: "bold"}}> Address Name </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                          borderRadius: 10,
                          height: 50,
                          paddingHorizontal: 10,
                      }}
                      value={this.state.address_type}
                      onChangeText={(text) =>
                        this.setState({ address_type: text })
                      }
                    />
                    {this.state.submitted && !this.state.address_type && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your address eg.(home / restaurant etc).{" "}
                      </Text>
                    )}
                    <Paragraph style={{ marginTop: 15, fontWeight: "bold" }}>
                      Restaurant Name
                    </Paragraph>
                    <View>
                      <TextInput
                        style={{
                          backgroundColor: "#f5f5f5",
                          borderRadius: 10,
                          height: 50,
                          paddingHorizontal: 10,
                        }}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}
                      />
                    </View>
                    {this.state.submitted && !this.state.name && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your Restaurant name.{" "}
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15, fontWeight: 'bold' }}>
                      Phone Number
                    </Paragraph>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#f5f5f5",
                          borderRadius: 10,
                          height: 50,
                          paddingHorizontal: 10,
                      }}
                      value={this.state.contact_number}
                      onChangeText={(text) =>
                        this.setState({ contact_number: text })
                      }
                    />

                    {this.state.submitted && !this.state.contact_number && (
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

                    <Paragraph style={{ marginTop: 15, fontWeight: 'bold' }}>
                      {" "}
                      Street Address{" "}
                    </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                          borderRadius: 10,
                          height: 50,
                          paddingHorizontal: 10,
                      }}
                      value={this.state.street_address}
                      onChangeText={(text) =>
                        this.setState({ street_address: text })
                      }
                    />
                    {this.state.submitted && !this.state.street_address && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your street address.{" "}
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15, fontWeight: 'bold' }}> Landmark </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        height: 50,
                        paddingHorizontal: 10,
                      }}
                      value={this.state.landmark}
                      onChangeText={(text) => this.setState({ landmark: text })}
                    />
                    {this.state.submitted && !this.state.landmark && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your landmark.{" "}
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15, fontWeight: 'bold' }}> City </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        height: 50,
                        paddingHorizontal: 10,
                      }}
                      value={this.state.city}
                      onChangeText={(text) => this.setState({ city: text })}
                    />
                    {this.state.submitted && !this.state.city && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your city.{" "}
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15, fontWeight: 'bold' }}>
                      {" "}
                      Postal Code{" "}
                    </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        height: 50,
                        paddingHorizontal: 10,
                      }}
                      value={this.state.postal_code}
                      onChangeText={(text) =>
                        this.setState({ postal_code: text })
                      }
                    />
                    {this.state.submitted && !this.state.postal_code && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your city.{" "}
                      </Text>
                    )}

                    <Button
                      mode="contained"
                      labelStyle={{ fontWeight: "bold" }}
                      style={{ marginTop: 20, borderRadius: 20 }}
                      onPress={(e) => this.registerUser()}
                    >
                      {!this.props.isAddingAddress
                        ? "Submit"
                        : "Submitting ..."}
                    </Button>
                  </Card.Content>
                </Card>

                <View style={{ height: 150 }}></View>
              </ScrollView>
            </View>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => this.setState({ visible: false })}
              action={{
                label: "Undo",
                onPress: () => {
                  this.setState({
                    submitted: false,
                  });
                },
              }}
            >
              Please check errors
            </Snackbar>
          </ScrollView>
        </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      </CheckUserAccess>
    );
  }
}

function mapState(state) {
  const { user, address } = state;
  const {
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
  } = address;
  const { userDetails, isRegistering, userRegistered } = user;
  return {
    userDetails,
    isRegistering,
    userRegistered,
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
  };
}

const actionCreators = {
  registerUser: userActions.registerUser,
  addAddress: addressActions.addAddress,
  setAddress: addressActions.setAddress,
  getAddress: addressActions.getAddress,
  deleteAddress: addressActions.deleteAddress,
  getUserDetails: userActions.getUserDetails
};
const connectedApp = connect(mapState, actionCreators)(ChangeAddress);
export { connectedApp as ChangeAddress };
