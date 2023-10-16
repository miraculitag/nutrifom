import React from "react";
import nutrifomTheme from "./theme/nutrifomTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { User } from "./components/User";
import { FoodLog } from "./components/FoodLog";
import { Weight } from "./components/Weight";
import { Calc } from "./components/Calc";
import { Recipes } from "./components/Recipes";
import { Header } from "./components/Header";
import { ThemeProvider } from "@mui/material";

export default function App() {
  return (
    <>
      <ThemeProvider theme={nutrifomTheme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/foodlog" element={<FoodLog />} />
            <Route path="/weight" element={<Weight />} />
            <Route path="/calc" element={<Calc />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}
