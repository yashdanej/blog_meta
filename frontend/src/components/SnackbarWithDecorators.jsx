import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function SnackbarWithDecorators({snackAlert, setSnackAlert, text, color}) {
 

  return (
    <React.Fragment>
      <Snackbar
        variant="soft"
        color={color}
        open={snackAlert}
        onClose={() => setSnackAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => setSnackAlert(false)}
            size="sm"
            variant="soft"
            color={color}
          >
            Dismiss
          </Button>
        }
      >
        {text}
      </Snackbar>
    </React.Fragment>
  );
}