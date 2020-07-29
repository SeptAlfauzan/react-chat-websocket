import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogFormUsername(props) {
  const [username, setUsername] = React.useState('');

  const handleOnchange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  }
  const handleSubmit = () => {
    props.setUsername(username);
    console.log('success set username');
    props.handleClose();
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" color="primary">Please</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message} Type your username
          </DialogContentText>
          <TextField
            autoComplete="false"
            onChange={handleOnchange}
            defaultValue={username}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}