import {useRef, useState, useContext} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import DeleteCustomer from "./DeleteCustomer";
import ExportCSV from "./ExportCSV";
import {TrainingContext} from "./TrainingContext";
import useFetchData from "../utils/useFetchData";

export default function Customers() {
  const [message, setMessage] = useState(null);
  const gridRef = useRef();

  const {
    data,
    loading,
    error,
    refetch: refetchCustomer,
  } = useFetchData("http://traineeapp.azurewebsites.net/api/customers");

  const handleCustomerAdded = (customer) => {
    setMessage("Submitting customer");
    fetch("http://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((_) => {
        refetchCustomer();
        setMessage("Customer Added");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch(() => setMessage("Submitting Error"));
  };

  const handleCustomerEdited = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((_) => {
        refetchCustomer();
        setMessage("Customer Edited");
      })
      .catch((err) => console.error(err));
  };

  const handleCustomerDeleted = (link) => {
    fetch(link, {method: "DELETE"})
      .then((_) => {
        refetchCustomer();
        setMessage("Customer Deleted");
      })
      .catch((err) => console.error(err));
  };

  const {refetch} = useContext(TrainingContext);

  const handleTrainingAdded = (training) => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((_) => {
        setMessage("Training Added");
      })
      .then((_) => refetch())
      .catch((err) => console.error(err));
  };

  const handleClose = () => {};

  const columns = [
    {
      field: "",
      maxWidth: 80,
      cellRenderer: (params) => {
        return (
          <div>
            <DeleteCustomer
              targetCustomer={params.data}
              onCustomerDeleted={handleCustomerDeleted}
            />
          </div>
        );
      },
    },
    {
      field: "",
      maxWidth: 80,
      cellRenderer: (params) => {
        return (
          <EditCustomer
            targetCustomer={params.data}
            onCustomerEdited={handleCustomerEdited}
          />
        );
      },
    },

    {
      field: "",
      maxWidth: 170,
      cellRenderer: (params) => {
        return (
          <AddTraining
            targetCustomer={params.data}
            onTrainingAdded={handleTrainingAdded}
          />
        );
      },
    },

    {
      field: "firstname",
      maxWidth: 190,
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "lastname",
      maxWidth: 190,
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "phone",
      maxWidth: 170,
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "streetaddress",
      headerName: "Address",
      maxWidth: 180,
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "postcode",
      maxWidth: 170,
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: "city",
      maxWidth: 160,
      sortable: true,
      filter: true,
      editable: true,
    },
  ];
  console.log(data);
  return (
    <div
      className="ag-theme-material"
      style={{
        height: "700px",
        width: "100%",
        margin: "auto",
      }}>
      <div
        style={{
          display: "inline-flex",
          width: "100%",
          justifyContent: "flex-end",
        }}>
        <AddCustomer onCustomerAdded={handleCustomerAdded} />
        {data !== null && <ExportCSV data={data.content} />}
      </div>
      {loading && <div> Loading customers ... </div>}
      {error && <div> Error loading customers </div>}

      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => (gridRef.current = params.api)}
        rowSelection="single"
        animateRows="true"
        columnDefs={columns}
        rowData={data !== null ? data.content : []}
      />
      <Snackbar
        open={message !== null}
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
