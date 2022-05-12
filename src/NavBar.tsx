import React from 'react';
import { SwatchModel, MapModel } from './models'
import { weightedTargets } from "./constants/weightedTargets"

import {
    Event,
    zeroPad,
    columns,
    l_targets,
} from "./constants"


import { exit } from 'process';
import Spectro from './utilities/palettizer-rfc-2/spectro'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props { }

const options = [
    { value: '0', label: 'Spectrum' },
    { value: '1', label: 'NewsKit' },
    { value: '2', label: 'Carbon' },  
    { value: '3', label: 'Lightning' },
    { value: '4', label: 'Ant' },        
    { value: '5', label: 'ColorBox' },        
    { value: '6', label: 'Accessible Palette' },
    { value: '7', label: 'User Defined' },
  ];

const defaultOption = options[0];

export const NavBar: React.FC<Props> = (props) => {

    const onSelect = (event: any) => {
        let index = parseInt(event.value)
        let selection = weightedTargets(index)
        let map = new MapModel(selection.rows)
        displaySwatches(map)
    }
    
    const getClosestIndex = (color: SwatchModel, targets: Array<any>) => {
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    const mapSwatchesToTarget = (swatches: Array<SwatchModel>,  mapper: MapModel) => {
        console.log("MY TARGETS:", mapper.targets())
        console.log("MY WEIGHTS:", mapper.weights())

        let t_targets = mapper.targets()

        let result = [] as any

        for (let column = 0; column < columns.length; column++) {

            let visibleSwatches = [] as any

            var columnSwatches = swatches.filter(obj => {
                return obj.column === columns[column];
            });

            if (columnSwatches.length === 0) { break }

            // if target includes the SwatchModel.l_target, then make visible
            columnSwatches.forEach(function (swatch, index) {
                visibleSwatches.push(t_targets.includes(swatch.l_target) ? swatch : undefined)
            })

            //
            // Shoehorn in the userDefined swatch, closest match
            //
            let userDefinedSwatch = columnSwatches.filter(obj => {
                return obj.isUserDefined === true;
            });

            let visibleSwatchesDefined = visibleSwatches.filter(function (x: SwatchModel) {
                return x !== undefined;
            })

            let targetsOptimized = t_targets.filter(function (x: number) {
                return x !== -1;
            })

            let index = getClosestIndex(userDefinedSwatch[0], targetsOptimized)
            visibleSwatchesDefined[index] = userDefinedSwatch[0]

            //
            // Pull out the grid id of swatches. This will broadcast to all listening swatches
            //
            let swatchIds = visibleSwatchesDefined.map((a: { id: string; }) => a.id);
            result.push(...swatchIds)

        }
        return result
    }

    const displaySwatches = (mapper: MapModel) => {

        let swatches = getSwatchesFromlocalStorage()
        let swatchIds = mapSwatchesToTarget(swatches, mapper)

        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: swatchIds }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: mapper.weights() }));

    }

    const displayUserDefinedSwatches = () => {

        let swatches = getSwatchesFromlocalStorage()

        const userDefinedSwatches = swatches.filter(obj => {
            return obj.isUserDefined === true;
        });

        let results = userDefinedSwatches.map(a => a.id);

        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: results }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: [] }));

    }

    const downloadAsRootJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToGenomeJSON(swatches)
        downloadSwatches(json)
    }

    const logSwatches = () => {
        let swatches = getSwatchesFromlocalStorage()
        let result = findClosestSwatches(swatches, "#ffc107")
        console.log(result)
    }

    const findClosestSwatches = (swatches: SwatchModel[], hex: string) => {

        let spectro = new Spectro()
        let result = {} as any
        let tolerance = 10

        swatches.forEach(function (swatch, index) {
            // perform CIE lab DeltaE on each swatch, store result in an array
            // sort array. The smallest numbers are the closest match
            let dE = spectro.getDeltaE(hex, swatch.hex)
            if (dE <= tolerance) result[swatch.id] = dE;
        })

        return result
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

    // const downloadAsCarbonJSON = () => {
    //     let swatches = getSwatchesFromlocalStorage()
    //     let json = formatSwatchesToCarbonJSON(swatches)
    //     downloadSwatches(json)
    // }

    // const downloadAsNewsKitJSON = () => {
    //     let swatches = getSwatchesFromlocalStorage()
    //     let json = formatSwatchesToNewsKitJSON(swatches)
    //     downloadSwatches(json)
    // }

    // const downloadAsLightningJSON = () => {
    //     let swatches = getSwatchesFromlocalStorage()
    //     let json = formatSwatchesToLightningJSON(swatches)
    //     downloadSwatches(json)
    //     return
    // }



    // const formatSwatchesToCarbonJSON = (swatches: SwatchModel[]) => {

    //     let result = {} as any

    //     let mm = new MapModel(targetWeight_carbon)

    //     swatches.forEach(function (swatch, index) {

    //         // Populate result with parent semantic node
    //         if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

    //         if (mm.targets()[index % l_targets.length] !== -1) {
    //             result[swatch.semantic][swatch.semantic + "-" + mm.weights()[index % l_targets.length]] = {
    //                 id: swatch.id,
    //                 value: swatch.hex,
    //                 lightness: swatch.lightness,
    //                 l_target: swatch.l_target,
    //                 userDefined: swatch.isUserDefined,
    //                 ccName: swatch.colorChecker.name,
    //                 semantic: swatch.semantic
    //             }
    //         }
    //     });

    //     //
    //     // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
    //     //
    //     return JSON.stringify({ color: { palette: result } }, null, 4);

    // }

    // const formatSwatchesToNewsKitJSON = (swatches: SwatchModel[]) => {

    //     let result = {} as any

    //     swatches.forEach(function (swatch, index) {

    //         // Populate result with parent semantic node
    //         if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

    //         if (weights_newskit[index % l_targets.length] !== -1) {
    //             result[swatch.semantic][swatch.semantic + zeroPad(weights_newskit[index % l_targets.length], 3)] = {
    //                 id: swatch.id,
    //                 value: swatch.hex,
    //                 lightness: swatch.lightness,
    //                 l_target: swatch.l_target,
    //                 userDefined: swatch.isUserDefined,
    //                 ccName: swatch.colorChecker.name,
    //                 semantic: swatch.semantic
    //             }
    //         }
    //     });

    //     //
    //     // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
    //     //
    //     return JSON.stringify({ color: { palette: result } }, null, 4);

    // }

    // const formatSwatchesToLightningJSON = (swatches: SwatchModel[]) => {

    //     let result = {} as any

    //     swatches.forEach(function (swatch, index) {

    //         // Populate result with parent semantic node
    //         if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

    //         let weights = weights_lightning

    //         if (weights[index % l_targets.length] !== -1) {
    //             result[swatch.semantic][swatch.semantic + "-" + weights[index % l_targets.length]] = {
    //                 id: swatch.id,
    //                 value: swatch.hex,
    //                 lightness: swatch.lightness,
    //                 l_target: swatch.l_target,
    //                 userDefined: swatch.isUserDefined,
    //                 ccName: swatch.colorChecker.name,
    //                 semantic: swatch.semantic
    //             }
    //         }
    //     });

    //     //
    //     // Need to loop again to pick up any userDefined colors on the 'X' and insert at closest weight into result
    //     //
    //     return JSON.stringify({ color: { palette: result } }, null, 4);

    // }

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

           {/* <button onClick={downloadAsRootJSON}> DOWNLOAD </button> */}
            {/* 
            <button onClick={downloadAsCarbonJSON}> Carbon </button>
            <button onClick={downloadAsNewsKitJSON}> NewsKit </button>
            <button onClick={downloadAsLightningJSON}> Lightning </button> */}


            {/* <button onClick={() => displaySwatches(color_spectrum)}>display Spectrum</button>
            <button onClick={() => displaySwatches(color_newskit)}>display NewsKit</button>
            <button onClick={() => displaySwatches(color_carbon)}>display Carbon</button>
            <button onClick={() => displaySwatches(color_lightning)}>display Lightning</button>
            <button onClick={() => displaySwatches(color_genome)}>display Genome</button>
            <button onClick={() => displaySwatches(color_colorbox)}>display ColorBox</button>
            <button onClick={() => displaySwatches(color_ap)}>display AP</button> */}
            <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option" />;

            {/* <button onClick={() => displayUserDefinedSwatches()}> DEFINED </button> */}
            <button onClick={() => logSwatches()}> *** FIND CLOSEST *** </button>
            <button onClick={downloadAsRootJSON}> DOWNLOAD </button>
            {/* <button onClick={downloadAsCarbonJSON}> Carbon </button> */}

        </div>
    )

}

export default NavBar;