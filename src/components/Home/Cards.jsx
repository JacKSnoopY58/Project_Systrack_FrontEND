import "./Cards.css"
import Card from 'react-bootstrap/Card';
import { AiFillCheckCircle } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";
import { BsBank2 } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";

export default function Cards() {
    return(
        <>
        <div style={{marginTop: '40px' , marginLeft: '40px'}}>
            <h4>Dashboard</h4>
        </div>
        <div className="d-flex justify-content-start" style={{margin: '45px'}}>
            <Card style={{ width: '20rem' , borderRadius: 20 , marginRight: '40px' , marginLeft: '20px'  }}  >
                <Card.Body>
                    <Card.Title className="text-dark m-1">
                        Online
                    </Card.Title>
                    <Card.Text className="m-3 justify-content-start"  style={{ display: 'flex', alignItems: 'center' }}>
                        <AiFillCheckCircle style={{ fontSize: 50 , color: 'green'}} className="m-2"/>
                        <span style={{ marginLeft: '5rem', fontSize: 40}}> 1 </span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem' , borderRadius: 20 , marginRight: '60px' }}  >
                <Card.Body>
                    <Card.Title className="text-dark m-1">
                        In Progress
                    </Card.Title>
                    <Card.Text className="m-3 justify-content-start"  style={{ display: 'flex', alignItems: 'center' }}>
                        <GiAutoRepair style={{ fontSize: 50 , color: 'yellow' }} className="m-2"/>
                        <span style={{ marginLeft: '5rem', fontSize: 40}}> 1 </span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem' , borderRadius: 20 , marginRight: '60px' }}  >
                <Card.Body>
                    <Card.Title className="text-dark m-1">
                        Offline
                    </Card.Title>
                    <Card.Text className="m-3 justify-content-start"  style={{ display: 'flex', alignItems: 'center' }}>
                        <HiBellAlert style={{ fontSize: 50 , color: 'red' }} className="m-2"/>
                        <span style={{ marginLeft: '5rem', fontSize: 40}}> 1 </span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem' , borderRadius: 20 }}  >
                <Card.Body>
                    <Card.Title className="text-dark m-1">
                       All Hardware
                    </Card.Title>
                    <Card.Text className="m-3 justify-content-start"  style={{ display: 'flex', alignItems: 'center' }}>
                        <BsBank2 style={{ fontSize: 50 , color: 'orange' }} className="m-2"/>
                        <span style={{ marginLeft: '5rem', fontSize: 40}}> 1 </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        </>
    );
}