import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Spectro from './../utilities/palettizer/spectro'
import styled from '@emotion/styled';

import logo from '../resources/logo-genome-hero.svg'

import { Popover } from 'react-tiny-popover'

import { SwatchModel } from './../models/SwatchModel'
import { SwatchMapModel } from './../models/SwatchMapModel';
import { Options, weightedTargets } from "./../constants/weightedTargets"
import { Event, columns, l_targets } from "./../constants"

import { Matrix } from "./../modules/SwatchMatrix";
import { ResourcesView } from "./../components/ResourcesView"
import { ToolsView } from "./../components/ToolsView"

import { useSnackbar } from 'react-simple-snackbar'

import { InfoViewNonOpt } from './InfoViews/resources/InfoViewNonOpt'

import { Factory as InfoFactory } from './InfoViews/Factory'

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    const [openSnackbar, closeSnackbar] = useSnackbar({position:'top-center'})
    const [selectionIndex, setSelectionIndex] = useState(0)
    const [focusedSwatch, setFocusedSwatch] = useState<SwatchModel>()
    const [isControlDown, setIsControlDown] = useState(0)
    const [optimization, setOptimization] = useState(Options[0])
    const [isResourcesPopoverOpen, setIsResourcesPopoverOpen] = useState(false)
    const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false)
    const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false)
    // const [message, setMessage] = useState(Options[0].message)

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
            dispatchEvent(new CustomEvent(Event.HIDE_CONTRAST, { detail: false }));
            setFocusedSwatch(e.detail)
        }) as EventListener);

    }, []);

    useEffect(() => {
        if (isControlDown && focusedSwatch !== undefined) {
            dispatchEvent(new CustomEvent(Event.SHOW_CONTRAST, { detail: { focus: focusedSwatch.hex, contrast: isControlDown } }));
        }
    }, [focusedSwatch, isControlDown]);

    const onSelect = (event: any) => {

        let index = parseInt(event.value)
        setSelectionIndex(index)

        // let msg = (Options[index].message)
        // if (msg.length) {
        //     openSnackbar(msg, 20000)
        // } else {
        //      closeSnackbar()
        // }

        setOptimization(Options[index])
        // setMessage(Options[index].message)
        let selection = weightedTargets(index)
        let map = new SwatchMapModel(selection) // need to pass in the full weightedTargets, not just the rows..
        displaySwatches(map)
    }

    const displaySwatches = (mapper: SwatchMapModel) => {

        let swatches = getSwatchesFromlocalStorage()
        let mappedSwatches = mapSwatchesToTarget(swatches, mapper)
        let swatchIds = getSwatchIds(removeUndefinedWeightSwatches(mappedSwatches))

        mapper.newTargets(false)
        dispatchEvent(new CustomEvent(Event.DISPLAY_LEGEND, { detail: mapper.weights() }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_TARGETS, { detail: mapper.displayDefinedTargets() }));
        dispatchEvent(new CustomEvent(Event.DISPLAY_SWATCHES_ID, { detail: swatchIds }));
    }

    const downloadJSON = () => {
        let swatches = getSwatchesFromlocalStorage()
        let json = JSON.stringify(swatches, null, 4);
        downloadSwatches(json)
    }

    const tbd_import = () => {
        alert("-- Filebrowser appears allowing user to import a previously exported Genome Color Space 'gcs.json' file --");
    }

    const tbd_tools = () => {
        alert("-- A dropdown menu appears showing special tools. For instance, the ability to enter a hex value and find closest match in current color table for 'tweaking' --");
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

    const getSwatchesFromlocalStorage = () => {

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
        padding-right: 124px;
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

                    <Popover
                        isOpen={isInfoPopoverOpen}
                        positions={['bottom', 'right']} // if you'd like, you can limit the positions
                        padding={10} // adjust padding here!
                        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                        onClickOutside={() => setIsInfoPopoverOpen(false)} // handle click events outside of the popover/target here!
                        content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                        <InfoFactory selection={selectionIndex}/>
                        )}>
                        <button style={{ marginLeft: '12px', padding: '12px' }} onClick={() => setIsInfoPopoverOpen(!isInfoPopoverOpen)}> ? </button>
                    </Popover>

                    {/* <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_import}> ? </button> */}
                </ContainerLeft>

                <ContainerCenter>
                    <b><a href="https://www.youtube.com/watch?v=iDmdVCPY9xs">NEW: QUICK START VIDEO</a></b>
                </ContainerCenter>

                <ContainerRight>

                    <Popover
                        isOpen={isResourcesPopoverOpen}
                        positions={['bottom', 'left']} // if you'd like, you can limit the positions
                        padding={10} // adjust padding here!
                        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                        onClickOutside={() => setIsResourcesPopoverOpen(false)} // handle click events outside of the popover/target here!
                        content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                        <ResourcesView/>
                        )}>
                        <button style={{ marginLeft: '12px', padding: '12px' }} onClick={() => setIsResourcesPopoverOpen(!isResourcesPopoverOpen)}> Resources </button>
                    </Popover>

                    {/* <Popover
                        isOpen={isToolsPopoverOpen}
                        positions={['bottom', 'left']} // if you'd like, you can limit the positions
                        padding={10} // adjust padding here!
                        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                        onClickOutside={() => setIsToolsPopoverOpen(false)} // handle click events outside of the popover/target here!
                        content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                        <ToolsView/>
                        )}>
                        <button style={{ marginLeft: '12px', padding: '12px' }} onClick={() => setIsToolsPopoverOpen(!isToolsPopoverOpen)}> Tools </button>
                    </Popover> */}

                    {/* <button style={{ marginLeft: '12px', padding: '12px' }} onClick={tbd_import}> Import </button> */}
                    <button style={{ marginLeft: '12px', padding: '12px' }} onClick={downloadJSON}> Export </button>


                </ContainerRight>

            </Container>
        </Wrapper>
    )

}

export default NavBar;