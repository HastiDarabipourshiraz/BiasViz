// Page1.js
import React from 'react';
import { Link } from 'react-router-dom';
import image1 from './bg1.jpg'
import Button from '@mui/material/Button';

const MyButton = () => {
    return (
        <Button variant="contained" sx={{ bgcolor: '#51CCBE', color: 'white' }}>
        Start Now!
        </Button>
    );
  };
const Page1 = () => {
  return (
        
          <div>
              <div>
                <h1 style={{textAlign:'center'}}>
                Welcome to BiasViz!
                </h1>
                <h3 style={{textAlign:'center'}}>
                    Where you can Identify, Quantify and Mitigate gender bias in large language models!</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={image1} alt='img1' style={{ display: 'block', width: '60vw', height: 'auto'}}></img>
              </div>
              <div style={{textAlign:'center'}}>
                <Link to="/Page1">
                    <MyButton>Start!</MyButton>
                </Link>
             </div>
      </div>
    );
  };
  
  

export default Page1;