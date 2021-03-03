import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Add from "../components/Add";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import store from '../store';

const { Content } = Layout;
require('dotenv').config()



function App() {
  return (
    <Provider store={store}>
    <Layout>
      <Router>
    
        <Content style={{ padding: '50px' }}>
          {/* application routing */}
          <Switch>
            <Route exact path="/add" component={Add} />
            <Route path="/" component={Add} />
          </Switch>
        </Content>
      </Router>
    </Layout>  
    </Provider> 
  );
}

export default App;
