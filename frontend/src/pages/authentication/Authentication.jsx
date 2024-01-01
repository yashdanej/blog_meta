import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../urls";
import "./authentication.css";
import { LoadingContent, api, changeText } from "../../components/utils";
import Loading from "../../components/Loading";
import SnackbarWithDecorators from "../../components/SnackbarWithDecorators";
import Cookies from 'js-cookie';

const Authentication = () => {
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // loading
  const [success, setSuccess] = useState(false); // loading
  const navigate = useNavigate();
   // redirecting if user sign up success after showing loading for 2s START
   useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [success]);
// redirecting if user sign up success after showing loading for 2s END

// signin START
  const onSignIn = (e) => {
    e.preventDefault();
    if(user.username === "" || user.password === ""){
      setSnackbarProperty(prevState => ({
          ...prevState,
          text: "All fields are required!👾",
          color: "danger"
        }));
      setSnackAlert(true);
    }else{
      const pathname = '/auth/login';
      api(pathname, 'post', user)
        .then(res => {
          setLoading(true);
          if(res?.response?.data?.message){
            setSnackbarProperty(prevState => ({
              ...prevState,
              text: `${res.response.data?.message}😭`,
              color: "danger"
            }));
            setSnackAlert(true);
          }else{
            if(res?.data){
              Cookies.set('access_token', res.data.token, { expires: 7 });
              Cookies.set('user', JSON.stringify(res.data), { expires: 7 });
              setSnackbarProperty(prevState => ({
                ...prevState,
                text: "Sign in successful! redirecting to dashboard...✔️",
                color: "success"
              }));
              setSuccess(true);
              setSnackAlert(true);
            }else{
              console.log('err:', res);
            }
          }
        })
        .catch(e => {
          console.log('outside', e);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }
// signin END

  return (
    <>
    {success && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-32">Account Login</span>
              <span className="txt1 p-b-11">Username</span>
              <div
                className="wrap-input100 validate-input m-b-36"
                data-validate="Username is required"
              >
                <input className="input100" type="text" name="username" onChange={(e) => {changeText(e, setUser, user)}} />
                <span className="focus-input100"></span>
              </div>
              <span className="txt1 p-b-11">Password</span>
              <div
                className="wrap-input100 validate-input m-b-12"
                data-validate="Password is required"
              >
                <span className="btn-show-pass">
                  <i className="fa fa-eye"></i>
                </span>
                <input className="input100" type="password" name="password" onChange={(e) => {changeText(e, setUser, user)}}  />
                <span className="focus-input100"></span>
              </div>
              <div className="flex-sb-m w-full p-b-48">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>
                <div>
                  <Link to="/signup">Don't have an account?</Link>
                </div>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={onSignIn}>{!loading? 'Login': <Loading/>}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1"></div>
    </>
  );
};

export default Authentication;
