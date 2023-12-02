import React from "react";
import nutrifomTheme from "./theme/nutrifomTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { User } from "./components/pages/User";
import { FoodLog } from "./components/pages/FoodLog";
import { Weight } from "./components/pages/Weight";
import { Calc } from "./components/pages/Calc";
import { Recipes } from "./components/pages/Recipes";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "react-auth-kit";
import { SignIn } from "./components/pages/SignIn";

export default function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={true}
      >
        <ThemeProvider theme={nutrifomTheme}>
          <Router>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/foodlog" element={<FoodLog />} />
              <Route path="/weight" element={<Weight />} />
              <Route path="/calc" element={<Calc />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
