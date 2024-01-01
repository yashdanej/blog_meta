import React, { useState } from 'react'
import './viewAllComments.css'
import { LoadingContent, api } from '../utils';
import DeleteBtn from './DeleteBtn';
import SnackbarWithDecorators from '../SnackbarWithDecorators';
import Cookies from 'js-cookie';

const ViewAllComments = ({comment, renderComments, handleFetchComment}) => {
    console.log('comment', comment);
    const [open, setOpen] = useState(false);
    const [snackAlert, setSnackAlert] = useState(false); // popup success or error
    const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
        text: '',
        color: ''
    });
    const [loading, setLoading] = useState(false);
    const handleDeleteComment = (commentId) => {
        handleDelete(comment?.blog_id._id, commentId);
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
    let timeDifference;
    const displayTimeOfPost = (ele) => {
      const createdDate = new Date(ele);
      const currentDate = new Date();
      // Calculate the time difference in milliseconds
      timeDifference = currentDate.getTime() - createdDate.getTime();
      
      // Function to calculate the time difference in minutes, hours, days, weeks, or years
      const getTimeDifferenceString = () => {
        if (timeDifference < 60 * 1000) { // Less than 1 minute
          return `${Math.floor(timeDifference / 1000)} seconds ago`;
        } else if (timeDifference < 60 * 60 * 1000) { // Less than 1 hour
          return `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
        } else if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 1 day
          return `${Math.floor(timeDifference / (60 * 60 * 1000))} hours ago`;
        } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) { // Less than 1 week
          const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          return daysAgo === 1 ? 'yesterday' : `${daysAgo} days ago`;
        } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) { // Less than 1 year
          const weeksAgo = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
          return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
        } else { // More than 1 year
          const yearsAgo = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
          return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
        }
      };
      return getTimeDifferenceString();
    }
    const getUser = Cookies.get('user');
    const user = getUser?JSON.parse(getUser):null;
  return (
    <div className='allComments'>
    {loading && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
        <img width="60px" height="60px" style={{borderRadius: '50%', objectFit: 'cover'}} src={comment?.commented_by?.personal_info?.profile_img?.url} alt="Profic pic" />
        <div className='mx-4'>
            <p className='m-0 fw-bold'>@{comment?.commented_by?.personal_info?.username} <span style={{color: 'grey', fontSize: '12px'}}>({displayTimeOfPost(comment?.commentedAt)})</span></p>
            <p className='m-0'>{comment?.comment}</p>
            {
                user?._id == comment?.commented_by?._id &&
                <button onClick={() => {setOpen(true);}}>Delete</button>
            }
            {comment.children && comment.children.length > 0 && renderComments(comment.children)}
        </div>
        {open && <DeleteBtn handleDeleteComment={handleDeleteComment} commentId={comment?._id} open={open} setOpen={setOpen} />}
    </div>
  )
}

export default ViewAllComments
