import {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import moment from "moment";
import DeleteTraining from "./DeleteTraining";
import useFetchData from "../utils/useFetchData";

export default function Trainings() {
  const [message, setMessage] = useState(null);
  const gridRef = useRef();

  const {data, loading, error, refetch} = useFetchData(
    "https://traineeapp.azurewebsites.net/gettrainings"
  );

  console.log(data);

  const handleTrainingDeleted = (trainingId) => {
    setMessage("Deleting training");
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
      .then((_) => {
        refetch();
        setMessage("Training Deleted");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch(() => setMessage("Deleting Error"));
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
      {loading && <div> Loading trainings ... </div>}
      {error && <div> Error loading trainings </div>}

      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => (gridRef.current = params.api)}
        rowSelection="single"
        animateRows="true"
        columnDefs={columns}
        rowData={data !== null ? data : []}
      />
      <Snackbar
        open={message !== null}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
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
