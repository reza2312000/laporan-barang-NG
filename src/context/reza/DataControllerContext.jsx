import React, { createContext, useContext } from "react";
import { useStateBasketContext } from "./StateBasketContext";
import axios from "axios";
import { useSession } from "next-auth/react";

const DataControllerContext = createContext();

export const DataControllerContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const {
    docId,
    setDocId,
    part,
    shift,
    date,
    jenisNg,
    jumlahNg,
    setAllDataReport,
    setIsUiHeaderDisabled,
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    setIsModalDeleteDataOpen,
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
  } = useStateBasketContext();

  const addData = async () => {
    try {
      const response = await axios.post("/api/data/addData", {
        name: session?.user.nama,
        nik: session?.user.nik,
        part: part,
        shift: shift,
        date: date,
        jenisNg: jenisNg,
        jumlahNg: jumlahNg,
      });
      await getAllData();
      setIsUiHeaderDisabled(true);
      setIsModalAddDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsUiHeaderDisabled(false);
    }
  };

  const getAllData = async () => {
    try {
      const response = await axios.get("/api/data/getAllData");
      setAllDataReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataById = async (itemId) => {
    try {
      const response = await axios.get(`/api/data/getDataById?docId=${itemId}`);
      setDocId(itemId);
      setSelectedShift(response.data.shift)
      setSelectedDate(response.data.date)
      setSelectedPart(response.data.data_NG.part)
      setSelectedJenisNg(response.data.data_NG.jenis_NG)
      setSelectedJumlahNg(response.data.data_NG.jumlah_NG)
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      await axios.patch("/api/data/updateData", {
        docId: docId,
        part: selectedPart,
        shift: selectedShift,
        date: selectedDate,
        jenisNg: selectedJenisNg,
        jumlahNg: selectedJumlahNg,
      });
      await getAllData()
      setIsModalUpdateDataOpen(false)
    } catch (error) {
      console.log(error);
      setIsModalUpdateDataOpen(false)
    }
  };

  const deleteData = async () => {
    try{
      await axios.delete(`/api/data/deleteData?docId=${docId}`)
      await getAllData()
      setIsModalDeleteDataOpen(false)
      setIsModalUpdateDataOpen(false)
    } catch (error) {
      console.log(error)
      setIsModalDeleteDataOpen(false)
      setIsModalUpdateDataOpen(false)
    }
  }

  const contextValue = { addData, getAllData, getDataById, updateData, deleteData };

  return (
    <DataControllerContext.Provider value={contextValue}>
      {children}
    </DataControllerContext.Provider>
  );
};

export const useDataControllerContext = () => {
  const context = useContext(DataControllerContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
