import * as React from "react";
import App from "./app";
import ReactDOM from "react-dom";
import CaregiverView from "./caregiver"
import PacientView from "./Pacient";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./home/home";
import PersonContainer from "./person/person-container";
import IngrijitorContainer from "./ingrijitor/ingrijitor-container";
import MedicamenteContainer from "./Medicamente/medicamente-container";
import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import NavigationBar from "./navigation-bar";
import NavigationBarLogin from "./navigation-barlogin";
import LoginForm from "./LoginForm";

class Login extends React.Component{


render() {

    return (
        <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBarLogin/>

                    <Switch>

                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                        />
                        <Route
                            exact
                            path='/logasdoc'
                            render={() => <App/>}
                        />

                        <Route
                            exact
                            path='/logaspacient'
                            render={() => <PacientView/>}
                        />

                        <Route
                            exact
                            path='/logasingrijitor'
                            render={() => <CaregiverView/>}
                        />


                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
}
export default Login