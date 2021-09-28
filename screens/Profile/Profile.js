import React, { Component } from "react";
import {
  itemsActions,
  cartActions,
  addressActions,
  userActions,
  orderActions,
} from "./../../actions";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  Linking,
  Share,
  StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { Button } from "react-native-paper";
import { Appbar, Avatar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer_id: null,
    };
  }
  navigateToLogoutScreen = () => {
    RootNavigation.navigate("Logout");
  };

  navigateToOrderHistoryScreen = () => {
    RootNavigation.navigate("OrderHistory");
  };

  navigateToContactUs = () => {
    RootNavigation.navigate("ContactUs");
  };

  navigateToAppLanguage = () => {
    RootNavigation.navigate("AppLanguage");
  };

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

  onRefresh = () => {};

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Download and install our app Digital Saathi for farmers by using this link https://play.google.com/store/apps/details?id=cargill.com.digitalsaathi&hl=en_IN&gl=US",
        url: "",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1
      },
      userNameText: {
        fontSize: 16,
        fontWeight: "bold",
      },
      profilePictureLayout: {
        marginLeft: 10,
        marginTop: 4,
      },
      profileCard: {
        backgroundColor: "#ffffff",
        marginHorizontal: 12,
        borderRadius: 10,
        marginTop: 10,
        fontSize: 12,
        marginBottom: 10,
      },
      screenIconsLayout: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
      },
      editButtonLayout: {
        paddingTop: 8,
        borderRadius: 20,
      },
      footerTextStyle: {
        padding: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#a9a9a9",
      },
      placeHolderForExtraSpace: {
        height: 200,
      },
      imageContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      tinyLogo: {
        resizeMode: "center",
        width: 100,
      },
      menuStyle: {
        marginLeft: -10,
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
      menuCardFirstChildStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginTop: 10,
      },
      menuCardLastChildStyle: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#fff",
        marginHorizontal: 12,
      },
      LogoutMenuStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginHorizontal: 12,
        marginTop: 10,
      },
    });

    return (
      <CheckUserAccess>
        <View style={styles.container}>
          <Appbar.Header style={styles.appHeaderStyle}>
            <Appbar.Content title="Profile Details" />
          </Appbar.Header>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoadingUserDetails}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <List.Item
              title={this.props.userDetails?.name}
              description={"India"}
              descriptionNumberOfLines={1}
              titleNumberOfLines={1}
              titleStyle={styles.userNameText}
              style={styles.profileCard}
              left={(props) => (
                <Avatar.Text
                  size={50}
                  labelStyle={{ fontSize: 18 }}
                  label={"SS"}
                />
              )}
              right={() => (
                <Button
                  mode="text"
                  style={styles.editButtonLayout}
                  onPress={() => this.navigateToEditProfileScreen()}
                >
                  Edit
                </Button>
              )}
            />
            <List.Item
              title="Order History"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="package" />}
              style={styles.menuCardFirstChildStyle}
              onPress={() => this.navigateToOrderHistoryScreen()}
            />
            <List.Item
              title="Contact Us"
              titleStyle={styles.menuStyle}
              left={(props) => (
                <List.Icon {...props} icon="help-circle-outline" />
              )}
              style={styles.screenIconsLayout}
              onPress={() => this.navigateToContactUs()}
            />
            <List.Item
              title="Share App"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="share" />}
              style={styles.screenIconsLayout}
              onPress={() => this.onShare()}
            />
            <List.Item
              title="Rate us"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="star-outline" />}
              style={styles.screenIconsLayout}
              onPress={() =>
                Linking.openURL(`market://details?id=cargill.com.digitalsaathi`)
              }
            />
            <List.Item
              title="Language"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="translate" />}
              style={styles.menuCardLastChildStyle}
              onPress={() => this.navigateToAppLanguage()}
            />

            <List.Item
              title="Privacy Policy"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="information" />}
              style={styles.menuCardFirstChildStyle}
            />
            <List.Item
              title="Version"
              titleStyle={styles.menuStyle}
              left={(props) => <List.Icon {...props} icon="tag" />}
              style={styles.menuCardLastChildStyle}
              right={(props) => (
                <Text
                  style={{ marginTop: 14, marginRight: 10, color: "#424242" }}
                >
                  1.0.1
                </Text>
              )}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.navigateToLogoutScreen()}
            >
              <List.Item
                title="Logout"
                titleStyle={styles.menuStyle}
                left={(props) => <List.Icon {...props} icon="logout" />}
                style={styles.LogoutMenuStyle}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </CheckUserAccess>
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
  clearCart: cartActions.clearCart,
};
const connectedApp = connect(mapState, actionCreators)(Profile);
export { connectedApp as Profile };
