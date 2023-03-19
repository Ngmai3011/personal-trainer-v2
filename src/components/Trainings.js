import {useRef, useState, useContext} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import moment from "moment";
import DeleteTraining from "./DeleteTraining";
import {TrainingContext} from "./TrainingContext";

export default function Trainings() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const gridRef = useRef();

  const {data, refetch} = useContext(TrainingContext);

  const handleTrainingDeleted = (trainingId) => {
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
      .then((_) => {
        setMessage("Training Deleted");
        setOpen(true);
      })
      .then((_) => refetch())
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "",
      maxWidth: 130,
      cellRenderer: (params) => {
        return (
          <DeleteTraining
            targetTraining={params.data}
            onTrainingDeleted={handleTrainingDeleted}
          />
        );
      },
    },
    {
      field: "customer.firstname",
      maxWidth: 190,
      headerName: "Firstname",
      sortable: true,
      filter: true,
    },
    {
      field: "customer.lastname",
      maxWidth: 190,
      headerName: "Lastname",
      sortable: true,
      filter: true,
    },
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (param) => {
        return moment(param.data.date).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      field: "duration",
      headerName: "Duration in mins",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{
        height: "700px",
        width: "100%",
        margin: "auto",
      }}>
      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => (gridRef.current = params.api)}
        rowSelection="single"
        animateRows="true"
        columnDefs={columns}
        rowData={data}
      />
      <Snackbar
        open={open}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        ContentProps={{
          sx: {
            background: "#8452a1",
            color: "white",
          },
        }}
      />
    </div>
  );
}
