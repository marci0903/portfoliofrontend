import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SportsHockeySharp } from '@mui/icons-material';

const sectors = [
    {
      value: '0',
      label: 'COMMUNICATION SERVICES',
    },
    {
      value: '1',
      label: 'CONSUMER DISCRETIONARY',
    },
    {
      value: '2',
      label: 'CONSUMER STAPLES',
    },
    {
      value: '3',
      label: 'ENERGY',
    },
    {
        value: '4',
        label: 'FINANCIALS',
      },
      {
        value: '5',
        label: 'HEALT CARE',
      },
      {
        value: '6',
        label: 'INDUSTRIALS',
      },
      {
        value: '7',
        label: 'INFORMATION TECHNOLOGY',
      },
      {
        value: '8',
        label: 'MATERIALS',
      },
      {
        value: '9',
        label: 'REAL ESTATE',
      },
      {
        value: '10',
        label: 'UTILITIES',
      },
  ];


export default function Stock() {
    const [sector, setSector] = React.useState('0');
    const papperStyle={padding:'50px 20px', width:'auto', margin:"10px auto"};
    const [companyName,setName]=React.useState('');
    const [symbol,setSymbol]=React.useState('');
    const [amount,setAmount]=React.useState('');
    const [profit,setProfit]=React.useState('');
    const [stocks,setStocks]=React.useState([]);
    const handleClick=(e)=>{
        e.preventDefault()
        window.location.reload(true);

        const stock={companyName,symbol,sector,amount,profit}
        console.log(stock)
        fetch("http://localhost:8080/stock_entity/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(stock)
     } ).then(()=>{console.log("New Stock added")})
    }
  const handleChange = (event) => {
    setSector(event.target.value);
    setSymbol(event.target.value.toUpperCase())
  };

  React.useEffect(()=>{
    fetch("http://localhost:8080/stock_entity/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setStocks(result);
    }
    )
  },[])
  return (
    <Container>
        <h1>Add New Stock to the Portfolio</h1>
        <Paper elevation={3} style={papperStyle}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="standard-basic" label="Company Name" variant="outlined" value={companyName}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="standard-basic" label="Symbol" variant="outlined"  value={symbol} 
      onChange={(e)=>setSymbol(e.target.value)}
        onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()}
      />
      <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={sector}
          onChange={(e)=>setSector(e.target.value)}
          helperText="Please select your currency"
          
        >
          {sectors.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <TextField id="standard-basic" label="Amount" type="number" variant="outlined" value={amount}
      onChange={(e)=>setAmount(e.target.value)}/>
      <TextField id="standard-basic" label="Profit" type="number" variant="outlined" value={profit}
      onChange={(e)=>setProfit(e.target.value)}/>
      <Button variant="contained" onClick={handleClick}>Submit</Button>
      
    </Box></Paper>
    <h1>Portfolio</h1>
    <Paper elevation={3} style={papperStyle}>
    {stocks.map(stock=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={stock.id}>
        
         CompanyName:{stock.companyName}<br/>
         Symbol: {stock.symbol}<br/>
         Sector: {stock.sector}<br/>
         Shares: {stock.amount}<br/>
         Profit: {stock.profit}%
        </Paper>
      ))
}
    </Paper>
    </Container>
   
  );
}