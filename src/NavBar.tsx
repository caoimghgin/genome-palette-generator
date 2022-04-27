import React from 'react';
import { SwatchModel } from './models'
import {
    zeroPad,
    columns,
    l_targets,
    weights_carbon,
    weights_newskit,
    weights_lightning,
    targets_carbon,
    targets_lightning,
    targets_newskit,
    targets_genome,
    Event
} from "./constants"
import { exit } from 'process';

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    const getClosestIndex = (color: SwatchModel, targets: Array<any>) => {
        // const l_star = [100, 97.5, 95, 90, 85, 80, 70, 60, 55, 50, 45, 40, 35, 30, 20, 15, 0]
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    const displayBestFitSwatches = (targets: any) => {

        //
        // This is great, BUUUUTTT...
        // Still need to weed out any conflicting isUserDefined=false
        // swatches to populate result with correct swatches. 
        // The getSwatchesFromlocalStorage() function returns
        // a flat array.
        //

        let swatches = getSwatchesFromlocalStorage()
        const userDefinedSwatches = swatches.filter(obj => {
            return obj.isUserDefined === true;
        });

        let results = userDefinedSwatches.map(a => a.id);
        console.log(results)

        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: results }));

    }

    const foo = (swatches: Array<SwatchModel>, targets: any) => {

        let result = [] as any

        for (let column = 0; column < columns.length; column++) {

            let visibleSwatches = [] as any

            var columnSwatches = swatches.filter(obj => {
                return obj.column === columns[column];
            });

            if (columnSwatches.length === 0) { break }

            // if target includes the SwatchModel.l_target, then make visible
            columnSwatches.forEach(function (swatch, index) {
                visibleSwatches.push(targets.includes(swatch.l_target) ? swatch : undefined)
            })

            // Override visibleSwatches with swatch.isUserDefined = true
            columnSwatches.forEach(function (swatch, index) {
                if (swatch.isUserDefined) {
                    visibleSwatches[getClosestIndex(swatch, targets)] = swatch
                }
            })

            let visibleSwatchesDefined = visibleSwatches.filter(function(x:SwatchModel) { 
                return x !== undefined;
            })

            let swatchIds = visibleSwatchesDefined.map((a: { id: string; }) => a.id);
            result.push(...swatchIds)

        }

        console.log(result)

    }

    const displayUserDefinedSwatches = () => {

        let swatches = getSwatchesFromlocalStorage()

        foo(swatches, targets_newskit)

        const userDefinedSwatches = swatches.filter(obj => {
            return obj.isUserDefined === true;
        });

        let results = userDefinedSwatches.map(a => a.id);
        console.log(results)

        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: results }));

    }

    const displaySwatches = (targets: any) => {

        //
        // in theory, I would...
        //
        //  1) Read all swatches 'getSwatchesFromlocalStorage()'
        //  2) Find all isUserDefined=true
        //  3) Find closest match to chosen target (Lightning, Material, Carbon, Genome...)
        //  4) Populate an array matching length of target at index with the swatch.id (A12)
        //  5) Find remaining isUserDefined=false and populat the rest of the array (avoiding slots already populated)
        //  6) Send that array as a CustomEvent {'A1', 'A3', ... 'J1', 'J2'}, now each swatch explicitly told what is visible and what is not.

        let swatches = getSwatchesFromlocalStorage()

        const results = swatches.filter(obj => {
            return obj.isUserDefined === true;
        });
        console.log(results)


        const event = new CustomEvent(Event.DISPLAY_SWATCHES, { detail: targets });
        dispatchEvent(event);
    }

    const downloadAsRootJSON = () => {
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

            if (weights_carbon[index % l_targets.length] !== -1) {
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

            if (weights_newskit[index % l_targets.length] !== -1) {
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

            if (weights[index % l_targets.length] !== -1) {
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

            <button onClick={downloadAsRootJSON}> Root </button>
            <button onClick={downloadAsCarbonJSON}> Carbon </button>
            <button onClick={downloadAsNewsKitJSON}> NewsKit </button>
            <button onClick={downloadAsLightningJSON}> Lightning </button>

            <button onClick={() => displaySwatches(targets_newskit)}>display NewsKit</button>
            <button onClick={() => displaySwatches(targets_carbon)}>display Carbon</button>
            <button onClick={() => displaySwatches(targets_lightning)}>display Lightning</button>
            <button onClick={() => displaySwatches(targets_genome)}>display Genome</button>
            <button onClick={() => displaySwatches(l_targets)}>display Root</button>
            <button onClick={() => displayUserDefinedSwatches()}> DEFINED </button>


        </div>
    )

}

export default NavBar;