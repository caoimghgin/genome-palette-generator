import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Popover } from 'react-tiny-popover'
import styled from '@emotion/styled';

import { SwatchModel } from './../models/SwatchModel'
import { SwatchMapModel } from './../models/SwatchMapModel';
import { Options, weightedTargets } from "./../constants/weightedTargets"
import { Event, columns, l_targets } from "./../constants"
import Spectro from './../utilities/palettizer/spectro'
import logo from './../logo.svg';
import { Matrix } from "./../modules/SwatchMatrix";
import { ResourcesView } from "./../components/ResourcesView"

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    // const [focusedHex, setFocusedHex] = useState("#FFFFFF")
    const [focusedSwatch, setFocusedSwatch] = useState<SwatchModel>()
    const [isControlDown, setIsControlDown] = useState(0)
    const [optimization, setOptimization] = useState(Options[0])

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {

        document.onkeydown = function (event) {
            if (event.repeat) return;
            if (event.key === "3") { setIsControlDown(3) }
            if (event.key === "4") { setIsControlDown(4.5) }
            if (event.key === "7") { setIsControlDown(7) }
        };

        document.onkeyup = function (event) {
            if (event.repeat) return;
            setIsControlDown(0)
            dispatchEvent(new CustomEvent(Event.HIDE_CONTRAST, { detail: false }));
        };

        window.addEventListener(Event.FOCUSED_SWATCH, ((e: CustomEvent) => {
            e.preventDefault();
            // setFocusedHex(e.detail)
            dispatchEvent(new CustomEvent(Event.HIDE_CONTRAST, { detail: false }));
            setFocusedSwatch(e.detail)
        }) as EventListener);

    }, []);

    useEffect(() => {
        if (isControlDown && focusedSwatch !== undefined) {
            dispatchEvent(new CustomEvent(Event.SHOW_CONTRAST, { detail: { focus: focusedSwatch.hex, contrast: isControlDown } }));
        }
        // console.log(focusedHex)
    }, [focusedSwatch, isControlDown]);

    const onSelect = (event: any) => {
        let index = parseInt(event.value)
        setOptimization(Options[index])
        let selection = weightedTargets(index)
        let map = new SwatchMapModel(selection) // need to pass in the full weightedTargets, not just the rows..
        displaySwatches(map)
    }

    const displaySwatches = (mapper: SwatchMapModel) => {

        let swatches = xGetSwatchesFromlocalStorage()
        let mappedSwatches = mapSwatchesToTarget(swatches, mapper)
        let swatchIds = getSwatchIds(removeUndefinedWeightSwatches(mappedSwatches))

        mapper.newTargets(false)
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: mapper.weights() }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_TARGETS, { detail: mapper.displayDefinedTargets() }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: swatchIds }));
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

        setIsPopoverOpen(!isPopoverOpen)

        // let map = new SwatchMapModel(weightedTargets(1)) // need to pass in the full weightedTargets, not just the rows..
        // let grid = xGetSwatchesFromlocalStorage()
        // let result = mapSwatchesToTarget(grid, map)

        // alert("-- A dropdown menu appears showing author of app 'Kevin Muldoon', and links to other resources such as 'QuickStart', 'GitHub', 'Plugins (Figma, Sketch, etc)', 'Contact information', ... --");
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
                let swatchData = window.localStorage.getItem(columns[column] + row)
                if (!swatchData) { break }
                let swatch = JSON.parse(swatchData) as Matrix.Swatch
                col.rows.push(swatch)
            }

            grid.columns.push(col)
        }

        return grid

    }

    const getClosestIndex = (swatch: Matrix.Swatch, targets: Array<any>) => {

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

    const mapSwatchesToTarget = (grid: Matrix.Grid, mapper: SwatchMapModel) => {

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
            // The pinned may not slot neatly into the L*5 matrix. If defined
            // swatch is not present, then insert into matrix, replacing for closest match.
            //
            column.rows.filter(swatch => {
                if (swatch.isPinned === true && swatch.weight === undefined) {
                    let index = getClosestIndex(swatch, targets)
                    // need to test if a .isUserDefined is in the slot!
                    let testing = column.rows[index]
                    if (testing.isUserDefined == false) {
                        swatch.weight = column.rows[index].weight
                        column.rows[index].weight = undefined
                    }
                }
            });

            //
            // The userDefinedSwatch may not slot neatly into the L*5 grid. If the defined 
            // swatch is not present, then insert into grid, replacing for closest match.
            //
            column.rows.filter(swatch => {
                if (swatch.isUserDefined === true && swatch.weight === undefined) {
                    let index = getClosestIndex(swatch, targets)
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
                        <Select
                            value={optimization}
                            onChange={onSelect}
                            options={Options}
                        />
                    </DropdownContainer>
                </ContainerLeft>

                <ContainerCenter>


                </ContainerCenter>

                <ContainerRight>

                    <Popover
                        isOpen={isPopoverOpen}
                        positions={['bottom', 'left']} // if you'd like, you can limit the positions
                        padding={10} // adjust padding here!
                        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                        onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
                        content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                        <ResourcesView/>
                            // <div style={{ backgroundColor: 'white'}} >
                            //     <div>Hi! I'm popover content. Here's my current position: {position}.</div>
                            //     <div>I'm {` ${nudgedLeft} `} pixels beyond my boundary horizontally!</div>
                            //     <div>I'm {` ${nudgedTop} `} pixels beyond my boundary vertically!</div>
                            // </div>
                        )}
                    >
                        {/* <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div> */}
                        <button style={{ marginLeft: '12px', padding: '12px' }} onClick={() => setIsPopoverOpen(!isPopoverOpen)}> Resources </button>

                    </Popover>

                    {/* <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_resources}> Resources </button> */}
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