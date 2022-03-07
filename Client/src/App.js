// Import React
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
// Import Pages
import {
  Home,
  DetailTrip,
  AddTrip,
  Transaction,
  Payment,
  Profile,
  Chat,
  ChatAdmin,
  Chart,
  NotFoundPage,
} from "./pages";
import AuthRoute from "./components/PrivateRoutes/AuthRoute";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";

// Import Style
import "./App.css";
import LoadingAnimation from "./components/atoms/Loading/Loading";

// Import API
import {checkUser} from "./config/auth";
import {setAuthToken} from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const nameProfile = useSelector((state) => state.auth.user.name);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const titleLoading =
    document.URL === "http://localhost:3000/profile"
      ? `${nameProfile ? `Welcome ${nameProfile}` : "...Loading"}`
      : "Welcome To Dewe Tour";

  return (
    <>
      {loadingSkeleton ? (
        <div>
          <LoadingAnimation text={titleLoading} />
        </div>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<DetailTrip />} />

              {/* AUTH ROUTE */}
              <Route
                path="/profile"
                element={
                  <AuthRoute>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <AuthRoute>
                    <Payment />
                  </AuthRoute>
                }
              />
              <Route
                path="/message"
                element={
                  <AuthRoute>
                    <Chat />
                  </AuthRoute>
                }
              />

              {/* ADMIN ROUTE */}
              <Route
                path="/admin-message"
                element={
                  <AdminRoute>
                    <ChatAdmin />
                  </AdminRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <AdminRoute>
                    <Chart />
                  </AdminRoute>
                }
              />
              <Route
                path="/"
                element={
                  <AdminRoute>
                    <Home />
                  </AdminRoute>
                }
              />
              <Route
                path="/add-trip"
                element={
                  <AdminRoute>
                    <AddTrip />
                  </AdminRoute>
                }
              />
              <Route
                path="/list-transaction"
                element={
                  <AdminRoute>
                    <Transaction />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
