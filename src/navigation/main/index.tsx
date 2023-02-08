import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";
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
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "map" }),
        }}
      >
        {() => {
          return <MapStack initialRouteName="Map"/>
        }}
      </Tab.Screen>

      <Tab.Screen
        name="QrCodeReader"
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: "qr-code-2" }),
        }}
      >
        {() => {
          return <MapStack initialRouteName="QrCode"/>
        }}
      </Tab.Screen>

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
