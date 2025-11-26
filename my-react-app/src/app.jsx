import { Fragment, useRef, useState } from "react";
import './app.css';
function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [dropShadowX, setDropShadowX] = useState(0);
  const [dropShadowY, setDropShadowY] = useState(0);
  const [dropShadowBlur, setDropShadowBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  const fileinput=useRef();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
        setError("");
      } else {
        setError("Only image files are allowed");
        setImage(null);
      }
    }
  };

  const canvasref = useRef(null);

  const saveimage = () => {
    if (!image) return;

    const canvas = canvasref.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `
        blur(${blur}px)
        brightness(${brightness}%)
        contrast(${contrast}%)
        drop-shadow(${dropShadowX}px ${dropShadowY}px ${dropShadowBlur}px rgba(0,0,0,0.5))
        grayscale(${grayscale}%)
        hue-rotate(${hueRotate}deg)
        invert(${invert}%)
        saturate(${saturate}%)
        sepia(${sepia}%)
      `;

      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = image;
  };

  const imageStyle = {
    width: "300px",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
    objectFit: "cover",
    objectPosition: "center",
    filter: `
      blur(${blur}px)
      brightness(${brightness}%)
      contrast(${contrast}%)
      drop-shadow(${dropShadowX}px ${dropShadowY}px ${dropShadowBlur}px rgba(0,0,0,0.5))
      grayscale(${grayscale}%)
      hue-rotate(${hueRotate}deg)
      invert(${invert}%)
      saturate(${saturate}%)
      sepia(${sepia}%)
    `,
    imageRendering: "crisp-edges",
    opacity: 0.95,
    mixBlendMode: "multiply",
  };

  return (
    <Fragment>
      <div>
        <h2 style={{display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"sans-serif",fontSize:"50px"}}>Image Filter Editor</h2>
          <input
        type="file"
        accept="image/*"
        ref={fileinput}
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        style={{
          background: "rgb(47, 3, 65)",
          color: "rgb(230, 140, 200)",
          border: "none",
          borderRadius: "8px",
          padding: "12px 28px",
          fontSize: "1rem",
          fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
          boxShadow: "0 4px 14px rgba(196,21,36,0.1)",
          cursor: "pointer",
          outline: "none",
          transition: "background 0.2s, box-shadow 0.2s"
        }}
        onClick={() => fileinput.current.click()}
      >
        Choose File
      </button>
        {error && <p style={{ color: "red", zIndex: "-9999" }}>{error}</p>}
        {image && <img src={image} alt="User Upload" style={imageStyle} />}

        <button onClick={saveimage} disabled={!image} style={{
          background: "rgb(47, 3, 65)",
          color: "rgb(230, 140, 200)",
          border: "none",
          borderRadius: "8px",
          padding: "12px 28px",
          fontSize: "1rem",
          fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
          boxShadow: "0 4px 14px rgba(196,21,36,0.1)",
          cursor: "pointer",
          outline: "none",
          transition: "background 0.2s, box-shadow 0.2s"
        }}>Save file</button>
          <h3>Adjust Filters</h3>
        <div className="filter_adjust"
        >
          <div>
            <label>Blur: {blur}px</label>
            <input type="range" min="0" max="10" value={blur} onChange={(e) => setBlur(e.target.value)} />
          </div>

          <div>
            <label>Brightness: {brightness}%</label>
            <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
          </div>

          <div>
            <label>Contrast: {contrast}%</label>
            <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(e.target.value)} />
          </div>

          <div>
            <label>Drop Shadow X: {dropShadowX}px</label>
            <input type="range" min="-20" max="20" value={dropShadowX} onChange={(e) => setDropShadowX(e.target.value)} />
          </div>

          <div>
            <label>Drop Shadow Y: {dropShadowY}px</label>
            <input type="range" min="-20" max="20" value={dropShadowY} onChange={(e) => setDropShadowY(e.target.value)} />
          </div>

          <div>
            <label>Drop Shadow Blur: {dropShadowBlur}px</label>
            <input type="range" min="0" max="30" value={dropShadowBlur} onChange={(e) => setDropShadowBlur(e.target.value)} />
          </div>

          <div>
            <label>Grayscale: {grayscale}%</label>
            <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(e.target.value)} />
          </div>

          <div>
            <label>Hue Rotate: {hueRotate}°</label>
            <input type="range" min="0" max="360" value={hueRotate} onChange={(e) => setHueRotate(e.target.value)} />
          </div>

          <div>
            <label>Invert: {invert}%</label>
            <input type="range" min="0" max="100" value={invert} onChange={(e) => setInvert(e.target.value)} />
          </div>

          <div>
            <label>Saturate: {saturate}%</label>
            <input type="range" min="0" max="300" value={saturate} onChange={(e) => setSaturate(e.target.value)} />
          </div>

          <div>
            <label>Sepia: {sepia}%</label>
            <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(e.target.value)} />
          </div>
        </div>

        <canvas ref={canvasref} style={{ display: "none" }}></canvas>
      </div>
    </Fragment>
  );
}

export default App;
