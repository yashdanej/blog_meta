import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress style={{width: '24px', height: '24px', color: 'white'}} />
    </Box>
  )
}

export default Loading