import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../urls";
import "./authentication.css";
import { LoadingContent, api, changeText } from "../../components/utils";
import Loading from "../../components/Loading";
import SnackbarWithDecorators from "../../components/SnackbarWithDecorators";
import { ping } from 'ldrs'

ping.register()

const SignUp = () => {
    const [postRegisterLoading, setPostRegisterLoading] = useState(false);
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        username: ''
    });
    const [response, setResponse] = useState('');
    const [err, setErr] = useState(''); // handling error
    const [loading, setLoading] = useState(false); // loading
    const [snackAlert, setSnackAlert] = useState(false); // popup success or error
    const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
        text: '',
        color: ''
    });
    const navigate = useNavigate();

    // redirecting if user sign up success after showing loading for 2s START
    useEffect(() => {
        if (postRegisterLoading) {
          setTimeout(() => {
            navigate('/signin');
          }, 2000);
        }
      }, [postRegisterLoading]);
    // redirecting if user sign up success after showing loading for 2s END

    // register START
    const Register = (e) => {
        e.preventDefault();

        if(user.fullname === "" || user.email === "" || user.password === "" || user.username === ""){
            setSnackbarProperty(prevState => ({
                ...prevState,
                text: "All fields are required!",
                color: "danger"
              }));
            setSnackAlert(true);
        }else{

          // validation START
            if(user.fullname.length < 3){
                setSnackbarProperty(prevState => ({
                    ...prevState,
                    text: "Fullname must be atleast 3 characters long!🙃😊",
                    color: "danger"
                  }));
                setSnackAlert(true);
            }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
                setSnackbarProperty(prevState => ({
                  ...prevState,
                  text: "Invalid email format!🙃😊",
                  color: "danger"
                }));
                setSnackAlert(true);
            }else if (user.username.toLowerCase() !== user.username) {
                setSnackbarProperty(prevState => ({
                  ...prevState,
                  text: "Username must be in lowercase!🙃😊",
                  color: "danger"
                }));
                setSnackAlert(true);
              } else if (!user.password || user.password.length < 6) {
                setSnackbarProperty(prevState => ({
                  ...prevState,
                  text: "Password must be at least 6 characters long!🙃😊",
                  color: "danger"
                }));
                setSnackAlert(true);
              // validation END

              }else{
                const pathname = '/auth/register';
                api(pathname, 'post', user)
                    .then(res => {
                        setLoading(true);
                        if (res?.response && res.response.data.message.includes('dup key: { personal_info.email')) {
                            setErr('Email already exists!');
                            setSnackbarProperty(prevState => ({
                                ...prevState,
                                text: "Email already exists!🙃😊",
                                color: "danger"
                              }));
                            setSnackAlert(true);
                        }else if(res?.response && res.response.data.message.includes('dup key: { personal_info.username')){
                            setErr('Username already exists!');
                            setSnackbarProperty(prevState => ({
                                ...prevState,
                                text: "Username already exists!🙃😊",
                                color: "danger"
                              }));
                            setSnackAlert(true);
                        }else{
                            setSnackbarProperty(prevState => ({
                                ...prevState,
                                text: "Sign up successful! redirecting to signin...✔️",
                                color: "success"
                            }));
                            setPostRegisterLoading(true);
                            setSnackAlert(true);
                            
                        }
                        console.log('Ee: ', err);
                    })
                    .catch(e => {
                        console.log('outside: ', e);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }
    // register END
  return (
      <>
      {postRegisterLoading && <LoadingContent />}
    <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-32">Account Register</span>
              <span className="txt1 p-b-11">Fullname</span>
              <div
                className="wrap-input100 validate-input m-b-36"
                data-validate="Fullname is required"
              >
                <input className="input100" value={user.fullname} type="text" name="fullname" onChange={(e) => changeText(e, setUser, user)} />
                <span className="focus-input100"></span>
              </div>
              <span className="txt1 p-b-11">Email</span>
              <div
                className="wrap-input100 validate-input m-b-36"
                data-validate="Email is required"
              >
                <input className="input100" value={user.email} type="email" name="email" onChange={(e) => changeText(e, setUser, user)} />
                <span className="focus-input100"></span>
              </div>
              <span className="txt1 p-b-11">Username</span>
              <div
                className="wrap-input100 validate-input m-b-36"
                data-validate="Username is required"
              >
                <input className="input100" value={user.username} type="text" name="username" onChange={(e) => changeText(e, setUser, user)} />
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
                <input className="input100" value={user.password} type="password" name="password" onChange={(e) => changeText(e, setUser, user)} />
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
                  <Link to="/signin">Already have an account?</Link>
                </div>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={Register}>{!loading? 'Sign up': <Loading/>}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1"></div>
    </>
  );
};

export default SignUp;
