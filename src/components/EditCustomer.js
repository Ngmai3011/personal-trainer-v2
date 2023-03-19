import {useState} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditCustomer({onCustomerEdited, targetCustomer}) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  };

  const handleEditClick = () => {
    setOpen(true);
    setCustomer({
      firstname: targetCustomer.firstname,
      lastname: targetCustomer.lastname,
      email: targetCustomer.email,
      phone: targetCustomer.phone,
      streetaddress: targetCustomer.streetaddress,
      postcode: targetCustomer.postcode,
      city: targetCustomer.city,
    });
  };

  const handleClose = () => {
    onCustomerEdited(customer, targetCustomer.links[0].href);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleEditClick}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            onChange={inputChanged}
            label="First Name"
            id="firstname"
            name="firstname"
            value={customer.firstname || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            label="Last Name"
            id="lastname"
            name="lastname"
            value={customer.lastname || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            id="phone"
            label="Phone"
            name="phone"
            value={customer.phone || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            id="email"
            label="Email"
            name="email"
            value={customer.email || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            label="Street Address"
            id="streetaddress"
            name="streetaddress"
            value={customer.streetaddress || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            label="Post Code"
            id="postcode"
            name="postcode"
            value={customer.postcode || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            id="city"
            label="City"
            name="city"
            value={customer.city || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Update
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
