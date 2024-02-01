import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AccessItem(props) {
    const onDelete = async () =>{
        props.onDelete(props.data);
    }

    return (
        <>
            <tr style={{ textAlign: 'center' }}>
                <td>{props.data.ac_ip}</td>
                <td style={{ textAlign: 'left'}} >{props.data.ac_device_name}</td>
                <td>{props.data.place_name}</td>
                <td>
                    <Link to ={`/AccessControl/${props.data.ac_id}`} className="btn btn-primary btn-sm">Edit</Link>
                    <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={onDelete}><RiDeleteBin6Line /></button>
                </td>
            </tr>
        </>
    );
}