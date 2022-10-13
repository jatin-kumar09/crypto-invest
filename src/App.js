import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { AppBar, colors, makeStyles } from '@material-ui/core';
import Alert from './components/Alert';

const useStyles = makeStyles(theme =>({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} exact/>
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
        {/* <Header />
    <Coinpage /> */}
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
