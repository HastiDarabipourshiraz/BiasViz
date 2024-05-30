// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page0 from './Page0';
import Page1 from './Page1';
import Option1 from './Option1';
import Option2 from './Option2';
import Option3 from './Option3';
import Option4 from './Option4';
import Page2 from './Page2';

import { useState, useEffect } from 'react';

const App = () => {

  return (
    <Router>
      <div style= {{justifyContent: 'center' }}>

        <Routes>
          <Route path='/' element={ <Page0/> } />
          <Route path='/Page1' element={ <Page1/> } />
          <Route path='/page2' element={ <Page2/> } />
          <Route path='/Option1' element={ <Option1/> } />
          <Route path='/Option2' element={ <Option2/> } />
          <Route path='/Option3' element={ <Option3/> } />
          <Route path='/Option4' element={ <Option4/> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
