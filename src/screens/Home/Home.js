import React from "react";
import {
  InteractionManager,
  ActivityIndicator,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions
} from "react-native";
import Reactotron from "reactotron-react-native";
import { Container, Content, 
  Button, } from "native-base";
import GridLayout from "react-native-grid-component";

import HeaderComponent from "../../components/Header";
import ModuleComponent from "../../components/Home/Module";

const DeviceHeight = Dimensions.get("window").height;
const DeviceWidth = Dimensions.get("window").width;
export default class Transactions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_initiated: false,
      renderComponentModule: false,
      renderHeader: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderHeader: true });
    }, 0);
    setTimeout(() => {
      this.setState({ renderComponentModule: true });
    }, 0);
  }
  _renderGridItem = (item, i) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("ModuleUnStuffing");
      }}
    >
      <View style={{ margin: "1%", width: DeviceWidth / 2 - 30, height: 100 }}>
        <View
          style={{
            backgroundColor: "#fff",
            height: 70,
            borderRadius: 5
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 0, padding: 15, marginTop: 6 }}>
              <Text style={{ color: "#333", fontSize: 16 }}>{item}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  _onErrorIcon = () => {
    this.setState({ failed: true });
  };
  _renderPlaceholder = i => <View style={{ flex: 1 }} key={i} />;
  componentWillMount() {}

  render() {
    const { renderHeader, renderComponentModule } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
        {renderHeader && <HeaderComponent title="HSC" backButton={false} />}
        <ScrollView>
          {renderComponentModule && (
            <GridLayout
              // style={{ flex: 1 }}
              renderItem={this._renderGridItem}
              renderPlaceholder={this._renderPlaceholder}
              data={["Unstuffing", "Stuffing", "Receiving", "Releasing"]}
              numColumns={2}
            />

            
          )}
          <Button
                primary
                style={{
                  width: "100%",
                  justifyContent: "center",
                  backgroundColor: "#093801"
                }}
                onPress={() => {
                  this.props.navigation.navigate("ModuleUnStuffing");
                }}
              >
                <Text>Login</Text>
              </Button>
        </ScrollView>
      </View>
    );
  }
}
