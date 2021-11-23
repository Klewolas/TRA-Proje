import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [girisKontrol, setgirisKontrol] = useState('');

  const usernameHandler = (e) => {
    setUsername(e);
  };

  const passwordHandler = (e) => {
    setPassword(e);
  };

  const loginAction = () => {
    axios.post('http://localhost:5000/api/authenticate', {
      userName: username,
      password,
    }).then((response) => {
      console.log(response);
      localStorage.setItem("jwtToken", response.data.token);
      if (response.data.token != '') {
        navigate('/home');
      }
    }, (error) => {
      console.log(error);
    });
  
    setgirisKontrol('Girilemedi');
  };

  return (
    <div className="row">
      <h3 className="m-3 d-flex justify-content-center">
        Giriş Ekranı
      </h3>
      {girisKontrol === 'Girilemedi' ? (
        <div className="alert alert-danger col-sm-6 offset-sm-3">
          Hatalı Giriş Yaptınız.
        </div>
      ) : (<div />)}
      <div className="form-group my-2 col-sm-6 offset-sm-3">
        <input type="text" className="form-control" placeholder="User" onChange={(e) => usernameHandler(e.target.value)} value={username} />
      </div>
      <div className="form-group my-2 col-sm-6 offset-sm-3">
        <input type="password" className="form-control" placeholder="Password" onChange={(e) => passwordHandler(e.target.value)} value={password} />
      </div>
      <div className="form-group my-2 col-sm-6 offset-sm-8">
        <form>
          <button type="button" className="btn d-block btn-success" onClick={loginAction}>Log In</button>
        </form>
      </div>

    </div>
  );
}
