import React from "react";
import { Dimensions, Image, View, Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import DialogProgress from "react-native-dialog-progress";
import Reactotron from "reactotron-react-native";
import { NavigationActions, StackActions } from "react-navigation";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Button,
  Icon,
  Input
} from "native-base";
import axios from "axios";
import { ENDPOINT } from "./../../config/Config";

const DeviceWidth = Dimensions.get("window").width;
const options = {
  title: "HSC",
  message: "Registering Device to System",
  isCancelable: false
};
export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeviceName: "",
      SerialNumber: ""
    };
  }
  componentWillMount() {
    this.setState({
      SerialNumber: DeviceInfo.getSerialNumber()
    });
  }
  doRegisterDevice() {
    DialogProgress.show(options);
    const data = {
      DeviceName: this.state.DeviceName,
      SerialNumber: DeviceInfo.getSerialNumber()
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .post(ENDPOINT + "v1/registerDevice", data, axiosConfig)
      .then(res => {
        Reactotron.log(res);
        DialogProgress.hide();
        Alert.alert(
          "HSC",
          "This device successfully recorded on system",
          [
            {
              text: "OK",
              onPress: () => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Auth" })]
                });
                this.props.navigation.dispatch(resetAction);
              }
            }
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
        Reactotron.log(err);
      });
  }
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#fff" }}>
        <Content style={{ padding: 20, paddingTop: 0 }}>
          <Image
            style={{
              resizeMode: "contain",
              width: DeviceWidth / 2,
              height: 300,
              alignSelf: "center",
              marginTop: 0
            }}
            source={require("../../assets/logo.png")}
          />
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Register Device
          </Text>
          <Text
            style={{ textAlign: "center", marginTop: 10, marginBottom: 40 }}
          >
            To use this app, you need to register this device first
          </Text>
          <List>
            <ListItem>
              <Left>
                <Text>Device Name</Text>
              </Left>
              <Right>
                <Input
                  placeholder="Input Device Name"
                  style={{ marginLeft: "-100%" }}
                  value={this.state.DeviceName}
                  onChangeText={text => this.setState({ DeviceName: text })}
                />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Serial Number</Text>
              </Left>
              <Right>
                <Text style={{ marginLeft: "-50%" }}>
                  {this.state.SerialNumber}
                </Text>
              </Right>
            </ListItem>
            <View style={{ paddingTop: 50 }}>
              <Button
                primary
                style={{
                  width: "100%",
                  justifyContent: "center",
                  backgroundColor: "#093801",
                  marginBottom: 20
                }}
                onPress={() => this.doRegisterDevice()}
              >
                <Text>Register Device</Text>
              </Button>
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}
