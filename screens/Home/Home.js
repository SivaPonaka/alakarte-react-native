import React, { Component } from "react";
import { appLanguageActions, itemsActions } from "./../../actions";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  Platform,
  SafeAreaView
} from "react-native";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import {
  IconButton,
  Portal,
  Modal,
  Button,
  Snackbar,
} from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { Item } from "../Item/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;




const FlatListHeaderComponent = () => {
  return (
    <View>
    
      <View style={styles.exploreOurProductContainerStyle}>
        <Text style={styles.exploreOurProductTextStyle}>
          Explore Our Products
        </Text>
      </View>
    </View>
  );
};


const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleLanguageSetModal: false,
      isSnackbarVisible: false,
    };
  }

  async componentDidMount() {
    this.props.getItems();
    let appLanguage = await AsyncStorage.getItem("language");
    AsyncStorage.setItem("user", "");
    if (!appLanguage) {
      AsyncStorage.setItem("language", "EN");
      this.setState({
        isVisibleLanguageSetModal: true,
      });
    } else {
      this.props.setLanguage(appLanguage);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      if (prevProps.cartList?.length < this.props.cartList?.length) {
        this.setState({
          isSnackbarVisible: true,
        });
      }
    }
  }

  onRefresh() {
    this.props.getItems();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <OptimizedFlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={FlatListHeaderComponent}
          onRefresh={() => this.onRefresh()}
          refreshing={this.props.isLoadingItems}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingBottom: 250, paddingTop: 8 }}
          data={this.props.itemList}
          renderItem={({ item }) => {
            return <Item item={item} />;
          }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.props.isLoadingItems}
        />
        <Portal>
          <Modal
            visible={this.state.isVisibleLanguageSetModal}
            onDismiss={(e) =>
              this.setState({ isVisibleLanguageSetModal: false })
            }
            contentContainerStyle={styles.modalContentContainerStyle}
          >
            <View style={styles.languageIconContainer}>
              <IconButton
                icon="translate"
                size={35}
                color="#424242"
              ></IconButton>
            </View>

            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              Hey, Do you want to change your language of the app.
            </Text>
            <View>
              <View style={styles.modalButtonContainer}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={styles.modalYesButtonStyle}
                  onPress={() => {
                    this.setState({ isVisibleLanguageSetModal: false });
                    RootNavigation.navigate("AppLanguage");
                  }}
                >
                  Yes
                </Button>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.modalNoButtonStyle}
                  onPress={(e) =>
                    this.setState({ isVisibleLanguageSetModal: false })
                  }
                >
                  NO
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  contentContainerStyle: {
    marginTop: 10,
    paddingBottom: 100,
    marginHorizontal: 15,
  },
  logoStyle: {
    flex: 1,
    resizeMode: "contain",
    width: Dimensions.get("window").width - 200,
  },
  logoContainerStyle: {
    height: 100,
    alignItems: "center",
    marginTop: -25,
    marginBottom: 15,
  },
  cartIconContainerStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "relative",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  activeCartIndicatorStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 10,
    width: 10,
    backgroundColor: "#F3B434",
    borderRadius: 10,
    elevation: 2,
  },
  phoneIconStyle: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 16,
  },
  rightArrowIconStyle: {
    borderRadius: 8,
    backgroundColor: "#26988A",
    marginBottom: 10,
    marginTop: -20,
  },
  cartIconWrapperStyle: {
    alignItems: "flex-end",
  },
  contactNumberStyle: {
    color: "#fff",
  },
  contactTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContentContainerStyle: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  modalYesButtonStyle: {
    width: 100,
    elevation: 0,
    borderRadius: 5,
    marginTop: 15,
    marginRight: 10,
  },
  modalNoButtonStyle: {
    width: 100,
    elevation: 0,
    borderRadius: 5,
    marginTop: 15,
  },
  modalButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  languageIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  exploreOurProductContainerStyle: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 5
  },
  exploreOurProductTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});

function mapState(state) {
  const { items, appLanguage, cart } = state;
  const { cartList } = cart;
  const { isLoadingItems, itemList } = items;
  const { selectedLanguage } = appLanguage;
  return {
    isLoadingItems,
    itemList,
    selectedLanguage,
    cartList,
  };
}

const actionCreators = {
  getItems: itemsActions.getItems,
  setLanguage: appLanguageActions.setLanguage,
};
const connectedApp = connect(mapState, actionCreators)(Home);
export { connectedApp as Home };
