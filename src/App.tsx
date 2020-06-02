import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Underwater from './Underwater';
import Logo from './Logo';
// import Ocean from './Ocean';
import Scratch from './Scratch';

function App() {
    return (
        <Router>
            <div style={{ height: '100vh' }}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/underwater">Underwater</Link>
                    </li>
                    <li>
                        <Link to="/logo">Logo</Link>
                    </li>
                    <li>
                        <Link to="/scratch">Scratch</Link>
                    </li>
                    {/* <li>
                        <Link to="/ocean">Ocean</Link>
                    </li> */}
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/underwater">
                        <Underwater />
                    </Route>
                    <Route path="/logo">
                        <Logo />
                    </Route>
                    <Route path="/scratch">
                        <Scratch />
                    </Route>
                    {/* <Route path="/ocean">
                        <Ocean />
                    </Route> */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;