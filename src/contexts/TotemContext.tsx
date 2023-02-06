import React from "react";
import { mapTotemTypeToDTO } from "_/helpers/totemTypeToDTO";
import { ITotemService, TotemType } from "_/services/TotemService";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
  listTotem: () => Promise<TotemType[]>;
  createTotem: (totem: TotemType) => Promise<void>;
}

const TotemContext = React.createContext<TotemContextParams>(
  {} as TotemContextParams
);

const TotemContextProvider = ({
  children,
  totemService,
}: TotemContextProps) => {
  const listTotem = async () => {
    const totems = await totemService.listTotem();
    return totems;
  };

  const createTotem = async (totem: TotemType) => {
    const totemDTO = mapTotemTypeToDTO(totem);
    await totemService.createTotem(totemDTO);
    listTotem();
  };

  return (
    <TotemContext.Provider value={{ listTotem, createTotem }}>
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
