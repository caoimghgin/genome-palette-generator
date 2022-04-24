import React from 'react';
import { SwatchModel } from './models'
import {zeroPad, columns, l_targets, weights_carbon, weights_newskit, weights_lightning } from "./constants"

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    window.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
    };

    const downloadAsGenomeJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToGenomeJSON(swatches)
        downloadSwatches(json)
        return
    }

    const downloadAsCarbonJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToCarbonJSON(swatches)
        downloadSwatches(json)   
    }

    const downloadAsNewsKitJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToNewsKitJSON(swatches)
        downloadSwatches(json)
    }

    const downloadAsLightningJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToLightningJSON(swatches)
        downloadSwatches(json)
        return
    }

    const formatSwatchesToGenomeJSON = (swatches: SwatchModel[]) => {

        let result = {} as any

        swatches.forEach(function (swatch, index) {

            if (!result[swatch.column]) { result[swatch.column] = {} }

            result[swatch.column][swatch.row] = {
                id: swatch.id,
                value: swatch.hex,
                lightness: swatch.lightness,
                l_target: swatch.l_target,
                userDefined: swatch.isUserDefined,
                ccName: swatch.colorChecker.name,
                semantic: swatch.semantic
            }

        });

        return JSON.stringify({ color: { palette: result } }, null, 4);

    }

    const formatSwatchesToCarbonJSON = (swatches: SwatchModel[]) => {

        let result = {} as any

        swatches.forEach(function (swatch, index) {

            // Populate result with parent semantic node
            if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

             if (weights_carbon[index % l_targets.length] !== 'X') {
                result[swatch.semantic][swatch.semantic + "-" + weights_carbon[index % l_targets.length]] = {
                    id: swatch.id,
                    value: swatch.hex,
                    lightness: swatch.lightness,
                    l_target: swatch.l_target,
                    userDefined: swatch.isUserDefined,
                    ccName: swatch.colorChecker.name,
                    semantic: swatch.semantic
                }
             }
        });

        //
        // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
        //
        return JSON.stringify({ color: { palette: result } }, null, 4);

    }    

    const formatSwatchesToNewsKitJSON = (swatches: SwatchModel[]) => {

        let result = {} as any

        swatches.forEach(function (swatch, index) {

            // Populate result with parent semantic node
            if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

             if (weights_newskit[index % l_targets.length] !== 'X') {
                result[swatch.semantic][swatch.semantic + zeroPad(weights_newskit[index % l_targets.length], 3)] = {
                    id: swatch.id,
                    value: swatch.hex,
                    lightness: swatch.lightness,
                    l_target: swatch.l_target,
                    userDefined: swatch.isUserDefined,
                    ccName: swatch.colorChecker.name,
                    semantic: swatch.semantic
                }
             }
        });

        //
        // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
        //
        return JSON.stringify({ color: { palette: result } }, null, 4);

    }        

    const formatSwatchesToLightningJSON = (swatches: SwatchModel[]) => {

        let result = {} as any

        swatches.forEach(function (swatch, index) {

            // Populate result with parent semantic node
            if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

            let weights = weights_lightning

             if (weights[index % l_targets.length] !== 'X') {
                result[swatch.semantic][swatch.semantic + "-" + weights[index % l_targets.length]] = {
                    id: swatch.id,
                    value: swatch.hex,
                    lightness: swatch.lightness,
                    l_target: swatch.l_target,
                    userDefined: swatch.isUserDefined,
                    ccName: swatch.colorChecker.name,
                    semantic: swatch.semantic
                }
             }
        });

        //
        // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
        //
        return JSON.stringify({ color: { palette: result } }, null, 4);

    }        

    const getSwatchesFromlocalStorage = () => {

        let result = []

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
                        let semantic = window.localStorage.getItem(columns[column]) as string
                        swatch.semantic = semantic

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
        flexDirection: 'row',
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
            <button onClick={downloadAsGenomeJSON}> Genome </button>
            <button onClick={downloadAsCarbonJSON}> Carbon </button>
            <button onClick={downloadAsNewsKitJSON}> NewsKit </button>
            <button onClick={downloadAsLightningJSON}> Lightning </button>

        </div>
    )

}

export default NavBar;