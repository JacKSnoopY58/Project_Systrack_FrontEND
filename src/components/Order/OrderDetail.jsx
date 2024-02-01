import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function OrderDetail() {
    let params = useParams();
    const [cus_data, setCusData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:4080/api/customer/readone/${params.cus_number}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            );
            let json = await response.json();

            if (json.result) {
                // API สำเร็จ
                setCusData(json.data[0]); // อาจเป็น json.data[0] หรือแบบอื่นขึ้นอยู่กับโครงสร้างข้อมูลที่ API คืน
            } else {
                // ไม่พบข้อมูลหรือเกิดข้อผิดพลาด
                setCusData(null);
            }
        }

        fetchData();
    }, [params.cus_number]);

    return (
        <div style={{ background: '#eaeaea', width: '100%' }}>
            <div style={{ margin: '3rem', marginTop: '3rem' }}>
                <Card>
                    <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูลลูกค้า</Card.Header>
                    <Card.Body>
                        <div className="card-body ml-5">
                            <div className="row">
                                <label htmlFor="recipient-name" className="col-md-2">
                                    ชื่อ <span className="text-danger"> * </span>:
                                </label>
                                <div className="form-group col-md-6">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        value={cus_data ? cus_data.cus_name : ""}
                                        placeholder="กรอกชื่อของลูกค้า"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="recipient-name" className="col-md-2">
                                    นามสกุล <span className="text-danger"> * </span>:
                                </label>
                                <div className="form-group col-md-6">
                                 <Form.Control
                                        type="text"
                                        className="form-control"
                                        value={cus_data ? cus_data.cus_lastname : ""}
                                        placeholder="กรอกนามสกุลของลูกค้า"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="recipient-name" className="col-md-2">
                                    เบอร์โทร <span className="text-danger"> * </span>:
                                </label>
                                <div className="form-group col-md-6">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        maxLength={10}
                                        value={cus_data ? cus_data.cus_tel : ""}
                                        placeholder="099-999-9999"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
