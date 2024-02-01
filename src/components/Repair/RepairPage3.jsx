import RepairItem from "./RepairItem";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import { auto } from "@popperjs/core";

export default function RepairPage3() {
    const [repairData, setRepairData] = useState([]);

    // * แสดงรายการแจ้งซ่อม
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:4080/api/repair_read4",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            )            

            let json = await response.json();
            setRepairData(json.data);
        }

        fetchData();
    }, []);

    return (
        <div style={{ background: '#eaeaea', width: '100%', height: '100vh'}}>
            <Link to="/order" className="btn btn-success btn-sm" style={{ marginLeft: '50px' , marginTop: '40px'}}>+แจ้งซ่อม</Link>
            <div style={{ margin: '3rem' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr role="row" className="bg-secondary text-white">
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '9%' , textAlign: 'center'}}>สถานะ</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '10%' , textAlign: 'center'}}>วัน-เดือน-ปี แจ้งซ่อม</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '7%' , textAlign: 'center'}}>เลขแจ้งซ่อม</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '15%' , textAlign: 'center'}}>ชื่อลูกค้า</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '15%' , textAlign: 'center'}}>อุปกรณ์</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '10%' , textAlign: 'center'}}>อาการเสีย</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '8%' , textAlign: 'center'}}>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            repairData.map((item) => (
                                <RepairItem key={item.repair_id} {...item} />
                            ))
                        }
                    </tbody>
                </Table>      
            </div>
        </div>
    );
}
