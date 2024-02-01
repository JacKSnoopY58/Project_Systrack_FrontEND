import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import NotFound from "./components/NotFound/NotFound";
import Repair from "./components/Repair/Repair";
import Sidebar from "./components/Sidebar/Sidebar";
import Order from "./components/Order/Order";
import OrderDetail from "./components/Order/OrderDetail";
import Customer from "./components/Customer/Customer";
import CustomerCreate from "./components/Customer/CustomerCreate";
import RepairPage1 from "./components/Repair/RepairPage1";
import RepairPage2 from "./components/Repair/RepairPage2";
import RepairPage3 from "./components/Repair/RepairPage3";
import RepairPage4 from "./components/Repair/RepairPage4";
import RepairPage5 from "./components/Repair/RepairPage5";
import Cctv from "./components/CCTV/CctvList";
import CctvDetail from "./components/CCTV/CctvDetail";
import AccessControl from "./components/AccessControl/AccessList";
import AccessDetail from "./components/AccessControl/AccessDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} /> //*หน้าแรกของเว็บ

          <Route 
            path="/admin" 
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <Home/>
              </div>
            }
          />
          <Route
            path="/repair"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <Repair />
              </div>
            }
          />
          <Route
            path="/order"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <Order />
              </div>
            }
          />
          <Route
            path="/order/:cus_number"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <OrderDetail />
              </div>
            }
          />
          <Route
            path="/customer"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <Customer />
              </div>
            }
          />
          <Route
            path="/customer/create"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <CustomerCreate />
              </div>
            }
          />
          <Route
            path="/repair/page1"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <RepairPage1 />
              </div>
            }
          />
          <Route
            path="/repair/page2"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <RepairPage2 />
              </div>
            }
          />
          <Route
            path="/repair/page3"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <RepairPage3 />
              </div>
            }
          />
          <Route
            path="/repair/page4"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <RepairPage4 />
              </div>
            }
          />
          <Route
            path="/repair/page5"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <RepairPage5 />
              </div>
            }
          />
          <Route
            path="/cctv/all"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <Cctv />
              </div>
            }
          />
          <Route
            path="/cctv/:ipcId"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <CctvDetail />
              </div>
            }
          />
          <Route
            path="/AccessControl/all"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <AccessControl />
              </div>
            }
          />
          <Route
            path="/AccessControl/:acId"
            element={
              <div style={{display: "flex"}}>
                <Sidebar />
                <AccessDetail />
              </div>
            }
          />

          <Route path="*" element={<NotFound/>}/> //*หน้าอื่น ๆ ที่ไม่เกี่ยวข้อง 404
      </Routes>
    </BrowserRouter>
  )
}

export default App
