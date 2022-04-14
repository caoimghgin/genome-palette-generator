import React from 'react';
import { SwatchColumn }  from "./SwatchColumn";
import { SwatchColumnLegend }  from "./SwatchColumnLegend";
import Spectro from "./utilities/palettizer-rfc-2/spectro"

interface Props { }

export const SwatchColumnsBlueSky: React.FC<Props> = (props) => {

    const spectro = new Spectro();

    return (
        <div>
            <SwatchColumnLegend/>
            <SwatchColumn model={{hex:"#0b6ec7", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hex:"#1183e8", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hex:"#399be6", semantic: "Blue Sky"}}/>

            <SwatchColumn model={{hex:"#2397f6", semantic: "Blue Sky"}}/> 
            <SwatchColumn model={{hex:"#139ae2", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hex:"#4ea5d7", semantic: "Blue Sky"}}/>

            <SwatchColumn model={{hex:"#3090c7", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hex:"#2088c4", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hex:"#2c9fe1", semantic: "Blue Sky"}}/>

            

            
            
        </div>
    )

}

export default SwatchColumnsBlueSky;