import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = ({ isOpened, setIsOpened, title, question, onSuccess, yesText, noText }) => {
    return (
        <div>
            <Dialog
                open={isOpened}
                onClose={() => setIsOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {question}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpened(false)}>{noText}</Button>
                    <Button onClick={onSuccess} autoFocus>{yesText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmDialog;