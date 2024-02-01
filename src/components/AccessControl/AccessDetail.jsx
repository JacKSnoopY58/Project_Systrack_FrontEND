import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_GET } from '../../api';
import { Card, Row, Col, Button, Form, FormGroup } from 'react-bootstrap';
import { ConfirmModal } from '../Modal';
import { AccessProvider } from '../../Provider/AccessProvider';

export default function AccessDetail() {
    let params = useParams();

    const [acId, setAcId] = useState(0);
    const [acIp, setAcIp] = useState("");
    const [acName, setAcName] = useState("");
    const [acPlaceId, setAcPlaceId] = useState(0);
    const [acPlaceName, setAcPlaceName] = useState([]);

    const [validated, setValidated] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);


    useEffect(() => {
        async function fetchData() {
            //This end point from server
            const response = await API_GET("ac_place_name");
            // let json = await response.json();
            setAcPlaceName(response.data);        
        }
        fetchData();
        
    }, []);

    useEffect(() => {
        async function fetchData(acId){
            
            let json = await API_GET("AccessControl/" + acId);

            var data = json.data[0];

            setAcId(data.ac_id);
            setAcIp(data.ac_ip);
            setAcName(data.ac_device_name);
            setAcPlaceId(data.place_id);

        }

        if (params.acId !== "create"){
            fetchData([params.acId]);
        }

    }, [params.acId]);
 

    const handleSubmit = (event) => {
        console.log("handleSubmit");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("false");
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault(); // Prevent the default form submission
           if (params.acId === "create"){
                setShowConfirmModal(true);
              } else {
                setShowConfirmModal(true);
              }
        }
    
        setValidated(true);
      };

    const doCreateAccess = async () => {

        console.log(acIp, acName, acPlaceId);
        let json = await AccessProvider.createAccess(acIp, acName, acPlaceId);
        if (json.result){
            window.location = "/AccessControl/all";
        }
    }

    const doUpdateAccess = async () => {
        let json = await AccessProvider.updateAccess(acId, acIp, acName, acPlaceId);
        if (json.result){
            window.location = "/AccessControl/all";
        }
    }

    const onHide = () => {
        setShowConfirmModal(false);
    }

    const getMessageModal = () => {

        const modalTitle = params.acId === "create" ? "เพิ่มข้อมูล Access Control" : "อัปเดตข้อมูล Access Control";
        const modalMessage =
        params.acId === "create"
            ? "คุณต้องการเพิ่มข้อมูล Access Control ใช่หรือไม่?"
            : "คุณต้องการอัปเดตข้อมูล Access Control ใช่หรือไม่?";
        
        return (
            <ConfirmModal
                show={showConfirmModal}
                title={modalTitle}
                message={modalMessage}
                confirm={params.acId === "create" ? doCreateAccess : doUpdateAccess}
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
                        <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูล Access Control</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <h5>Please Enter Access Control information</h5>
                                <hr/>
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> IP Address <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5"> 
                                    <Form.Control type="text" 
                                        value={acIp} 
                                        placeholder="Enter IP Address" 
                                        onChange={(e) => setAcIp(e.target.value)} required/>
                                    <Form.Control.Feedback type="invalid"> Please Enter IP Address</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*CCTV Name */}
                                <FormGroup as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2"> Device Name  <span className="text-danger"> * </span> :</Form.Label>
                                    <Col sm="5">
                                        <Form.Control type="text" 
                                            value={acName}
                                            placeholder="Enter Device Name"
                                            onChange={(e) => setAcName(e.target.value)} required/>
                                        <Form.Control.Feedback type="invalid"> Please Enter Device Name</Form.Control.Feedback>
                                    </Col>
                                </FormGroup>
                                {/*IPC Status */}
                                <FormGroup as={Row} className="mb-3" controlId="validateIpcStatus">
                                    <Form.Label column sm="2"> อาคาร <span className="text-danger"> * </span> : </Form.Label>
                                    <Col sm="5">
                                        <Form.Select 
                                        value={acPlaceId} 
                                        onChange={(e) => setAcPlaceId(e.target.value)} 
                                        required>
                                            <option label="กรุณาเลือกอาคาร"></option>
                                            {acPlaceName.map((item, index) => (
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
                                <Button type="submit" as="input"  className="sign-btn" value="SAVE" style={{background: 'green' , border: '0'}} />
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}