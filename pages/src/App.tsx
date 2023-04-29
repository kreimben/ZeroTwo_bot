import * as React from "react";
import {useEffect} from "react";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import {DiscordCallback} from "./components/DiscordCallback";
import {NotFound} from "./components/NotFound";
import {Connect} from "./components/Connect";
import {Menu} from "./components/Menu";
import {host} from "@/api/init";

const App = () => {

    return (
        <div className="App">
            <Menu/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/discord/callback" element={<DiscordCallback/>}/>
                <Route path="/connect" element={<Connect/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App
