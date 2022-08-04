import React, { useState, useEffect, useRef } from "react";
import { Route, useLocation } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import Products from "./components/Products";
import MainLayout from "./MainLayout";
import PrimeReact from "primereact/api";
import Login from "./components/Login";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";

const App = () => {
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;





    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    return (
        <>
            <div className="layout-main">
                <Route path="/dashboard" exact component={() => <MainLayout component={(props) => <Dashboard />} />} />
                <Route path="/allProducts" exact component={() => <MainLayout component={(props) => <Products />} />} />
                <Route path="/login" exact component={() => <Login />} />
            </div>
        </>
    );
};

export default App;
