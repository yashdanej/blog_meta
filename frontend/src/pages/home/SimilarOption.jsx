import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function SimilarOption({blog}) {
    console.log('blog', blog);
    const dateObject = new Date(blog[0]?.publishedAt);
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
  return (
    <Card key={blog._id} sx={{ width: 320 }}>
    <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={blog[0]?.banner?.url}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="title-lg">{blog[0]?.title}</Typography>
        <Typography level="body-sm">{formattedDate}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Views</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {blog[0]?.activity?.total_reads?.length}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}