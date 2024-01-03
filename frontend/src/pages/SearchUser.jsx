import React from 'react'
import { Link } from 'react-router-dom'

const SearchUser = ({user}) => {
  return (
    <div style={{justifyContent: 'space-between'}} className="d-flex align-items-center py-1">
        <div className="SearchDiv d-flex align-items-center">
            <img style={{objectFit: 'cover', borderRadius: '50%'}} width='50px' height='50px' src={user?.personal_info?.profile_img?.url} alt="" />
            <p style={{fontSize: '14px'}} className='fw-bold pt-3'>&nbsp;&nbsp;{user?.personal_info?.fullname} · <span style={{fontSize: '14px'}}>@{user?.personal_info?.username}</span></p>
        </div>
        <button className='searchVisitBtn'><Link to={`/setting/${user?.personal_info?.username}`} style={{color: 'inherit', textDecoration: 'none'}}>Visit</Link></button>
    </div>
  )
}

export default SearchUser