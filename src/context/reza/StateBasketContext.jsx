import React, { createContext, useContext, useState } from "react";

const StateBasketContext = createContext();

export const StateBasketContextProvider = ({ children }) => {
  const [isNgProduksiBtnClicked, setIsNgProduksiBtnClicked] = useState(true);
  const [isNgMasukBtnClicked, setIsNgMasukBtnClicked] = useState(false);
  const [isNgKeluarBtnClicked, setIsNgKeluarBtnClicked] = useState(false);
  const [isHistoryBtnClicked, setIsHistoryBtnClicked] = useState(false);

  const [isUiHeaderDisabled, setIsUiHeaderDisabled] = useState(false);

  const [docId1, setDocId1] = useState("");
  const [docId2, setDocId2] = useState("");
  const [part, setPart] = useState("Part 1");
  const [shift, setShift] = useState("1");
  const [machine, setMachine] = useState("Mesin 1");
  const [date, setDate] = useState("");
  const [jenisNg, setJenisNg] = useState("Patah");
  const [jumlahNg, setJumlahNg] = useState();
  const [status, setStatus] = useState("Waiting");
  const [estimasiTotalBerat, setEstimasiTotalBerat] = useState(0);
  const [actualTotalBerat, setActualTotalBerat] = useState(0);

  const [weightTolerance, setWeightTolerance] = useState();

  const [selectedPart, setSelectedPart] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedJenisNg, setSelectedJenisNg] = useState("");
  const [selectedJumlahNg, setSelectedJumlahNg] = useState();
  const [selectedEstimasiBerat, setSelectedEstimasiBerat] = useState();
  const [selectedActualBerat, setSelectedActualBerat] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const [allDataReport, setAllDataReport] = useState([]);
  const [allDataByNik, setAllDataByNik] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const [isModalAddDataOpen, setIsModalAddDataOpen] = useState(false);
  const [isModalUpdateDataOpen, setIsModalUpdateDataOpen] = useState(false);
  const [isModalDeleteDataOpen, setIsModalDeleteDataOpen] = useState(false);
  const [isModalNewReportOpen, setIsModalNewReportOpen] = useState(false);
  const [isModalChangeStatusOpen, setIsModalChangeStatusOpen] = useState(false);
  const [isModalAddActualWeightOpen, setIsModalAddActualWeightOpen] =
    useState(false);

  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contextValue = {
    isNgMasukBtnClicked,
    isNgProduksiBtnClicked,
    isHistoryBtnClicked,
    setIsHistoryBtnClicked,
    setIsNgProduksiBtnClicked,
    setIsNgMasukBtnClicked,
    part,
    shift,
    machine,
    date,
    jenisNg,
    jumlahNg,
    setJenisNg,
    setJumlahNg,
    setPart,
    setShift,
    setMachine,
    setDate,
    isUiHeaderDisabled,
    allDataReport,
    historyData,
    allDataByNik, setAllDataByNik,
    setHistoryData,
    setAllDataReport,
    setIsUiHeaderDisabled,
    docId1,
    docId2,
    setDocId1,
    setDocId2,
    isModalAddDataOpen,
    isModalUpdateDataOpen,
    isModalChangeStatusOpen,
    isModalNewReportOpen, 
    setIsModalNewReportOpen,
    setIsModalChangeStatusOpen,
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    selectedPart,
    selectedShift,
    selectedMachine,
    selectedDate,
    selectedJenisNg,
    selectedJumlahNg,
    setSelectedMachine,
    setSelectedPart,
    setSelectedShift,
    setSelectedDate,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    isModalDeleteDataOpen,
    isModalAddActualWeightOpen,
    setIsModalAddActualWeightOpen,
    setIsModalDeleteDataOpen,
    isWrongPassword,
    setIsWrongPassword,
    isBtnLoading,
    password,
    setPassword,
    setIsBtnLoading,
    errorMessage, 
    setErrorMessage,
    estimasiTotalBerat,
    selectedEstimasiBerat,
    setEstimasiTotalBerat,
    selectedActualBerat,
    setSelectedActualBerat,
    setSelectedEstimasiBerat,
    status,
    setStatus,
    selectedStatus,
    setSelectedStatus,
    actualTotalBerat,
    selectedEstimasiBerat,
    isNgKeluarBtnClicked,
    setActualTotalBerat,
    setSelectedEstimasiBerat,
    setIsNgKeluarBtnClicked,
    weightTolerance,
    setWeightTolerance,
  };

  return (
    <StateBasketContext.Provider value={contextValue}>
      {children}
    </StateBasketContext.Provider>
  );
};

export const useStateBasketContext = () => {
  const context = useContext(StateBasketContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
