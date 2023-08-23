import "./App.css";
//import { Home } from "./Home";
import {Home1} from "./Home1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Master from "./Master";
import TransactionsPage from "./Transactions";
function App() {
  return (
    <BrowserRouter>
    <ToastContainer /> 
      {/* <Switch>
        <Route exact path="/" component={Home1} />
        
      </Switch> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Master" component={Master} />
        <Route path="/Transactions" component={TransactionsPage} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
