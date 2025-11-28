import { useRef, useState } from "react";
import html2canvas from "html2canvas";
export default function App() {
    const colors = JSON.parse(localStorage.getItem('colors'));
    const [r1, setR1] = useState(colors && colors.r1 ? colors.r1 : 0);
    const [g1, setG1] = useState(colors && colors.g1 ? colors.g1 : 0);
    const [b1, setB1] = useState(colors && colors.b1 ? colors.b1 : 0);
    const [r2, setR2] = useState(colors && colors.r2 ? colors.r2 : 0);
    const [g2, setG2] = useState(colors && colors.g2 ? colors.g2 : 0);
    const [b2, setB2] = useState(colors && colors.b2 ? colors.b2 : 0);
    const [ag, setag] = useState(colors && colors.ag ? colors.ag : 0);
    const save = () => {
        localStorage.setItem('colors', JSON.stringify({ r1, g1, b1, r2, g2, b2, ag }))
    }
    const refbox = useRef(null);
const download = () => {
  if(refbox.current){
    const clone = refbox.current.cloneNode(true);
    clone.style.width = "1080px";
    clone.style.height = "1920px";
    clone.style.position = "fixed";
    clone.style.top = "-9999px"; 
    clone.style.left = "-9999px";
    document.body.appendChild(clone);
    html2canvas(clone, { scale: 1 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "color-box.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      document.body.removeChild(clone);
    });
  }
};

    const box = {
        height: "120px",
        width: "300px",
        borderRadius: "2px",
        border:"none",
        backgroundImage: `linear-gradient(${ag}deg,
      rgb(${r1}, ${g1}, ${b1}),
      rgb(${r2}, ${g2}, ${b2})
    )`,
        marginBottom: "20px",

    };

    const sliderStyle = { width: "250px", margin: "4px 0" };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2 style={{ display: "flex", justifyContent: "center", gap: "30px" }}>Color Disco</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>

                <div style={box} ref={refbox} />
                <h3>Angle</h3>
                <h6>{ag}</h6>
                <input type="range"
                    min={0}
                    max={360}
                    value={ag}
                    onChange={(e) => setag(Number(e.target.value))} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>

                <div>

                    <h4>Color 1 (Left)</h4>
                    <label>R1: {r1}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={r1}
                        onChange={(e) => setR1(Number(e.target.value))}
                        style={sliderStyle}
                    /><br />

                    <label>G1: {g1}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={g1}
                        onChange={(e) => setG1(Number(e.target.value))}
                        style={sliderStyle}
                    /><br />

                    <label>B1: {b1}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={b1}
                        onChange={(e) => setB1(Number(e.target.value))}
                        style={sliderStyle}
                    /><br /><br />
                </div>
                <div>

                    <h4>Color 2 (Right)</h4>
                    <label>R2: {r2}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={r2}
                        onChange={(e) => setR2(Number(e.target.value))}
                        style={sliderStyle}
                    /><br />

                    <label>G2: {g2}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={g2}
                        onChange={(e) => setG2(Number(e.target.value))}
                        style={sliderStyle}
                    /><br />

                    <label>B2: {b2}</label><br />
                    <input
                        type="range"
                        min={0}
                        max={255}
                        value={b2}
                        onChange={(e) => setB2(Number(e.target.value))}
                        style={sliderStyle}
                    />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                        <button
                            onClick={save}
                            style={{
                                padding: "8px 18px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                                backgroundColor: "#222",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            save color
                        </button>
                        <button
                            onClick={download}
                            style={{
                                padding: "8px 18px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                                backgroundColor: "#555",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
