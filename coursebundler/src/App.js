import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Home from './components/Home/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
