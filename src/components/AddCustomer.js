import {useState} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const customerInfo = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  streetaddress: "",
  postcode: "",
  city: "",
};

export default function AddCustomer({onCustomerAdded}) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({customerInfo});

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onCustomerAdded(customer);
    setOpen(false);
    setCustomer({customerInfo});
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div style={{marginRight: "12px"}}>
      <Button
        style={{marginTop: 10}}
        variant="contained"
        color="secondary"
        onClick={handleAddClick}>
        Add new customer
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
        <DialogTitle id="form-dialog-title">Enter new customer</DialogTitle>

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
            Save
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
