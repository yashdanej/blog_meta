import React from 'react'
import Trending from '../../components/home/trending/Trending'
import Blog from '../../components/home/blogs/Blog'
import Cookies from 'js-cookie';

const Home = ({tags, handletags, similarBlogSearch, setSimilarBlogSearch, searchByTags, setSearchByTags, fetchBlogs, blogs}) => {
  return (
    <div className='home'>
      <div className="container containerBox">
        <Blog tags={tags} handletags={handletags} similarBlogSearch={similarBlogSearch} setSimilarBlogSearch={setSimilarBlogSearch} searchByTags={searchByTags} setSearchByTags={setSearchByTags} fetchBlogs={fetchBlogs} blogs={blogs} />
        {/* <Trending/> */}
      </div>
    </div>
  )
}

export default Home