import React from "react";
import MapScreen from "_/screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";

const Tab = createBottomTabNavigator();

export const MainRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Info"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "help" }),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "map" }),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "person" }),
        }}
      />
    </Tab.Navigator>
  );
};
