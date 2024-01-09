import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, RequireAuth, useIsAuthenticated } from "react-auth-kit";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Calc } from "./components/pages/Calc";
import { Home } from "./components/pages/Home";
import { Nutrilog } from "./components/pages/Nutrilog";
import { Recipes } from "./components/pages/Recipes";
import { SignIn } from "./components/pages/SignIn";
import { UserProfile } from "./components/pages/UserProfile";
import { Weight } from "./components/pages/Weight";
import nutrifomTheme from "./theme/nutrifomTheme";
import { UserProvider } from "./userContext";

const PrivateRoute = ({ Component }: { Component: React.ComponentType }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/signin" />;
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
