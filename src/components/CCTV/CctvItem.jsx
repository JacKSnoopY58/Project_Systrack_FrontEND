import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Badge from 'react-bootstrap/Badge';

export default function CctvItem(props) {
    const onDelete = async () =>{
        props.onDelete(props.data);
    }

    let statusBadge;
    switch (props.data.ipc_status_name) {
        case "Online":
            statusBadge = <Badge pill bg="success">Online</Badge>;
            break;
        case "Offline":
            statusBadge = <Badge pill bg="danger">Offline</Badge>;
            break;
        case "In Progress":
            statusBadge = <Badge pill bg="warning text-dark">In Progress</Badge>;
            break;
        default:
            statusBadge = <Badge pill bg="secondary">Unknown</Badge>;
    }

    return (
        <>
            <tr style={{ textAlign: 'center' }}>
                <td>{props.data.ipc_address}</td>
                <td style={{ textAlign: 'left'}} >{props.data.ipc_name}</td>
                <td>{props.data.place_name}</td>
                <td>{statusBadge}</td>
                <td>
                    <Link to ={`/cctv/${props.data.ipc_id}`} className="btn btn-primary btn-sm">Edit</Link>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm" onClick={onDelete}><RiDeleteBin6Line /></button>
                </td>
            </tr>
        </>
    );
}