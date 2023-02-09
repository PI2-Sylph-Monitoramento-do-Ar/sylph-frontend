import AuthScreen from "_/screens/AuthScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminAuthScreen } from "_/screens/AdminAuthScreen";

const Stack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={AuthScreen} />
      <Stack.Screen name="AdminAuth" component={AdminAuthScreen} />
    </Stack.Navigator>
  );
};
