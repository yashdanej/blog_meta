import React from 'react'
import SimilarOption from './SimilarOption'

const SimilarBlogs = ({similarBlog}) => {
  return (
    <>
      {
        similarBlog?.map((blog) => {
          return (
              <>
                {blog.length>0 &&
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <SimilarOption blog={blog} />
              </div>}
              </>
          )
        })
      }
    </>
  )
}

export default SimilarBlogs