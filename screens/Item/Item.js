import React, { Component } from "react";
import { itemsActions, cartActions } from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Button, Title, Paragraph, IconButton } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";

const navigateTo = (item) => {
  RootNavigation.navigate("ItemDetails", { item: item });
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addItemToCart(item) {
    this.props.addItemToUserCart(item);
  }
  increaseOrderQuantity(id) {
    this.props.increaseOrderQuantity(id);
  }

  decreaseOrderQuantity(id) {
    let orderQuantity = this.props.cartList.filter(
      (el) => el.id === this.props.item?.id
    )[0].orderQuantity;
    if (orderQuantity === 1 || orderQuantity === '1') {
      this.props.removeItemFromCart(id);
    } else {
     
      this.props.decreaseOrderQuantity(id);
    }
  }
  render() {
    const itemDetails = this.props.item?.product_details?.filter(
      (el) => el.language === this.props.selectedLanguage
    )[0];
    return (
      <Card style={styles.card}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigateTo(this.props.item)}
        >
          <Card.Cover
            source={{ uri: this.props.item?.product_attachments[0]?.attachment_url }}
            style={styles.itemCoverImageStyle}
          />
          <Card.Content style={styles.cardContentStyle}>
            <Title style={styles.itemNameStyle}>{itemDetails?.name} </Title>
            <View style={styles.infoContainerStyle}>
              <Text style={{ color: "gray", fontSize: 14, fontWeight: "bold" }}>
                Net Wt. {itemDetails?.quantity} {itemDetails?.quantity_type}
              </Text>
            </View>
            <Paragraph style={styles.itemDescriptionStyle}>
              {itemDetails?.sub_description}
            </Paragraph>
          </Card.Content>
        </TouchableOpacity>

        <Card.Actions style={styles.cardActionStyle}>
          <Text style={styles.itemPriceTextStyle}>
            MRP: <Text style={{ fontSize: 12 }}>₱</Text>
            {itemDetails?.price} /-
          </Text>

          {this.props.cartList.filter((el) => el.id === this.props.item.id)
            ?.length === 0 ? (
            <Button
              mode="contained"
              labelStyle={styles.addToCartButtonLabelStyle}
              style={styles.addToCartButtonStyle}
              onPress={(e) => this.addItemToCart(this.props.item)}
            >
              Add To Cart
            </Button>
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
                        this.decreaseOrderQuantity(this.props.item.id)
                      }
                    />
                  </View>
                  <TextInput
                      style={{
                        textAlign: 'center',
                        height: 28,
                        width: 70,
                        borderRadius: 20,
                        backgroundColor: "#f5f5f5",
                        borderWidth: 1,
                        borderColor: "#eee",
                        paddingVertical: 0
                      }}
                      keyboardType="numeric"
                      value={this.props.cartList.filter(
                        (el) => el.id === this.props.item?.id
                      )[0].orderQuantity + ""}
                      onChangeText={(text) =>
                        this.props.setQuantity(this.props.item.id, text)
                      }
                    />
                  <View>
                    <IconButton
                      icon="plus"
                      color={"#fff"}
                      style={{ backgroundColor: "#26988A" }}
                      size={15}
                      onPress={() =>
                        this.increaseOrderQuantity(this.props.item.id)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </Card.Actions>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 8,
  },
  cardContentStyle: {
    paddingHorizontal: 10,
  },
  itemNameStyle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#4a4a4a",
  },
  itemDescriptionStyle: {
    color: "gray",
    paddingBottom: 5,
  },
  addToCartButtonStyle: {
    borderRadius: 20,
    elevation: 0,
    paddingHorizontal: 10,
  },
  addToCartButtonLabelStyle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  itemPriceTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#26988A",
  },
  itemCoverImageStyle: {
    height: 240,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardActionStyle: {
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  itemQuantityStyle: {
    fontWeight: "bold",
    color: "gray",
    paddingHorizontal: 10,
  },
  infoContainerStyle: {
    flex: 1,
    alignItems: "flex-start",
  },
});

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
  setQuantity: cartActions.setQuantity
};
const connectedApp = connect(mapState, actionCreators)(Item);
export { connectedApp as Item };
