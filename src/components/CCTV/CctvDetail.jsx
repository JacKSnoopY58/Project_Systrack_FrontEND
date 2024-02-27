import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_GET } from '../../api';
import { Card, Row, Col, Button, Form, FormGroup } from 'react-bootstrap';
import { CctvProvider } from '../../Provider/CctvProvider';
import { ConfirmModal } from '../Modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CctvDetail() {
    let params = useParams();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [ipcId, setIpcId] = useState(0);
    const [ipAddress, setIpAddress] = useState("");
    const [cctvName, setCctvName] = useState("");
    const [cctvPlaceId, setCctvPlaceId] = useState(0);
    const [cctvPlaceName, setCctvPlaceName] = useState([]);
    const [ipcStatus, setIpcStatus] = useState(0);
    const [ipcStatusName, setIpcStatusName] = useState([]);


    const [validated, setValidated] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);


    useEffect(() => {
        async function fetchData() {
            //This end point from server
            const response = await API_GET("ac_place_name");
            setCctvPlaceName(response.data);      
        }
        fetchData();

        
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await API_GET("ipc_status_name");
            // let json = await response.json();
            setIpcStatusName(response.data);
        }
        fetchData();

    }, []);

    useEffect(() => {
        async function fetchData(ipcId) {

            let json = await API_GET("cctv/" + ipcId);

            var data = json.data[0];

            setIpcId(data.ipc_id);
            setIpAddress(data.ipc_address);
            setCctvName(data.ipc_name);
            setIpcStatus(data.ipc_status);
            setCctvPlaceId(data.place_id);

        }

        if (params.ipcId !== "create") {
            fetchData([params.ipcId]);
        }

    }, [params.ipcId]);


    const handleSubmit = (event) => {
        console.log("handleSubmit");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("false");
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Prevent the default form submission
            if (params.ipcId === "create") {
                setShowConfirmModal(true);
            } else {
                setShowConfirmModal(true);
            }
        }

        setValidated(true);
    };

    const doCreateCctv = async () => {

        console.log(ipAddress, cctvName, ipcStatus, cctvPlaceId);

        let json = await CctvProvider.createCctv(ipAddress, cctvName, ipcStatus, cctvPlaceId);
        console.log(json);
        if (json.result) {
            // window.location = "/cctv/all";
            const Toast = MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = MySwal.stopTimer;
                  toast.onmouseleave = MySwal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Create CCTV Success!"
              });
            navigate("/cctv/all");
        }
    }

    const doUpdateCctv = async () => {
        let json = await CctvProvider.updateCctv(ipcId, ipAddress, cctvName, ipcStatus, cctvPlaceId);
        if (json.result) {
            // window.location = "/cctv/all";
            const Toast = MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = MySwal.stopTimer;
                  toast.onmouseleave = MySwal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Update CCTV Success!"
              });
            navigate("/cctv/all");

        }
    }

    const onHide = () => {
        setShowConfirmModal(false);
    }

    const getMessageModal = () => {

        const modalTitle = params.ipcId === "create" ? "เพิ่มข้อมูล CCTV" : "อัปเดตข้อมูล CCTV";
        const modalMessage =
            params.ipcId === "create"
                ? "คุณต้องการเพิ่มข้อมูล CCTV ใช่หรือไม่?"
                : "คุณต้องการอัปเดตข้อมูล CCTV ใช่หรือไม่?";

        return (
            <ConfirmModal
                show={showConfirmModal}
                title={modalTitle}
                message={modalMessage}
                confirm={params.ipcId === "create" ? doCreateCctv : doUpdateCctv}
                onHide={onHide}
            />
        )
    }

    return (
        <>
            {getMessageModal()}
            <div style={{ background: '#eaeaea', width: '100%', minHeight: '100vh' }}>
                <div style={{ margin: '3rem', marginTop: '5rem' }}>
                    <Card>
                        <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูล CCTV</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <h5>Please Enter CCTV information</h5>
                                <hr />
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> IP Address <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5">
                                        <Form.Control type="text"
                                            value={ipAddress}
                                            placeholder="Enter IP Address"
                                            onChange={(e) => setIpAddress(e.target.value)} required />
                                        <Form.Control.Feedback type="invalid"> Please Enter IP Address</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*CCTV Name */}
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> CCTV Name  <span className="text-danger"> * </span> :</Form.Label>
                                    <Col sm="5">
                                        <Form.Control type="text"
                                            value={cctvName}
                                            placeholder="Enter CCTV Name"
                                            onChange={(e) => setCctvName(e.target.value)} required />
                                        <Form.Control.Feedback type="invalid"> Please Enter CCTV Name</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*IPC Status */}
                                <FormGroup as={Row} className="mb-3" controlId="validateIpcStatus">
                                    <Form.Label column sm="2"> IPC Status <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5">
                                        <Form.Select
                                            value={ipcStatus}
                                            onChange={(e) => setIpcStatus(e.target.value)}
                                            required>
                                            <option label="Select CCTV Status"></option>
                                            {ipcStatusName.map((item, index) => (
                                                <option key={index}
                                                    value={item.ipc_status}>
                                                    {item.ipc_status_name}
                                                </option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        Please select IPC Status.
                                    </Form.Control.Feedback>
                                </FormGroup>
                                {/*CCTV Place */}
                                <FormGroup as={Row} className="mb-3" controlId="validateIpcStatus">
                                    <Form.Label column sm="2"> อาคาร <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5">
                                        <Form.Select 
                                        value={cctvPlaceId} 
                                        onChange={(e) => setCctvPlaceId(e.target.value)} 
                                        required>
                                            <option label="กรุณาเลือกอาคาร"></option>
                                            {cctvPlaceName.map((item, index) => (
                                                <option key={index} 
                                                        value={item.place_id}>
                                                {item.place_name}
                                                </option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        กรุณาเลือกอาคาร
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <button class="btn btn-success" type="submit" style={{ marginRight: '10px' }}>SAVE</button>
                                    <Button onClick={() => navigate("/cctv/all")} variant="secondary">Back</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}