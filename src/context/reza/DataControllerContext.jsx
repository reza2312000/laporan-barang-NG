import React, { createContext, useContext } from "react";
import { useStateBasketContext } from "./StateBasketContext";
import axios from "axios";
import { useSession } from "next-auth/react";

const DataControllerContext = createContext();

export const DataControllerContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const {
    docId1,
    docId2,
    setDocId1,
    setDocId2,
    part,
    shift,
    machine,
    date,
    jenisNg,
    jumlahNg,
    status,
    estimasiTotalBerat,
    actualTotalBerat,
    setAllDataReport,
    setIsUiHeaderDisabled,
    setIsModalAddDataOpen,
    setIsModalUpdateDataOpen,
    setIsModalDeleteDataOpen,
    setIsModalAddActualWeightOpen,
    setIsModalChangeStatusOpen,
    setIsModalNewReportOpen,
    selectedPart,
    selectedShift,
    selectedMachine,
    selectedDate,
    selectedJenisNg,
    selectedJumlahNg,
    selectedEstimasiBerat,
    selectedActualBerat,
    setSelectedPart,
    setSelectedShift,
    setSelectedMachine,
    setSelectedDate,
    setSelectedJenisNg,
    setSelectedJumlahNg,
    setSelectedEstimasiBerat,
    setSelectedActualBerat,
    setSelectedStatus,
    setIsBtnLoading,
    setHistoryData,
    setAllDataByNik
  } = useStateBasketContext();

  const addData = async () => {
    try {
      const defaultStatus = "Waiting";
      setIsBtnLoading(true);
      const response = await axios.post("/api/data/addData", {
        name: session?.user.nama,
        nik: session?.user.nik,
        part: part,
        shift: shift,
        machine: machine,
        date: date,
        jenisNg: jenisNg,
        jumlahNg: jumlahNg,
        estimasiBerat: estimasiTotalBerat,
        status: defaultStatus,
      });
      await getAllData();
      await getDataByNik();
      setDocId1(response.data.docRefs[0]);
      setDocId2(response.data.docRefs[1]);
      setIsBtnLoading(false);
      setIsUiHeaderDisabled(true);
      setIsModalAddDataOpen(false);
    } catch (error) {
      setIsBtnLoading(false);
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

  const getDataByNik = async () => {
    const userNik = session?.user.nik
    try {
      const response = await axios.get(`/api/data/getDataByNik?userNik=${userNik}`);
      setAllDataByNik(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getHistory = async () => {
    try {
      const response = await axios.get("/api/data/getHistory");
      setHistoryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataById = async (itemId) => {
    try {
      const response = await axios.get(`/api/data/getDataById?docId=${itemId}`);
      setDocId1(itemId);
      setSelectedShift(response.data.shift);
      setSelectedDate(response.data.date);
      setSelectedMachine(response.data.mesin);
      setSelectedPart(response.data.data_NG.part);
      setSelectedJenisNg(response.data.data_NG.jenis_NG);
      setSelectedJumlahNg(response.data.data_NG.jumlah_NG);
      setSelectedEstimasiBerat(response.data.data_NG.estimasi_berat);
      setSelectedActualBerat(response.data.data_NG.aktual_berat);
      setSelectedStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateData", {
        docId1: docId1,
        docId2: docId2,
        part: selectedPart,
        machine: selectedMachine,
        shift: selectedShift,
        date: selectedDate,
        jenisNg: selectedJenisNg,
        jumlahNg: selectedJumlahNg,
        estimasiBerat: estimasiTotalBerat,
        aktualBerat: selectedActualBerat ? selectedActualBerat : 0,
      });
      await getAllData();
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false), setIsModalUpdateDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalUpdateDataOpen(false);
    }
  };

  const updateStatus = async () => {
    try {
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateStatus", {
        docId1: docId1,
        docId2: docId2,
        status: status,
      });
      await getAllData();
      setIsBtnLoading(false);
      setIsModalChangeStatusOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalChangeStatusOpen(false);
    }
  };

  const updateActualWeight = async () => {
    try {
      const defaultActualBerat = 0;
      setIsBtnLoading(true);
      await axios.patch("/api/data/updateActualWeight", {
        docId1: docId1,
        docId2: docId2,
        part: selectedPart,
        jenisNg: selectedJenisNg,
        jumlahNg: selectedJumlahNg,
        estimasiBerat: selectedEstimasiBerat,
        aktualBerat: actualTotalBerat ? actualTotalBerat : defaultActualBerat,
      });
      await getAllData();
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false);
    } catch (error) {
      console.log(error);
      setIsBtnLoading(false);
      setIsModalAddActualWeightOpen(false);
    }
  };

  const deleteData = async () => {
    try {
      setIsBtnLoading(true);
      await axios.delete(
        `/api/data/deleteData?docId=${docId1}`
      );
      await getAllData();
      setIsBtnLoading(false);
      setIsModalDeleteDataOpen(false);
      setIsModalUpdateDataOpen(false);
    } catch (error) {
      console.log(error);
      setIsModalDeleteDataOpen(false);
      setIsModalUpdateDataOpen(false);
    }
  };

  const deleteAllData = async () => {
    try {
      setIsBtnLoading(true)
      await axios.delete("/api/data/deleteDataReportCollection");
      await getAllData();
      setIsBtnLoading(false)
      setIsModalAddDataOpen(true);
      setIsModalNewReportOpen(false);
    } catch (error) {
      setIsModalAddDataOpen(false);
      setIsModalNewReportOpen(false);
      console.log(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      setIsBtnLoading(true)
      await axios.delete("/api/data/deleteHistoryCollection");
      await getHistory();
      setIsBtnLoading(false)
      setIsModalDeleteDataOpen(false);
      } catch (error) {
      setIsModalDeleteDataOpen(false);
      console.log(error);
    }
  };

  const contextValue = {
    addData,
    getAllData,
    getDataByNik,
    getHistory,
    getDataById,
    updateData,
    deleteData,
    updateStatus,
    updateActualWeight,
    deleteAllData,
    deleteAllHistory
  };

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
