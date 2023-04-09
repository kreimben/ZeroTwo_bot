import * as React from "react";
import Home from "./components/Home";
import {HashRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
