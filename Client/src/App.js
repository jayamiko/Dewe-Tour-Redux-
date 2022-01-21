// Import React
import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect} from "react";

// Import Pages
import DetailTrip from "./pages/detail_trips/DetailTrip";
import Home from "./pages/Home";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import AddTrip from "./pages/addTrip/addTrip";
import ListTransaction from "./pages/Transaction/ListTransaction";
import AuthRoute from "./components/PrivateRoutes/AuthRoute";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import Chat from "./pages/Chat/Chat";
import ChatAdmin from "./pages/Chat/Admin/ChatAdmin";

// Import Style
import "./App.css";
import Spinner from "./components/atoms/Spinner/Spinner";

// Import API
import {checkUser} from "./config/auth";
import {setAuthToken} from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadingSkeleton === true ? (
        <div>
          <Spinner customText="Loading.." />
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
                    <ListTransaction />
                  </AdminRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
