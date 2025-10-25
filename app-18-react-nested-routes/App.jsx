import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Linksofcomp />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/links" element={<Links />} >
            <Route path="linkinside"element={<h1>this is a link inside link </h1>}/>
          </Route>  
          {/* Parent Contact route with nested children */}
            <Route path="/contact" element={<Contact />}>
              <Route path="contactpath" element={<h1>this is a path inside contact</h1>} />
              <Route path="contactabout" element={<h1>this is a path inside contact for about</h1>} />
              <Route path="contactlinks" element={<h1>this is a path inside contact for links</h1>} />
              <Route path="contact1" element={<Contact />} />
            </Route>

            <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
