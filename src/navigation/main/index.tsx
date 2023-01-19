import React from "react";
import MapScreen from "_/screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";
import { SIZES } from "_/constants/sizes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoreInfoScreen from "_/screens/MoreInfoScreen";
import ChartsScreen from "_/screens/ChartsScreen";
import { MapStack } from "../map";
import { useAuth } from "_/hooks/useAuth";
import InfoScreen from "_/screens/InfoScreen";
import AdminScreen from "_/screens/AdminScreen";

const Tab = createBottomTabNavigator();

export const MainRoute = () => {
  const { isAuthed } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="MapStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "help" }),
        }}
      />
      <Tab.Screen
        name="MapStack"
        component={MapStack}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "map" }),
        }}
      />
      {isAuthed && (
        <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              TabBarIcon({ focused, name: "person" }),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
