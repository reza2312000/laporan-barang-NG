import { useDataControllerContext } from "@/context/reza/DataControllerContext";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import {
  faCheck,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import ModalAddData from "../ModalViews/ModalAddData";
import Footer from "@/components/Footer";
import ModalUpdateData from "../ModalViews/ModalUpdateData";
import ModalDeleteData from "../ModalViews/ModalDeleteData";

const NgProduksiViews = () => {
  const { data: session } = useSession();
  const {
    allDataReport,
    shift,
    date,
    setShift,
    setDate,
    isUiHeaderDisabled,
    isModalAddDataOpen,
    setIsModalAddDataOpen,
    isModalUpdateDataOpen,
    setIsModalUpdateDataOpen,
    isModalDeleteDataOpen
  } = useStateBasketContext();
  const { getAllData, getDataById } = useDataControllerContext();

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="container bg-white min-h-screen shadow-xl border-2 p-2">
          <h1 className="font-bold">Input NG</h1>
          <hr className="mt-2" />
          <div className="container">
            <div className="py-3">
              <div className="flex items-center justify-between border-2 rounded-lg p-2">
                <div className="flex">
                  <p className="font-semibold">
                    Shift :
                    <span className="me-4">
                      <select
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        className="select select-sm select-bordered mt-1 ms-2"
                        disabled={isUiHeaderDisabled}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </span>
                  </p>
                  <p className="font-semibold">
                    Tanggal :
                    <span>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input input-sm input-bordered mt-1 ms-2"
                        disabled={isUiHeaderDisabled}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-2 rounded px-3">
              <div className="my-3">
                <button
                  onClick={() => setIsModalAddDataOpen(true)}
                  className="btn btn-sm btn-primary shadow-md shadow-gray-300 border-2"
                >
                  Tambah
                  <span className="ms-1">
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </span>
                </button>
              </div>
              <table className="table border my-2">
                <thead>
                  <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Nama Part</th>
                    <th className="text-center">Jenis NG</th>
                    <th className="text-center">Jumlah</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDataReport.map((item, index) => (
                     <tr key={item.id}>
                     <td className="text-center">{index + 1}</td>
                     <td className="text-center">{item.data_NG.part}</td>
                     <td className="text-center">{item.data_NG.jenis_NG}</td>
                     <td className="text-center">{item.data_NG.jumlah_NG}</td>
                     <td className="text-center">
                       <button onClick={()=> {getDataById(item.id); setIsModalUpdateDataOpen(true)}} className="btn btn-sm btn-neutral">
                         <FontAwesomeIcon icon={faPenToSquare} />
                       </button>
                     </td>
                   </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      {isModalAddDataOpen && <ModalAddData />}
      {isModalUpdateDataOpen && <ModalUpdateData />}
      {isModalDeleteDataOpen && <ModalDeleteData />}
    </div>
  );
};

export default NgProduksiViews;
