import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChartsScreen from "_/screens/ChartsScreen";
import MapScreen from "_/screens/MapScreen";
import { TotemType } from "_/services/TotemService";
import StackHeader from "../components/StackHeader";
import TotemScreen from "_/screens/TotemScreen";

export type MapStackParams = {
  Map: undefined;
  MoreInfo: TotemType;
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
          return <TotemScreen totemInfo={route.params} />;
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
