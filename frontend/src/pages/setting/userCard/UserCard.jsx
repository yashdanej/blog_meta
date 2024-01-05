import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import {Link} from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingContent, api } from '../../../components/utils';
import SnackbarWithDecorators from '../../../components/SnackbarWithDecorators';
import { useState } from 'react';

export default function UserCard({fetchUserFn, userGet, blog}) {
  const [snackAlert, setSnackAlert] = useState(false); // popup success or error
  const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
      text: '',
      color: ''
  });
  const [loading, setLoading] = useState(false);
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
      const handleDeleteBlog = (id) => {
        setLoading(true);
        const pathname = `/blog/${id}`;
        api(pathname, 'delete', false, false, true)
        .then(res => {
          console.log('res', res);
          fetchUserFn();
          setSnackbarProperty(prevState => ({
            ...prevState,
            text: "Blog deleted successfully🦎!",
            color: "success"
          }));
          setSnackAlert(true);
        }).catch(e => {
          console.log("error in deleting blog", e);
        }).finally(() => {
            setLoading(false);
        });
      }
  return (
    <>
    {loading && <LoadingContent/>}
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
    <Card variant="outlined" sx={{ width: '100%', borderRadius: '25px', marginBottom: '20px' }}>
      <CardOverflow>
        <AspectRatio ratio="1.5">
          <Link to={`/blog/${blog?._id}`}>
            <img
              src={blog?.banner.url}
              loading="lazy"
              alt=""
            />
          </Link>
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          onClick={() => {userGet && handleDeleteBlog(blog?._id)}}
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          {
            userGet?<DeleteForeverIcon />:<Favorite />
          }

        </IconButton>
          {
            userGet &&
            <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="primary"
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '3.5rem',
              bottom: '0',
              transform: 'translateY(50%)',
            }}
          >
            <ModeEditIcon />
          </IconButton>
          }
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link style={{color: 'inherit', textDecoration: 'none'}} to={`/blog/${blog?._id}`} overlay underline="none">
            {blog?.title}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link style={{color: 'inherit', textDecoration: 'none'}} to={`/blog/${blog?._id}`} href="#multiple-actions">{blog?.des.length>28?blog?.des.slice(0, 28) + "...":blog?.des}</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">{blog?.activity.total_reads?.length} views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{displayTimeOfPost(blog?.publishedAt)}</Typography>
        </CardContent>
      </CardOverflow>
    </Card>
    </>
  );
}