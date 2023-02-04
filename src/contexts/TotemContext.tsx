import React, { useState } from "react";
import { ITotemService, TotemFromApiType } from "_/services/TotemService";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
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
  const [totems, setTotems] = useState<TotemFromApiType[]>([]);

  const listTotem = async () => {
    const totems = await totemService.listTotem();
    setTotems(totems);
    return totems;
  };

  return (
    <TotemContext.Provider value={{ totems, listTotem }}>
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
