import nutrifomTheme from "./theme/nutrifomTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { UserProfile } from "./components/pages/UserProfile";
import { Nutrilog } from "./components/pages/Nutrilog";
import { Weight } from "./components/pages/Weight";
import { Calc } from "./components/pages/Calc";
import { Recipes } from "./components/pages/Recipes";
import { ThemeProvider } from "@mui/material";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { SignIn } from "./components/pages/SignIn";
import { UserProvider } from "./userContext";

export default function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={true}
    >
      <ThemeProvider theme={nutrifomTheme}>
        <Router>
          <UserProvider>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/"
                element={
                  <RequireAuth loginPath="/signin">
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/user"
                element={
                  <RequireAuth loginPath="/signin">
                    <UserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/nutrilog"
                element={
                  <RequireAuth loginPath="/signin">
                    <Nutrilog />
                  </RequireAuth>
                }
              />
              <Route
                path="/weight"
                element={
                  <RequireAuth loginPath="/signin">
                    <Weight />
                  </RequireAuth>
                }
              />
              <Route
                path="/calc"
                element={
                  <RequireAuth loginPath="/signin">
                    <Calc />
                  </RequireAuth>
                }
              />
              <Route
                path="/recipes"
                element={
                  <RequireAuth loginPath="/signin">
                    <Recipes />
                  </RequireAuth>
                }
              />
            </Routes>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
