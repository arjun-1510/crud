import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table';
//import XLSX from 'xlsx';
import { MuiThemeProvider, createMuiTheme, FormControlLabel,Switch} from '@material-ui/core';


const empList = [
  { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', phone: 9876543210, city: "Bangalore" },
  { id: 2, name: "Raj", email: 'raj@gmail.com', phone: 9812345678, city: "Chennai" },
  { id: 3, name: "David", email: 'david342@gmail.com', phone: 7896536289, city: "Jaipur" },
  { id: 4, name: "Vikas", email: 'vikas75@gmail.com', phone: 9087654321, city: "Hyderabad" },
  { id: 5, name: "Vijay", email: 'Vijay@gmail.com', phone: 9187654321, city: "Chennai" },
  { id: 6, name: "Arun", email: 'Arun@gmail.com', phone: 9507654321, city: "Hyderabad" },
  { id: 7, name: "Akash", email: 'Akash@gmail.com.com', phone: 90345678, city: "Delhi" },
  { id: 8, name: "Sara", email: 'Sara@gmail.com', phone: 908765432124, city: "Hyderabad" },
  { id: 9, name: "Varun", email: 'Varun@gmail.com', phone: 9087654323, city: "Mumbai" },
  { id: 10, name: "Varshu", email: 'Varshu@gmail.com', phone: 7903425289, city: "Kolkata" },
]

function App() {

    const [preferDarkMode,setPreferDarkMode]=useState(true);

  const [data, setData] = useState(empList)
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: 'phone', },
    { title: "City", field: "city", }
  ]

  
  const theme=createMuiTheme({
      palette:{
          type:preferDarkMode?'dark':'light'
      }
  })


  return (
    <div className="App">
        <MuiThemeProvider theme={theme}>
      <h1 align="center" style={{backgroundColor:'black',color:'white',height:'50px',display:'cover',paddingTop:'5px'}}>Employee Data</h1>
      <h4 align='center'>Material Table with CRUD operation</h4>
      <FormControlLabel
          value="top"
          control={<Switch color="primary" checked={preferDarkMode} />}
          onChange={()=>setPreferDarkMode(!preferDarkMode)}
          label="Dark Mode"
          labelPlacement="top"
        />
      
      <MaterialTable className="body"
        title=""
        data={data}
        columns={columns}
        
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",exportButton:true
        }}
      />
      </MuiThemeProvider>
    </div>
  );
}

export default App;