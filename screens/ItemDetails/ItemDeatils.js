import React, { Component } from "react";
import { itemsActions, cartActions } from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Text, TextInput, Platform, StatusBar } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Snackbar
} from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import ImageSlider from "./../ImageSlider/ImageSlider";
import ImageView from "react-native-image-viewing";

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isSnackbarVisible: false,
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      if (prevProps.cartList?.length < this.props.cartList?.length) {
        this.setState({
          isSnackbarVisible: true,
        });
      }
    }
  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  navigateToCart = () => {
    RootNavigation.navigate("Cart");
  };

  addItemToCart(item) {
    this.props.addItemToUserCart(item);
  }
  increaseOrderQuantity(id) {
    this.props.increaseOrderQuantity(id);
  }

  decreaseOrderQuantity(id) {
    let orderQuantity = this.props.cartList.filter(
      (el) => el.id === this.props.route.params.item?.id
    )[0].orderQuantity;
    if (orderQuantity === 1 || orderQuantity === "1") {
      this.props.removeItemFromCart(id);
    } else {
      this.props.decreaseOrderQuantity(id);
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#fff",
        position: "relative",
        paddingTop: StatusBar.currentHeight
      },
      inverted: {
        transform: [{ scaleY: -1 }],
      },
      content: {
        padding: 0,
      },

      productTitleText: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 20,
        paddingTop: 10,
        color: "#424242",
        marginLeft: -1,
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

    const item = this.props.route.params.item;
    const itemDetails = item?.product_details?.filter(
      (el) => el.language === this.props.selectedLanguage
    )[0];
    const images = item?.product_attachments?.map((ele) => ele.attachment_url);

    return (
      <>
        <View style={styles.container}>
          <IconButton
            icon="keyboard-backspace"
            color={"#424242"}
            size={25}
            onPress={() => this.navigateTo()}
            style={{
              elevation: 10,
              position: "absolute",
              left: 8,
              top: StatusBar.currentHeight + 5,
              backgroundColor: "#fff",
              zIndex: 9999
            }}
          />
          <ImageView
            images={images.map((ele) => {
              return {
                uri: ele,
              };
            })}
            imageIndex={0}
            visible={this.state.visible}
            onRequestClose={() => this.setState({ visible: false })}
          />
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Card style={styles.productCard}>
                <View style={{ position: "relative" }}>
                  <ImageSlider images={images}></ImageSlider>
                  <IconButton
                    icon="fullscreen"
                    color={"#424242"}
                    size={25}
                    onPress={() => this.setState({ visible: true })}
                    style={{
                      elevation: 5,
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      backgroundColor: "#fff",
                    }}
                  />
                </View>

                <Card.Content
                  style={{
                    backgroundColor: "#fff",
                    paddingTop: 5,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Title style={styles.productTitleText}>
                    {itemDetails.name}
                  </Title>
                  <View style={styles.infoContainerStyle}>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      Net Wt. {itemDetails?.quantity}{" "}
                      {itemDetails?.quantity_type}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                      paddingTop: 10,
                      borderTopWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          borderRadius: 3,
                          color: "#26988A",
                        }}
                      >
                        MRP <Text style={{ fontSize: 14 }}>₱</Text>{" "}
                        {itemDetails.price} /-
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      {this.props.cartList.filter((el) => el.id === item.id)
                        ?.length === 0 ? (
                        <View></View>
                      ) : (
                        <View
                          style={{
                            flex: 0.5,
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                        >
                          <View
                            style={{
                              marginTop: 0,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View>
                                <IconButton
                                  icon="minus"
                                  color={"#fff"}
                                  size={15}
                                  style={{ backgroundColor: "#26988A" }}
                                  onPress={() =>
                                    this.decreaseOrderQuantity(item.id)
                                  }
                                />
                              </View>
                              {/* <Text
                                style={{
                                  fontSize: 15,
                                  marginHorizontal: 10,
                                  fontWeight: "bold",
                                  color: "#424242",
                                }}
                              >
                                {
                                  this.props.cartList.filter(
                                    (el) => el.id === item?.id
                                  )[0].orderQuantity
                                }
                              </Text> */}
                              <TextInput
                                style={{
                                  textAlign: "center",
                                  height: 28,
                                  width: 70,
                                  borderRadius: 20,
                                  backgroundColor: "#f5f5f5",
                                  borderWidth: 1,
                                  borderColor: "#eee",
                                  paddingVertical: 0
                                }}
                                keyboardType="numeric"
                                value={
                                  this.props.cartList.filter(
                                    (el) => el.id === item?.id
                                  )[0].orderQuantity + ""
                                }
                                onChangeText={(text) =>
                                  this.props.setQuantity(item.id, text)
                                }
                              />
                              <View>
                                <IconButton
                                  icon="plus"
                                  color={"#fff"}
                                  style={{ backgroundColor: "#26988A" }}
                                  size={15}
                                  onPress={() =>
                                    this.increaseOrderQuantity(item.id)
                                  }
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>

                  <Paragraph style={styles.productAboutText}>
                    {itemDetails.description}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "#eee",
              elevation: 5,
            }}
          >
            <View style={{ flex: 1 }}>
              {this.props.cartList.filter((el) => el.id === item.id)?.length ===
              0 ? (
                <Button
                  mode="contained"
                  icon="shopping"
                  style={{ backgroundColor: "#26988A" }}
                  onPress={() => this.addItemToCart(item)}
                  labelStyle={{
                    fontSize: 14,
                    paddingVertical: 8,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  ADD TO CART
                </Button>
              ) : (
                <Button
                  mode="contained"
                  icon="credit-card"
                  style={{ backgroundColor: "#26988A" }}
                  onPress={() => this.navigateToCart()}
                  labelStyle={{
                    fontSize: 14,
                    paddingVertical: 8,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  CHECK OUT
                </Button>
              )}
            </View>
          </View>
        </View>
        <Snackbar
          visible={this.state.isSnackbarVisible}
          style={{
            marginBottom: 80,
            borderRadius: 5,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onDismiss={() =>
            this.setState({
              isSnackbarVisible: false,
            })
          }
          duration={1000}
          action={{
            label: "Checkout",
            onPress: () => {
              RootNavigation.navigate("Cart");
            },
          }}
        >
          Item was added to your cart
        </Snackbar>
      </>
    );
  }
}

function mapState(state) {
  const { appLanguage, cart } = state;
  const { cartList } = cart;
  const { selectedLanguage } = appLanguage;
  return {
    selectedLanguage,
    cartList,
  };
}

const actionCreators = {
  getItems: itemsActions.getItems,
  addItemToUserCart: cartActions.addItemToUserCart,
  increaseOrderQuantity: cartActions.increaseOrderQuantity,
  decreaseOrderQuantity: cartActions.decreaseOrderQuantity,
  removeItemFromCart: cartActions.removeItemFromCart,
  setQuantity: cartActions.setQuantity,
};
const connectedApp = connect(mapState, actionCreators)(ItemDetails);
export { connectedApp as ItemDetails };
