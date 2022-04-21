import React from 'react';
import { SwatchModel } from './models'

import { swatchExportDictionary, semantics, weights, l_targets } from "./constants"
import Swatch from './Swatch';

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

        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToJSON(swatches)
        downloadSwatches(json)
        return

    }

    const formatSwatchesToJSON = (swatches: SwatchModel[]) => {

        let result = {} as any

        swatches.forEach(function (swatch, index) {

            if (!result[swatch.column]) { result[swatch.column] = {} }

            result[swatch.column][swatch.row] = {
                id: swatch.id,
                value: swatch.hex,
                lightness: swatch.lightness,
                l_target: swatch.l_target,
                userDefined: swatch.isUserDefined,
                ccName: swatch.colorChecker.name
            }

        });

        return JSON.stringify({ color: { palette: result } }, null, 4);

    }


    const getSwatchesFromlocalStorage = () => {

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
                        result.push(swatch)
                    } catch (e) {
                        alert(e); // get out of loop                       
                    }
                }

            }

        }
        return result
    }


    const downloadSwatches = (res: string) => {
        let tempLink;
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