import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationActions, DrawerActions } from "react-navigation";
import PropTypes from "prop-types";
import Reactotron from "reactotron-react-native";
import { Container, Content, Header, Text } from "native-base";
import { Divider } from "react-native-paper";

class DrawerScreen extends React.Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: "#fd3078", flexDirection: "row" }}
          androidStatusBarColor="#fd3078"
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 25 }}>
            {/* Menu */}
          </Text>
        </Header>
        <Content>
          <View style={styles.menuItem}>
            <Text
              onPress={this.navigateToScreen("Home")}
              style={{ fontSize: 16, marginLeft: 10}}
            >
              Home
            </Text>
          </View>
          <Divider />
        </Content>
      </Container>
    );
  }
}
DrawerScreen.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  menuItem: {
    padding: 18,
    borderWidth: 0.19,
    borderColor: "#fafafa",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export default DrawerScreen;