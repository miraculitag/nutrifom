import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, RequireAuth, useIsAuthenticated } from "react-auth-kit";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@mui/material";
import nutrifomTheme from "./theme/nutrifomTheme";
import { Home } from "./components/pages/Home";
import { UserProfile } from "./components/pages/UserProfile";
import { Nutrilog } from "./components/pages/Nutrilog";
import { Weight } from "./components/pages/Weight";
import { Calc } from "./components/pages/Calc";
import { Recipes } from "./components/pages/Recipes";
import { SignIn } from "./components/pages/SignIn";
import { UserProvider } from "./userContext";

const PrivateRoute = ({ Component }: { Component: React.ComponentType }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated() ? <Component /> : <Navigate to="/signin" />;
};

export default function App() {
  return (
    <GoogleOAuthProvider clientId="286231394640-t7gi95sph1bu8v19sq8khp83c0bi3h61.apps.googleusercontent.com">
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
                <Route path="/" element={<PrivateRoute Component={Home} />} />
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
    </GoogleOAuthProvider>
  );
}
