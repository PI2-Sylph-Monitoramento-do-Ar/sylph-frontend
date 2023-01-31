import React, { useState } from "react";
import { ITotemService, TotemFromApiType } from "_/services/TotemService";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
  isLoading: boolean;
  totems: TotemFromApiType[];
  listTotem: () => Promise<TotemFromApiType[]>;
}

const TotemContext = React.createContext<TotemContextParams>(
  {} as TotemContextParams
);

const TotemContextProvider = ({
  children,
  totemService,
}: TotemContextProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totems, setTotems] = useState<TotemFromApiType[]>([]);

  const listTotem = async () => {
    const totems = await totemService.listTotem();
    setTotems(totems);
    setIsLoading(false);
    return totems;
  };

  return (
    <TotemContext.Provider value={{ totems, listTotem, isLoading }}>
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
