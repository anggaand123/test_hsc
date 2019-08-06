import React from "react";
import {
  Dimensions,
  Image,
  View,
  Text,
  BackHandler,
  AsyncStorage
} from "react-native";
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import Reactotron from "reactotron-react-native";
import * as Progress from "react-native-progress";
import { Container, Content } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";

import { ENDPOINT } from "./../../config/Config";

const DeviceWidth = Dimensions.get("window").width;
export default class Boot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      is_registered: "",
      is_login: ""
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    AsyncStorage.getItem("login").then(dataLogin => {
      const is_login = dataLogin;
      Reactotron.log(is_login);
      this.interval = setInterval(() => {
        if (this.state.progress == "1") {
          if (this.state.is_registered) {
            if (is_login) {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "App" })]
              });
              clearInterval(this.interval);
              this.props.navigation.dispatch(resetAction);
            } else {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Auth" })]
              });
              clearInterval(this.interval);
              this.props.navigation.dispatch(resetAction);
            }
          } else {
            clearInterval(this.interval);
            this.props.navigation.navigate("SetupDevice_1");
          }
        }
      }, 1000);
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }

  componentWillMount() {
    AsyncStorage.getItem("login").then(dataLogin => {
      this.setState({
        is_login: dataLogin
      });
    });
    axios
      .get(
        ENDPOINT +
          "v1/checkDevice/?serial_number=" +
          DeviceInfo.getSerialNumber(),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(responsePackages => {
        this.setState({
          progress: 1,
          is_registered: responsePackages.data.is_registered,
          is_login: AsyncStorage.getItem("login")
        });
      })
      .catch(error => {
        Reactotron.log(error);
      });
  }
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#fff" }}>
        <Content style={{ padding: 20 }}>
          <Image
            style={{
              resizeMode: "contain",
              width: DeviceWidth / 2,
              height: 300,
              alignSelf: "center"
            }}
            source={require("../../assets/logo.png")}
          />
          <View style={{ alignSelf: "center", width: "60%" }}>
            <Progress.Bar progress={this.state.progress} width={null} />
          </View>
          <View style={{ alignSelf: "center", marginTop: "100%" }}>
            <Text style={{ color: "#707070" }}>HSC APP V1.0.0</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
