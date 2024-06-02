import React, { createContext, useContext, useState } from "react";

const StateBasketContext = createContext();

export const StateBasketContextProvider = ({ children }) => {
  const [isNgMasukBtnClicked, setIsNgMasukBtnClicked] = useState(false);
  const [isNgProduksiBtnClicked, setIsNgProduksiBtnClicked] = useState(true);
   
  const [isUiHeaderDisabled, setIsUiHeaderDisabled] = useState(false)

  const [docId, setDocId] = useState("")  
  const [part, setPart] = useState("Part 1")
  const [shift, setShift] = useState("1")
  const [date, setDate] = useState("")
  const [jenisNg, setJenisNg] = useState("Patah")
  const [jumlahNg, setJumlahNg] = useState()

  const [selectedPart, setSelectedPart] = useState("")
  const [selectedShift, setSelectedShift] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedJenisNg, setSelectedJenisNg] = useState("")
  const [selectedJumlahNg, setSelectedJumlahNg] = useState()

  const [allDataReport, setAllDataReport] = useState([])

  const [isModalAddDataOpen, setIsModalAddDataOpen] = useState(false)
  const [isModalUpdateDataOpen, setIsModalUpdateDataOpen] = useState(false)
  const [isModalDeleteDataOpen, setIsModalDeleteDataOpen] = useState(false)

  const contextValue = {
    isNgMasukBtnClicked,
    isNgProduksiBtnClicked, 
    setIsNgProduksiBtnClicked,
    setIsNgMasukBtnClicked,
    part,
    shift,
    date,
    jenisNg,
    jumlahNg,
    setJenisNg,
    setJumlahNg,
    setPart,
    setShift,
    setDate,
    allDataReport, 
    isUiHeaderDisabled, 
    setAllDataReport,
    setIsUiHeaderDisabled,
    docId, 
    setDocId,
    isModalAddDataOpen, 
    isModalUpdateDataOpen, 
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    selectedPart,
    selectedShift,
    selectedDate,
    selectedJenisNg,
    selectedJumlahNg,
    setSelectedPart,
    setSelectedShift,
    setSelectedDate,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    isModalDeleteDataOpen, 
    setIsModalDeleteDataOpen
  };

  return (
    <StateBasketContext.Provider value={contextValue}>{children}</StateBasketContext.Provider>
  );
};

export const useStateBasketContext = () => {
  const context = useContext(StateBasketContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
