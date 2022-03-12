// Import React
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
import {AuthRoute, AdminRoute} from "./components/PrivateRoutes";

// Import Style
import "./App.css";
import {LoadingAnimation} from "./components/atoms";

// Import API
import {checkUser, setAuthToken} from "./config";

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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadingSkeleton ? (
        <div>
          <LoadingAnimation text="Welcome To Dewe Tour" />
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
