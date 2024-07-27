import React, { createContext, useContext, useState } from "react";
import { useStateBasketContext } from "./StateBasketContext";

const ToggleFunctionContext = createContext();

export const ToggleFunctionContextProvider = ({ children }) => {
  const {
    setIsNgProduksiBtnClicked,
    setIsNgMasukBtnClicked,
    setIsNgKeluarBtnClicked,
    setIsHistoryBtnClicked,
  } = useStateBasketContext();

  const toggleNgProduksi = () => {
    setIsNgProduksiBtnClicked(true);
    setIsNgMasukBtnClicked(false);
    setIsNgKeluarBtnClicked(false);
    setIsHistoryBtnClicked(false);
  };

  const toggleNgMasuk = () => {
    setIsNgMasukBtnClicked(true);
    setIsNgProduksiBtnClicked(false);
    setIsNgKeluarBtnClicked(false);
    setIsHistoryBtnClicked(false);
  };

  const toggleNgKeluar = () => {
    setIsNgKeluarBtnClicked(true);
    setIsNgMasukBtnClicked(false);
    setIsNgProduksiBtnClicked(false);
    setIsHistoryBtnClicked(false);
  };

  const toggleHistory = () => {
    setIsHistoryBtnClicked(true);
    setIsNgKeluarBtnClicked(false);
    setIsNgMasukBtnClicked(false);
    setIsNgProduksiBtnClicked(false);
  };

  const contextValue = {
    toggleNgProduksi,
    toggleNgMasuk,
    toggleNgKeluar,
    toggleHistory,
  };

  return (
    <ToggleFunctionContext.Provider value={contextValue}>
      {children}
    </ToggleFunctionContext.Provider>
  );
};

export const useToggleFunctionContext = () => {
  const context = useContext(ToggleFunctionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
