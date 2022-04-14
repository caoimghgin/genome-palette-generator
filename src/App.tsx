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

import Spectro from "./utilities/palettizer-rfc-2/spectro"


import { SwatchColumnsRandom }  from "./SwatchColumnsRandom";
import { SwatchColumnsBlueSky }  from "./SwatchColumnsBlueSky";



function App() {

// Lc 45 is "sort of" like 3:1
// Lc 60 is "sort of" like 4.5:1
// Lc 75 is "sort of" like 7:1

    // localStorage.clear();
    // https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products

    let sModal = new SwatchModel("000000")
    const spectro = new Spectro();


    return (
        <div className="App">
            <NavBar/>
            <Modal {...sModal as SwatchModel} />


            {/* <SwatchColumnLegend/> */}

                {/* TROUBLE TROUBLE...

                VERDON-GREEN-DARK
                #637304

                VERDON-GREEN
                #385d02

            <SwatchColumn model={{hex:"#385d02", semantic: "Random"}} />          

                MALACHITE-GREEN
                #13bc04
                #02ab61 (dark)

                MALACHITE-GREEN-LIGHT
                #16b101

                ???
                #cb894f
                #a96620

                CADMIUM-GREEN
                #065528
                            <SwatchColumn model={{hex:"#065528", semantic: "Random"}} />  
                            
                            

                            ???
                            #053603


                            YELLOW-GREEN
                            #a5a908

                            VERDON-GREEN
                            #2f6c03

                            VERDON-GREEN-DARK
                            #617201

                            GREEN
                            #43944A
                            #31830b
                            #4d920d
                            #4d8610

                */}


            {/* <SwatchColumn model={{hex:"#16b101", semantic: "neutral"}}/>   
            <SwatchColumn model={{hex:"#31830b", semantic: "neutral"}}/>   
            <SwatchColumn model={{hex:"#2f6c03", semantic: "neutral"}}/>   
            <SwatchColumn model={{hex:"#a5a908", semantic: "neutral"}}/>    */}


{/* <SwatchColumn model={{hex:"#43944A", semantic: "neutral"}}/> 
<SwatchColumn model={{hex:"#4d920d", semantic: "neutral"}}/> 
<SwatchColumn model={{hex:"#31830b", semantic: "neutral"}}/>  */}


{/* <SwatchColumn model={{hex:"#0c15dc", semantic: "0c15dc"}} />

<SwatchColumn model={{hex:"#74d00f", semantic: "74d00f"}} />

<SwatchColumn model={{hex:"#436800", semantic: "VERDON"}} />
<SwatchColumn model={{hex:"#4d920d", semantic: "neutral"}}/> 
<SwatchColumn model={{hex:"#31830b", semantic: "Random"}} />           */}

{/* <SwatchColumn model={{hex:"#436800", semantic: "VERDON"}} />
<SwatchColumn model={{hex:"#4d920d", semantic: "neutral"}}/> 
<SwatchColumn model={{hex:"#31830b", semantic: "Random"}} /> 
            <SwatchColumn model={{hex:"#4aca0f", semantic: "Random"}} /> */}

 {/* // 965b20 DARK-TAN*/}
 {/* 21b870 MALACHITE GREEN */}
 {/* 56ac1d,13bd0b MALACHITE GREEN LIGHT */}
 {/* 48cbc9 BLUISH GREEN */}
 


 {/* b1eb35 LIMe-GREEN*/}



 {/* TROUBLE COLORS
 #0c5c69 
 #19ab1d
 #4bd633
 */}

            {/* <SwatchColumnLegend/>
            <SwatchColumn model={{hex:"#426FC8", semantic: "primary"}}/> 
            <SwatchColumn model={{hex:"#426FC8", semantic: "secondary"}}/> 
            <SwatchColumn model={{hex:"#1369D0", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#DA1E28", semantic: "danger"}}/> 
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/> 
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/> 
            <SwatchColumn model={{hex:"#6F6F6F", semantic: "neutral"}}/>  */}




            <SwatchColumnsRandom/>
            {/* <SwatchColumnsBlueSky/> */}


            {/* <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />

            <SwatchColumn model={{hex:"#48cbc9", semantic: "BLUISH GREEN"}}/> 
            <SwatchColumn model={{hex:"#56ac1d", semantic: "MALACHITE GREEN LIGHT"}}/> 
            <SwatchColumn model={{hex:"#13bd0b", semantic: "MALACHITE GREEN LIGHT"}}/> 
            <SwatchColumn model={{hex:"#21b870", semantic: "neutral"}}/> 
            <SwatchColumn model={{hex:"#198038", semantic: "GREEN"}}/>
            <SwatchColumn model={{hex:"#2cc900", semantic: "neutral"}}/> 
            <SwatchColumn model={{hex:"#98bd1d", semantic: "neutral"}}/> 
            <SwatchColumn model={{hex:"#965b20", semantic: "neutral"}}/>  */}


{/* <SwatchColumn model={{hex:"#6E6E6E", semantic: "neutral"}}/>   


            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />          
            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(), semantic: "Random"}} />
            <SwatchColumn model={{hex:"#6E6E6E", semantic: "neutral"}}/>    */}


            {/* <SwatchColumn model={{hex:"#082B9F", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#1057F7", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#1369D0", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "danger"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/> */}   

            {/* <SwatchColumn model={{hex:"#13bc04", semantic: "MAL-GREEN"}}/>
            <SwatchColumn model={{hex:"#02ab61", semantic: "MAL-GREEN-DARK"}}/>            

            <SwatchColumn model={{hex:"#a96620", semantic: "DARK-TAN"}}/>
            <SwatchColumn model={{hex:"#cb894f", semantic: "LIGHT-TAN"}}/>

            <SwatchColumn model={{hex:"#13bc04", semantic: "MALACHITE-GREEN"}}/>
            <SwatchColumn model={{hex:"#637304", semantic: "VERDON-GREEN-DARK"}}/> */}


          


            {/* <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#4b6c68", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#5fbfac", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#9fbe41", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#43944a", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#00704a", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#036635", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#02918a", semantic: "Columbia"}}/> */}


            




            {/* <SwatchColumn model={{hex:"#426fc8", semantic: "primary"}}/>            
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/>
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/>   
            <SwatchColumn model={{hex:"#e17d30", semantic: "orange"}}/>  
            <SwatchColumn model={{hex:"#fd759f", semantic: "pink"}}/>
            <SwatchColumn model={{hex:"#ed4b2b", semantic: "orangish-red"}}/>
            <SwatchColumn model={{hex:"#b33139", semantic: "red"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "danger"}}/> 
            <SwatchColumn model={{hex:"#0088aa", semantic: "moderate red"}}/> */}
            

            {/* <SwatchColumn model={{hex:"#426fc8", semantic: "primary"}} />
            <SwatchColumn model={{hex:"#426fc8", semantic: "secondary"}}/>
            <SwatchColumn model={{hex:"#198038", semantic: "success"}}/>
            <SwatchColumn model={{hex:"#1369D0", semantic: "info"}}/>
            <SwatchColumn model={{hex:"#FFB000", semantic: "warning"}}/>
            <SwatchColumn model={{hex:"#da1e28", semantic: "danger"}}/>
            <SwatchColumn model={{hex:"#6f6f6f", semantic: "neutral"}}/> */}


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