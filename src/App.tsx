import "./App.scss";
import NavBar from "./containers/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import Footer from "./containers/Footer/Footer";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UpdateFormPage from "./pages/FormPage/UpdateFormPage";
import CreateFormPage from "./pages/CreateFormPage/CreateFormPage";
import ToastNotificationProvider from "./context/toastNotification";
import ToastNotification from "./components/ToastNotification/ToastNotification";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);

  return (
    <main>
      <BrowserRouter>
        <ToastNotificationProvider>
          <ToastNotification />
          {/* Nav Bar w/ Search Function */}
          <NavBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          <Routes>
            {/* Page 1 - Employee List/Search */}
            <Route
              path="/"
              element={
                <ListPage
                  searchTerm={searchTerm}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              }
            />
            {/* Page 2 - Employee Profile Page - Unique to each employee */}
            <Route path="/profile/:id" element={<ProfilePage />} />
            {/* Page 3 - Add New Employee Page */}
            <Route path="/updateForm/:id" element={<UpdateFormPage />} />
            <Route path="/createForm" element={<CreateFormPage />} />
          </Routes>
        </ToastNotificationProvider>
        {/* Footer with generic contact information */}
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
