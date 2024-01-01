import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SnackbarWithDecorators from '../../../components/SnackbarWithDecorators'
import { LoadingContent, api, changeText } from '../../../components/utils'
import Loading from '../../../components/Loading'
import Cookies from 'js-cookie'

const ChangePassword = () => {
    const [snackAlert, setSnackAlert] = useState(false); // popup success or error
    const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const [user, setUser] = useState({
    oldpassword: '',
    newpassword: '',
    reenterpassword: ''
  });
  const [loading, setLoading] = useState(false); // loading
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if(user.oldpassword === "", user.newpassword === "", user.reenterpassword === ""){
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "All fields are required👾",
        color: "danger"
      }));
      setSnackAlert(true);
    }else{
      setLoading(true);
      const pathname = "/user/changepassword"
      api(pathname, "patch", user, false, true)
      .then(res => {
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: res.data,
          color: res.data === "Password changed successfully"?"success":"danger"
        }));
        setSnackAlert(true);
      })
      .catch(e => {
        console.log("error in changepassword", e);
      })
      .finally(() => {
        setLoading(false);
        setUser({oldpassword: "", newpassword: "", reenterpassword: ""})
      })
    }
  }
  const getUser = Cookies.get('user');
  const luser = getUser?JSON.parse(getUser):null;
  const btnBackStyle = {
    background: '#57b846'
  }
  return (
    <>
    {loading && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-32">Change Password</span>
              
              <span className="txt1 p-b-11">Old Password</span>
              <div
                className="wrap-input100 validate-input m-b-36"
                data-validate="Username is required"
              >
                <input className="input100" type="text" name="oldpassword" value={user.oldpassword} onChange={(e) => {changeText(e, setUser, user)}} />
                <span className="focus-input100"></span>
              </div>
              <span className="txt1 p-b-11">New Passowrd</span>
              <div
                className="wrap-input100 validate-input m-b-12"
                data-validate="Password is required"
              >
                <input className="input100" type="password" name="newpassword" value={user.newpassword} onChange={(e) => {changeText(e, setUser, user)}}  />
                <span className="focus-input100"></span>
              </div>
              <span className="txt1 p-b-11">Confirm Passowrd</span>
              <div
                className="wrap-input100 validate-input m-b-12"
                data-validate="Password is required"
              >
                <input className="input100" type="password" name="reenterpassword" value={user.reenterpassword} onChange={(e) => {changeText(e, setUser, user)}}  />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn d-flex justify-content-between">
                <button className="login100-form-btn" onClick={handlePasswordChange}>{!loading? 'Change': <Loading/>}</button>
                <Link style={{textDecoration: 'none'}} to={`/setting/${luser.username}`}><button className="login100-form-btn" style={btnBackStyle}>Back</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1"></div>
    </>
  )
}

export default ChangePassword