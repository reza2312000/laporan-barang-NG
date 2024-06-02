import React, { createContext, useContext, useState } from "react";
import { useStateBasketContext } from "./StateBasketContext";

const ToggleFunctionContext = createContext();

export const ToggleFunctionContextProvider = ({ children }) => {
    const {isBarangMasukBtnClicked,
        isNgProduksiBtnClicked, 
        setIsNgProduksiBtnClicked,
        setIsNgMasukBtnClicked} = useStateBasketContext()

    const toggleNgProduksi = () => {
        setIsNgProduksiBtnClicked(true)
        setIsNgMasukBtnClicked(false)
    }

    const toggleNgMasuk = () => {
        setIsNgMasukBtnClicked(true)
        setIsNgProduksiBtnClicked(false)
    }

  const contextValue = {
    toggleNgProduksi,
    toggleNgMasuk
  };

  return (
    <ToggleFunctionContext.Provider value={contextValue}>{children}</ToggleFunctionContext.Provider>
  );
};

export const useToggleFunctionContext = () => {
  const context = useContext(ToggleFunctionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
