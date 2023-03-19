import {useState} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function AddTraining({targetCustomer, onTrainingAdded}) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: "",
    duration: "",
    customer: targetCustomer.links[0].href,
  });

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onTrainingAdded(training);
    setOpen(false);
    setTraining({
      date: new Date(),
      activity: "",
      duration: "",
      customer: targetCustomer.links[0].href,
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button color="secondary" onClick={handleAddClick}>
        ADD TRAINING
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
        <DialogTitle id="form-dialog-title">
          Enter customer training
        </DialogTitle>

        <DialogContent>
          <DatePicker
            variant="standard"
            onChange={(newDate) => {
              setTraining({date: newDate});
            }}
            label="Date"
            id="date"
            name="date"
            renderInput={(params) => (
              <TextField {...params} autoFocus margin="dense" />
            )}
            value={training.date || ""}
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            label="Activity"
            id="activity"
            name="activity"
            value={training.activity || ""}
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            variant="standard"
            onChange={inputChanged}
            id="duration"
            label="Duration in minutes"
            name="duration"
            value={training.duration || ""}
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
    </LocalizationProvider>
  );
}
