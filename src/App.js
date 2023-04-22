import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Students from "./pages/Students";
import SendSms from "./pages/SendSms";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/send-sms" component={SendSms} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
