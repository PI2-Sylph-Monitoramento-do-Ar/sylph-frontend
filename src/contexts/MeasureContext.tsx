import React, { createContext } from "react";
import { IMeasureService } from "_/services/MeasureService";
import { Measurement } from "_/types/dto/measurement";

export const MeasureContext = createContext<IMeasureContext>(
  {} as IMeasureContext
);

interface IMeasureContext {
  listMeasures(totemId?: string): Promise<Measurement[] | undefined>;
}

interface MeasureContextProviderParams {
  children: JSX.Element;
  measureService: IMeasureService;
}

export const MeasureContextProvider = ({
  children,
  measureService,
}: MeasureContextProviderParams) => {
  const listMeasures = async (totemId: string) => {
    return await measureService.listMeasures(totemId);
  };

  return (
    <MeasureContext.Provider value={{ listMeasures }}>
      {children}
    </MeasureContext.Provider>
  );
};
