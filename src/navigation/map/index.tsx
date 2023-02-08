import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "_/screens/MapScreen";
import { TotemType } from "_/services/TotemService";
import ChartsScreen, { IChartsScreen } from "_/screens/ChartsScreen";
import StackHeader from "../components/StackHeader";
import TotemScreen from "_/screens/TotemScreen";
import QrCodeReader from "_/screens/QrCodeReader";

export type MapStackParams = {
  Map: undefined;
  MoreInfo: TotemType;
  Charts: IChartsScreen;
  QrCode: undefined;
};
export type MapStaskParams = {
  initialRouteName: keyof MapStackParams
}

const Stack = createNativeStackNavigator<MapStackParams>();

export const MapStack = ({initialRouteName} : MapStaskParams) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
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
          return (
            <ChartsScreen
              title={route.params.title}
              id={route.params.id}
              measureName={route.params.measureName}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen
        name="QrCode"
        component={QrCodeReader}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  );
};
