import React from 'react'
import './interest.css'
import ClickableChips from './ClickableChips'
import Featured from './Featured'
import SelectMultipleAppearance from './SelectMultipleAppearance'

const Interest = ({handletags, searchByTags, similarBlogSearch, setSimilarBlogSearch, setSearchByTags}) => {
  return (
    <div className='interest'>
        <div className="p-3">
            <span className='primaryColor trendingStyle py-2 fw-bold'>Tags</span>
            <hr className='trendingStyleHr1' />
            <hr className='trendingStyleHr2' />
            <SelectMultipleAppearance handletags={handletags} searchByTags={searchByTags} similarBlogSearch={similarBlogSearch} setSimilarBlogSearch={setSimilarBlogSearch} setSearchByTags={setSearchByTags} />
        </div>
        <div className="p-3">
        <span className='primaryColor trendingStyle py-5 fw-bold'>Featured <span className='text-danger'>(Coming soon)</span></span>
        <hr className='trendingStyleHr1' />
        <hr className='trendingStyleHr2' />
        <div className="featured">
            <div className="row" style={{justifyContent: 'center', alignContent: 'center'}}>
                <Featured/>
                <Featured/>
                <Featured/>
                <Featured/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Interest