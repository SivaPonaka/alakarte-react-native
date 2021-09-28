import React, { PureComponent } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Text } from "react-native";
import { Card } from "react-native-paper";
const width = Dimensions.get("window").width;

export default class ImageSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  render() {
    const styles = StyleSheet.create({
    
      pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: -15,
        alignSelf: "center",
      },
      dot: {
        color: "#888",
        fontSize: 50,
      },
      activeDot: {
        color: "#FFF",
        fontSize: 50,
      },
    });
    return (
      <View>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={this.change}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.images.map((image, index) => (
            <Card.Cover
              key={index}
              source={{uri: image}}
              style={{ width, height: 300, resizeMode: "cover" }}
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {this.props.images.map((i, k) => (
            <Text
              key={k}
              style={k == this.state.active ? styles.activeDot : styles.dot}
            >
              •
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
