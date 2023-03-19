import {CSVLink} from "react-csv";
import {Button} from "@mui/material";

export default function ExportCSV({data}) {
  const exportHeaders = [
    {label: "First Name", key: "firstname"},
    {label: "Last Name", key: "lastname"},
    {label: "Email", key: "email"},
    {label: "Phone", key: "phone"},
    {label: "Address", key: "streetaddress"},
    {label: "Postcode", key: "postcode"},
    {label: "City", key: "city"},
  ];
  const exportData = data.map((value) => ({
    firstname: value.firstname,
    lastname: value.lastname,
    email: value.email,
    phone: value.phone,
    streetaddress: value.streetaddress,
    postcode: value.postcode,
    city: value.city,
  }));

  return (
    <CSVLink
      data={exportData}
      headers={exportHeaders}
      filename={"personal-training.csv"}
      style={{textDecoration: "none"}}
      target="_blank">
      <Button style={{marginTop: 10}} variant="contained" color="info">
        Export Customer File
      </Button>
    </CSVLink>
  );
}
