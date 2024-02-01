import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BiSolidDashboard,
    BiTable,
    BiSolidGroup,
    BiSolidUserDetail,
    BiSolidHourglassTop,
    BiSolidCalendarEdit,
    BiSolidHourglass,
    BiCommentCheck,
    BiLoader,
    BiGroup,
    BiCog,
    BiTimer,
    BiLogOut,
    BiSolidCctv
} from "react-icons/bi";
import { PiPlugsConnected } from "react-icons/pi";
import { TbPlugConnectedX } from "react-icons/tb";
import { RiFileList2Line } from "react-icons/ri";
import { BsDoorClosedFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../asset/image/Logo2.png"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"
import { auto } from '@popperjs/core';
import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuScanFace } from "react-icons/lu";
import { FaRoadBarrier } from "react-icons/fa6";
import { ConfirmModal } from '../Modal';

export default function Sidebar() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const u_name = localStorage.getItem("u_name");
    const u_lastname = localStorage.getItem("u_lastname");

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalTitle, setConfirmModalTitle] = useState("");
    const [confirmModalMessage, setConfirmModalMessage] = useState("");

    let navigate = useNavigate();
    // -----------------------------------------------------

    const onHide = () => {
        setShowConfirmModal(false);
    }

    const getMessageModal = () => {
        return (
            <ConfirmModal
                show={showConfirmModal}
                title="ออกจากระบบ"
                message="คุณต้องการออกจากระบบใช่หรือไม่"
                confirm={Logout}
                onHide={onHide}
            />
        )
    }
    
    function Logout() {
        setShowConfirmModal(true);

        Swal.fire({
            title: 'คุณได้ออกจากระบบ',
            text: 'ขอบคุณที่ใช้บริการ กำลังเข้าสู่หน้าเข้าสู่ระบบ',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        })
        setTimeout(function () {
            navigate("/", { replace: false }); //* เข้าหน้า Home
        }, 2000);
    }

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
      };

    // -----------------------------------------------------
    return (
        <>
        {getMessageModal()}
         <div className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
                style={{ width: 300, height: '100%' }}
            >
           
                <Link to="/admin"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <img src={Logo} alt="logo" className="bi me-2 rounded" width={50} height={50} />
                    <span className='fs-5'>SYSTRACK Navigator</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto fs-5">
                    <li className="nav-item ">
                        <Link to="/admin" className="nav-link text-white" aria-current="page" style={{ display: 'flex', alignItems: 'center' }}>
                            <BiSolidDashboard style={{ width: '20px' }} />
                            <span style={{ marginLeft: '15px' }}>แดชบอร์ด</span>
                        </Link>
                    </li>
                    <button
                            style={{ display: 'flex', alignItems: 'center' }}
                            className="nav-link text-white btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#cctv-collapse"
                            aria-expanded="false"
                        >
                            <BiSolidCctv style={{ width: '20px' }} />
                            <span style={{ marginLeft: '15px' }}>CCTV</span>
                        </button>
                        <div className="collapse" id="cctv-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link to="/cctv/all" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#fffafa' }}>
                                        <RiFileList2Line style={{ width: '20px', marginLeft: '10px' }} />
                                        <span style={{ marginLeft: '15px' }}>รายการทั้งหมด</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dev" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#b1f558' }}>
                                        <PiPlugsConnected style={{ width: '20px', marginLeft: '10px' }} />
                                        <span style={{ marginLeft: '15px' }}>Online</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dev" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#fadf11' }}>
                                        <BiSolidHourglassTop style={{ width: '20px', marginLeft: '10px'}} />
                                        <span style={{ marginLeft: '15px' }}>In progress</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dev" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#f54040' }}>
                                        <TbPlugConnectedX style={{ width: '20px', marginLeft: '10px' }} />
                                        <span style={{ marginLeft: '15px' }}>Offine</span>
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    <button
                            style={{ display: 'flex', alignItems: 'center' }}
                            className="nav-link text-white btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#control-collapse"
                            aria-expanded="false"
                        >
                            <BsDoorClosedFill style={{ width: '20px' }} />
                            <span style={{ marginLeft: '15px' }}>Access control</span>
                        </button>
                        <div className="collapse" id="control-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link to="/AccessControl/all" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#fffafa' }}>
                                        <LuScanFace style={{ width: '20px', marginLeft: '10px' }} />
                                        <span style={{ marginLeft: '15px' }}>Face Scan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dev" className="nav-link" aria-current="page" style={{ display: 'flex', alignItems: 'center', color: '#fffafa' }}>
                                        <FaRoadBarrier style={{ width: '20px', marginLeft: '10px' }} />
                                        <span style={{ marginLeft: '15px' }}>ไม้ยก</span>
                                    </Link>
                                </li>
                            </ul>

                        </div>


                    <hr />
                    <li className="nav-item ">
                        <Link to="/customer" className="nav-link text-white" aria-current="page" style={{ display: 'flex', alignItems: 'center' }}>
                            <BiSolidUserDetail style={{ width: '20px' }} />
                            <span style={{ marginLeft: '15px' }}>ข้อมูลผู้ใช้</span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <BiSolidGroup
                            width={32}
                            height={32}
                            className="rounded-circle me-2 fs-4"
                        />
                        <strong>{u_name + " " + u_lastname}</strong>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-dark text-small shadow"
                        aria-labelledby="dropdownUser1"
                    >
                        <li>
                            <a className="dropdown-item" href="#" onClick={() => setShowConfirmModal(true)}>
                                ออกจากระบบ
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            <button
                className="btn btn-dark position-absolute top-0 end-0 m-3"
                onClick={toggleSidebar}
            >
                <IoMenu size={30} />
            </button>
        </>
    );
}