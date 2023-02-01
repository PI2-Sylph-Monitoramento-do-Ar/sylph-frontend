import React, { useState } from "react";
import { mapTotemTypeToDTO } from "_/helpers/totemTypeToDTO";
import { ITotemService, TotemType } from "_/services/TotemService";
import { TotemDTO } from "_/types/dto/totem";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
  isLoading: boolean;
  totems: TotemType[];
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
  const [isLoading, setIsLoading] = useState(true);
  const [totems, setTotems] = useState<TotemType[]>([]);

  const listTotem = async () => {
    const totems = await totemService.listTotem();
    setTotems(totems);
    setIsLoading(false);
    return totems;
  };

  const createTotem = async (totem: TotemType) => {
    const totemDTO = mapTotemTypeToDTO(totem);
    await totemService.createTotem(totemDTO);
    listTotem();
  }

  return (
    <TotemContext.Provider value={{ totems, listTotem, isLoading, createTotem }}>
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
