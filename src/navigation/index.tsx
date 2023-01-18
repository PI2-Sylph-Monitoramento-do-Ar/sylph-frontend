import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoute } from "./auth";
import { MainRoute } from "./main";
import { useAuth } from "_/hooks/useAuth";

export const Navigation = () => {
  const { isAuthed, isGuest } = useAuth();

  const madeLogin = isAuthed || isGuest;

  return (
    <NavigationContainer>
      {!madeLogin ? <AuthRoute /> : <MainRoute />}
    </NavigationContainer>
  );
};
