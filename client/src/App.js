import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
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

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

    

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="listings">
            <Route index element={<Listings />} />
            <Route path=":listingId" element={<SingleListingPage />} />
            <Route path="edit/:listingId" element={<EditListing />} />
            <Route path="create" element={<AddListing />} />
          </Route>
        </Route>
        </Route>
    </Routes>
  );
}

export default App;
