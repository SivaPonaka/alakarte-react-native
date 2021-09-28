import React, { Component } from "react";
import { itemsActions, cartActions, addressActions, userActions } from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Card, Title, Paragraph, Button, Appbar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { RadioButton } from "react-native-paper";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selected: 1,
      customer_id: null
    };
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem("user");
    let userObj = JSON.parse(user);
    let userId = userObj?.id;
    if (userId) {
      this.props.getUserDetails(userId);
      this.setState({
        customer_id: userId,
      });
    }
  }


  componentDidUpdate(prevProps) {
    if(prevProps.isDeletedAddress !== this.props.isDeletedAddress) {
      if(this.props.isDeletedAddress === true) {
        this.props.getUserDetails(this.state.customer_id);
      }
    }
  }
  

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  navigateToCart = () => {
    RootNavigation.navigate("Cart");
  };

  navigateToOrder = () => {
    RootNavigation.navigate("Order");
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
        paddingTop: StatusBar.currentHeight
      },
      inverted: {
        transform: [{ scaleY: -1 }],
      },
      content: {
        padding: 0,
      },
      imageHeight: {
        height: 350,
      },

      productCard: {
        marginBottom: 1,
        elevation: 0,
        backgroundColor: "#fff",
      },
      productTitleText: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 20,
        paddingTop: 10,
        color: "#424242",
      },
      productAboutText: {
        fontSize: 16,
        lineHeight: 20,
        paddingTop: 10,
        color: "#382c1d",
        marginBottom: 20,
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
    });

    return (
      <>
        <CheckUserAccess>
          <View style={styles.container}>
            <View>
              <Appbar.Header style={styles.appHeaderStyle}>
                <Appbar.BackAction
                  onPress={() => {
                    this.navigateTo();
                  }}
                  style={{ marginTop: 10 }}
                />
                <Appbar.Content
                  title="Your shipment address"
                  titleStyle={{
                    color: "#424242",
                    fontSize: 20,
                    marginLeft: -13,
                  }}
                />
              </Appbar.Header>
            </View>

            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Card
                style={{
                  marginTop: 5,
                  marginHorizontal: 10,
                  elevation: 1,
                  borderRadius: 5,
                }}
              >
                <Card.Content>
                  <View>
                    <View>
                      <Button
                        mode="contained"
                        icon="plus"
                        onPress={() => RootNavigation.navigate("ChangeAddress")}
                        style={{
                          elevation: 2,
                          borderRadius: 20,
                        }}
                        labelStyle={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        ADD YOUR ADDRESS
                      </Button>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              <Title
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#424242",
                  marginHorizontal: 10,
                  marginBottom: 5,
                  marginTop: 10,
                }}
              >
                Select a shipping address
              </Title>

              {this.props.userDetails?.customer_address?.map((ele, index) => {
                return (
                  <Card
                    style={{
                      marginTop: 5,
                      marginHorizontal: 10,
                      elevation: 1,
                      borderRadius: 10,
                    }}
                    key={index}
                  >
                    <Card.Content>
                      <View>
                        <View>
                          <View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: -10,
                              }}
                            >
                              <RadioButton
                                value={ele.id}
                                status={
                                  this.state.selected === ele.id
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() =>
                                  this.setState({ selected: ele.id }, () => {
                                    this.props.setAddress(ele);
                                  })
                                }
                                style={{ color: "#424242" }}
                              />
                              <Title
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: "#424242",
                                }}
                              >
                                {ele.address_type}
                              </Title>
                            </View>

                            <Paragraph
                              style={{
                                fontSize: 14,
                                marginTop: 0,
                                color: "gray",
                              }}
                            >
                              {ele.name}, {ele.landmark}, {ele.street_address},{" "}
                              {ele.city}, {ele.postal_code}
                            </Paragraph>
                          </View>
                        </View>
                      </View>
                    </Card.Content>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#eee",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Button
                          mode="contained"
                          icon="delete"
                          onPress={() => this.setState({
                            selected: ele.id
                          }, () => {
                            this.props.deleteAddress(ele.id)
                          })}
                          style={{
                            elevation: 0,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                          labelStyle={{
                            fontSize: 12,
                            paddingVertical: 1,
                            fontWeight: "bold",
                          }}
                        >
                          {this.props.isDeletingAddress && this.state.selected === ele.id ? "Deleting..." : "Delete"}
                        </Button>
                      </View>
                    </View>
                  </Card>
                );
              })}

              <View style={{ height: 300 }}></View>
            </ScrollView>

            <View>
              <View>
                <Button
                  mode="contained"
                  onPress={() => this.navigateToOrder()}
                  labelStyle={{
                    fontSize: 14,
                    paddingVertical: 8,
                    fontWeight: "bold",
                  }}
                >
                  Continue with the address
                </Button>
              </View>
            </View>
          </View>
        </CheckUserAccess>
      </>
    );
  }
}

function mapState(state) {
  const { appLanguage, cart, address, user } = state;
  const { userDetails, isRegistering, userRegistered } = user;
  const { cartList } = cart;
  const {
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
    isDeletedAddress
  } = address;
  const { selectedLanguage } = appLanguage;
  return {
    selectedLanguage,
    cartList,
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
    userDetails,
    isRegistering,
    userRegistered,
    isDeletedAddress
  };
}

const actionCreators = {
  getItems: itemsActions.getItems,
  addItemToUserCart: cartActions.addItemToUserCart,
  increaseOrderQuantity: cartActions.increaseOrderQuantity,
  decreaseOrderQuantity: cartActions.decreaseOrderQuantity,
  removeItemFromCart: cartActions.removeItemFromCart,
  addAddress: addressActions.addAddress,
  setAddress: addressActions.setAddress,
  getAddress: addressActions.getAddress,
  deleteAddress: addressActions.deleteAddress,
  getUserDetails: userActions.getUserDetails
};
const connectedApp = connect(mapState, actionCreators)(Address);
export { connectedApp as Address };
