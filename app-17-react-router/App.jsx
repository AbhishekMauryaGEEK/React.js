import { Fragment } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"; 
import Home from "./Home";
import About from "./About";
import Links from "./Links";
import Contact from "./Contact";
import Linksofcomp from "./LinksofComp";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            gap: "20px",
          }}
        >
        <Linksofcomp/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/links" element={<Links/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
