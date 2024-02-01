import { Link } from "react-router-dom";

export default function CustomerItem(props) {
    const {cus_number , cus_name , cus_lastname , cus_tel , index} = props ;
    return(
        <>
           <tr style={{textAlign: 'center'}}>
                <td>{index}</td>
                <td>{cus_number}</td>
                <td>{cus_name + " " + cus_lastname}</td>
                <td>{cus_tel}</td>
                <td><Link className="btn btn-primary btn-sm" to={`/order/${cus_number}`}>ที่อยู่</Link></td>
                <td><Link className="btn btn-warning btn-sm" to={`/order/${cus_number}`}>แก้ไข</Link></td>
            </tr>
        </> 
    );
}