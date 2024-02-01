import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function DetailItem(props) {
    const { } = props;
    return (
        <>
            <div style={{ margin: '3rem', marginTop: '3rem' }}>
                <Card>
                    <Card.Header as="h5" className="bg-primary text-white">เพิ่มข้อมูลลูกค้า</Card.Header>
                    <Card.Body>
                        <Form>
                            <div className="card-body ml-5">
                                <Form.Group className="row">
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
                                </Form.Group>
                                <Form.Group className="row">
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
                                </Form.Group>
                                <Form.Group className="row">
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
                                </Form.Group>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}