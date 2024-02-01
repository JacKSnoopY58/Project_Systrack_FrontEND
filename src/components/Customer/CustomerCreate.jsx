import { Form, Card, Row, Col , Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CustomerCreate() {
    
    function createCus() {

    }


    return (
        <>
            <div style={{ background: '#eaeaea', width: '100%' }}>
                <div style={{ margin: '3rem', marginTop: '3rem' }}>
                    <Card>
                        <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูลลูกค้า</Card.Header>
                        <Card.Body>
                            <Form onSubmit={createCus}>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ชื่อ <span className="text-danger"> * </span> :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกชื่อลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        นามสกุล <span className="text-danger"> * </span> :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกนามสกุลลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        เบอร์โทร <span className="text-danger"> * </span> :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" maxLength={10} placeholder="กรอกเบอร์โทรลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <hr />
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        บ้านเลขที่ :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกบ้านเลขที่ของลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        หมู่ที่ :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกหมายเลขหมู่บ้านของลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ซอย :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกซอยของลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ถนน :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกถนนของลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        จังหวัด  :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" value="สงขลา" readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        อำเภอ  :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Select aria-label="Default select example">
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ตำบล  :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Select aria-label="Default select example">
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        รหัสไปรษณีย์ :
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="กรอกรหัสไปรษณีย์ของลูกค้า" />
                                    </Col>
                                </Form.Group>
                                <Button type="submit" className="sign-btn" style={{background: 'green' , border: '0'}}>บันทึก</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}