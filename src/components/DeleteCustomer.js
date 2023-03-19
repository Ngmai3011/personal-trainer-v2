import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteCustomer({targetCustomer, onCustomerDeleted}) {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onCustomerDeleted(targetCustomer.links[0].href);
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleDeleteClick}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "400px",
            },
          },
        }}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Yes
          </Button>
          <Button onClick={handleNo} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
