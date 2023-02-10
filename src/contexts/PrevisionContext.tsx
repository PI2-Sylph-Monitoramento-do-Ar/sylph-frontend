import React, { createContext } from "react";
import { IPrevisionService } from "_/services/PrevisionService";
import { PrevisionDto } from "_/types/dto/prevision";

export const PrevisionContext = createContext<IPrevisionContext>(
  {} as IPrevisionContext
);

interface IPrevisionContext {
  listPrevisions(totemId?: string): Promise<PrevisionDto | undefined>;
}

interface PrevisionContextProviderParams {
  children: JSX.Element;
  previsionService: IPrevisionService;
}

export const PrevisionContextProvider = ({
  children,
  previsionService,
}: PrevisionContextProviderParams) => {
  const listPrevisions = async (totemId: string) => {
    return await previsionService.listPrevision(totemId);
  };

  return (
    <PrevisionContext.Provider value={{ listPrevisions }}>
      {children}
    </PrevisionContext.Provider>
  );
};
