import React from "react";
import {
  View,
  Alert,
  AsyncStorage,
  FlatList,
  ScrollView,
  InteractionManager,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Button,
  Icon
} from "native-base";
import axios from "axios";
import DialogProgress from "react-native-dialog-progress";
import Reactotron from "reactotron-react-native";
import { Searchbar } from "react-native-paper";

import { ENDPOINT } from "../../config/Config";
import HeaderComponent from "../../components/Header";
const options = {
  title: "HSC",
  message: "Getting data ...",
  isCancelable: false
};

export default class UnStuffing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      unstuffing: [],
      querySearch: "",
      isVisible: true,
      visibleModalId: null,
      is_initiated: false
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ is_initiated: true });
    });
  }
  componentWillMount() {
    AsyncStorage.getItem("token").then(dataToken => {
      this.setState({
        token: dataToken
      });
      DialogProgress.show(options);
      axios
        .get(ENDPOINT + "v1/unstuffing", {
          headers: {
            "Content-Type": "application/json",
            authorization: dataToken
          }
        })
        .then(response => {
          Reactotron.log(response);
          this.setState({
            unstuffing: response.data.data
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
    if (this.state.is_initiated) {
      return (
        <Container style={{ flex: 1, backgroundColor: "#eeeeee" }}>
          <HeaderComponent title="Import Summary" backButton={true} />
          <Content style={{ padding: 10, paddingBottom: 20 }}>
            <Searchbar
              placeholder="Search"
              onChangeText={query => {
                this.setState({ querySearch: query });
              }}
              value={this.state.querySearch}
            />
            <FlatList
              style={{ paddingBottom: 20 }}
              data={this.state.unstuffing}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Body>
                      <View style={{ flexDirection: "row" }}>
                        <Left>
                          <Text style={{ fontSize: 20 }}>
                            {item.ContainerPrefix} {item.ContainerNumber}
                          </Text>
                        </Left>
                        <Right>
                          <Text style={{ fontSize: 18 }}>
                            Total Packages : {item.Qty}
                          </Text>
                        </Right>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Left>
                          <Text style={{ marginTop: 10 }}>
                            {item.ContainerSize} | {item.ContainerType} |{" "}
                            {item.ClientID}
                          </Text>
                        </Left>
                        <Right>
                          <Button
                            Info
                            iconLeft
                            onPress={() => this.props.navigation.navigate('DetailContainer',{
                              dataC: item
                            })}
                          >
                            <Icon name="ios-information-circle-outline" />
                            <Text>Info</Text>
                          </Button>
                        </Right>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              )}
            />
          </Content>
        </Container>
      );
    } else {
      return <ActivityIndicator size="large" color="#00a652" />;
    }
  }
}
