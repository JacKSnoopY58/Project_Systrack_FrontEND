import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CctvItem(props) {
    const onDelete = async () =>{
        props.onDelete(props.data);
    }

    const { ipc_id, ipc_address, ipc_name, ipc_status_name, index } = props;
    // Define styles based on status
    let statusStyle;
    switch (props.data.ipc_status_name) {
        case "Online":
            statusStyle = {
                backgroundColor: "green",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
            break;
        case "Offline":
            statusStyle = {
                backgroundColor: "red",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
            break;
        case "In Progress":
            statusStyle = {
                backgroundColor: "yellow",
                borderRadius: "5px",
                color: "black",
                padding: "2px", // Adjust the padding as needed
            };
            break;
        default:
            statusStyle = {
                backgroundColor: "gray",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
    }
    return (
        <>
            <tr style={{ textAlign: 'center' }}>
                <td>{props.data.ipc_address}</td>
                <td style={{ textAlign: 'left'}} >{props.data.ipc_name}</td>
                <td>
                    <span style={statusStyle}>{props.data.ipc_status_name}</span>
                </td>
                <td>
                    <Link to ={`/cctv/${props.data.ipc_id}`} className="btn btn-primary btn-sm">Edit</Link>
                    <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={onDelete}><RiDeleteBin6Line /></button>
                </td>
            </tr>
        </>
    );
}