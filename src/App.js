import React,  { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const url = 'http://universities.hipolabs.com/search?country=Australia'
  const [loaded,setLoaded] = useState(false)
  const [post, setPost] = useState(null);
  useEffect(()=>{
    axios.get(`${url}`).then((response)=>{
      setPost(response.data)
    })
  },[])
  if (!post) return null;

  
  

  const loadData = ()=>{
    console.log('post', post)
    
    setLoaded(true)
  }

  const delData = ()=>{
    console.log('del data')
    setPost(post.slice(0,-1))
    
  }
  
  const addData = ()=>{
    console.log('add data')
    const ele = post.slice(0,1)[0];
    console.log("ele:",ele)
    setPost(prev=>[...prev,  ele])
  }
  return (
    <div  style={{ height: 400, width: '100%' }}>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">domains</StyledTableCell>
            <StyledTableCell align="left">country</StyledTableCell>
            <StyledTableCell align="left">name</StyledTableCell>
            <StyledTableCell align="right">stateProvince</StyledTableCell>
            <StyledTableCell align="left">web_pages</StyledTableCell>
            <StyledTableCell align="right">alpha_two_code</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loaded===true && post.map((row) => (
            <StyledTableRow key={parseInt(Date.now() * Math.random())}>
              
              <StyledTableCell align="left">{row.domains.join(`\n`) }</StyledTableCell>
              <StyledTableCell align="left">{row.country}</StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.stateProvince}</StyledTableCell>
              <StyledTableCell align="left">{row.web_pages.join(`\n`)}</StyledTableCell>
              <StyledTableCell align="right">{row.alpha_two_code}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



      <button onClick={loadData} >Load </button>
      <button onClick={delData} >DELETE</button>
      <button onClick={addData} >ADD</button>
      
    </div>
  );
}

export default App;
