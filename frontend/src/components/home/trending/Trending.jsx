import React from 'react'
import './trending.css'
import TrendingCard from './TrendingCard'

const Trending = () => {
  return (
    <div>
      <div className='mb-3'>
          <span className='primaryColor fw-bold'>Trending</span>
          <hr className='trendingStyleHr1' />
          <hr className='trendingStyleHr2' />
      </div>
      <div className="d-flex">
      <div className="marquee-container">
          <TrendingCard/>
          <TrendingCard/>
          <TrendingCard/>
          <TrendingCard/>
          <TrendingCard/>
          <TrendingCard/>
          <TrendingCard/>
      </div>
      </div>
    </div>
  )
}

export default Trending