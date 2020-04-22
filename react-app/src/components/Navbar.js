import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  smMargin: {
    margin: theme.spacing(1)
}
}));


export default function BasicExample() {
  const [currentId, setCurrentId] = useState(0)
  const classes = useStyles();
  return (
    <Router>
      <AppBar position="static">
  <Toolbar>
  
    <Typography variant="h6" className={classes.title}>
      Test
    </Typography>
    <Button variant="contained" 
            href="/CategoryList"
            className={classes.smMargin}
            >Category</Button>
    <Button variant="contained"
            href="/ProductList"
            className={classes.smMargin}
            >Product</Button>
    
  </Toolbar>
</AppBar>

      <div className='red'>
        <Switch>
        <Route exact path="/" >
            <CategoryList />
          </Route>
          <Route path="/CategoryList" >
            <CategoryList />
          </Route>
          <Route path="/ProductList">
            <Route path='/ProductList/AddProduct'>
             <AddProduct/>  
            </Route>
          <ProductList/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}