import React, { useState, useEffect, useCallback } from 'react';
import { SwatchModel } from './models/SwatchModel'
import { ISwatchBase } from './models/SwatchBase'
import { Swatch } from "./Swatch";
import { SwatchesModelFactory } from './factories/SwatchesModelFactory'
import { columns, Event } from './constants'
import { debounce } from 'lodash';
import styled from '@emotion/styled';
import ReactModal from 'react-modal';
import SelectPinnedColorsView from './SelectPinnedColorsView'

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
        // setIsVisible(e.detail.includes(model.id))
        setVisibleSwatches(e.detail)
    }) as EventListener);

    window.addEventListener(Event.EDITABLE, ((e: CustomEvent) => {
        let editable = e.detail
        setDisabled(editable)
        //     var isUndefined = data.filter(function(x:any) {
        //         return x === undefined;
        //    });
        //     // console.log("isUndefined = ", isUndefined.length)
        //     setDisabled(isUndefined.length)
        //    setModel(filtered)

    }) as EventListener);

    const [column, setColumn] = useState<string>('A');
    const [semantic, setSemantic] = useState<string>(model.semantic);
    const [baseColor, setBaseColor] = React.useState<string>(model.hexString);
    const [pinnedColors, setPinnedColors] = React.useState<Array<string>>([]);
    const [swatches, setSwatches] = React.useState<Array<SwatchModel>>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false)
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
        //
        // This manualInsertColors() within useEffect() fires upon update of 'column' variable. 
        // It's only purpose is to insert estabilished brand colors so they do not need to be retyped
        //  
        // manualInsertColors("wsj")
        //
        //
    }, [column]);

    function manualInsertColors(brand: string) {

        switch (brand) {
            case "wsj":
                manualInsertColorsWSJ()
                break;
            case "mw":
                manualInsertColorsMW()
                break;
            case "brn":
                manualInsertColorsBRN()
                break;
            default:
                break;
        }
        return
    }

    function manualInsertColorsWSJ() {

        switch (column) {
            case "A":
                setBaseColor("#0274B6")
                setPinnedColors(["#66C7FF", "#015483"])
                break;
            case "B":
                setBaseColor("#8856CB")
                setPinnedColors(["#C0A1FF", "#59348A"])
                break;
            case "C":
                setBaseColor("#816D4D")
                setPinnedColors(["#9E855E", "#69583E"])
                break;
            case "D":
                setBaseColor("#0A8200")
                setPinnedColors(["#73EF69", "#064F00"])
                break;
            case "E":
                setBaseColor("#E10000")
                setPinnedColors(["#FF8585", "#BA0000"])
                break;
            case "F":
                setBaseColor("#FFCF3D")
                setPinnedColors(["#FFECB1", "#5B3D2F"])
                break;
            case "G":
                setBaseColor("#0F62FE")
                setPinnedColors([])
                break;
            case "H":
                setBaseColor("#007AFF")
                setPinnedColors([])
                break;
            case "I":
                setBaseColor("#6F6F6F")
                setPinnedColors(["#F5F5F5", "#EBEBEB", "#CCCCCC", "#555555", "#333333", "#222222", "#111111"])
                break;
            default:
                break;
        }
    }

    function manualInsertColorsMW() {
        switch (column) {
            case "A":
                setBaseColor("#367F2E")
                setPinnedColors(["#4DB74D"])
                break;
            case "B":
                setBaseColor("#367F2E")
                setPinnedColors(["#4DB74D"])
                break;
            case "C":
                setBaseColor("#367F2E")
                setPinnedColors(["#4DB74D"])
                break;
            case "D":
                setBaseColor("#367F2E")
                setPinnedColors(["#4DB74D"])
                break;
            case "E":
                setBaseColor("#B51A28")
                setPinnedColors([])
                break;
            case "F":
                setBaseColor("#FCB839")
                setPinnedColors(["#FFCF3D"])
                break;
            case "G":
                setBaseColor("#0F62FE")
                setPinnedColors([])
                break;
            case "H":
                setBaseColor("#3677A8")
                setPinnedColors([])
                break;
            case "I":
                setBaseColor("#202020")
                setPinnedColors([])
                break;
            default:
                break;
        }
    }

    function manualInsertColorsBRN() {

        switch (column) {
            case "A":
                setBaseColor("#007BBD")
                setPinnedColors(["#409CCD", "#00416F", "#1A2737"])
                break;
            case "B":
                setBaseColor("#00C1E3")
                setPinnedColors(["#99EBFB", "#005f86"])
                break;
            case "C":
                setBaseColor("#6A156D")
                setPinnedColors(["#825FC3"])
                break;
            case "D":
                setBaseColor("#128578")
                setPinnedColors(["#66C5A5", "#33AF94", "#09815C"])
                break;
            case "E":
                setBaseColor("#D93D12")
                setPinnedColors(["#C5341F", "#A52E0F"])
                break;
            case "F":
                setBaseColor("#E9CB2D")
                setPinnedColors(["#B88D1F", "#957100"])
                break;
            case "G":
                setBaseColor("#0F62FE")
                setPinnedColors([])
                break;
            case "H":
                setBaseColor("#3677A8")
                setPinnedColors([])
                break;
            case "I":
                setBaseColor("#6D7878")
                setPinnedColors(["#F5F5F5", "#E5E5E5", "#6D7878", "#4D5B5C", "#001E20", "#969F9F"])
                break;
            default:
                break;
        }
    }

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
            return "(" + pinnedColors.length + ")" + " +"
        }
        return "+"

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
/* visibility: visible;
display: inline-block; */
width: 130px;
/* padding-bottom: 24px; */
margin-bottom: 16px;

`

    return (
        <Wrapper>

            <ReactModal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Minimal Modal Example">
                <SelectPinnedColorsView semantic={semantic}
                    userDefined={baseColor}
                    pinnedColors={pinnedColors}
                    updatePinnedColors={setPinnedColors} />
            </ReactModal>

            <StyledField>
                <input style={{ textAlign: 'center', width: '120px', marginBottom: '8px' }}
                    type="text"
                    id="semantic"
                    defaultValue={semantic}
                    disabled={disabled}
                    onChange={(e) => semanticInputHandler(e)} required />

                <input style={{ textAlign: 'center', width: '120px', marginBottom: '8px' }}
                    type="text"
                    id="color"
                    defaultValue={baseColor}
                    disabled={disabled}
                    onChange={(e) => colorInputHandeler(e)} required />

                <StyledButton onClick={insertPinnedColors}
                    className="button"
                    name="button 4"
                    disabled={disabled}>
                    {pinnedColorsButtonLabel()}
                </StyledButton>

            </StyledField>

            {filterVisibleSwatches().map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </Wrapper>
    )

}

export default SwatchColumn;