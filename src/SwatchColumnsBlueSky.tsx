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
            <SwatchColumn model={{hexString:"#0b6ec7", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hexString:"#1183e8", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hexString:"#399be6", semantic: "Blue Sky"}}/>

            <SwatchColumn model={{hexString:"#2397f6", semantic: "Blue Sky"}}/> 
            <SwatchColumn model={{hexString:"#139ae2", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hexString:"#4ea5d7", semantic: "Blue Sky"}}/>

            <SwatchColumn model={{hexString:"#3090c7", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hexString:"#2088c4", semantic: "Blue Sky"}}/>
            <SwatchColumn model={{hexString:"#2c9fe1", semantic: "Blue Sky"}}/>

            

            
            
        </div>
    )

}

export default SwatchColumnsBlueSky;