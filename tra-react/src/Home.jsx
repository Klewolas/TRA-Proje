import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Home = function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("jwtToken") == ''){
      navigate('/')
    }
  }, [])
  return (
    <div className="row col-sm-6 offset-sm-5">
      <h3>Giriş Başarılı.</h3>
    </div>
  );
};
export default Home;
