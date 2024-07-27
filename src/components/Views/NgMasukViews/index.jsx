import { useDataControllerContext } from "@/context/reza/DataControllerContext";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ModalAddActualWeight from "../ModalViews/ModalAddActualWeight";
import { formatDate } from "date-fns";
import ModalChangeStatus from "../ModalViews/ModalChangeStatus";

const NgMasukViews = () => {
  const { data: session } = useSession();
  const { getAllData, getDataById } = useDataControllerContext();
  const {
    allDataReport,
    isModalChangeStatusOpen,
    setIsModalChangeStatusOpen,
  } = useStateBasketContext();

  const weightToleranceFilter = (part) => {
    let tolerance;
    switch (part) {
      case "lowertow":
        tolerance = 5;
        break;
      case "Part 2":
        tolerance = 10;
        break;
      case "Part 3":
        tolerance = 1000;
        break;
      default:
        tolerance = 20;
    }
    return tolerance;
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="bg-gray-100 w-4/5">
      <div className="p-2 mx-auto">
        <div className="border-2 bg-white p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">NG Masuk</h1>
            {/* <h1 className="font-bold text-blue-600 me-2">Admin Gudang</h1> */}
          </div>
          <hr className="mt-2" />
          <table className="table border  mt-3">
            <thead className="bg-blue-500 text-white font-medium">
              <tr>
                <th className="text-center">No</th>
                <th className="text-center font-semibold">Nama Karyawan</th>
                <th className="text-center">Mesin</th>
                <th className="text-center">Nama Part</th>
                <th className="text-center">Jenis NG</th>
                <th className="text-center">Jumlah</th>
                <th className="text-center">Total Berat (Estimasi)</th>
                <th className="text-center">Total Berat (Aktual)</th>
                <th className="text-center">Tanggal</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allDataReport.map((item, index) => {
                const tolerance = weightToleranceFilter(item.data_NG.part);
                const isOverTolerance =
                  item.data_NG.aktual_berat >=
                  item.data_NG.estimasi_berat + tolerance;

                return (
                  <tr
                    key={item.id}
                    className={isOverTolerance ? "bg-red-600/30" : ""}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.nama}</td>
                    <td className="text-center">{item.mesin}</td>
                    <td className="text-center">{item.data_NG.part}</td>
                    <td className="text-center">{item.data_NG.jenis_NG}</td>
                    <td className="text-center text-error font-semibold">
                      {item.data_NG.jumlah_NG} pcs
                    </td>
                    <td className="text-center text-primary font-semibold">
                      {item.data_NG.estimasi_berat} gr
                    </td>
                    <td className="text-center text-green-600 font-semibold">
                      {item.data_NG.aktual_berat
                        ? `${item.data_NG.aktual_berat} gr`
                        : "-"}
                    </td>
                    <td className="text-center">
                      {formatDate(Date(item.date), "dd/MM/yyyy")}
                    </td>
                    <td className="text-center">
                      <span
                        className={`
                          item.status === "ACC"
                            ? "badge badge-accent"
                            : item.status === "Disapprove"
                            ? "badge badge-error text-white"
                            : "badge badge-warning" p-2 text-white rounded-md font-medium`
                        }
                      >
                        {item.status ? item.status : "Waiting"}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          getDataById(item.id);
                          setIsModalChangeStatusOpen(true);
                        }}
                        className="btn btn-sm btn-neutral"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalChangeStatusOpen && <ModalChangeStatus />}
    </div>
  );
};
export default NgMasukViews;
