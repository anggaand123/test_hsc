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
class ModuleComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBox}>
          <View style={styles.wrapperContainer}>
            <View 
              style={styles.boxLeft}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ModuleUnStuffing");
              }}
            >
              <View style={{padding: 20}}>
                <Image source={require('../../assets/icon/unstuffing.png')} style={{ width: "100%", height: "80%"}} resizeMode="contain" />
                <Text
                  style={{ color: "#37474f", fontSize: 22, fontWeight: "800", textAlign: "center" }}
                >
                  Unstuffing
                </Text>
              </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.boxRight}
              onPress={() => {
                this.props.navigation.navigate("ModuleUnStuffing");
              }}
            >
              <View style={{padding: 20}}>
                <Image source={require('../../assets/icon/stuffing.png')} style={{ width: "100%", height: "80%"}} resizeMode="contain" />
                <Text
                  style={{ color: "#37474f", fontSize: 22, fontWeight: "800", textAlign: "center" }}
                >
                  Stuffing
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBox}>
          <View style={styles.wrapperContainer}>
            <View style={styles.boxLeft} />
            <View style={styles.boxRight} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20
  },
  containerBox: {
    width: "80%",
    height: DeviceHeight / 4,
    padding: 20,
    alignSelf: "center"
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  boxLeft: {
    width: "65%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  boxRight: {
    width: "62%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    marginLeft: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
export default withNavigation(ModuleComponent);
