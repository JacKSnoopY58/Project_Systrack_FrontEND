import { Container, Row, Col } from 'react-bootstrap';
import "./Login2.css"
import logo3 from '../asset/image/logo3.png'
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";
import Swal from 'sweetalert2';
import { SERVER_URL } from "../../app.config";
import React, { useState } from "react";

export default function Login2() {

  const [validated, setValidated] = useState(false); //* ตรวจสอบว่าได้มีการกรอกข้อมูลมาไหม
  const [username, setUsername] = useState(""); //* เก็บค่า (username)
  const [password, setPassword] = useState(""); //* เก็บค่า (password)
  let navigate = useNavigate();

  //* Function getAuthenToken ติดต่อกับ Back-end ในส่วนตรวจสอบข้อมูล

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
    const loading = Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Show loading animation
      }
    });
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
          loading.close();
          Swal.fire({
            title: 'ยินดีต้อนรับ ' + u_name + " " + u_lastname,
            text: 'กำลังเข้าสู่ระบบ กรุณารอสักครู่',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
          setTimeout(function () {
            navigate("/admin", { replace: false }); //* เข้าหน้า admin
          }, 2000);
        }

      } else {
        loading.close();
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'Username หรือ Password ไม่ถูกต้อง',
          icon: 'error',
          timer: 2000,
          showConfirmButton: true
        });
      }
    } else {
      loading.close();
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'Username หรือ Password ของคุณไม่มีในระบบ',
        icon: 'error',
        timer: 2000,
        showConfirmButton: true
      });
    }
  }

  return (
    <>
      <Container fluid className='d-flex justify-content-center align-items-center min-vh-100 all-box' style={{ background: "#eaeaea" }}>
        <Row className='border rounded-5 p-3 bg-white shadow box-area'>

          {/* <!-- Left Box --> */}
          <Col md={6} className='left-box rounded-4 d-flex justify-content-center align-items-center flex-column' style={{ background: "#156297" }}>
            <div className="featured-image mb-3">
              <img src={logo3} className='img-fluid' style={{ width: "250px" }} />
            </div>
            <p className='text-white fs-2 all-text'>Systrack Navigator </p>
            <small className='text-white text-wrap text-center all-text'>Join experienced Designers on this platform.</small>
          </Col>
          {/* <!-- Right Box --> */}
          <Col md={6} className='right-box' >
            <Row className='align-item-center'>
              <Form noValidate validated={validated} onSubmit={onLogin}>
                <div className='header-text mb-4'>
                  <p className='all-text fs-3'>Welcome back!</p>
                  <p className='all-text'>Please verify your data to access</p>
                  <div className='mb-3 all-text'>
                    <Form.Group className='w-100 all-text'>
                      <Form.Control type='text' 
                        placeholder='Enter username' 
                        onChange={(e)=> setUsername(e.target.value)} 
                        required/>   
                      <Form.Control.Feedback type="invalid">
                        Please enter your username.
                      </Form.Control.Feedback>         
                    </Form.Group>
                  </div>
                  <div className='mb-1 all-text'>
                  <Form.Group className='w-100 all-text'>
                      <Form.Control type='password' 
                        placeholder='Enter password' 
                        onChange={(e)=> setPassword(e.target.value)} 
                        required/>   
                      <Form.Control.Feedback type="invalid">
                        Please enter your username.
                      </Form.Control.Feedback>         
                    </Form.Group>
                  </div>
                  <div className='mb-5 d-flex justify-content-between all-text'>
                    <div className='form-check mt-2'>
                      <input type="checkbox" className='form-check-input' id="fromCheck" />
                      <label className='form-check-label text-secondary '><small className='all-text'>Remember me</small></label>
                    </div>
                    <div className='forgot mt-2'>
                      <small><a href='' className='all-text'>Forgot Password?</a></small>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <button type="submit" className='btn bth-lg w-100 fs-6 all-text fw-bold text-light' style={{ background: "#78BB1B",outline: "none" }}>Login</button>
                  </div>
                </div>
              </Form>
            </Row>
          </Col>

        </Row>
      </Container>
    </>

  );
}