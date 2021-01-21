import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import IngrijitorContainer from './ingrijitor/ingrijitor-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import MedicamenteContainer from "./Medicamente/medicamente-container";
import PacientView from "./Pacient";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />


                        <Route
                            exact
                            path='/pacient'
                            render={() => <PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/pacientView'
                            render={() => <PacientView/>}
                        />

                        <Route
                            exact
                            path='/ingrijitor'
                            render={() => <IngrijitorContainer/>}
                        />
                        <Route
                            exact
                            path='/medicamente'
                            render={() => <MedicamenteContainer/>}
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
    };
}

export default App
