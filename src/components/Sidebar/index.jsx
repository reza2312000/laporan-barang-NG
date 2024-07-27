import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import { useToggleFunctionContext } from "@/context/reza/ToggleFunctionContext";
import {
  faCaretRight,
  faCartArrowDown,
  faClockRotateLeft,
  faCubesStacked,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { useSession } = require("next-auth/react");

const Sidebar = () => {
  const { data: session } = useSession();
  const {
    isNgProduksiBtnClicked,
    isNgMasukBtnClicked,
    isNgKeluarBtnClicked,
    isHistoryBtnClicked,
  } = useStateBasketContext();
  const { toggleNgProduksi, toggleNgMasuk, toggleNgKeluar, toggleHistory } =
    useToggleFunctionContext();

  return (
    <div className="container w-1/5 min-h-screen">
      <div className="min-h-screen bg-blue-600">
        <div className="flex min-h-24 bg-blue-900 shadow-lg pt-3 pb-2.5 ps-2">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="w-full">
            <p className="text-white font-semibold ms-4 mt-2">
              {session?.user.nama}
            </p>
            <p className="text-white font-semibold underline underline-offset-4 ms-4 mt-2">
              {session?.user.role}
            </p>
          </div>
        </div>
        <div className="flex items-center min-h-10 text-white font-bold bg-blue-800 shadow-lg ps-2">
          NAVIGATION MENU
        </div>
        <div className="flex items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500">
          <FontAwesomeIcon icon={faHouse} />
          <span className="ms-2">Dashboard</span>
        </div>
        <hr />
        {session?.user.role === "Admin Gudang" ? "" : (
          <>
           <div
          onClick={toggleNgProduksi}
          className={`flex ${
            isNgProduksiBtnClicked ? "bg-blue-800" : ""
          } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
        >
          <div className="flex w-full justify-between">
            <div>
              <FontAwesomeIcon icon={faCubesStacked} />
              <span className="ms-3">NG Produksi</span>
            </div>
            {isNgProduksiBtnClicked ? (
              <span className="me-4">
                <FontAwesomeIcon icon={faCaretRight} size="lg" />
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
          </>
        )}
        <hr />
        {session?.user.role === "Operator Produksi" || session?.user.role === "Admin Gudang" ? (
          ""
        ) : (
          <>
            <div
              onClick={toggleNgMasuk}
              className={`flex ${
                isNgMasukBtnClicked ? "bg-blue-800" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  <span className="ms-2">NG Masuk</span>
                </div>
                {isNgMasukBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr />
          </>
        )}

        {session?.user.role === "Operator Produksi"  ? (
          ""
        ) : (
          <>
            <div
              onClick={toggleNgKeluar}
              className={`flex ${
                isNgKeluarBtnClicked ? "bg-blue-800" : ""
              } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
            >
              <div className="flex w-full justify-between">
                <div>
                  <FontAwesomeIcon icon={faCubesStacked} />
                  <span className="ms-3">NG Keluar</span>
                </div>
                {isNgKeluarBtnClicked ? (
                  <span className="me-4">
                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr />
          </>
        )}

        <div
          onClick={toggleHistory}
          className={`flex ${
            isHistoryBtnClicked ? "bg-blue-800" : ""
          } items-center min-h-12 text-white font-semibold ps-4 cursor-pointer hover:bg-blue-500`}
        >
          <div className="flex w-full justify-between">
            <div>
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <span className="ms-2.5">Riwayat</span>
            </div>
            {isHistoryBtnClicked ? (
              <span className="me-4">
                <FontAwesomeIcon icon={faCaretRight} size="lg" />
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
