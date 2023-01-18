import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChartsScreen from "_/screens/ChartsScreen";
import MoreInfoScreen from "_/screens/MoreInfoScreen";
import MapScreen from "_/screens/MapScreen";
import { TotemFromApiType } from "_/services/TotemService";
import { Text } from "_/components";
import { COLORS } from "_/constants/colors";
import { View } from "react-native";
import StackHeader from "../components/StackHeader";

export type MapStackParams = {
  Map: undefined;
  MoreInfo: TotemFromApiType;
  Charts: { title: string };
};

const Stack = createNativeStackNavigator<MapStackParams>();

export const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        header: ({ route, navigation }) => (
          <StackHeader route={route} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MoreInfo"
        options={({ route }) => ({
          title: route.params.title,
        })}
      >
        {({ route }) => {
          return <MoreInfoScreen totemInfo={route.params} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Charts">
        {({ route }) => {
          return <ChartsScreen title={route.params.title} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};