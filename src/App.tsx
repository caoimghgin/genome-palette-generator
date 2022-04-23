// Firebase tutorial
// https://www.youtube.com/watch?v=zQyrwxMPm88

// Dexie Database
// https://dexie.org/docs/Typescript


// https://codetain.com/blog/dictionary-in-typescript


// https://www.fullstacklabs.co/blog/overload-typescript-react-component-interfaces-prop-values

// https://www.codegrepper.com/code-examples/javascript/frameworks/express/typescript+local+database

// https://github.com/pouchdb/pouchdb

// https://programmingwithmosh.com/react/localstorage-react/

// https://github.com/marcuswestin/store.js/

// https://coderwall.com/p/ewxn9g/storing-and-retrieving-objects-with-localstorage-html5

// https://blog.bitsrc.io/build-a-simple-modal-component-with-react-16decdc111a6

import './App.css';
import { NavBar } from "./NavBar"
import { SwatchColumnsRandom }  from "./SwatchColumnsRandom";
import { SwatchColumn } from "./SwatchColumn";
import { SwatchColumnLegend } from "./SwatchColumnLegend";

function App() {

    // clear localStorage
    localStorage.clear();
    console.log("All localStorage cleared")

    return (
        <div className="App">
            <NavBar/>
            {/* <SwatchColumnsRandom/> */}

            <SwatchColumnLegend />

            <SwatchColumn model={{ hexString: "#0274B6", semantic: "primary" }} />
            <SwatchColumn model={{ hexString: "#8856CB", semantic: "secondary" }} />
            <SwatchColumn model={{ hexString: "#816D4D", semantic: "tertiary" }} />
            <SwatchColumn model={{ hexString: "#0A8200", semantic: "positive" }} />
            <SwatchColumn model={{ hexString: "#E10000", semantic: "negative" }} />
            <SwatchColumn model={{ hexString: "#1a67e6", semantic: "system" }} />
            <SwatchColumn model={{ hexString: "#8856CB", semantic: "promotional" }} />
            <SwatchColumn model={{ hexString: "#FFCF3D", semantic: "highlight" }} />
            <SwatchColumn model={{ hexString: "#6F6F6F", semantic: "neutral" }} />

        </div>
    );
}

export default App;