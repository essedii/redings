import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { PostsList } from "./features/posts/PostsList";
import { Navbar } from "./app/Navbar";
import { EditPostForm } from "./features/posts/EditPostForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PostsList />} />
          <Route exact path="/posts/:postId" element={<SinglePostPage />} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route path="*" element={<PostsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
