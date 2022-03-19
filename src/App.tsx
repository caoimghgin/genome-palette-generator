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
import { SwatchColumnLegend } from "./SwatchColumnLegend"
import { SwatchColumn }  from "./SwatchColumn";

import { Modal } from "./modal"
import { SwatchModel } from './models'

function App() {

// Lc 45 is "sort of" like 3:1
// Lc 60 is "sort of" like 4.5:1
// Lc 75 is "sort of" like 7:1

    // localStorage.clear();
    // https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products


    let sModal = new SwatchModel("000000")

    return (
        <div className="App">
            <NavBar/>
            <Modal {...sModal as SwatchModel} />

            <SwatchColumnLegend/>

            <SwatchColumn model={{hex:"#426fc8", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#426fc8", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#1369D0", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "danger"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/>


            {/* <SwatchColumn model={{hex:"#082B9F", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#1057F7", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "RED"}}/> 
            <SwatchColumn model={{hex:"#007b9c ", semantic: "CYAN"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "GREEN"}}/>
            <SwatchColumn model={{hex:"#b3478a ", semantic: "MAGENTA"}}/>
            <SwatchColumn model={{hex:"#476cd1 ", semantic: "BLUE"}}/> */}



        {/* // Lighter */}


            {/* <SwatchColumn model={{hex:"#3c66f7", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#336ef7", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#e12630", semantic: "RED"}}/> 
            <SwatchColumn model={{hex:"#277e98 ", semantic: "CYAN"}}/>
            <SwatchColumn model={{hex:"#228640", semantic: "GREEN"}}/>
            <SwatchColumn model={{hex:"#b84c8f ", semantic: "MAGENTA"}}/>
            <SwatchColumn model={{hex:"#4b6fd2 ", semantic: "BLUE"}}/> */}


            {/* <SwatchColumn model={{hex:"#436800", semantic: "VERDON"}} />
            <SwatchColumn model={{hex:"#4b6c68", semantic: "FOLIAGE-GREEN"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "XGREEN"}}/>            
            <SwatchColumn model={{hex:"#0e802a", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#118236", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#00704A", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#006241", semantic: "starbucks green"}}/>
            <SwatchColumn model={{hex:"#245624", semantic: "neutral"}}/> 
            <SwatchColumn model={{hex:"#367C2B", semantic: "john deer green"}}/>
            <SwatchColumn model={{hex:"#00674B", semantic: "whole foods green"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/> */}







            {/* IBM  */}
            {/* <SwatchColumn model={{hex:"#082B9F", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#1057F7", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#1369D0", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "danger"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/> */}



            {/* // GREENS SLIGHT LIGHER*/}
            {/* <SwatchColumn model={{hex:"#608321", semantic: "SL-VERDON"}} />
            <SwatchColumn model={{hex:"#436800", semantic: "SL-FOLIAGE-GREEN"}}/>
            <SwatchColumn model={{hex:"#22873c", semantic: "SL-info"}}/>
            <SwatchColumn model={{hex:"#228542", semantic: "SL-success"}}/>
            <SwatchColumn model={{hex:"#228563", semantic: "SL-warning"}}/>
            <SwatchColumn model={{hex:"#006241", semantic: "SL-starbucks green"}}/>
            <SwatchColumn model={{hex:"#218260", semantic: "SL-neutral"}}/> 
            <SwatchColumn model={{hex:"#367C2B", semantic: "SL-john deer green"}}/>
            <SwatchColumn model={{hex:"#218268", semantic: "SL-whole foods green"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/>             */}

            {/* GENOME */}
            {/* <SwatchColumn model={{hex:"#00704A", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#008020", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#118236", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#00810d", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFC107", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#D90303", semantic: "danger"}}/>
            <SwatchColumn model={{hex:"#6E6E6E", semantic: "neutral"}}/>     */}
        </div>
    );
}

// 179937

export default App;