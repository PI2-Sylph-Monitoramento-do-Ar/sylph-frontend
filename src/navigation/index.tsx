import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoute } from "./auth";
import { MainRoute } from "./main";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "_/hooks/useAuth";
import { View } from "react-native";
import { Text } from "_/components";

const Stack = createNativeStackNavigator();

export type AppStackParams = {
  Auth: undefined;
  Main: undefined;
};

export const Navigation = () => {

  const { isAuthed, isCheckingAuth } = useAuth()
  console.log(isCheckingAuth)

  if(isCheckingAuth) return <View />
  
  return (
    <NavigationContainer<AppStackParams>>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthRoute} />       
        <Stack.Screen name="Main" component={MainRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
