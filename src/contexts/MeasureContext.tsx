import React, { createContext } from "react";
import { IMeasureService } from "_/services/MeasureService";
import { Measurement } from "_/types/dto/measurement";

export const MeasureContext = createContext<IMeasureContext>(
  {} as IMeasureContext
);

interface IMeasureContext {
  listMeasures(totemId?: string): Promise<Measurement[] | undefined>;
  downloadCsv(totemId: string): Promise<string | undefined>;
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

  const downloadCsv = async (totemId: string) => {
    return await measureService.downloadCsv(totemId);
  };

  return (
    <MeasureContext.Provider value={{ listMeasures, downloadCsv }}>
      {children}
    </MeasureContext.Provider>
  );
};
