import React, { Component } from "react";
import {
  itemsActions,
  cartActions,
  addressActions,
  userActions,
  orderActions,
} from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Dimensions, StatusBar } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Appbar,
  Text,
  Snackbar,
} from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { TextInput } from "react-native-paper";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from "react-native-paper";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAddressSnackbar: false,
      customer_id: null,
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
    if(prevProps.orderingSuccessful !== this.props.orderingSuccessful) {
      if(this.props.orderingSuccessful === true) {
        RootNavigation.navigate("Payment");
        //this.props.clearCart();
        this.props.setSpecialInstruction("");
      }
    }
  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  navigateToAddress = () => {
    RootNavigation.navigate("Address");
  };

  navigateToPayment = () => {
    if (this.props.userDetails?.customer_address?.length === 0) {
      this.setState({
        addAddressSnackbar: true,
      });
    } else {
      RootNavigation.navigate("Payment");
    }
  };

  totalAmount() {
    if (this.props.cartList.length > 0) {
      let price = this.props.cartList.map(
        (ele) =>
          ele.product_details.filter(
            (el) => el.language === this.props.selectedLanguage
          )[0].price * ele.orderQuantity
      );
      let sub_total = price.reduce((x, y) => x + y, 0);
      return parseInt(sub_total);
    } else {
      return 0;
    }
  }

  placeOrder() {
    let request = {
      customer_id: this.state.customer_id,
      customer_address_id: this.props.selectedAddress.id,
      instruction: this.props.specialInstruction,
      order_items: this.props.cartList?.map((ele) => {
        return {
          product_details_id: ele.id,
          quantity: ele.orderQuantity,
          active: true
        };
      }),
      order_status: [
        {
          status: "PLACED",
          active: true,
        },
      ],
    };
    this.props.makeOrder(request);
  }

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
        elevation: 2,
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
                  title="Confirm your order details"
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#424242",
                   
                  }}
                  style={{ marginLeft: -1}}
                />
              </Appbar.Header>
            </View>

            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >

              <View style={{position: "relative"}}>
              {this.props.isOrdering ? (
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
              <Title
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#424242",
                  marginHorizontal: 15,
                  marginBottom: 5,
                  marginTop: 10,
                }}
              >
                Shipping address
              </Title>

              {!this.props.userDetails?.customer_address?.length ? (
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
                          onPress={() => RootNavigation.navigate("AddAddress")}
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
              ) : (
                <View>
                  <Card
                    style={{
                      marginTop: 5,
                      marginHorizontal: 10,
                      elevation: 2,
                      borderRadius: 15,
                    }}
                  >
                    <Card.Content>
                      <View>
                        <View>
                          <View>
                            <Title
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#424242",
                                marginTop: -10,
                              }}
                            >
                              {this.props.selectedAddress.address_type}
                            </Title>
                            <Paragraph
                              style={{
                                fontSize: 14,
                                marginTop: 0,
                                color: "gray",
                              }}
                            >
                              {this.props.selectedAddress.name},{" "}
                              {this.props.selectedAddress.landmark},{" "}
                              {this.props.selectedAddress.street_address},{" "}
                              {this.props.selectedAddress.city},{" "}
                              {this.props.selectedAddress.postal_code}
                            </Paragraph>
                          </View>
                        </View>
                      </View>
                    </Card.Content>

                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <Button
                          mode="contained"
                          onPress={() => this.navigateToAddress()}
                          style={{
                            elevation: 0,
                            borderWidth: 2,
                            borderColor: "#26988A",
                            borderBottomRightRadius: 15,
                            borderBottomLeftRadius: 15,
                          }}
                          labelStyle={{
                            fontSize: 12,
                            paddingVertical: 1,
                            fontWeight: "bold",
                          }}
                        >
                          Change Address
                        </Button>
                      </View>
                    </View>
                  </Card>
                </View>
              )}

              <Title
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#424242",
                  marginHorizontal: 15,
                  marginBottom: 5,
                  marginTop: 10,
                }}
              >
                Special Instruction
              </Title>
              <Card style={{ marginHorizontal: 10, borderRadius: 15 }}>
                <Card.Content>
                  <Paragraph>
                    If you have any other special instruction or help on your
                    order please tell use we will definitely try to follow
                    that.(optional){" "}
                  </Paragraph>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    style={{ backgroundColor: "#fff", paddingHorizontal: 0 }}
                    value={this.props.specialInstruction}
                    onChangeText={(text) =>
                      this.props.setSpecialInstruction(text)
                    }
                  />
                </Card.Content>
              </Card>

              <View style={{ height: 300 }}></View>
              </View>
            </ScrollView>

            <View>
              <Card
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  elevation: 2,
                }}
              >
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#26988A",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#26988A",
                          }}
                        >
                          ₱{" "}
                        </Text>
                        {this.totalAmount()}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,

                          color: "#a9a9a9",
                        }}
                      >
                        Your total amount
                      </Text>
                    </View>

                    <View>
                      <Button
                        mode="contained"
                        onPress={() => this.placeOrder()}
                        style={{
                          elevation: 1,
                          borderRadius: 2,
                          borderRadius: 20,
                        }}
                        labelStyle={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {this.props.isOrdering ? "Ordering..." : "Place order"}
                      </Button>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
          <Snackbar
            visible={this.state.addAddressSnackbar}
            style={{
              marginBottom: 100,
              borderRadius: 5,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
            onDismiss={() =>
              this.setState({
                addAddressSnackbar: false,
              })
            }
            duration={2000}
          >
            Please add your address before placing your order
          </Snackbar>
        </CheckUserAccess>
      </>
    );
  }
}

function mapState(state) {
  const { appLanguage, cart, address, user, order } = state;
  const { userDetails, isRegistering, userRegistered, isLoadingUserDetails } =
    user;
  const { cartList } = cart;
  const {
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
  } = order;
  const {
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
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
    isLoadingUserDetails,
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
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
  getUserDetails: userActions.getUserDetails,
  setSpecialInstruction: orderActions.setSpecialInstruction,
  makeOrder: orderActions.makeOrder,
  clearCart: cartActions.clearCart
};
const connectedApp = connect(mapState, actionCreators)(Order);
export { connectedApp as Order };
