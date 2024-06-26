import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoImg from "./assets/img/logo.png";

import MainLayout from "./layout/MainLayout";

import MainPage from "./pages";

const renderLoader = () => (
  <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
    <img src={logoImg} alt="logo" className="animate-pulse" />
  </div>
);

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {
        ready ? (
          <div className="App" >
            <Router>
              <MainLayout>
                <Suspense fallback={renderLoader()}>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </Suspense>
              </MainLayout>
              <ToastContainer pauseOnFocusLoss={true} position="top-right" toastClassName={'bg-black'} />
            </Router>
          </div>
        ) : (
          renderLoader()
        )
      }
    </>
  );
}

export default App;
