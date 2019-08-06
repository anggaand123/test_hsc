import React from "react";
import { View } from "react-native";
import { Container, Content } from "native-base";
export default class Blank extends React.Component {
  componentWillMount() {}
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#fff" }}>
        <Content style={{ padding: 20 }}></Content>
      </Container>
    );
  }
}
