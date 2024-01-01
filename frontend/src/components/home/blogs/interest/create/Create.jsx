import React from 'react'
import './create.css'
import InputFileUpload from './upload/InputFileUpload'
import ExampleIosSwitch from './draft/ExampleIosSwitch'
import LimitTags from './tags/LimitTags'
import Editor from './editor/Editor'
import { useState } from 'react'
import { LoadingContent, api } from '../../../../utils'
import SnackbarWithDecorators from '../../../../SnackbarWithDecorators'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const [loading, setLaoding] = useState(false);
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('');
  const [des, setDes] = useState('');
  const [content, setContent] = useState(``);
  const [tags, setTags] = useState('');
  const [draft, setDraft] = useState(false);
  const navigate = useNavigate();
  const clearState = () => {
    setTitle('');
    setBanner('');
    setDes('');
    setContent('');
    setTags('');
    setDraft(false);
  }
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
      const body = {title, banner, des, content, tags, draft}
      const pathname = '/blog';
      api(pathname, 'post', body, true, true)
      .then(res => {
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: "Blog created successfully🥳!, redirecting to dashboard...✔️",
          color: "success"
        }));
        setSnackAlert(true);
      }).catch(e => {
        console.log('outside', e)
        setSnackbarProperty(prevState => ({
          ...prevState,
          text: "Error while creating😭",
          color: "danger"
        }));
      }).finally(() => {
        setLaoding(false);
        setTimeout(() => {
          clearState();
          navigate('/');
        }, 2000);
      })
    }
    }
    
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
        <textarea value={des} onChange={(e) => {setDes(e.target.value)}} name="des" id="" cols="30" rows="5" className='styleInput' placeholder='Write description...'></textarea>
        <Editor content={content} setContent={setContent} />
        <div className="d-flex align-items-center justify-content-between">
          <div className="firstDev">
            <LimitTags setTags={setTags} />
          </div>
          <div className="d-flex align-items-center secondDiv">
            <span className='fw-bold'>Draft?&nbsp;&nbsp;</span>
            <ExampleIosSwitch draft={draft} setDraft={setDraft} /><br />
          </div>
        </div>
        <div className="d-flex btnContainer">
          <input type="submit" className='btnFirst' onClick={handleSubmit} />
          <input type="reset" className='btnSecond' onClick={clearState} />
        </div>
      </form>
    </div>
    </>
  )
}

export default Create