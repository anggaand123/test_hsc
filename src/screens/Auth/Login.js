import React from "react";
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon
} from "native-base";
import axios from "axios";
import Reactotron from "reactotron-react-native";
import DialogProgress from "react-native-dialog-progress";
import { NavigationActions, StackActions } from "react-navigation";
import { ENDPOINT } from "./../../config/Config";

const DeviceWidth = Dimensions.get("window").width;
const options = {
  title: "HSC",
  message: "Login ...",
  isCancelable: false
};
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      is_error: false,
      message: "",
      hidePassword: true
    };
  }
  componentWillMount() {}
  onLoginPressed() {
    Keyboard.dismiss();
    DialogProgress.show(options);
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .post(ENDPOINT + "v1/login", data, axiosConfig)
      .then(res => {
        Reactotron.log(res);
        if (res.data.status == "success") {
          this.setState({
            is_error: false
          });
          AsyncStorage.multiSet([
            ["username", res.data.profile[0].UserName],
            ["token", res.data.token],
            ["login", "true"]
          ]);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "App" })]
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({
            is_error: true,
            message: res.data.error
          });
        }
        DialogProgress.hide();
      })
      .catch(err => {
        DialogProgress.hide();
        Reactotron.log(err);
      });
  }
  render() {
    const { is_error, message } = this.state;
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
          {is_error ? (
            <Text
              style={{
                color: "red",
                alignSelf: "center",
                fontSize: 15
              }}
            >
              {message}
            </Text>
          ) : (
            <Text />
          )}
          <View style={{ padding: 35, paddingTop: 0 }}>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={text => this.setState({ username: text })}
                keyboardType="email-address"
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <View style={{ flexDirection: "row" }}>
                <Input
                  value={this.state.password}
                  onChangeText={text => this.setState({ password: text })}
                  secureTextEntry={this.state.hidePassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ hidePassword: !this.state.hidePassword })
                  }
                >
                  <Icon
                    active
                    name={this.state.hidePassword ? "eye-off" : "eye"}
                    style={{ marginTop: 0, fontSize: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </Item>
            <View style={{ paddingTop: 50 }}>
              <Button
                primary
                style={{
                  width: "100%",
                  justifyContent: "center",
                  backgroundColor: "#093801"
                }}
                onPress={() => {
                  this.onLoginPressed();
                }}
              >
                <Text>Login</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
