import Sidebar from "@/components/Sidebar";
import HistoryViews from "@/components/Views/HistoryViews";
import NgKeluarViews from "@/components/Views/NgKeluarViews";
import NgMasukViews from "@/components/Views/NgMasukViews";
import NgProduksiViews from "@/components/Views/NgProduksiViews";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const {data: session} = useSession()
  const router = useRouter()
  const { isNgMasukBtnClicked, isNgProduksiBtnClicked, isNgKeluarBtnClicked, isHistoryBtnClicked } =
    useStateBasketContext();

    const checkSession = () => {
      if(!session) {
        router.push("/auth/login")
      }
    }

    useEffect(()=> {
      checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[session])

  return (
    <div className="flex">
      <Sidebar />
      {isNgMasukBtnClicked ? (
        <NgMasukViews />
      ) : isNgProduksiBtnClicked ? (
        <NgProduksiViews />
      ) : isNgKeluarBtnClicked ? (
        <NgKeluarViews />
      ) : isHistoryBtnClicked ? (
        <HistoryViews/>
      ) : ""}
    </div>
  );
};
export default Dashboard;
