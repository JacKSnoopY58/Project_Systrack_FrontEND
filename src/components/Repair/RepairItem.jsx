import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RepairItem(props) {
    //* ข้อมูลที่ส่งมาจาก DATABASE
    const {repair_number, cus_name, cus_lastname ,status_name, repair_date , brand_name , device_model, repair_detail} = props;
    
    //* แต่งสีสถานะต่าง ๆ 
    let status_color, color_name;

    switch (status_name) {
        case 'เสร็จสิ้น':
            status_color = 'rgb(0, 120, 0)';
            color_name = 'white';
            break;
        case 'รอตรวจเช็คอาการเสีย':
            status_color = 'rgb(51, 153, 255)';
            color_name = 'white';
            break;
        case 'กำลังดำเนินการ':
            status_color = 'rgb(255, 255, 0)';
            color_name = 'black';
            break;
        case 'รอมอบหมายงาน':
            status_color = 'rgb(255, 153, 51)';
            color_name = 'white';
            break;
        case 'ซ่อมเสร็จสิ้น / รอลูกค้ารับเครื่อง':
            status_color = 'rgb(153, 255, 51)';
            color_name = 'black';
            break;
        default:
            status_color = 'rgb(240, 240, 240)';
            color_name = 'black';
            break;
    }

    const tdStyle = {
        backgroundColor: status_color,
        color: color_name,
    };

    function showDetails() {
        // สร้างข้อความที่จะแสดงใน SweetAlert2
        const message = `
            รายการซ่อม: ${repair_number} <br />
            ชื่อลูกค้า: ${cus_name} ${cus_lastname} <br />
            สถานะ: ${status_name} <br />
            วันที่: ${formattedDate} <br />
            ยี่ห้อและรุ่น: ${brand_name} ${device_model} <br />
        `;
    
        // แสดง SweetAlert2
        Swal.fire({
            title: 'รายละเอียดของรายการซ่อม',
            html: message,
            icon: 'info'
        });
    }

    // Format the date to display it as "YYYY-MM-DD"
    const formattedDate = new Date(repair_date).toISOString().slice(0, 10);

    return(
        <>
            <tr style={{textAlign: 'center'}}>
                <td style={tdStyle}>{status_name}</td>
                <td>{formattedDate}</td>
                <td>{repair_number}</td>
                <td>{cus_name + " " + cus_lastname}</td>
                <td>{brand_name + " " + device_model}</td>
                <td>{repair_detail}</td>
                <td><Button variant="primary" size="sm" onClick={showDetails}>รายละเอียด</Button></td>
            </tr>
        </>
    );
}