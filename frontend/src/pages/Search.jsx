import React from 'react'
import './search.css'
import BlogCard from '../components/home/blogs/BlogCard'
import SearchUser from './SearchUser'

const Search = ({searchTxt, searchObject}) => {
  return (
    <div className='searchSeaction'>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-sm-10 col-10">
                    <span className='px-2 searchResult'>Search result for <b>{searchTxt} (blog)</b></span>
                    {
                        searchObject && searchObject?.blogs.length>0?
                        searchObject?.blogs.map((blog) => {
                            return (
                                <BlogCard blog={blog} />
                            )
                        })
                        :<p style={{fontSize: '12px'}} className='px-2 py-3 searchResult'>No result for blog: <b>{searchTxt}</b></p>
                    }
                </div>
                <div className="col-lg-4 col-sm-10 col-10">
                    <span className='px-2 searchResult'>Search result for <b>{searchTxt} (user)</b></span>
                    {
                        searchObject && searchObject.users?.length>0?
                        searchObject?.users?.map((user) => {
                            return (
                                <div className='px-4 pt-2'>
                                    <SearchUser user={user} />
                                </div>
                            )
                        }):<p style={{fontSize: '12px'}} className='searchResult py-3 px-2'>No result for user: <b>{searchTxt}</b></p>
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search