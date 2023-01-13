import React, { useEffect, useState } from "react";
import { useLocation } from "_/hooks/useLocation";
import { ITotemService, TotemFromApiType } from "_/services/TotemService";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
  isLoading: boolean;
  totens: TotemFromApiType[];
}

const TotemContext = React.createContext<TotemContextParams>(
  {} as TotemContextParams
);

const TotemContextProvider = ({
  children,
  totemService,
}: TotemContextProps) => {
  const [totens, setTotens] = useState<TotemFromApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { position } = useLocation();

  useEffect(() => {
    (async () => {
      const totens = await totemService.getTotem(position);
      setTotens(totens);
      setIsLoading(false);
    })();
  }, [position]);

  return (
    <TotemContext.Provider value={{ totens, isLoading }}>
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
