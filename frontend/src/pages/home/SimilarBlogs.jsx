import React from 'react'
import SimilarOption from './SimilarOption'

const SimilarBlogs = ({similarBlog}) => {
  console.log('similarBlog', similarBlog);
  return (
    <>
      <p className='fw-bold py-3' style={{fontSize: '17px'}}>People also find interesting</p>
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