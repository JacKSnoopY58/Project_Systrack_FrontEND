import { useEffect, useState } from 'react';
import { Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { SERVER_URL } from '../../app.config';
import Spinner from 'react-bootstrap/Spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'จำนวนอุปกรณ์ที่มีอยู่ในระบบ'
        }
    }
}

export default function Charts() {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(
                    SERVER_URL + "report_count",
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

                console.log(json);

                var labels = [];
                var data = [];

                for (var i = 0; i < json.data.length; i++) {
                    var item = json.data[i];
                    labels.push(item.device_type_name);
                    data.push(item.Total);
                }

                var dataset = {
                    labels: labels,
                    datasets: [
                        {
                            label: "จำนวนอุปกรณ์",
                            data: data,
                            backgroundColor: "rgba(255, 99, 132, 0.2)"
                        }
                    ]
                }

                setChartData(dataset);
                setIsLoading(true);
            } catch (error) {
                console.error('Fetch data error: ', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const getChart = () => {
        if (isLoading) {
            return <Bar options={options} data={chartData} />
        }
    }

    return (
        <>
            {loading ? ( // Conditionally render Bootstrap spinner
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Container className="my-3 mb-4">
                    <Row>
                        <Col xs={12} sm={12} md={12} xl={12} >
                        <Card >
                            <Card.Body style={{ width: '88%', height: '10%', marginLeft: '5rem' }}>
                                
                                {getChart()}
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}