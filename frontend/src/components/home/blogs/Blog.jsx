import React, { useEffect } from 'react'
import BlogCard from './BlogCard'
import Interest from './interest/Interest'
import './blog.css'
import Create from './interest/create/Create'

const Blog = ({tags, handletags, similarBlogSearch, setSimilarBlogSearch, searchByTags, setSearchByTags, fetchBlogs, blogs}) => {
  useEffect(() => {
    fetchBlogs();
  },[])
  return (
    <div>
        <div className="container">
            <div className="row blogContainer py-3">
              <div className="blogcard col-lg-7 p-0">
                <div>
                    <span className='primaryColor trendingStyle py-2 fw-bold'>Blog</span>
                    <hr className='trendingStyleHr1' />
                    <hr className='trendingStyleHr2' />
                </div>
                {
                  tags!=""?
                    (searchByTags.length>0?
                    (
                    searchByTags?.map((blog) => {
                      return(
                        <BlogCard key={blog._id} blog={blog} />
                      )
                    })
                    ):<span><b>{tags}</b> no similar blogs found</span>
                  ):
                 ( blogs &&
                  blogs.map((blog) => {
                    return(
                      <BlogCard key={blog._id} blog={blog} />
                    )
                  }))
                }
                
              </div>
              <div className="col-sm-1"></div>
              <div className="col-lg-4">
                <Interest handletags={handletags} searchByTags={searchByTags} similarBlogSearch={similarBlogSearch} setSimilarBlogSearch={setSimilarBlogSearch} setSearchByTags={setSearchByTags} />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Blog