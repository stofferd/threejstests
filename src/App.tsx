import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Underwater from './Underwater';
import Logo from './Logo';
// import Ocean from './Ocean';
import Scratch from './Scratch';
import Terrain from './Terrain';
import Globe from './Globe';
import Knot from './Knot';
import WireframeGlow from './WireframeGlow';

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
                    <li>
                        <Link to="/terrain">Terrain</Link>
                    </li>
                    <li>
                        <Link to="/globe">Globe</Link>
                    </li>
                    <li>
                        <Link to="/knot">Knot</Link>
                    </li>
                    <li>
                        <Link to="/wireframe-glow">WireframeGlow</Link>
                    </li>
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
                    <Route path="/terrain">
                        <Terrain />
                    </Route>
                    <Route path="/globe">
                        <Globe />
                    </Route>
                    <Route path="/knot">
                        <Knot />
                    </Route>
                    <Route path="/wireframe-glow">
                        <WireframeGlow />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
