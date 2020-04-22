import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import CategoryList from './components/CategoryList';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          {/* <DCandidates /> */}
          <Navbar/>
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
