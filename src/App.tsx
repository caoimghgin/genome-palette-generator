import './App.css';
import SnackbarProvider from 'react-simple-snackbar'
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"
import { SwatchColumnLegend } from "./components/SwatchColumnLegend";
import { SwatchColumnWeights } from "./components/SwatchColumnWeights";
import { SwatchColumn } from "./components/SwatchColumn";
import { SwatchColumnsRandom } from "./components/testing/SwatchColumnsRandom";

function App() {
    localStorage.clear();
    return (
        <SnackbarProvider>
            <div className="App">
                <NavBar />
                {/* <SwatchColumnsRandom/> */}
                <SwatchColumnLegend />
                <SwatchColumn model={{ hexString: "#0071b2", value: "lch(44.99% 43.58 259.01)", semantic: "primary" }} />
                <SwatchColumn model={{ hexString: "#8352c6", value: "lch(44.97% 66.56 305.96)", semantic: "secondary" }} />
                <SwatchColumn model={{ hexString: "#7b6747", value: "lch(44.96% 21.72 77.44)", semantic: "tertiary" }} />
                <SwatchColumn model={{ hexString: "#007c00", value: "lch(42.9% 66.44812602165082 134.38385832883824)", semantic: "positive" }} />
                <SwatchColumn model={{ hexString: "#d80000", value: "lch(46.01% 94.25586437890576 40.85766878213079)", semantic: "negative" }} />
                <SwatchColumn model={{ hexString: "#FFCF3D", value: "lch(85.64% 74.13689308703813 84.0990647485831)", semantic: "highlight" }} />
                <SwatchColumn model={{ hexString: "#F57C13", value: "lch(65.6% 82.22 57.93)", semantic: "attention" }} />
                <SwatchColumn model={{ hexString: "#035ef9", value: "lch(43.93% 89.04 287.62)", semantic: "info" }} />
                <SwatchColumn model={{ hexString: "#0A66D8", value: "lch(43.88% 67.32 279.62)", semantic: "system" }} />
                <SwatchColumn model={{ hexString: "#6a6a6a", value: "lch(44.82% 0 0)", semantic: "neutral" }} />
                <SwatchColumnWeights />
                <Footer />
            </div>
        </SnackbarProvider>
    );
}

export default App;