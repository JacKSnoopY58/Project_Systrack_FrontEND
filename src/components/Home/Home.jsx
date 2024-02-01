import Cards from "./Cards";
import Charts from "./Charts";
import Swal from "sweetalert2";

export default function Home() {
    if (localStorage.getItem("access_token")) {
        console.log(localStorage.getItem("access_token"));
        return (
            <div style={{background:'#eaeaea', width: '100%' , height: '100vh'}}>
                <Cards/>
                <Charts/>
            </div>
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    }
}
    