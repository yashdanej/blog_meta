import React, { useEffect, useState } from 'react'
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import './comment.css'
import { LoadingContent, api, changeText } from '../utils';
import Cookies from 'js-cookie';
import SnackbarWithDecorators from '../SnackbarWithDecorators';
import SomeComments from './SomeComments';

const Comments = ({blogauthor, blogid, open, toggleDrawer, comments, handleFetchComment}) => {
  const [commentObj, setCommentObj] = useState({
    comment: '',
    isReply: false
  });
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDeleteComment = (commentId) => {
    handleDelete(blogid, commentId);
  }
  const handleDelete = (blogid, commentId) => {
    const pathname = `/blog/${blogid}/comment/${commentId}`
    console.log(pathname);
    api(pathname, 'delete', false, false, true)
    .then(res => {
      console.log(res.data);
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "Comment deleted successfully!😎",
        color: "success"
      }));
    setSnackAlert(true);
    handleFetchComment();
    })
    .catch(e => {
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "there is an error in deleting!👾",
        color: "danger"
      }));
    setSnackAlert(true);
    })
  }
  const handleComment = (id="") => {
    const getUser = Cookies.get('user');
    if(id != ""){
      setCommentObj(prevState => ({
        ...prevState,
        isReply: true
      }));
    }
    const user = getUser?JSON.parse(getUser):null;
    if(!user){
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "You are not authorized!👾",
        color: "danger"
      }));
    setSnackAlert(true);
    }else if(commentObj.comment === ""){
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "Please add your thought!👾",
        color: "danger"
      }));
      setSnackAlert(true);
    }
    else{
      setLoading(true);
      let pathname;
      if(id !== ""){
        pathname = `/blog/${blogid}/comment/${id}`
      }else{
        pathname = `/blog/${blogid}/comment`
      }
      console.log('commentObj, pathname',commentObj, pathname);
      api(pathname, 'post', commentObj, false, true)
      .then(res => {
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: "We respect your thought!✔️",
          color: "success"
        }));
        setSnackAlert(true);
        handleFetchComment();
      })
      .catch(e => {
        console.log('error in comment adding', e);
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: "there is an error in commenting!👾",
          color: "danger"
        }));
        setSnackAlert(true);
      })
      .finally(() => {
        setLoading(false);
        setCommentObj({comment: '', isReply: false})
        setId("");
      })
    }
  }
  const handleClickComment =(id) => {
    console.log('click', id);
    if(id){
      handleComment(id);
    }else{
      handleComment();
    }

  }
  const renderCommentChildren = (comments) => {
    return (
      <>
        {
          <SomeComments renderCommentChildren={renderCommentChildren} setCommentObj={setCommentObj} blogauthor={blogauthor} setId={setId} handleDeleteComment={handleDeleteComment} comments={comments} />
        }
      </>
    )
  }
  useEffect(() => {
    handleFetchComment();
  }, [])
  return (
    <>
    {loading && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
        <Box sx={{ display: 'flex' }}>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
        >
          <div className='commentBox'>
            {
              id && <p>Replying to {id}</p>
            }
            <input className='inpComment' placeholder='Write your thought...' name='comment' value={commentObj.comment} type="text" onChange={(e) => changeText(e, setCommentObj, commentObj)} />
            <button className='btnComment' onClick={() => handleClickComment(id)}>Add Your Thought!</button>
          </div>
          {
            comments &&
            <div style={{width: '70%', margin: 'auto'}}>
              <SomeComments renderCommentChildren={renderCommentChildren} setCommentObj={setCommentObj} blogauthor={blogauthor} setId={setId} handleDeleteComment={handleDeleteComment} comments={comments} />
            </div>
          }
        </Box>
      </Drawer>
    </Box>
    </>
  )
}

export default Comments
