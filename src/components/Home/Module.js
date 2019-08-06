import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import GridLayout from "react-native-grid-component";

const DeviceHeight = Dimensions.get("window").height;
const DeviceWidth = Dimensions.get("window").width;
class ModuleComponent extends Component {
  _renderGridItem = (item, i) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("ModuleUnStuffing");
      }}
    >
      <View style={{ margin: "1%", width: DeviceWidth / 2 - 30 }}>
        <View
          style={{
            backgroundColor: "#fff",
            height: 70,
            borderRadius: 5
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* <View style={{ padding: 15, paddingRight: 0, width: 50 }}>
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: SERVER_URL + "content/public/class/" + item.icon
                }}
                onError={this._onErrorIcon}
                // on
                // defaultSource={require("../../assets/icon/default.png")}
              />
            </View> */}
            <View style={{ paddingLeft: 0, padding: 15, marginTop: 6 }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>{item}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // <View
    //   style={{ backgroundColor: data, flex: 1, height: 160, margin: 1 }}
    //   key={i}
    // />
  );
  _onErrorIcon = () => {
    this.setState({ failed: true });
  };
  _renderPlaceholder = i => <View style={{ flex: 1 }} key={i} />;
  render() {
    return (
      <GridLayout
        // style={{ flex: 1 }}
        renderItem={this._renderGridItem}
        renderPlaceholder={this._renderPlaceholder}
        data={["Unstuffing", "Stuffing", "Receiving", "Releasing"]}
        numColumns={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default withNavigation(ModuleComponent);
