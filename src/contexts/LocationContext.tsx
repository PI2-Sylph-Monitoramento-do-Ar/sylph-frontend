import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext<ILocationContext>(
  {} as ILocationContext
);

interface ILocationContext {
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}

interface LocationContextProviderParams {
  children: JSX.Element;
}

export const LocationContextProvider = ({
  children,
}: LocationContextProviderParams) => {
  const [position, setPosistion] = useState<Position>({} as Position);

  const getPositionAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted")
      return {
        latitude: 0,
        longitude: 0,
      };

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  useEffect(() => {
    (async () => {
      const position = await getPositionAsync();
      setPosistion(position);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ position }}>
      {children}
    </LocationContext.Provider>
  );
};
