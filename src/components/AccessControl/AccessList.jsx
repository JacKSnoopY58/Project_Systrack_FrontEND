import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import { API_GET, API_POST } from '../../api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AccessItem from './AccessItem';
import Spinner from 'react-bootstrap/Spinner';
import { SERVER_URL } from '../../app.config';
import { PiSortAscendingBold, PiSortDescendingBold } from "react-icons/pi";
import { FaSort } from "react-icons/fa";

export default function AccessControl() {
    const MySwal = withReactContent(Swal);
    const [search, setSearch] = useState("");
    const [accessdata, setAccessdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(12);
    const [acPlaceName, setAcPlaceName] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");

    const [totalCount, setTotalCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(
    //             "http://localhost:4080/api/ac_read_all",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer " + localStorage.getItem("access_token")
    //                 }
    //             }
    //         );

    //         let json = await response.json();

    //         //* ค้นหาข้อมูล
    //         // const result = json.data.filter((item) => item.ac_ip.includes(search) || item.ac_device_name.includes(search));

    //         const result = json.data.filter((item) =>
    //             (item.ac_ip.includes(search) || item.ac_device_name.includes(search)) &&
    //             (selectedBuilding === "" || item.place_name === selectedBuilding)
    //         );

    //         setAccessdata(result);
    //         setCurrentPage(0); // Reset to the first page when the search changes
    //     }
    //     fetchData();
    // }, [search, selectedBuilding, accessdata.length]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(
                    SERVER_URL + "ac_read_all",
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

                const result = json.data.filter((item) =>
                    (item.ac_ip.includes(search) || item.ac_device_name.includes(search)) &&
                    (selectedBuilding === "" || item.place_name === selectedBuilding)
                );

                setAccessdata(result);
                setTotalCount(result.length);
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search, selectedBuilding, accessdata.length]);

    useEffect(() => {
        async function fetchData() {
            //This end point from server
            const response = await API_GET("ac_place_name");
            // let json = await response.json();
            setAcPlaceName(response.data);
        }
        fetchData();

    }, []);

    const fetchAc = async () => {
        let result = await API_GET("AccessControl/all/");
        console.log(result);
        setAccessdata(result.data);
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
                let json = await API_POST("AccessControl/delete", {
                    ac_id: data.ac_id
                });

                if (json.result) {
                    fetchAc();
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
        const totalPages = Math.ceil(accessdata.length / numPerPage);
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
        setCurrentPage(Math.ceil(accessdata.length / numPerPage) - 1);
    };

    const showAllData = () => {
        setNumPerPage(accessdata.length);
        setCurrentPage(0);
    };

    const handleBuildingSelect = (building) => {
        setSelectedBuilding(building);
    };

    // Sorting function
    const sortData = (column) => {
        let sortedData = [...accessdata];
        if (sortColumn === column) {
            sortedData.reverse();
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            sortedData.sort((a, b) => {
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            });
            setSortDirection('asc');
        }
        setSortColumn(column);
        setAccessdata(sortedData);
    };

    // Function to determine the sorting icon
    const sortingIcon = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <PiSortAscendingBold /> : <PiSortDescendingBold />;
        }
        return <FaSort />;
    };

    return (
        <>
            <div style={{ background: '#eaeaea', width: '100%', minHeight: '100vh' }}>
                <Link className="btn btn-success btn-sm" to="/AccessControl/create" style={{ marginLeft: '3rem', marginTop: '40px' }}>+ เพิ่มข้อมูล Device</Link>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputGroup style={{ marginLeft: '3rem', marginTop: '30px', width: '40%' }}>
                        <Form.Control
                            placeholder="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                            aria-label="ค้นหา IP address หรือ ชื่อกล้อง CCTV"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                    <Dropdown style={{ marginLeft: '10px', marginTop: '30px', }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-building">
                            Select Building : {selectedBuilding || "All"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {acPlaceName.map((item, index) => (
                                <Dropdown.Item key={index}
                                    onClick={() => handleBuildingSelect(item.place_name)}>
                                    {item.place_name}
                                </Dropdown.Item>
                            ))
                            }
                            <Dropdown.Item onClick={() => handleBuildingSelect("")}>
                                All
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {loading ? ( // Conditionally render Bootstrap spinner
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div>
                        <div style={{ margin: '3rem', marginTop: '1rem' }}>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr role="row" className="bg-secondary text-white">
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }} onClick={() => sortData('ac_ip')}>IP Address {sortingIcon('ac_ip')}</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }} onClick={() => sortData('ac_device_name')}>Device Name {sortingIcon('ac_device_name')}</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="1" style={{ width: '5%', textAlign: 'center' }}>อาคาร</th>
                                        <th tabIndex="0" rowSpan="1" colSpan="2" style={{ width: '1%', textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(accessdata) && accessdata.length > 0 ? (
                                        accessdata.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).map(item => (
                                            <AccessItem key={item.ac_id} data={item} onDelete={onDelete} />
                                        ))
                                    ) : (
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="6">ไม่พบข้อมูลที่ค้นหา</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <h6 className='ms-1'>Total CCTV: {totalCount}</h6>
                        </div>
                        <div className='container mt-3 border-bottom' style={{ marginLeft: '50px' }}>
                            <Pagination>
                                <Pagination.First onClick={firstPage} />
                                <Pagination.Prev disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} />

                                {renderPageNumbers()}

                                <Pagination.Next disabled={currentPage === Math.ceil(accessdata.length / numPerPage) - 1} onClick={() => setCurrentPage(currentPage + 1)} />
                                <Pagination.Last onClick={lastPage} />

                                <Dropdown className="float-end" style={{ marginLeft: '10px' }}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Rows per page: {numPerPage}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(10)}>10</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(25)}>25</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleNumPerPageSelect(50)}>50</Dropdown.Item>
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
