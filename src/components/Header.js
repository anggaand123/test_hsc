import React, { Component } from "react";
import { View } from "react-native";
import {
  Header,
  Body,
  Title,
  Button,
  Right,
  Icon,
  Text,
  Left,
  Subtitle
} from "native-base";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { withNavigation } from "react-navigation";
class HeaderComponent extends Component {
  render() {
    const { title, backButton } = this.props;
    return (
      <Header
        noShadow
        style={{ backgroundColor: "#fff" }}
        androidStatusBarColor="rgba(0,0,0,0.251)"
        transparent
      >
        {backButton ? (
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <IconMaterial name="arrow-back" size={30} />
            </Button>
          </Left>
        ) : (
          <View></View>
        )}
        <Body>
          <Title
            style={{
              fontSize: 18,
              marginRight: -150,
              marginLeft: 0,
              color: "#212121"
            }}
          >
            {title}
          </Title>
        </Body>
        <Right>
          <Button transparent></Button>
        </Right>
      </Header>
    );
  }
}
export default withNavigation(HeaderComponent);
