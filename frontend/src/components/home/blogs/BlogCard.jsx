import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import './blogCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import { Link } from 'react-router-dom';
import LikeButton, { api } from '../../utils';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';

export default function BlogCard({blog}) {
  const getUser = Cookies.get('user');
  const user = getUser?JSON.parse(getUser):null;
  const [liked, setLiked] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null)
  const handleViewBlog = (id) => {
    const getUser = Cookies.get('user');
    const user = getUser?JSON.parse(getUser):null;
    if(user){
      const pathname = `/blog/${id}/view`
      api(pathname, 'patch', false, false, true)
        .then(res => {
          console.log('view text', res);
        })
        .catch(e => {
          console.log('err in viewBlog', e);
        })
    }
  }
  useEffect(() => {
    if(blog){
      setLiked(user?blog.activity?.total_likes.some((u) => u === user._id):false)
      setTotalLikes(blog?.activity?.total_likes.length || 0)
    }
  }, [])
  return (
    <Box
      className="blogPost"
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
        className="row"
      >
        <AspectRatio flex className='col-xs-3 col-sm-3'  ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src={blog?.banner?.url}
            loading="lazy"
            alt="Blog image"
            style={{width: '70%', height: '70%'}}
            className="imageContent"
          />
        </AspectRatio>
        <CardContent className="cardContent col-xs-3 col-sm-3">
          <Typography fontSize="sl" fontWeight="lg">
            {blog?.title} · <span style={{fontSize: '14px'}}><Link to={`/setting/${blog?.author?.personal_info?.username}`} style={{color: 'inherit', textDecoration: 'none'}}>@{blog?.author?.personal_info?.username}</Link></span>
            <span>
            {
              blog?.tags?.length>0?
              blog?.tags?.map((tag, index) => {
                if(index<=3){
                  return(<span className="tagBtn mx-1">{tag}</span>)
                }else{
                  return "..."
                }
              }):
              <span>{blog?.tags}</span>
            }
            </span>
          </Typography>
          <Typography level="body-sm" textColor="text.tertiary">
            {blog && blog?.des.length<=121?blog.des:blog?.des.slice(0, 121)+'...'}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Articles
              </Typography>
              <Typography fontWeight="lg">{blog?.author?.account_info?.total_posts} <DescriptionSharpIcon style={{ width: '1.2rem' }}/></Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                View
              </Typography>
              <Typography fontWeight="lg">{blog?.activity?.total_reads.length} <RemoveRedEyeSharpIcon style={{width: '1.3rem' }}/></Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Likes
              </Typography>
              <Typography fontWeight="lg">{totalLikes}{' '} {user?<LikeButton setTotalLikes={setTotalLikes} blog={blog} liked={liked} setLiked={setLiked} />:<Link to='/signin' style={{textDecoration: 'none', fontSize: '1.2rem'}}>🖤</Link>} </Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button className='buttonView' variant="outlined" color="neutral">
              <Link to={`/setting/${blog?.author?.personal_info?.username}`} className='buttonViewText' style={{color: '#161616', textDecoration: 'none'}}>Visit Profile</Link>
            </Button>
            <Button className='buttonView' variant="solid" style={{background: '#161616'}}>
              <Link className='buttonViewText' style={{color: 'white', textDecoration: 'none'}} onClick={() => handleViewBlog(blog?._id)} to={`/blog/${blog?._id}`}>View</Link>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
