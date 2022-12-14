import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import Listings from "./features/listings/Listings";
import SingleListingPage from "./features/listings/SingleListingPage";
import EditListing from "./features/listings/EditListing";
import AddListing from "./features/listings/AddListing";
import Register from "./features/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="welcome" element={<Welcome />} />
        <Route path="listings">
          <Route index element={<Listings />} />
          <Route path="create" element={<AddListing />} />
          <Route path="edit/:listingId" element={<EditListing />} />
          <Route path=":listingId" element={<SingleListingPage />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
