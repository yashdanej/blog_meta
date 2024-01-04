import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { Textarea } from '@mui/joy';
import InputFileUpload from './Upload';
import { useState } from 'react';
import { LoadingContent, api, changeText } from '../../../components/utils';
import { useEffect } from 'react';
import SnackbarWithDecorators from '../../../components/SnackbarWithDecorators';

export default function UpdateUser({getUsername, open, setOpen, fetchUserFn}) {
    const [snackAlert, setSnackAlert] = useState(false); // popup success or error
    const [snackbarProperty, setSnackbarProperty] = useState({ // popup success or error text
        text: '',
        color: ''
    });
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);
    const handleUpdate = () => {
        setLoading(true);
        const pathname = `/user/${getUsername}`;
        api(pathname, 'patch', userData, true, true)
            .then(res => {
                setSnackbarProperty(prevState => ({
                    ...prevState,
                    text: "User updated successfully🥳!",
                    color: "success"
                }));
                setSnackAlert(true);
                fetchUserFn();
            }).catch(e => {
                console.log("error in updating user", e);
            }).finally(() => {
                setLoading(false);
                setOpen(false);
            });
    };
  return (
    <>
    {loading && <LoadingContent/> }
    {
      snackAlert?
      <SnackbarWithDecorators snackAlert={snackAlert} setSnackAlert={setSnackAlert} text={snackbarProperty.text} color={snackbarProperty.color} />
      :null
    }
      <Modal open={open} onClose={() => {setOpen(false);}}>
        <ModalDialog>
          <DialogTitle>Edit Profile</DialogTitle>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel >Full name</FormLabel>
                <Input name="fullname" value={userData?.fullname} onChange={(e) => changeText(e, setUserData, userData)} autoFocus />
              </FormControl>
              <FormControl>
                <FormLabel>Profile image</FormLabel>
                <InputFileUpload userData={userData} setUserData={setUserData} />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea name="bio" value={userData?.bio} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Youtube</FormLabel>
                <Textarea name="youtube" value={userData?.youtube} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Instagram</FormLabel>
                <Textarea name="instagram" value={userData?.instagram} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Facebook</FormLabel>
                <Textarea name="facebook" value={userData?.facebook} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Twitter</FormLabel>
                <Textarea name="twitter" value={userData?.twitter} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Github</FormLabel>
                <Textarea name="github" value={userData?.github} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Textarea name="website" value={userData?.website} onChange={(e) => changeText(e, setUserData, userData)} />
              </FormControl>
              <Button onClick={handleUpdate}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}