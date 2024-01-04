import axios from "axios";
import { SERVER_URL } from "../urls";
import Cookies from 'js-cookie';
import React, { useState } from "react";
import SnackbarWithDecorators from "./SnackbarWithDecorators";

export const api = async (pathname, method, body, formData=false, includeCredentials = false) => {
    
    const axiosConfig = {
        url: `${SERVER_URL}${pathname}`,
        method: method,
    };
    if(body){
        if(formData){
            const data = new FormData();
            for (const key in body) {
              if (body.hasOwnProperty(key)) {
                  data.append(key, body[key]);
              }
            }
            axiosConfig.data = data;
        }else{
            axiosConfig.data = body;
        }
    }
    if (includeCredentials) {
        axiosConfig.withCredentials = true;
    }

    return await axios(axiosConfig)
        .then((res) => res)
        .catch((e) => {
            console.log('inside: ', e);
            return e;
        });
};


export const LoadingContent = () => {
    const overlay = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.03)', /* Adjust the transparency as needed */
        backdropFilter: 'blur(2px)', /* Adjust the blur amount as needed */
        zIndex: '999' /* Make sure the overlay is above other elements */
    };
    const loaderCenter = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
  return (
    <div style={overlay}>
        <div style={loaderCenter}>
        <l-ping size="350" speed="2" color="black"></l-ping>
        </div>
    </div>
  )
}

export const changeText = (e, set, content) => {
    set({...content, [e.target.name]: e.target.value})
}

export const logout = () => {
    Cookies.remove('user');
    Cookies.remove('access_token');
};

export const LikeButton = ({size='1.2rem', blog, liked, setLiked, setTotalLikes}) => {
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  
  const handleLike = () => {
    const pathname = `/blog/${blog?._id}/like`
    api(pathname, 'patch', false, false, true)
    .then(res => {
        if(res.data.message === "Like added!"){
            setSnackbarProperty(prevState => ({
                ...prevState,
                text: "Like added successfully💕",
                color: "success"
            }));
            setTotalLikes(res.data.totalLikes);
            setLiked(true);
        }else if(res.data.message === "Like remove!"){
            setSnackbarProperty(prevState => ({
                ...prevState,
                text: "Like removed!😭",
                color: "success"
            }));
            setTotalLikes(res.data.totalLikes);
            setLiked(false);
        }else{
            setSnackbarProperty(prevState => ({
                ...prevState,
                text: "Error!😦",
                color: "danger"
            }));
        }
        setSnackAlert(true);
    }).catch(err => {
        console.log('err', err);
    });
  }

  return (
    <>
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: liked ? 0 : 1,
          transform: `scale(${liked ? 0 : 1})`,
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <span onClick={handleLike} role="img" aria-label="heart-outline" style={{ fontSize: size, cursor: 'pointer' }}>
            🖤
        </span>
      </div>
      <div
        style={{
          opacity: liked ? 1 : 0,
          transform: `scale(${liked ? 1 : 0})`,
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <span role="img" onClick={handleLike} aria-label="heart" style={{ color: 'red', fontSize: size, cursor: 'pointer' }}>
            ❤️
        </span>
      </div>
    </div>
    </>
  );
};

export default LikeButton;
