import Sidebar from "@/components/Sidebar";
import NgMasukViews from "@/components/Views/NgMasukViews";
import NgProduksiViews from "@/components/Views/NgProduksiViews";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";

const Dashboard = () => {
  const { isNgMasukBtnClicked, isNgProduksiBtnClicked } = useStateBasketContext();
  return (
    <div className="flex">
      <Sidebar />
      {isNgMasukBtnClicked ? <NgMasukViews /> : isNgProduksiBtnClicked ? (<NgProduksiViews/>) : ""}
    </div>
  );
};
export default Dashboard;
