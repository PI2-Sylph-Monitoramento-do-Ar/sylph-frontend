import React, { createContext, useState } from "react";
import { Image, View } from "react-native";
import Images from "_/assets/images";

export const LoaderContext = createContext<ILoaderContext>(
  {} as ILoaderContext
);

interface ILoaderContext {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
}

export interface Position {
  latitude: number;
  longitude: number;
}

interface LoaderContextProviderParams {
  children: JSX.Element;
}

export const LoaderContextProvider = ({
  children,
}: LoaderContextProviderParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const renderLoader = () => {
    if (isLoading) {
      return (
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            justifyContent: "center",
            position: "absolute",
            zIndex: 1,
            opacity: 0.5,
          }}
        >
          <Image
            style={{ width: 75, height: 75, alignSelf: "center" }}
            source={Images.loader}
          />
        </View>
      );
    }
  };

  return (
    <LoaderContext.Provider value={{ setIsLoading, isLoading }}>
      {renderLoader()}
      {children}
    </LoaderContext.Provider>
  );
};
