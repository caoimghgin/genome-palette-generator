import React, { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import styled from '@emotion/styled'
import { debounce } from 'lodash'

import SelectPinnedColorsView from './SelectPinnedColorsView'
import Swatch from "./Swatch"
import { columns, Event } from './../constants'
import { ISwatchBase } from './../models/SwatchBase'
import { SwatchModel } from './../models/SwatchModel'
import { SwatchesModelFactory } from './../factories/SwatchesModelFactory'

ReactModal.setAppElement("#root");

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: "0",
        transform: "translate(-50%, -50%)"
    }
};

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    window.addEventListener(Event.DISPLAY_SWATCHES_ID, ((e: CustomEvent) => {
        setVisibleSwatches(e.detail)
    }) as EventListener);

    const [column, setColumn] = useState<string>('A');
    const [semantic, setSemantic] = useState<string>(model.semantic);
    const [baseColor, setBaseColor] = React.useState<string>(model.hexString);
    const [pinnedColors, setPinnedColors] = React.useState<Array<string>>([]);
    const [swatches, setSwatches] = React.useState<Array<SwatchModel>>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [visibleSwatches, setVisibleSwatches] = React.useState<Array<string>>([]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Run once on instantiation
    useEffect(() => {
        initColumnIndex()
        let columnIndex = localStorage.getItem('columnIndex') as string
        let index = parseInt(columnIndex) + 1
        setColumn(columns[index])

        localStorage.setItem('columnIndex', index.toString())
        localStorage.setItem(columns[index], model.semantic)

    }, []);

    // Update on change of pinnedColors, baseColor, or column
    useEffect(() => {
        setSwatches(createSwatches())
        closeModal()
    }, [pinnedColors, baseColor]);

    useEffect(() => {

        setSwatches(createSwatches())

    }, [column]);

    function createSwatches() {
        return SwatchesModelFactory(column, semantic, [baseColor].concat(pinnedColors))
    }

    const debounceAndSave = useCallback(debounce((col, sem) => {
        localStorage.setItem(col, sem)
        setSemantic(sem)
    }, 750), []);


    function semanticInputHandler(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        let value = event.currentTarget.value
        debounceAndSave(column, value)
    }

    function initColumnIndex(): void {
        let columnIndex = localStorage.getItem('columnIndex') as string
        if (columnIndex === null) {
            localStorage.setItem('columnIndex', '-1')
        }
    }

    function colorInputHandeler(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault(); // Preventing the page from reloading
        let value = event.currentTarget.value;
        var re = /[0-9A-Fa-f]{6}/g;

        if(re.test(value)) {
            let hex = value.startsWith("#") ? value : ("#" + value)
            if (hex.startsWith("##")) {
                hex = hex.slice(hex.length - 7)
            }
            setBaseColor(hex)
        }
    }

    const insertPinnedColors = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        openModal()
    }

    const filterVisibleSwatches = () => {
        if (visibleSwatches.length > 0) {
            let visibleSwatchesFiltered = swatches.filter((swatch, index, array) => {
                if (visibleSwatches.includes(swatch.id)) {
                    return swatch
                }
            });
            return visibleSwatchesFiltered
        }
        return swatches

    }

    function pinnedColorsButtonLabel() {
        if (pinnedColors.length) {
            return "+" + pinnedColors.length
        }
        return "+"

    }

    function getUserDefinedSwatch() {
        let userDefinedSwatch = swatches.filter(swatch => {
            return swatch.isUserDefined === true;
        });
        return userDefinedSwatch[0]
    }

    const Wrapper = styled.div`
        visibility: visible;
        display: inline-block;
        width: 140px;
        margin-bottom: 88px;
  `
    const StyledField = styled.div`
        text-align: center;
        align: center;
        align-content: center;

        width: 50px;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
    `

    const StyledButton = styled.button`
visibility: visible;
/* display: inline; */
width: 34px;
/* padding-bottom: 24px; */
margin-bottom: 16px;

`

const StyledColorInput = styled.div`
  display: inline-block;


`
    return (
        <Wrapper>

            <ReactModal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Minimal Modal Example">
                <SelectPinnedColorsView semantic={semantic}
                    userDefined={getUserDefinedSwatch()}
                    pinnedColors={pinnedColors}
                    updatePinnedColors={setPinnedColors} />
            </ReactModal>

            <input style={{ textAlign: 'center', width: '120px', marginBottom: '8px' }}
                    type="text"
                    id="semantic"
                    defaultValue={semantic}
                    onChange={(e) => semanticInputHandler(e)} required />

            <StyledColorInput>
                <input style={{ textAlign: 'center', width: '84px', marginBottom: '8px'}}
                    type="text"
                    id="color"
                    defaultValue={baseColor}
                    onChange={(e) => colorInputHandeler(e)} required />

                <StyledButton onClick={insertPinnedColors}
                    className="button"
                    name="button 4">
                    {pinnedColorsButtonLabel()}
                </StyledButton>
                </StyledColorInput>

            {filterVisibleSwatches().map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </Wrapper>
    )

}

export default SwatchColumn;