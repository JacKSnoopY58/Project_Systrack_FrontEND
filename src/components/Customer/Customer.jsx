import { useState , useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import CustomerItem from './CustomerItem';

export default function Customer() {
    const [search,setSearch] = useState("");
    const [customerdata, setCustomerData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(   
                "http://localhost:4080/api/customer_read",
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
            
            //* ค้นหาข้อมูล
            const result = json.data.filter((item)=> item.cus_name.includes(search)|| item.cus_tel.includes(search) || item.cus_lastname.includes(search));

            setCustomerData(result);
        }
        fetchData();
        
    }, [search]);


    return (
        <div style={{ background: '#eaeaea', width: '100%', height: '100vh' }}>
            <Link className="btn btn-success btn-sm" to="/customer/create" style={{ marginLeft: '3rem', marginTop: '40px'}}>+เพิ่มข้อมูลลูกค้า</Link>

            <InputGroup style={{ marginLeft: '3rem', marginTop: '30px', width: '40%' }}>
                <Form.Control
                    placeholder="ค้นหาชื่อและเบอร์โทรลูกค้า"
                    aria-label="ค้นหาชื่อและเบอร์โทรลูกค้า"
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            <div style={{ margin: '3rem' , marginTop: '1rem'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr role="row" className="bg-secondary text-white">
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>ลำดับ</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>หมายเลขลูกค้า</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '10%' , textAlign: 'center'}}>ชื่อ-นามสกุล</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '10%' , textAlign: 'center'}}>เบอร์โทร</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>ที่อยู่</th>
                            <th tabIndex="0" rowSpan="1" colSpan="1" style={{width: '5%' , textAlign: 'center'}}>แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(customerdata) && customerdata.length > 0 ? (
                            customerdata.map((item, index) => (
                                <CustomerItem key={item.cus_id} index={index + 1} {...item} />
                            ))
                        ) : (
                            <tr style={{textAlign: 'center'}}>
                                <td colSpan="6">ไม่มีข้อมูลลูกค้า</td>
                            </tr>
                        )}
                    </tbody>    
                </Table>      
            </div>

        </div>
       
    );
}