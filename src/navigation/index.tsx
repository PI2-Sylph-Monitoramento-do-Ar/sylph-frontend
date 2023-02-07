import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoute } from "./auth";
import { MainRoute } from "./main";
import { useAuth } from "_/hooks/useAuth";
import { useAuthPrompt } from "_/hooks/useAuthPrompt";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "_/screens/AuthScreen";

const Stack = createNativeStackNavigator();

export type AppStackParams = {
  Auth: undefined;
  Main: undefined;
};

export const Navigation = () => {
  return (
    <NavigationContainer<AppStackParams>>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
