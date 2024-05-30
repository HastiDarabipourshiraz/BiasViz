import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const MyButton = () => {
    return (
        <div>
            <div style={{textAlign:'center', padding:30}}>
                <Button variant="contained" sx={{ bgcolor: '#51CCBE', color: 'white' }}>
        Sentence Starter
                </Button>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#51CCBE', color: 'white' }}>
            Narrative Generation
            </Button>
        </div>

      
    );
  };
const CameraComponent = () => {
  return (
    <div>
      <div>
        <h1 style={{textAlign:'center', padding:0}}>
      Choose which one do you want to start with:
        </h1>
      </div>

      <div style={{textAlign:'center', padding:0}}> 
        <Link to="/Page2">
            <MyButton>Narrative Generation</MyButton>
        </Link>
        </div>
      <div style={{textAlign:'center', padding:30}}>
        <Link to="/Page2">

        </Link>
      </div>       
    </div>
  );
};

export default CameraComponent;
