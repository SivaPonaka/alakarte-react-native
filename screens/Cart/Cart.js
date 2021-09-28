import React, { Component } from "react";
import { itemsActions, cartActions } from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Image, TextInput, SafeAreaView, StatusBar } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Appbar,
  Text
} from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import EmptyCart from "./EmptyCart";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {}

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  navigateToAddress = () => {
    RootNavigation.navigate("Order");
  };

  addItemToCart(item) {
    this.props.addItemToUserCart(item);
  }
  increaseOrderQuantity(id) {
    this.props.increaseOrderQuantity(id);
  }

  decreaseOrderQuantity(id, currentQuantity) {
    if (currentQuantity === 1 || currentQuantity === "1") {
      this.props.removeItemFromCart(id);
    } else {
      this.props.decreaseOrderQuantity(id);
    }
  }

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

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
        paddingTop: StatusBar.currentHeight
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
        color: "#382c1d",
      },
      productAboutText: {
        fontSize: 17,
        lineHeight: 20,
        paddingTop: 10,
        color: "#382c1d",
        marginBottom: 20,
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#382c1d",
        elevation: 2,
      },
    });

    return (
      <>
        <SafeAreaView style={styles.container}>
          <View>
            <Appbar.Header style={styles.appHeaderStyle}>
              <Appbar.Content
                title="My Cart"
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#424242",
                }}
              />
            </Appbar.Header>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {this.props.cartList?.length ? (
              <View>
                <Card
                  style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                    elevation: 2,
                    borderRadius: 10,
                   
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
                            color: "#26988A",
                            fontWeight: "bold",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#26988A",
                              fontWeight: "bold",
                            }}
                          >
                            ₱
                          </Text>{" "}
                          {this.totalAmount()}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "gray",
                          }}
                        >
                          Your total amount
                        </Text>
                      </View>

                      <View>
                        <Button
                          mode="contained"
                          onPress={() => this.navigateToAddress()}
                          style={{
                            elevation: 3,
                            borderRadius: 2,
                            borderRadius: 20,
                            alignContent: 'flex-end'
                          }}
                          labelStyle={{
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          Continue
                        </Button>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
                <Text
                  style={{
                    color: "#424242",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginHorizontal: 15,
                    marginBottom: 8,
                    marginTop: 15,
                  }}
                >
                  Order Summary
                </Text>
                {this.props.cartList?.map((ele, index) => {
                  return (
                    <Card
                      key={index}
                      style={{
                        marginTop: 10,
                        marginHorizontal: 10,
                        elevation: 2,
                        borderRadius: 10,
                        
                      }}
                    >
                      
                      <Card.Content >
                      <IconButton
                           icon="close"
                           color={"#fff"}
                           size={20}
                           onPress={() => this.props.removeItemFromCart(ele.id)}
                           style={{
                             elevation: 0,
                             backgroundColor: "#26988A",
                             position: "absolute",
                             right: -7,
                             zIndex: 999,
                             top: -6,
                             borderBottomLeftRadius: 15,
                             borderBottomRightRadius:0,
                             borderTopLeftRadius: 0,
                             borderTopRightRadius: 10,
                           }}
                        />
                        
                       
                        <View style={{ display: "flex", flexDirection: "row" }}>

                        
                          <View style={{ flex: 0.7 }}>
                            <View>
                              <Title
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: "#424242",
                                  marginTop: -10,
                                }}
                              >
                                {
                                  ele.product_details.filter(
                                    (el) =>
                                      el.language ===
                                      this.props.selectedLanguage
                                  )[0].name
                                }
                              </Title>

                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#26988A",
                                  fontWeight: "bold",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: "#26988A",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ₱{" "}
                                </Text>
                                {
                                  ele.product_details.filter(
                                    (el) =>
                                      el.language ===
                                      this.props.selectedLanguage
                                  )[0].price
                                }{" "}
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: "#a9a9a9",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ( Net Wt.
                                  {
                                    ele.product_details.filter(
                                      (el) =>
                                        el.language ===
                                        this.props.selectedLanguage
                                    )[0].quantity
                                  }{" "}
                                  )
                                </Text>
                              </Text>
                              <Paragraph
                                style={{
                                  fontSize: 14,
                                  marginTop: 0,
                                  color: "gray",
                                }}
                              >
                                Your product will be deliver with in 2 days from
                                the order confirmation
                              </Paragraph>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  marginTop: 5,
                                }}
                              >
                                <View>
                                  <IconButton
                                    icon="minus"
                                    color={"#fff"}
                                    size={15}
                                    style={{
                                      backgroundColor: "#26988A",
                                      marginLeft: 0,
                                    }}
                                    onPress={() =>
                                      this.decreaseOrderQuantity(
                                        ele.id,
                                        ele.orderQuantity
                                      )
                                    }
                                  />
                                </View>

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
                                  value={ele.orderQuantity + ""}
                                  onChangeText={(text) =>
                                    this.props.setQuantity(ele.id, text)
                                  }
                                />

                                <View>
                                  <IconButton
                                    icon="plus"
                                    color={"#fff"}
                                    style={{ backgroundColor: "#26988A" }}
                                    size={15}
                                    onPress={() =>
                                      this.increaseOrderQuantity(ele.id)
                                    }
                                  />
                                </View>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              flex: 0.3,
                              paddingLeft: 10,
                              borderRadius: 10,
                            }}
                          >
                            <Image
                              source={{
                                uri: ele?.product_attachments[0]
                                  ?.attachment_url,
                              }}
                              resizeMode="cover"
                              style={{
                                height: 100,
                                width: 100,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 10,
                                marginTop: 20
                              }}
                            />
                            
                          </View>
                        </View>
                      </Card.Content>

                      {/* <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Button
                            mode="contained"
                            icon="delete"
                            onPress={() =>
                              this.props.removeItemFromCart(ele.id)
                            }
                            style={{
                              elevation: 0,

                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                            }}
                            labelStyle={{
                              fontSize: 12,
                              paddingVertical: 2,
                              fontWeight: "bold",
                              paddingVertical: 5,
                            }}
                          >
                            REMOVE
                          </Button>
                        </View>
                      </View> */}
                    </Card>
                  );
                })}

                <View style={{ height: 300 }}></View>
              </View>
            ) : (
              <View>
                <EmptyCart></EmptyCart>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
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
const connectedApp = connect(mapState, actionCreators)(Cart);
export { connectedApp as Cart };
