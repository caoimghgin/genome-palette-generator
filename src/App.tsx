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
    console.log("I clear all localStorage now...")
    localStorage.setItem('columnName', 'A')

    //
    // I need a global variable than can increment A, B, C, ... for column. 
    //

    return (
        <div className="App">
            <NavBar/>
            {/* <SwatchColumnsRandom/> */}

            <SwatchColumnLegend />

            <SwatchColumn model={{ hexString: "#4D65CB", semantic: "primary" }} />
            <SwatchColumn model={{ hexString: "#0274B6", semantic: "secondary" }} />
            <SwatchColumn model={{ hexString: "#007F30", semantic: "success" }} />
            <SwatchColumn model={{ hexString: "#006ADE", semantic: "info" }} />
            <SwatchColumn model={{ hexString: "#FFCF3D", semantic: "warning" }} />
            <SwatchColumn model={{ hexString: "#DA1E28", semantic: "danger" }} />
            <SwatchColumn model={{ hexString: "#6F6F6F", semantic: "neutral" }} />
            <SwatchColumn model={{ hexString: "#6F6F6F", semantic: "neutral" }} />
            <SwatchColumn model={{ hexString: "#6F6F6F", semantic: "neutral" }} />
            <SwatchColumn model={{ hexString: "#6F6F6F", semantic: "neutral" }} />

        </div>
    );
}

export default App;