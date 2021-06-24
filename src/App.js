import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import Home from './components/Home/Home/Home';
import { auth, setUser } from "./components/Login/authManager";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";

export const context = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [adminLoaded, setAdminLoaded] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user=> {
      if (user){
        const newUser = setUser(user);
        setLoggedInUser(newUser);
        setLoading(false);
      }
      else{
        setLoading(false);
      }
    })
    return unsubscribe;
  }, [])

  const contextData = {
    loggedInUser,
    setLoggedInUser,
    loading,
    isAdmin,
    setIsAdmin,
    adminLoaded,
    setAdminLoaded
  }

  return (
    <context.Provider value={contextData}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
