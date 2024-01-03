import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LoadingContent, api } from '../../components/utils'
import { useParams } from 'react-router-dom'
import SimilarBlogs from './SimilarBlogs'
import Comments from '../../components/comments/Comments'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ViewAllComments from '../../components/comments/ViewAllComments'
import SnackbarWithDecorators from '../../components/SnackbarWithDecorators'
import './view.css'

const View = () => {
    const [blog, setBlog] = useState([])
    const [open, setOpen] = useState(false);
    const [similarBlog, setSimilarBlog] = useState(null);
    const [comments, setComments] = useState(null);
    const [snackAlert, setSnackAlert] = useState(false); // popup success or error
    const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
        text: '',
        color: ''
    });
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const {id} = params;
    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpen(inOpen);
      };
    const fetchBlog = () => {
        const pathname = `/blog/${id}`
        api(pathname, 'get', false, false, false)
        .then(res => {
            setBlog(res.data);
        }).catch(e => {
            console.log('outside: ', e);
        })
    }
    const fetchSimilarBlog = () => {
        const pathname = `/blog/${id}/similar`
        api(pathname, 'get', false)
        .then(res => {
            setSimilarBlog(res.data);
        }).catch(e => {
            console.log('err in fetchSimilarBlog', e)
        })
    }
    const handleFetchComment = () => {
        setLoading(true);
        const pathname = `/blog/${id}/comment`;
        api(pathname, 'get', false)
        .then(res => {
          setComments(res.data);
        })
        .catch(e => {
          console.log('error in comment adding', e);
          setSnackbarProperty(prevState => ({
            ...prevState,
            text: "there is an error in fetching comment!👾",
            color: "danger"
          }));
          setSnackAlert(true);
        })
        .finally(() => {
          setLoading(false);
        })
      }
      const renderComments = (comments) => {
        return (
          <div className='nestedComments'>
            {comments.map((nestedComment) => (
              <ViewAllComments handleFetchComment={handleFetchComment} key={nestedComment._id} comment={nestedComment} renderComments={renderComments} />
            ))}
          </div>
        );
      };
    useEffect(() => {
        fetchBlog();
        fetchSimilarBlog();
    }, [id])
    console.log(blog);
    useEffect(() => {
        handleFetchComment();
    }, [])
    
  return (
    <div className='container'>
    {loading && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
        <img src={blog?.banner?.url} width='80%' style={{display: 'block', margin: '15px auto'}} alt="" />
        <p className='text-center'><FavoriteBorderIcon/>{blog?.activity?.total_likes.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{cursor: 'pointer'}} onClick={toggleDrawer(true)}><ModeCommentIcon/>{blog?.activity?.total_comments}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<RemoveRedEyeSharpIcon/>{blog?.activity?.total_reads.length}</p>
        <div className='container py-3'>
            <div className='blogContentSection' dangerouslySetInnerHTML={{ __html: blog?.content }} />
        </div>
        {
            similarBlog && similarBlog.length>1?
            <div className="similarBlog">
                <div className="row">
                    <SimilarBlogs similarBlog={similarBlog} />
                </div>
            </div>:
            null
        }
        {
            open && <Comments blogauthor={blog?.author} blogid={blog?._id} toggleDrawer={toggleDrawer} open={open} comments={comments} handleFetchComment={handleFetchComment} />
        }
        {
          comments &&
          comments.length>0 &&
          <>
            <p>Comments</p>
            {comments.map((comment) => {
                return (
                    <ViewAllComments handleFetchComment={handleFetchComment} key={comment._id} comment={comment} renderComments={renderComments} />
                )
            })}
          </>
        }
    </div>
  )
}

export default View