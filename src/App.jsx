import "./globals.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Like from "./pages/Like"
import RecipieItem from "./pages/RecipieItem"
import NotFound from "./pages/NotFound"
import { Toaster } from "react-hot-toast";
import Search from "./pages/Search";


function App() {


  return (
    <>
    <main className="h-screen flex">
      <Routes>
        <Route element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/likes" element={<Like />} />
          <Route path="/r/:id" element={<RecipieItem/>} />
          <Route path="/search" element={<Search/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

    <Toaster position="top-center" />
  </>
  )
}

export default App
