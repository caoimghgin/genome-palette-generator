import React from 'react';
import { SwatchModel } from './models/SwatchModel'
import { SwatchMapModel } from './models/SwatchMapModel';
import { Options, weightedTargets } from "./constants/weightedTargets"
import { Event, columns, l_targets } from "./constants"
import Spectro from './utilities/palettizer-rfc-2/spectro'
import Dropdown from 'react-dropdown';
import logo from './logo.svg';
import 'react-dropdown/style.css';
import styled from '@emotion/styled';

import Tooltip from './Tooltip'

import { Matrix } from "./modules/SwatchMatrix";

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    const onSelect = (event: any) => {
        let index = parseInt(event.value)
        let selection = weightedTargets(index)
        let map = new SwatchMapModel(selection) // need to pass in the full weightedTargets, not just the rows..
        displaySwatches(map)
    }

    const getClosestIndex = (color: SwatchModel, targets: Array<any>) => {
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    const mapSwatchesToTarget = (swatches: SwatchModel[], mapper: SwatchMapModel) => {

        //
        // Before I go through this, need to determine if the color is a neutral
        // Need to get the right targets for neutrals (not assume all will be same targets)
        //

        let result = [] as any

        for (let column = 0; column < columns.length; column++) {

            let visibleSwatches = [] as any

            var columnSwatches = swatches.filter(obj => {
                return obj.column === columns[column];
            });

            if (columnSwatches.length === 0) { break }

            // if target includes the SwatchModel.l_target, then make visible
            let t_targets = mapper.newTargets(columnSwatches[12].isNeutral)

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

    const displaySwatches = (mapper: SwatchMapModel) => {

        // let swatches = getSwatchesFromlocalStorage()
        // let swatchIds = mapSwatchesToTarget(swatches, mapper)

        let swatches = xGetSwatchesFromlocalStorage()
        let mappedSwatches = xMapSwatchesToTarget(swatches, mapper)
        let swatchIds = getSwatchIds(removeUndefinedWeightSwatches(mappedSwatches))

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

    const downloadJSON = () => {
        let swatches = xGetSwatchesFromlocalStorage()
        let json = JSON.stringify(swatches, null, 4);
        downloadSwatches(json)
    }

    const downloadAsRootJSON = () => {

        let swatches = getSwatchesFromlocalStorage()
        let json = formatSwatchesToGenomeJSON(swatches)

        downloadSwatches(json)
        // alert("-- WORKING: A gcs.json file is downloaded (ALL swatches, a non-optimized file). User can import the gcs.json into Figma, Sketch, AdobeXD or any other app with the aid of a separate plugin. That plugin will allow user to 'optimize' values into any color system they prefer. --");
    }

    const tbd_resources = () => {

        let map = new SwatchMapModel(weightedTargets(1)) // need to pass in the full weightedTargets, not just the rows..
        let grid = xGetSwatchesFromlocalStorage()
        let result = xMapSwatchesToTarget(grid, map)

        alert("-- A dropdown menu appears showing author of app 'Kevin Muldoon', and links to other resources such as 'QuickStart', 'GitHub', 'Plugins (Figma, Sketch, etc)', 'Contact information', ... --");
    }

    const tbd_import = () => {
        alert("-- Filebrowser appears allowing user to import a previously exported Genome Color Space 'gcs.json' file --");
    }

    const tbd_tools = () => {
        alert("-- A dropdown menu appears showing special tools. For instance, the ability to enter a hex value and find closest match in current color table for 'tweaking' --");
    }

    const logSwatches = () => {
        let swatches = getSwatchesFromlocalStorage()
        let result = findClosestSwatches(swatches, "#ffc107")
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
            if (!result[swatch.column]["rows"]) { result[swatch.column]["rows"] = {} }

            // find the name of the column here 
            let columName = localStorage.getItem(swatch.column) as string
            result[swatch.column]["semantic"] = columName

            result[swatch.column]["rows"][swatch.row] = {
                id: swatch.id,
                value: swatch.hex,
                lightness: swatch.lightness,
                l_target: swatch.l_target,
                userDefined: swatch.isUserDefined,
                ccName: swatch.colorChecker.name,
                WCAG2_W_30: swatch.WCAG2_W_30,
                WCAG2_W_45: swatch.WCAG2_W_45,
                WCAG2_K_30: swatch.WCAG2_K_30,
                WCAG2_K_45: swatch.WCAG2_K_45,
            }

        });

        return JSON.stringify(result, null, 4);

    }

    const xGetSwatchesFromlocalStorage = () => {

        let grid = new Matrix.Grid()

        for (let column = 0; column < columns.length; column++) {

            let semantic = window.localStorage.getItem(columns[column]) as String
            if (!semantic) { break }

            let col = new Matrix.Column()
            col.semantic = semantic

            for (let row = 0; row < l_targets.length; row++) {
                let swatchData = window.localStorage.getItem( columns[column] + row )
                if (!swatchData) { break }
                let swatch = JSON.parse(swatchData) as Matrix.Swatch
                col.rows.push(swatch) 
            }

            grid.columns.push(col)
        }

        return grid

    }

    const xGetClosestIndex = (swatch: Matrix.Swatch, targets: Array<any>) => {
        
        // var closest = targets.reduce(function (prev, curr) {
        //     return (Math.abs(curr - swatch.lightness) < Math.abs(prev - swatch.lightness) ? curr : prev);
        // });
        // return targets.indexOf(closest)

        let m = (swatch.l_target === 85 ? -2.5 : 0)
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - (swatch.lightness + m)) < Math.abs(prev - (swatch.lightness + m)) ? curr : prev);
        });
        return targets.indexOf(closest)

    }

    const removeUndefinedWeightSwatches = (grid: Matrix.Grid) => {
        grid.columns.forEach(function (column, index, arr) {
            let weightOptimizedSwatches = column.rows.filter(swatch => { 
                return swatch.weight !== undefined;
            });
            grid.columns[index].rows = weightOptimizedSwatches
        });
        return grid
    }

    const getSwatchIds = (grid: Matrix.Grid) => {
        let result: string[] = [];
        grid.columns.forEach(function (column, index, arr) {
            let ids = column.rows.filter(swatch => { 
                result.push(swatch.id as string)
            });
        });
        return result
    }

    const xMapSwatchesToTarget = (grid: Matrix.Grid, mapper: SwatchMapModel) => {

        grid.columns.forEach(function (column, index, arr) {

            let neutralTargets = column.rows[12].isNeutral
            let targets = mapper.newTargets(neutralTargets)

            column.rows.forEach(function (row, index, arr) {
                row.weight = undefined
                if (targets.includes(row.l_target)) {
                    row.weight = mapper.weights()[index] 
                }
            });

            //
            // The userDefinedSwatch may not slot neatly into the L*5 grid. If the defined 
            // swatch is not present, then insert into grid, replacing for closest match.
            //
            column.rows.filter(swatch => { 
                if ( swatch.isUserDefined === true && swatch.weight === undefined ) {
                    let index = xGetClosestIndex(swatch, targets)
                    swatch.weight = column.rows[index].weight 
                    column.rows[index].weight = undefined
                }
            });

          });

          return grid
    
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
        tempLink.setAttribute('download', 'gcs.json');
        tempLink.click();
    }

    const Wrapper = styled.div`
        background-color: #f8f8f8;
        border-bottom: '1px solid #e2e2e2'
        width: 100%;
        height: 88px;
        margin-bottom: 22px;
`;

    const Container = styled.div`
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        align-self: center;
        align-items: center;
        justify-content: center;
`;

    const ContainerLeft = styled.div`
        grid-row: 1 / 4;
        grid-column: 1 / 2;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 44px;
`;

    const ContainerCenter = styled.div`
        grid-row: 1 / 4;
        grid-column: 2 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
`;

    const ContainerRight = styled.div`
        grid-row: 1 / 4;
        grid-column: 3 / 4;
        display: flex;
        justify-content: right;
        align-items: center;
        padding-right: 44px;
`;

    const DropdownContainer = styled.div`
        width: 220px;
        padding-left: 24px;
        text-align: left;
`;

    return (

        <Wrapper>

            <Container>
                <ContainerLeft>
                    <img src={logo} className="App-logo" alt="logo" />
                    <DropdownContainer>
                        <Dropdown options={Options} onChange={onSelect} value={Options[0]} placeholder="Select an option" />
                    </DropdownContainer>
                </ContainerLeft>

                <ContainerCenter> </ContainerCenter>

                <ContainerRight>

                    <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_resources}> Resources </button>
                    <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_tools}> Tools </button>
                    <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_import}> Import </button>
                    {/* <button style={{ marginLeft: '12px', padding: '12px' }} onClick={downloadAsRootJSON}> Export </button> */}
                    <button style={{ marginLeft: '12px', padding: '12px' }} onClick={downloadJSON}> Export </button>


                </ContainerRight>

            </Container>
        </Wrapper>
    )

}

export default NavBar;