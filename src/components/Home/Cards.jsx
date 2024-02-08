import "./Cards.css"
import Card from 'react-bootstrap/Card';
import { BsBank2 } from "react-icons/bs";
import { TbDeviceDesktopAnalytics, TbProgressBolt } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';

export default function Cards() {
    return (
        <>
            <div style={{ marginTop: '40px', marginLeft: '40px' }}>
                <h4>Dashboard</h4>
            </div>
            <Container className="my-3 mb-4">
                <Row>
                    {/* <div className="d-flex justify-content-start" style={{ margin: '45px' }}> */}

                    <Col xs={12} sm={12} md={6} xl={3} className="expand-col-top">
                        <Card style={{ borderRadius: 20}}  >
                            <Card.Body>
                                <Card.Title className="text-dark m-1">
                                    Online
                                </Card.Title>
                                <Card.Text className="m-3 justify-content-start" style={{ display: 'flex', alignItems: 'center' }}>
                                    <HiStatusOnline style={{ fontSize: 50, color: 'green' }}/>
                                    <span style={{ marginLeft: '5rem', fontSize: 40 }}> 546 </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>


                    <Col xs={12} sm={12} md={6} xl={3} className="expand-col-top">
                        <Card style={{ borderRadius: 20}}  >
                            <Card.Body>
                                <Card.Title className="text-dark m-1">
                                    In Progress
                                </Card.Title>
                                <Card.Text className="m-3 justify-content-start" style={{ display: 'flex', alignItems: 'center' }}>
                                    <TbProgressBolt style={{ fontSize: 50, color: 'yellow' }} className="m-2" />
                                    <span style={{ marginLeft: '5rem', fontSize: 40 }}> 29 </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>

                    <Col xs={12} sm={12} md={6} xl={3} className="expand-col-top">
                        <Card style={{ borderRadius: 20}}  >
                            <Card.Body>
                                <Card.Title className="text-dark m-1">
                                    Offline
                                </Card.Title>
                                <Card.Text className="m-3 justify-content-start" style={{ display: 'flex', alignItems: 'center' }}>
                                    <HiStatusOffline style={{ fontSize: 50, color: 'red' }} className="m-2" />
                                    <span style={{ marginLeft: '5rem', fontSize: 40 }}> 12 </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>

                    <Col xs={12} sm={12} md={6} xl={3}  className="expand-col-top">
                        <Card style={{ borderRadius: 20}}  >
                            <Card.Body>
                                <Card.Title className="text-dark m-1">
                                    All Hardware
                                </Card.Title>
                                <Card.Text className="m-3 justify-content-start" style={{ display: 'flex', alignItems: 'center' }}>
                                    <TbDeviceDesktopAnalytics style={{ fontSize: 50, color: 'orange' }} />
                                    <span style={{ marginLeft: '5rem', fontSize: 40 }}> 587 </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* </div> */}
                </Row>
            </Container>
        </>
    );
}