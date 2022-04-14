import React from 'react';
import { SwatchColumn }  from "./SwatchColumn";
import { SwatchColumnLegend }  from "./SwatchColumnLegend";
import Spectro from "./utilities/palettizer-rfc-2/spectro"

interface Props { }

export const SwatchColumnsRandom: React.FC<Props> = (props) => {

    const spectro = new Spectro();

    return (
        <div>
            <SwatchColumnLegend/>

 
            
            {/* <SwatchColumn model={{hex:"#0274B6", semantic: "wsj-blue"}}/>  */}

            <SwatchColumn model={{hex:"#E0E7FF", semantic: "blue10"}}/> 
            <SwatchColumn model={{hex:"#9AC7E2", semantic: "blue20"}}/> 
            <SwatchColumn model={{hex:"#66C7FF", semantic: "blue40"}}/> 
            <SwatchColumn model={{hex:"#87A4FC", semantic: "blue30"}}/> 
            <SwatchColumn model={{hex:"#0274B6", semantic: "blue50"}}/> 
            <SwatchColumn model={{hex:"#015483", semantic: "blue60"}}/> 
            <SwatchColumn model={{hex:"#2B4AAB", semantic: "blue70"}}/> 
            <SwatchColumn model={{hex:"#213A82", semantic: "blue80"}}/> 
            <SwatchColumn model={{hex:"#213A5F", semantic: "blue90"}}/> 
            <SwatchColumn model={{hex:"#192C48", semantic: "blue100"}}/> 



            <SwatchColumn model={{hex:"#4D65CB", semantic: "400"}}/> 
            <SwatchColumn model={{hex:"#9e7335", semantic: "300"}}/> 
            <SwatchColumn model={{hex:"#bb5fec", semantic: "200"}}/> 
            <SwatchColumn model={{hex:"#05a56e", semantic: "100"}}/> 
            <SwatchColumn model={{hex:"#82a3ee", semantic: "90"}}/> 
            <SwatchColumn model={{hex:"#bca4fc", semantic: "85"}}/>  
                        <SwatchColumn model={{hex:"#e0b64a", semantic: "80"}}/>  
                        <SwatchColumn model={{hex:"#c7cfaa", semantic: "75"}}/>  
                        <SwatchColumn model={{hex:"#32e8f2", semantic: "50"}}/>  
                        <SwatchColumn model={{hex:"#f5da87", semantic: "35"}}/>  

                        


            
      






            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />
            <SwatchColumn model={{hex:spectro.generateRandomColor(null), semantic: "Random"}} />            
        </div>
    )

}

export default SwatchColumnsRandom;