import { Link } from "react-router-dom";

export default function OrderItem(props) {
    const {cus_number , cus_name , cus_lastname , cus_tel} = props ;
    return(
        <>
           <tr style={{textAlign: 'center'}}>
                <td>{cus_number}</td>
                <td>{cus_name + " " + cus_lastname}</td>
                <td>{cus_tel}</td>
                <td><Link className="btn btn-success btn-sm" to={`/order/${cus_number}`}>แจ้งซ่อม</Link></td>
            </tr>
        </>
    );
}