import React from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import DeleteBtn from "./DeleteBtn";
import Cookies from "js-cookie";

const SomeComments = ({setCommentObj, setId, blogauthor, handleDeleteComment, comments, handleComment, renderCommentChildren}) => {
  const [open, setOpen] = React.useState(false);
    console.log('comments', comments)
    const handleDate = (comment) => {
        const dateObject = new Date(comment?.commentedAt);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
        return formattedDate
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
    console.log('user', user)
  return (
    <>
    {
        comments?.map(comment => {
            return (
                <>
                <Card orientation="horizontal" variant="outlined" sx={{ width: '100%', margin: '12px 0', padding: '12px' }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 60 }}>
          <img
            src={comment?.commented_by?.personal_info?.profile_img?.url}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md">
        @{comment?.commented_by?.personal_info?.username}&nbsp;<span style={{fontSize: '12px'}} className="text-secondary">({displayTimeOfPost(comment?.commentedAt)})</span>
        </Typography>
        <Typography level="body-sm">{comment.comment} <span onClick={() => {setId(comment._id); setCommentObj({isReply: true})}} style={{ cursor: 'pointer', color: 'white',fontWeight: 'bold', padding: '3px 7px', borderRadius: '10px', background: 'black'}}>Reply</span></Typography>
        {
          user?._id == comment?.commented_by?._id &&
          <Button
          variant="outlined"
          color="danger"
          endDecorator={<DeleteForever />}
          onClick={() => {setOpen(true);}}
        >
          Delete Comment
        </Button>
        }
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: '9px',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        {handleDate(comment)}
      </CardOverflow>
    </Card>
    {comment.children.length>0 && renderCommentChildren(comment.children)}
    {open && <DeleteBtn handleDeleteComment={handleDeleteComment} commentId={comment?._id} open={open} setOpen={setOpen} />}
                </>
            )
        }) 
    }
    
    </>
  );
};

export default SomeComments;
