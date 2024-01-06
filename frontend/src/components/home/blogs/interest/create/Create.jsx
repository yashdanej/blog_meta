import React, { useEffect } from 'react'
import './create.css'
import InputFileUpload from './upload/InputFileUpload'
import ExampleIosSwitch from './draft/ExampleIosSwitch'
import LimitTags from './tags/LimitTags'
import Editor from './editor/Editor'
import { useState } from 'react'
import { LoadingContent, api } from '../../../../utils'
import SnackbarWithDecorators from '../../../../SnackbarWithDecorators'
import { useNavigate, useParams } from 'react-router-dom'

const Create = () => {
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const params = useParams();
  const {id} = params;
  const [loading, setLaoding] = useState(false);
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('');
  const [des, setDes] = useState('');
  const [content, setContent] = useState(``);
  const [tags, setTags] = useState('');
  const [draft, setDraft] = useState(false);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const clearState = () => {
    setTitle('');
    setBanner('');
    setDes('');
    setContent('');
    setTags('');
    setDraft(false);
  }
  let prevTags;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title === "" || banner === "" || des === "" || des === "" || content === "", tags === ``){
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "All fields are required!🙃",
        color: "danger"
      }));
      setSnackAlert(true);
    }else{
      setLaoding(true);
      setTags(!id?tags:prevTags)
      console.log('prevTags', tags);
      const body = {title, banner, des, content, tags, draft}
      const pathname = !id?"/blog":`/blog/${id}`;
      api(pathname, `${!id?"post":"patch"}`, body, true, true)
      .then(res => {
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: `Blog ${!id?"created":"updated"} successfully🥳!, redirecting to dashboard...✔️`,
          color: "success"
        }));
        setSnackAlert(true);
      }).catch(e => {
        console.log('outside', e)
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: `Error while ${!id?"creating":"updating"}😭`,
          color: "danger"
        }));
        setSnackAlert(true);
      }).finally(() => {
        setLaoding(false);
        setTimeout(() => {
          clearState();
          navigate('/');
        }, 2000);
      })
    }
    }
    const handleDesChange = (e) => {
      const newDes = e.target.value;
      if (newDes.length <= 200) {
        setDes(newDes);
      }else{
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: "You can only add 200 characters",
          color: "danger"
        }));
        setSnackAlert(true);
        setDes(newDes.substring(0,200));
      }
    }
    const fetchBlogDetail = async () => {
      setLaoding(true);
      const pathname = `/blog/${id}`;
      api(pathname, 'get', false, false, false)
      .then(res => {
        console.log(res.data?.tags);
        setBlog(res.data);
        setTitle(res.data.title);
        setBanner(res.data?.banner);
        setDes(res.data?.des);
        setContent(res.data?.content);
        setTags(res.data?.tags);
        prevTags = res.data?.tags.join(',');
        console.log('useEffect', prevTags);
        setDraft(res.data?.draft);
      }).catch(e => {
        return console.log('outside: ', e);
      }).finally(() => {
        setLaoding(false);
      })
    }
    useEffect(() => {
      if(id){
        fetchBlogDetail();
      }
    }, [])
  return (
    <>
    {loading && <LoadingContent/>}
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
    <div className='create container my-4'>
      <form style={{width: '80%', margin: 'auto'}}>
        <div className="d-flex">
          <input type="text" name="title" value={title} className='selectTitle' placeholder='Write blog title...' autoComplete={false} onChange={(e) => {setTitle(e.target.value)}} />
          <InputFileUpload setBanner={setBanner} />
        </div>
        <span className='px-2' style={{fontSize: '9px', color: 'grey'}}>{des?.length}/200</span>
        <textarea value={des} onChange={(e) => {handleDesChange(e)}} name="des" id="" cols="30" rows="5" className='styleInput' placeholder='Write description...'></textarea>
        <Editor content={content} setContent={setContent} />
        <div className="d-flex align-items-center justify-content-between">
          <div className="firstDev">
            {id && <span style={{fontSize: '12px'}} className='text-danger'>If you don't select the tags, your previous tags of this blog will be selected</span>}
            <LimitTags tags={blog?.tags} setTags={setTags} />
          </div>
          <div className="d-flex align-items-center secondDiv">
            <span className='fw-bold'>Draft?&nbsp;&nbsp;</span>
            <ExampleIosSwitch draft={draft} setDraft={setDraft} /><br />
          </div>
        </div>
        <div className="d-flex btnContainer">
          <input type="submit" value={!id?"Submit":"Update"} className='btnFirst' onClick={handleSubmit} />
          <input type="reset" className='btnSecond' onClick={clearState} />
        </div>
      </form>
    </div>
    </>
  )
}

export default Create