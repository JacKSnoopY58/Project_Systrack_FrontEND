import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import CctvItem from './CctvItem';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import { API_GET, API_POST } from '../../api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from 'react-bootstrap/Spinner';
import { SERVER_URL } from '../../app.config';

export default function Customer() {
    const MySwal = withReactContent(Swal);
    const [search, setSearch] = useState("");
    const [cctvdata, setCctvdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(10);

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(
    //             "http://localhost:4080/api/cctv_read_all",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer " + localStorage.getItem("access_token")
    //                 }
    //             }
    //         )

    //         let json = await response.json();

    //         //* ค้นหาข้อมูล
    //         const result = json.data.filter((item) => item.ipc_address.includes(search) || item.ipc_name.includes(search));

    //         setCctvdata(result);
    //         setCurrentPage(0); // Reset to the first page when the search changes
    //     }
    //     fetchData();
    // }, [search, cctvdata.length]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(
                    SERVER_URL + "cctv_read_all",
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

                const result = json.data.filter((item) =>
                    item.ipc_address.includes(search) ||
                    item.ipc_name.includes(search)
                );
                setCctvdata(result);
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search, cctvdata.length]);

    const fetchCctvs = async () => {
        let result = await API_GET("cctv/all/");
        console.log(result);
        setCctvdata(result.data);
        setCurrentPage(0);
    };

    // Delete function
    const onDelete = (data) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // User clicked "Yes", proceed with deletion
                let json = await API_POST("cctv/delete", {
                    ipc_id: data.ipc_id
                });

                if (json.result) {
                    fetchCctvs();
                    MySwal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                }
            }
        });
    };

    // Pagination
    const MAX_PAGE_DISPLAY = 5;

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(cctvdata.length / numPerPage);
        const startPage = Math.max(0, currentPage - Math.floor(MAX_PAGE_DISPLAY / 2));
        const endPage = Math.min(totalPages - 1, startPage + MAX_PAGE_DISPLAY - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <Pagination.Item
                key={startPage + index}
                active={startPage + index === currentPage}
                onClick={() => handlePageSelect(startPage + index)}
            >
                {startPage + index + 1}
            </Pagination.Item>
        ));
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    const handleNumPerPageSelect = (selectedNum) => {
        setNumPerPage(selectedNum);
        setCurrentPage(0); // Reset to the first page when the number of rows per page changes
    };

    const firstPage = () => {
        setCurrentPage(0);
    };

    const lastPage = () => {
        setCurrentPage(Math.ceil(cctvdata.length / numPerPage) - 1);
    };

    const showAllData = () => {
        setNumPerPage(cctvdata.length);
        setCurrentPage(0);
    };

    return (
        <>
            <div style={{ background: '#eaeaea', width: '100%', minHeight: '100vh' }}>
                <Link className="btn btn-success btn-sm" to="/cctv/create" style={{ marginLeft: '3rem', marginTop: '40px' }}>+เพิ่มข้อมูล CCTV</Link>

                <InputGroup style={{ marginLeft: '3rem', marginTop: '30px', width: '40%' }}>
                    <Form.Control
                        placeholder="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                        aria-label="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                        aria-describedby="basic-addon2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>

                {loading ? ( // Conditionally render Bootstrap spinner
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div>
                        <div style={{ margin: '3rem', marginTop: '1rem' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr role="row" className="bg-secondary text-white">
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>IP Address</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>CCTV Name</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>Status</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(cctvdata) && cctvdata.length > 0 ? (
                                        cctvdata.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).map(item => (
                                            <CctvItem key={item.ipc_id} data={item} onDelete={onDelete} />
                                        ))
                                    ) : (
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="6">ไม่พบข้อมูลที่ค้นหา</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div className='container mt-3 border-bottom' style={{ marginLeft: '50px' }}>
                            <Pagination>
                                <Pagination.First onClick={firstPage} />
                                <Pagination.Prev disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} />

                                {renderPageNumbers()}

                                <Pagination.Next disabled={currentPage === Math.ceil(cctvdata.length / numPerPage) - 1} onClick={() => setCurrentPage(currentPage + 1)} />
                                <Pagination.Last onClick={lastPage} />

                                <Dropdown className="float-end" style={{ marginLeft: '10px' }}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Rows per page: {numPerPage}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(5)}>5</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(10)}>10</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(15)}>15</Dropdown.Item>
                                        <Dropdown.Item onClick={showAllData}>All</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Pagination>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
