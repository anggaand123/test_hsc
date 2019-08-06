import React from "react";
import { Text, Alert, AsyncStorage, View } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right
} from "native-base";
import axios from "axios";
import DialogProgress from "react-native-dialog-progress";
import Reactotron from "reactotron-react-native";
import { List } from "react-native-paper";

import { ENDPOINT } from "../../config/Config";
import HeaderComponent from "../../components/Header";
const options = {
  title: "HSC",
  message: "Getting data ...",
  isCancelable: false
};
export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      container: []
    };
  }
  componentWillMount() {
    AsyncStorage.getItem("token").then(dataToken => {
      this.setState({
        token: dataToken
      });
      DialogProgress.show(options);
      axios
        .get(
          ENDPOINT +
            "v1/containerInfo/?dummy=" +
            this.props.navigation.state.params.dataC.Dummy,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: dataToken
            }
          }
        )
        .then(response => {
          Reactotron.log(response);
          this.setState({
            container: response.data.data
          });
          DialogProgress.hide();
        })
        .catch(error => {
          DialogProgress.hide();
          Reactotron.log(error);
          Alert.alert(
            "Error Request",
            error.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        });
    });
  }
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#eeeeee" }}>
        <HeaderComponent title={'Container Info - ' + this.props.navigation.state.params.dataC.ContainerNumber} backButton={true} />
        <Content style={{ padding: 20, paddingBottom: 20 }}>
          {this.state.container.map(data => {
            return (
              <Card style={{paddingBottom: 20}}>
                <CardItem style={{backgroundColor: "#8bc34a"}}>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Left>
                        <Text style={{ fontSize: 20 }}>HBL</Text>
                      </Left>
                      <Right>
                        <Text style={{ fontSize: 18 }}>
                          {data.HBL}
                        </Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Left>
                        <Text style={{ fontSize: 20 }}>POD</Text>
                      </Left>
                      <Right>
                        <Text style={{ fontSize: 18 }}>
                          {data.POD ? data.POD : '-'}
                        </Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Left>
                        <Text style={{ fontSize: 20 }}>QTY</Text>
                      </Left>
                      <Right>
                        <Text style={{ fontSize: 18 }}>
                          {data.MQuantity}
                        </Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Left>
                        <Text style={{ fontSize: 20 }}>Note</Text>
                      </Left>
                      <Right>
                        <Text style={{ fontSize: 18 }}>
                          {data.Note ? data.Note : '-'}
                        </Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}
