import React, { useState } from "react";
import { mapTotemTypeToDTO } from "_/helpers/totemTypeToDTO";
import { ITotemService, TotemType } from "_/services/TotemService";

interface TotemContextProps {
  children: JSX.Element;
  totemService: ITotemService;
}

interface TotemContextParams {
  listTotem: () => Promise<TotemType[]>;
  createTotem: (totem: TotemType, token: string) => Promise<void>;
  editTotem: (totem: TotemType, token: string) => Promise<void>;
  deleteTotem: (id: string, token: string) => Promise<void>;
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

  const createTotem = async (totem: TotemType, token: string) => {
    const totemDTO = mapTotemTypeToDTO(totem);
    await totemService.createTotem(totemDTO, token);
  };

  const editTotem = async (totem: TotemType, token: string) => {
    const totemDTO = mapTotemTypeToDTO(totem);
    await totemService.editTotem(totemDTO, token);
  };

  const deleteTotem = async (id: string, token: string) => {
    await totemService.deleteTotem(id, token);
  };

  return (
    <TotemContext.Provider
      value={{ listTotem, createTotem, editTotem, deleteTotem }}
    >
      {children}
    </TotemContext.Provider>
  );
};

export { TotemContext, TotemContextProvider };
