import Logo from "../asset/image/logo.svg"
import img1 from "../asset/image/dmitry-chernyshov-mP7aPSUm7aE-unsplash.jpg"
import React , { useState } from "react";
import {Form , Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import Swal from 'sweetalert2';
import "./Login.css";
import logo2 from "../asset/image/Logo2.png"
import { SERVER_URL } from "../../app.config";


export default function Login() {

    const [validated, setValidated] = useState(false); //* ตรวจสอบว่าได้มีการกรอกข้อมูลมาไหม
    const [username, setUsername] = useState(""); //* เก็บค่า (username)
    const [password, setPassword] = useState(""); //* เก็บค่า (password)
    let navigate = useNavigate();


    //* Function getAuthenToken ติดต่อกับ Back-end ในส่วนตรวจสอบข้อมูล
    // const getAuthenToken = async () => {
    //     const response = await fetch(SERVER_URL + "authen_request",{
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: md5(username) //* เก็บค่า username เป็นรูปแบบ username
    //         })
    //     });

    //     const data = await response.json();
    //     console.log(data);
    //     return data;
    // }

    const getAuthenToken = async () => {

        const response = await fetch(
          SERVER_URL + "authen_request",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: md5(username)
            })
          }
        );
    
        const data = await response.json();
        // console.log(data);
        return data;
    
    
      };


     //* Function GetAccressToken
    //  const getAccessToken = async (authToken) => {
    //     var baseString = username + "&" + md5(password);
    //     var authenSignature = md5(baseString);

    //     const response = await fetch(
    //         SERVER_URL + "access_request", {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 auth_signature: authenSignature,
    //                 auth_token: authToken
    //             })
    //         }
    //     )
    //     const data = await response.json();
    //     return data;
    // };

    const getAccessToken = async (authToken) => {

        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);
    
        const response = await fetch(
          SERVER_URL + "access_request",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              auth_signature: authenSignature,
              auth_token: authToken
            })
          }
        );
    
        const data = await response.json();
        // console.log(data);
        return data;
    
      };


    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }
        setValidated(true);
    }

    //* นำข้อมูลจาก user ไปยังหน้า Home
    const doLogin = async () => {
        const data_1 = await getAuthenToken(); //* รอการทำงานของ function ก่อนจะทำคำสั่งต่อไป

        if (data_1.result) {
            const authToken = data_1.data.auth_token;
            const data_2 = await getAccessToken(authToken);

            if (data_2.result) {
                localStorage.setItem("access_token", data_2.data.access_token);
                localStorage.setItem("user_id", data_2.data.account_info.user_id);
                localStorage.setItem("username", username);
                localStorage.setItem("u_name", data_2.data.account_info.u_name);
                localStorage.setItem("u_lastname", data_2.data.account_info.u_lastname);
                localStorage.setItem("u_tel", data_2.data.account_info.u_tel);
                localStorage.setItem("u_role", data_2.data.account_info.u_role);
                localStorage.setItem("role_name", data_2.data.account_info.role_name);
        
                const u_name = localStorage.getItem("u_name");
                const u_lastname = localStorage.getItem("u_lastname");
                const u_role = localStorage.getItem("u_role");

                if (u_role === '1') {
                    Swal.fire({
                        title: 'ยินดีต้อนรับ ' + u_name + " " + u_lastname,
                        text: 'กำลังเข้าสู่ระบบ กรุณารอสักครู่',
                        icon:'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    setTimeout(function () {
                        navigate("/admin" , {replace:false}); //* เข้าหน้า admin
                    }, 2000);
                }
    
            } else {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: 'Username หรือ Password ไม่ถูกต้อง',
                    icon:'error',
                    timer: 2000,
                    showConfirmButton: true
                });
            }
        } else {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: 'Username หรือ Password ของคุณไม่มีในระบบ',
                icon:'error',
                timer: 2000,
                showConfirmButton: true
            });
        }
    }

    return (
        <div className="main-container">
            <div className="box">
                <div className="inner-box">
                    {/* ------------------------------- */}
                    <div className="forms-wrap">
                        <Form noValidate validated={validated} onSubmit={onLogin} className="sign-in-form">
                            {/* ------------------------------- */}
                            <div className="logo">
                                <img src={logo2} alt="Logo" />
                                <h4>SYSTRACK</h4> 
                            </div>
                            {/* ------------------------------- */}
                            <div className="heading">
                                <h2>ยินดีต้อนรับ</h2>
                                <h6>กรุณากรอก Username และ Password <br/> สำหรับเข้าสู่ระบบพนักงาน</h6>
                            </div>
                            <div className="actual-form">
                                <Form.Group controlId="validateUsername" className="input-wrap">
                                    <Form.Control 
                                    type="text" 
                                    className="input-field" 
                                    placeholder="username" 
                                    onChange={(e)=> setUsername(e.target.value)} 
                                    required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก Username
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validatePassword" className="input-wrap">
                                    <Form.Control 
                                    type="password" 
                                    className="input-field" 
                                    placeholder="password" 
                                    onChange={(e)=> setPassword(e.target.value)}
                                    required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก Password
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="sign-btn" style={{background: 'orange' , border: '0'}}>Sign in</Button>
                            </div>
                        </Form>
                    </div>
                    {/* ------------------------------- */}
                    <div className="carousel">
                        <div className="images-wrapper">
                            <img src={img1} alt="" className="image"/>
                        </div>
                        {/* ------------------------------- */}
                        <div className="text-slider">
                            <div className="text-wrap">
                                <div className="text-group">
                                    <h2>For Hardware Tracking with IT</h2>
                                </div>
                            </div>
                        </div>
                        {/* ------------------------------- */}
                    </div>
                </div>
            </div>
        </div>
    );
}