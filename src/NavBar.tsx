import React from 'react';
import { SwatchModel } from './models'

import { swatchExportDictionary, semantics, weights, l_targets } from "./constants"

interface ISemanticWeightValues {
    value: string,
    description: string,
}

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    window.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
    };
    
    const downloadJSON = () => {

        //
        // Get SwatchModel object from localStorage
        //
        // This is more agnostic, allowing the key values to be abstracted
        // from the opinionated weights. May consider using L* values + column number
        //

        //
        // This means I can loop through A, B, C, D...0, 1, 2, 3 (A0, A1, A2) and collect
        // all the swatches until there is a null
        //
        //

        let result = []
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

        loopColumns:
        for (let column = 0; column < columns.length; column++) {
            loopRows:
            for (let row = 0; row < l_targets.length; row++) {
                let swatchId = columns[column] + row
                let swatchData = window.localStorage.getItem(swatchId)
                if (!swatchData) { 
                    break loopColumns 
                } else {
                    try {
                        let swatch = JSON.parse(swatchData) as SwatchModel
                        console.log(swatch)
                        result.push(swatch)
                   } catch(e) {
                       alert(e); // get out of loop                       
                   }
                }

            }

        }

        // let swatchJSON = window.localStorage.getItem("A0");
        // let swatch = undefined
        // if(swatchJSON) {
        //     try {
        //          swatch = JSON.parse(swatchJSON) as SwatchModel;
        //     } catch(e) {
        //         alert(e); 
        //         // get out of loop
        //     }
        // }
        // console.log(swatch)

        let dict = {} as any

        Object.keys(semantics).forEach(function (semantic) {
            dict[semantic] = {}

            // Object.keys(x_weights).forEach(function (weight) {
            //     let semantic_weight = semantic + "-" + weight
            //     let value = localStorage.getItem(semantic_weight), description: "laksdjf"
            //     if (value) dict[semantic][weight] = { value: value }
            // });

            // Object.keys(weights).forEach(function (weight) {
            //     let semantic_weight = semantic + "-" + weight
            //     let value = localStorage.getItem(semantic_weight), description: "laksdjf"
            //     if (value) dict[semantic][weight] = { value: value }
            // });

            for (const weight of weights) { 
                let semantic_weight = semantic + "-" + weight
                let value = localStorage.getItem(semantic_weight), description: "laksdjf"
                if (value) {
                    dict[semantic][weight] = { value: value }
                } else {
                    console.log("Could not find " + semantic_weight)
                }
              }

        });

        const items = { ...dict };

        let tempLink;
        let res = JSON.stringify({ color: { palette: items } }, null, 4);
        var data = new Blob([res], { type: 'text/csv' });
        var csvURL = window.URL.createObjectURL(data);
        tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'palette.json');
        tempLink.click();
    }

    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: 'green',
        height: '48px',
        marginBottom: '22pt',
        borderBottom: '1px solid ' + localStorage.getItem('neutral-050'),
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            <button onClick={downloadJSON}> Download </button>
        </div>
    )

}

export default NavBar;