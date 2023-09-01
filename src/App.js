import { Routes, Route } from "react-router-dom";
import Breeds from "./pages/Breeds/Breeds";
import BreedPage from "./pages/Breed/Breed";
import Voting from "./pages/Voting/Voting";
import Gallery from "./pages/Gallery/Gallery";
import Likes from "./pages/Likes/Likes";
import Search from "./pages/Search/Search";
import Dislikes from "./pages/Dislikes/Dislikes";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Main/Main";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/voting" element={<Voting />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/breeds/:breedId" element={<BreedPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/dislikes" element={<Dislikes />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
