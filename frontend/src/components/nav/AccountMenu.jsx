import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'
import { changeText, logout } from '../utils';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';
import SnackbarWithDecorators from '../SnackbarWithDecorators';

export default function AccountMenu({handleSearch, searchTxt, setSearchTxt}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackAlert, setSnackAlert] = React.useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = React.useState({ // popup success or error text
      text: '',
      color: ''
  });
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    logout();
    handleClose();
    navigate('/signin');
  }
  React.useEffect(() => {
    console.log(searchTxt);
  }, [searchTxt])
  
  const handleSearchClick = (searchTxt) => {
    if(searchTxt === ''){
      setSnackbarProperty(prevState => ({
        ...prevState,
        text: "Stupid you didn't search anything!👾",
        color: "danger"
      }));
    setSnackAlert(true);
    }else{
      handleSearch(searchTxt);
      navigate(`/search/${searchTxt}`)
    }
  }

  const getUser = Cookies.get('user');
  const user = getUser?JSON.parse(getUser):null;
  return (
    <React.Fragment>
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      {
        user?
        <div>
          <SearchIcon className='searchMui'/>
          <input onKeyDown={(e) => {if(e.key ==="Enter"){handleSearchClick(searchTxt.search)}}} onChange={(e) => {changeText(e, setSearchTxt, searchTxt)}} value={searchTxt.search} className='search' placeholder='Username Or Blog...' type="text" name="search" />
          <button onClick={() => handleSearchClick(searchTxt.search)} className='searchBtn'>Search</button>
        </div>:null
      }
        <Typography sx={{ minWidth: 150, minHeight: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='navBtnStyleBtn'>{<Link className='navBtnStyleBtn' to={!user?'/signin':'/create'}>+ Write</Link>}</Typography>
        {
          !user?
          <>
            <Typography sx={{ minWidth: 150, minHeight: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='navBtnStyle'><Link to='signin' style={{color: 'white', textDecoration: 'none'}}>Sign In</Link></Typography>
            <Typography sx={{ minWidth: 150, minHeight: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='navBtnStyle'><Link to='signup' style={{color: 'white', textDecoration: 'none'}}>Sign Up</Link></Typography>
          </>:null
          
        }
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          {
            user?
            <>
            <Avatar sx={{ width: 50, height: 50 }}><img width="50" height="50" style={{objectFit: 'cover'}} src={user?.profile_img?.url} /></Avatar>
            </>:
            <>
            <Avatar sx={{ width: 50, height: 50 }}><img src="/images/batman.jpg" /></Avatar> 
            </>
          }
          </IconButton>
        </Tooltip>
      </Box>
      {
        user &&
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          { 
            user?
            <>
            <Avatar sx={{ width: 30, height: 30 }}><img width="35" height="35" src={user?.profile_img?.url} /></Avatar> {user?.fullname}
            </>:
            <>
            <Avatar sx={{ width: 30, height: 30 }}><img src="/images/batman.jpg" /></Avatar> Profile 
            </>
          }
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> <Link style={{color: 'inherit', textDecoration: 'none', fontWeight: 'bold'}} to={`/setting/${user?.username}`}>My account</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link to={`/setting/${user?.username}`} style={{color: 'inherit', textDecoration: 'none', fontWeight: 'bold'}}>Settings</Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      }
    </React.Fragment>
  );
}