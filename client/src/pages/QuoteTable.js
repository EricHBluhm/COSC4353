import DataTable, { createTheme } from "react-data-table-component";
import {useState, useEffect, useCallback, useMemo, useContext} from "react"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import "./quoteTable.css";



export default function QuoteTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  //const [perPage, setPerPage] = useState(10)

  const {currentUser} = useContext(AuthContext);

  const columns = [
    {
      name: "ID Quote",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "Gallons Requested",
      selector: (row) => row.gallonsRequested,
      sortable: true,
    },
    {
      name: "Delivery Address",
      selector: (row) => row.deliveryAddress,
      sortable: true,
    },
    {
      name : "Delivery Date",
      selector: (row) => row.deliveryDate,
      sortable: true,
    },
    {
      name: "Suggested Price",
      selector: (row) => row.suggestedPrice,
      sortable: true,
    },
    {
      name : "Total Amount Due",
      selector: (row) => row.totalAmountDue,
      sortable: true
    },
  ]

  // gives different colors to certain amounts
  const conditionalRowStyles = [
    {
      when: row => row.gallonsRequested < 50,
      style: {
        backgroundColor: '#C98CA7',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.gallonsRequested > 50,
      style: {
        backgroundColor: '#57b8ff',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    }
    // You can also pass a callback to style for additional customization
   /* {
      when: row => row.gallonsRequested < 400,
      style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inerit' }),
    },*/
  ];

  // createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#eeeeee',
    secondary: '#eeeeee',
  },
  background: {
    default: '#AFBC88',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#FFFFFF',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  rows: {
      style: {
          minHeight: '72px', // override the row height
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};

  useEffect(() => {
    fetchTableData()
  }, [])

  // to display 'loading' to the user
  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function fetchTableData(){
    setLoading(true)
    const URL = "http://localhost:8800/history/:" + currentUser
    const response = await fetch(URL)
    const users = await response.json()
    setData(users)
    await delay(100);
    setLoading(false) 
  }

   // A super simple expandable component.
const ExpandedComponent = ({ data }) => 
<p><center><small>Status =  Your {data.gallonsRequested} gallons delivering to {data.deliveryAddress} have been approved</small></center></p>;


// manages deletion of rows

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

  const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete the following fuel quote/s:\r${selectedRows.map(r => r.ID)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(_.differenceBy(data, selectedRows));
        // deletes selected rows in the original data from the respective user
        
      }
		};

    return ( 
      <Stack>
        <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>
		);
	}, [data, selectedRows, toggleCleared]);


  return (
    <nav className="App">
      
      <DataTable 
        title="Fuel Quote History"
        columns = {columns}
        data = {data}
        progressPending = {loading}
        pagination // gives several pages of our data table
        conditionalRowStyles={conditionalRowStyles}
        theme="solarized"
        customStyles={customStyles}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
			  clearSelectedRows={toggleCleared}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        />
    </nav>
  )
}

