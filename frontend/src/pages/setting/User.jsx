import React, { useEffect, useState } from 'react'
import './user.css'
import { Link, useNavigate } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import UserCard from './userCard/UserCard';
import AddIcon from '@mui/icons-material/Add';
import SnackbarWithDecorators from '../../components/SnackbarWithDecorators';
import { LoadingContent, api, logout } from '../../components/utils';
import Cookies from 'js-cookie';
import UpdateUser from './UpdateProfile/UpdateUser';
import LinkIcon from '@mui/icons-material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const User = () => {
    const [open, setOpen] = useState(false);
    const getUsername = window.location.pathname.split('/')[2];
    const [fetchUser, setFetchUser] = useState([]);
    const getUser = Cookies.get('user');
    const user = getUser?JSON.parse(getUser):null;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchUserFn = () => {
        setLoading(true);
        const pathname = `/user/${getUsername}`
        api(pathname, 'get', false)
        .then(res => {
            console.log(res.data);
            setFetchUser(res.data);
        }).catch(e => {
            console.log('error in fetching user', e);
        }).finally(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchUserFn();
    }, []);
    const onLogout = () => {
        logout();
        navigate('/signin');
      }
    const handleDate = (comment) => {
        const dateObject = new Date(comment);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
        return formattedDate
    }
    const userGet = user && user?.username === getUsername
  return (
    <>
    {loading ? <LoadingContent/> :
    fetchUser &&
    <div className='user'>
        <div className="topContent">
            <div className="topContentSection container">
                <Link to="/" ><p className='back'>BACK</p></Link>
                <button className='text-capitalize' onClick={() => {user && user?.username === getUsername && setOpen(true)}}>{user && user?.username === getUsername ?"Edit Profile":`${getUsername}'s Profile`}</button>
                <div className="topContentText">
                    <p className='fw-bold'>Joined</p>
                    <p>{handleDate(fetchUser?.joinedAt)}</p>
                </div>
                <div className="topContentText">
                    <p className='fw-bold'>Blogs</p>
                    <p>{fetchUser?.account_info?.total_posts}</p>
                </div>
                <div className="topContentText">
                    <p className='fw-bold'>Reads</p>
                    <p>{fetchUser?.account_info?.total_reads}</p>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-4">
                <div className="leftComponent container">
                    <img className='avatar' src={fetchUser?.personal_info?.profile_img?.url} alt="" />
                    <span style={{fontSize: '20px'}} className='fw-bold'>{fetchUser?.personal_info?.fullname}</span>
                    <span className='secondText'>{fetchUser?.personal_info?.email}</span>
                    <span style={{padding: '0 3em'}} className='leftComponentText'>{fetchUser?.personal_info?.bio}</span>
                    <div style={{padding: '0 25px'}} className="d-flex justify-content-evenly">
                        {fetchUser?.social_links?.youtube && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} href={fetchUser?.social_links?.youtube}><YouTubeIcon/> Youtube</a></span>}
                        {fetchUser?.social_links?.instagram && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} href={fetchUser?.social_links?.instagram}><InstagramIcon/> Instagram</a></span>}
                        {fetchUser?.social_links?.facebook && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} href={fetchUser?.social_links?.facebook}><FacebookIcon/> Facebook</a></span>}
                        {fetchUser?.social_links?.twitter && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} href={fetchUser?.social_links?.twitter}><TwitterIcon/> Twitter</a></span>}
                        {fetchUser?.social_links?.github && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} href={fetchUser?.social_links?.github}><GitHubIcon/> Github</a></span>}
                        {fetchUser?.social_links?.website && <span className='leftComponentText'><a style={{color: 'inherit', textDecoration: 'none'}} target='_blank' href={fetchUser?.social_links?.website}><OpenInNewIcon/> Website</a></span>}
                    </div>
                    {
                        user && user?.username === getUsername ?
                        <>
                            <span className='my-2 fw-bold iconText'><AccountCircleIcon/> Profile</span>
                            <Link to="/changepassword" style={{color: 'inherit', textDecoration: 'none'}}><span className='my-2 fw-bold iconText'><SettingsIcon/> Change Password</span></Link>
                            <span onClick={onLogout} className='mt-4 fw-bold iconText'><LogoutIcon/> Sign Out</span>
                            <span className='mt-3 fw-bold iconText'><HelpIcon/> Help</span>
                        </>:
                        <img width="70%" style={{borderRadius: '25px', filter: 'grayscale()'}} src="/images/batman.jpg" alt="" />
                    }
                </div>
            </div>
            <div className="col-lg-8 my-4 ">
                <div className="row contentChange">
                    {
                        fetchUser?.blogs?.map((blog) => {
                            return (
                                <div className="col-lg-4">
                                    <UserCard fetchUserFn={fetchUserFn} userGet={userGet} blog={blog} />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    user && user.username === getUsername &&
                    <div className="writeBtn contentChange">
                        <span className='fw-bold'>Write</span>
                        <Link to="/create"><AddIcon className='addIcon'/></Link>
                    </div>
                }
            </div>
        </div>
        
    </div>
    }
    <UpdateUser getUsername={getUsername} open={open} setOpen={setOpen} fetchUserFn={fetchUserFn} />
    </>

  )
}

export default User