import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoute } from "./auth";
import { MainRoute } from "./main";
import { useLocation } from "_/hooks/useLocation";

export const Routes = () => {
  const { position } = useLocation();

  const isAuthed = position.latitude && position.longitude;
  return (
    <NavigationContainer>
      {isAuthed ? <AuthRoute /> : <MainRoute />}
    </NavigationContainer>
  );
};
