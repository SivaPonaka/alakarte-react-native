import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Appbar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { connect } from "react-redux";
import { appLanguageActions } from "./../../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AppLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "EN",
    };
  }

  async componentDidMount() {
    let lang = await AsyncStorage.getItem("language");
    this.props.setLanguage(lang);
    this.setState({
      selectedLanguage: lang,
    });
  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
      backButtonIconStyle: {
        marginTop: 10,
        backgroundColor: "#fff",
      },
      appHeaderTitleTextStyle: {
        marginLeft: -13,
      },
      saveButtonStyle: {
        position: "absolute",
        right: 4,
        borderRadius: 10,
      },
      languageSelectionContainerStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      languageButtonStyle: {
        elevation: 2,
        width: parseInt(Dimensions.get("window").width / 3) - 25,
        height: parseInt(Dimensions.get("window").width / 3) - 25,
        backgroundColor: "#fff",
        borderRadius: 200,
        marginHorizontal: 10,
        marginTop: 25,
      },
      languageButtonActiveStyle: {
        elevation: 2,
        width: parseInt(Dimensions.get("window").width / 3) - 25,
        height: parseInt(Dimensions.get("window").width / 3) - 25,
        backgroundColor: "#028F77",
        borderRadius: 200,
        marginHorizontal: 10,
        marginTop: 25,
      },
      languageButtonTextWrapperStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      languageButtonTextStyle: {
        fontSize: 24,
        color: "#424242",
      },
      languageButtonActiveTextStyle: {
        fontSize: 24,
        color: "#fff",
      },
    });

    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appHeaderStyle}>
          <Appbar.BackAction
            onPress={() => {
              this.navigateTo();
            }}
            style={styles.backButtonIconStyle}
          />

          <Appbar.Content
            title="Change language"
            style={styles.appHeaderTitleTextStyle}
          />
          <Button
            dark={true}
            labelStyle={{ fontSize: 18 }}
            uppercase={false}
            style={styles.saveButtonStyle}
            mode="text"
            onPress={() => {
              this.props.setLanguage(this.state.selectedLanguage);
              AsyncStorage.setItem("language", this.state.selectedLanguage),
                RootNavigation.navigate("Browser");
            }}
          >
            Save
          </Button>
        </Appbar.Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.languageSelectionContainerStyle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ selectedLanguage: "EN" })}
              style={
                this.state.selectedLanguage === "EN"
                  ? styles.languageButtonActiveStyle
                  : styles.languageButtonStyle
              }
            >
              <View style={styles.languageButtonTextWrapperStyle}>
                <Text
                  style={
                    this.state.selectedLanguage === "EN"
                    ? styles.languageButtonActiveTextStyle
                    : styles.languageButtonTextStyle
                  }
                >
                  EN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ selectedLanguage: "MS" })}
              style={
                this.state.selectedLanguage === "MS"
                  ? styles.languageButtonActiveStyle
                  : styles.languageButtonStyle
              }
            >
              <View style={styles.languageButtonTextWrapperStyle}>
                <Text
                  style={
                    this.state.selectedLanguage === "MS"
                      ? styles.languageButtonActiveTextStyle
                      : styles.languageButtonTextStyle
                  }
                >
                  MS
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ height: 150 }}></View>
        </ScrollView>
      </View>
    );
  }
}

function mapState(state) {
  const { appLanguage } = state;
  const { selectedLanguage } = appLanguage;
  return {
    selectedLanguage,
  };
}

const actionCreators = {
  setLanguage: appLanguageActions.setLanguage,
};
const connectedApp = connect(mapState, actionCreators)(AppLanguage);
export { connectedApp as AppLanguage };
