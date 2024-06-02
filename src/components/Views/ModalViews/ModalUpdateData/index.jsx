import { useDataControllerContext } from "@/context/reza/DataControllerContext";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "date-fns";

const { default: Modal } = require("@/components/Modal");

const ModalUpdateData = () => {
  const {
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
    setIsModalUpdateDataOpen,
    setIsModalDeleteDataOpen
  } = useStateBasketContext();
  const { updateData, deleteData } = useDataControllerContext();

  return (
    <Modal
      modalBody={
        <>
          <div className="flex justify-between">
            <h1>Edit Data</h1>
            <button
              onClick={() => setIsModalUpdateDataOpen(false)}
              className="me-1 mb-3"
            >
              ✕
            </button>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex justify-between px-1">
              <span className="text-sm font-semibold">
                Shift : <span className="text-primary">{selectedShift}</span>
              </span>
              <span className="text-sm font-semibold">
                Date :
                <span className="text-primary">
                  {formatDate(Date(selectedDate), "dd/MM/yyyy")}
                </span>
              </span>
            </div>
            <div className="mt-4">
              <label>
                <p className="font-semibold text-sm ms-1">Nama Part :</p>
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="select select-sm select-bordered mt-1 w-full"
                >
                  <option>Pilih Part</option>
                  <option value="Part 1">Part 1</option>
                  <option value="Part 2">Part 2</option>
                  <option value="Part 3">Part 3</option>
                </select>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jenis NG :</p>
                <span>
                  <select
                    value={selectedJenisNg}
                    onChange={(e) => setSelectedJenisNg(e.target.value)}
                    className="select select-sm select-bordered mt-1 w-full"
                  >
                    <option value="Patah">Patah</option>
                    <option value="Retak">Retak</option>
                    <option value="Lecet">Lecet</option>
                  </select>
                </span>
              </label>
              <label className="flex flex-col mt-3">
                <p className="font-semibold text-sm ms-1">Jumlah NG :</p>
                <span>
                  <input
                    value={selectedJumlahNg}
                    onChange={(e) => setSelectedJumlahNg(e.target.value)}
                    type="number"
                    className="input input-sm input-bordered mt-1 w-full"
                  />
                </span>
              </label>
            </div>
            <hr className="mt-3" />
            <div className="flex justify-end">
            <button
              onClick={()=> setIsModalDeleteDataOpen(true)}
              className="btn btn-sm btn-error mt-2"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              onClick={updateData}
              className="btn btn-sm btn-primary mt-2 ms-2 px-6"
            >
              Edit
            </button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default ModalUpdateData;
