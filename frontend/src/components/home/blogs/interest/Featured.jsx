import React from 'react'
import Typography from '@mui/joy/Typography';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import Sheet from '@mui/joy/Sheet';
import LikeButton from '../../../utils';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Featured = () => {
  const getUser = Cookies.get('user');
  const user = getUser?JSON.parse(getUser):null;
  return (
    <>
        <div className="d-flex align-items-center col-md-3 col-lg-4 col-sm-3 col-3 my-2">
            <img className='imgFeatured' src="/images/flower.jpg" style={{width: '100%', height: '6.2rem', objectFit: 'cover', borderRadius: '15px'}} alt="" />
        </div>
        <div className="secondFeatured col-md-9 col-lg-8 col-sm-9 col-9 my-2">
            <span style={{fontSize: '12px', fontWeight: 'bold'}}>Yash   Danej &nbsp; @yashdanej &nbsp; 27 Sep</span>
            <p style={{fontSize: '13px'}} className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem4</p>
            <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              display: 'flex',
              gap: 1,
              '& > div': { flex: 1 },
            }}
          >
          </Sheet>
        </div>
    </>
  )
}

export default Featured