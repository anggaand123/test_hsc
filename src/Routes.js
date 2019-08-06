import React from "react";
import { Animated, Easing } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  tabBarOnPress,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "./screens/Home/Home";
import UnStuffingScreen from "./screens/Module/UnStuffing";
import DetailContainerScreen from "./screens/Module/DetailContainer";
import RegisterDevice from "./screens/Setup/RegisterDevices";
import BootScreen from "./screens/Setup/Boot";

import LoginScreen from "./screens/Auth/Login";

import DrawerScreen from "./Drawer";

const BootStack = createStackNavigator(
  {
    Boot: BootScreen,
    SetupDevice_1: RegisterDevice
  },
  {
    initialRouteName: "Boot",
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.step0,
        timing: Animated.timing,
        useNativeDriver: true
      }
    })
  }
);
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.step0,
        timing: Animated.timing,
        useNativeDriver: true
      }
    })
  }
);
const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    ModuleUnStuffing: UnStuffingScreen,
    DetailContainer: DetailContainerScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    })
  }
);

const AppNavigator = createStackNavigator(
  {
    App: AppStack,
    Boot: BootStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "App",
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.step0,
        timing: Animated.timing,
        useNativeDriver: true
      }
    })
  }
);
const MenuDrawer = createDrawerNavigator(
  {
    Menu: {
      screen: AppStack
    }
  },
  {
    initialRouteName: "Menu",
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    navigationOptions: {
      header: null
    }
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      App: MenuDrawer,
      Boot: BootStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "App",
    }
  )
);
