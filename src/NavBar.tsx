import React from 'react';
import { SwatchModel } from './models'
import {
    Event,
    zeroPad,
    columns,
    l_targets,
    // weights_carbon,
    // weights_newskit,
    // weights_lightning,
    // targets_carbon,
    // targets_lightning,
    // targets_newskit,
    // targets_genome,
    // weights_genome,
    color_carbon,
    color_lightning,
    color_newskit,
    color_genome,
    color_spectrum,
    color_colorbox,
    color_ap
} from "./constants"
import { exit } from 'process';

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    const getClosestIndex = (color: SwatchModel, targets: Array<any>) => {
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    const mapSwatchesToTarget = (swatches: Array<SwatchModel>, targets: any) => {

        let result = [] as any

        for (let column = 0; column < columns.length; column++) {

            let visibleSwatches = [] as any

            var columnSwatches = swatches.filter(obj => {
                return obj.column === columns[column];
            });

            if (columnSwatches.length === 0) { break }

            // if target includes the SwatchModel.l_target, then make visible
            columnSwatches.forEach(function (swatch, index) {
                visibleSwatches.push(targets.targets.includes(swatch.l_target) ? swatch : undefined)
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

            let targetsOptimized = targets.targets.filter(function (x: number) {
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

    // const mapTargetsToLegendWeights = (targets: any) => {

    //     if (targets === color_new) return weights_newskit
    //     if (targets === targets_carbon) return weights_carbon
    //     if (targets === targets_genome) return weights_genome
    //     if (targets === targets_lightning) return weights_lightning
    //     if (targets === l_targets) return l_targets

    //     return []
    // }

    const displaySwatches = (targets: any) => {

        let swatches = getSwatchesFromlocalStorage()
        let swatchIds = mapSwatchesToTarget(swatches, targets)
        // let legendWeights = mapTargetsToLegendWeights(targets)

        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: swatchIds }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: targets.weights }));

    }

    const displayUserDefinedSwatches = () => {

        let swatches = getSwatchesFromlocalStorage()

        // foo(swatches, targets_newskit)

        const userDefinedSwatches = swatches.filter(obj => {
            return obj.isUserDefined === true;
        });

        let results = userDefinedSwatches.map(a => a.id);


        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: results }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: [] }));


    }

    // const downloadAsRootJSON = () => {
    //     let swatches = getSwatchesFromlocalStorage()
    //     let json = formatSwatchesToGenomeJSON(swatches)
    //     downloadSwatches(json)
    //     return
    // }

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

    // const formatSwatchesToGenomeJSON = (swatches: SwatchModel[]) => {

    //     let result = {} as any

    //     swatches.forEach(function (swatch, index) {

    //         if (!result[swatch.column]) { result[swatch.column] = {} }

    //         result[swatch.column][swatch.row] = {
    //             id: swatch.id,
    //             value: swatch.hex,
    //             lightness: swatch.lightness,
    //             l_target: swatch.l_target,
    //             userDefined: swatch.isUserDefined,
    //             ccName: swatch.colorChecker.name,
    //             semantic: swatch.semantic
    //         }

    //     });

    //     return JSON.stringify({ color: { palette: result } }, null, 4);

    // }

    // const formatSwatchesToCarbonJSON = (swatches: SwatchModel[]) => {

    //     let result = {} as any

    //     swatches.forEach(function (swatch, index) {

    //         // Populate result with parent semantic node
    //         if (!result[swatch.semantic]) { result[swatch.semantic] = {} }

    //         if (weights_carbon[index % l_targets.length] !== -1) {
    //             result[swatch.semantic][swatch.semantic + "-" + weights_carbon[index % l_targets.length]] = {
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

            {/* <button onClick={downloadAsRootJSON}> Root </button>
            <button onClick={downloadAsCarbonJSON}> Carbon </button>
            <button onClick={downloadAsNewsKitJSON}> NewsKit </button>
            <button onClick={downloadAsLightningJSON}> Lightning </button> */}

            <button onClick={() => displaySwatches(color_spectrum)}>display Spectrum</button>
            <button onClick={() => displaySwatches(color_newskit)}>display NewsKit</button>
            <button onClick={() => displaySwatches(color_carbon)}>display Carbon</button>
            <button onClick={() => displaySwatches(color_lightning)}>display Lightning</button>
            <button onClick={() => displaySwatches(color_genome)}>display Genome</button>
            <button onClick={() => displaySwatches(color_colorbox)}>display ColorBox</button>
            <button onClick={() => displaySwatches(color_ap)}>display AP</button>

            <button onClick={() => displayUserDefinedSwatches()}> DEFINED </button>

        </div>
    )

}

export default NavBar;