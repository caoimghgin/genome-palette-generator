import React, { useState, useEffect, useCallback } from 'react';
import { SwatchModel } from './models/SwatchModel'
import { ISwatchBase } from './models/SwatchBase'
import { Swatch } from "./Swatch";
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'
import { columns, columnWidth } from './constants'
import { debounce } from 'lodash';
import styled from '@emotion/styled';

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {


    const [base, setBase] = useState<ISwatchBase>(model);
    const [column, setColumn] = useState<string>('A');
    const [semantic, setSemantic] = useState<string>(model.semantic);
    // const [swatches, setSwatches] = useState<SwatchModel[]>(SwatchesModelFactory(base, column));

    model.columnName = column

    let swatches = createSwatches("xxx")

    function createSwatches(override:string) {
        if (override == "wsj") {
            switch (column) {
                case "A":
                    return SwatchesModelFactory(base, column, ["#0274B6", "#66C7FF", "#015483"])
                case "B":
                    return SwatchesModelFactory(base, column, ["#8856CB", "#C0A1FF", "#59348A"])
                case "C":
                    return SwatchesModelFactory(base, column, ["#816D4D", "#9E855E", "#69583E"])
                case "D":
                    return SwatchesModelFactory(base, column, ["#0A8200", "#73EF69", "#064F00"])
                case "E":
                    return SwatchesModelFactory(base, column, ["#E10000", "#FF8585", "#BA0000"])
                case "F":
                    return SwatchesModelFactory(base, column, ["#FFCF3D", "#FFECB1", "#5B3D2F"])
                case "G":
                    return SwatchesModelFactory(base, column, ["#0F62FE"])
                case "H":
                    return SwatchesModelFactory(base, column, ["#007AFF"])   
                case "I":
                     return SwatchesModelFactory(base, column, ["#6F6F6F", "#F5F5F5", "#EBEBEB", "#CCCCCC", "#555555", "#333333", "#222222", "#111111"])                                       
                default:
                    return SwatchesModelFactory(base, column, [base.hexString])
            }           
        } else if (override == "mw") {
            switch (column) {
                case "A":
                    return SwatchesModelFactory(base, column, ["#367F2E", "#4DB74D"])
                case "B":
                    return SwatchesModelFactory(base, column, ["#367F2E", "#4DB74D"])
                case "C":
                    return SwatchesModelFactory(base, column, ["#367F2E", "#4DB74D"])
                case "D":
                    return SwatchesModelFactory(base, column, ["#367F2E", "#4DB74D"])
                case "E":
                    return SwatchesModelFactory(base, column, ["#B51A28"])
                case "F":
                    return SwatchesModelFactory(base, column, ["#FCB839", "#FFCF3D"])
                case "G":
                    return SwatchesModelFactory(base, column, ["#0F62FE"])    
                case "H":
                    return SwatchesModelFactory(base, column, ["#3677A8"])   
                case "I":
                     return SwatchesModelFactory(base, column, ["#202020"])                                           
                default:
                    return SwatchesModelFactory(base, column, [base.hexString])
            }  
        } else if (override == "brn") {
            switch (column) {
                case "A":
                    return SwatchesModelFactory(base, column, ["#007BBD", "#409CCD", "#00416F", "#1A2737"])
                case "B":
                    return SwatchesModelFactory(base, column, ["#00C1E3", "#99EBFB", "#005f86"])
                case "C":
                    return SwatchesModelFactory(base, column, ["#6A156D", "#825FC3"])
                case "D":
                    return SwatchesModelFactory(base, column, ["#128578", "#66C5A5", "#33AF94", "#09815C",])
                case "E":
                    return SwatchesModelFactory(base, column, ["#D93D12", "#C5341F", "#A52E0F"])
                case "F":
                    return SwatchesModelFactory(base, column, ["#E9CB2D", "#B88D1F", "#957100"])
                case "G":
                    return SwatchesModelFactory(base, column, ["#0F62FE"])    
                case "H":
                    return SwatchesModelFactory(base, column, ["#3677A8"])   
                case "I":
                     return SwatchesModelFactory(base, column, ["#6D7878", "#F5F5F5", "#E5E5E5", "#6D7878", "#4D5B5C", "#001E20", "#969F9F"])                                           
                default:
                    return SwatchesModelFactory(base, column, [base.hexString])
            }              
        } else  {
            return SwatchesModelFactory(base, column, [base.hexString])
        }

    }

    useEffect(() => {

        initColumnIndex()
        let columnIndex = localStorage.getItem('columnIndex') as string
        let index = parseInt(columnIndex) + 1
        setColumn(columns[index])

        localStorage.setItem('columnIndex', index.toString())
        localStorage.setItem(columns[index], model.semantic)

    }, []);

    const debounceAndSave = useCallback(debounce((col, sem) => {
        localStorage.setItem(col, sem)
    }, 500), []);

    function semanticInputHandler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value
        debounceAndSave(column, value)
    }

    function initColumnIndex(): void {
        let columnIndex = localStorage.getItem('columnIndex') as string
        if (columnIndex === null) {
            localStorage.setItem('columnIndex', '-1')
        }
    }

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (value.length === 7) {
            setBase({ hexString: value, semantic: base.semantic })
            // setSwatches(SwatchesModelFactory(base, column))
        }
    }

    const Wrapper = styled.div`
        visibility: visible;
        display: inline-block;
        width: 140px;
        margin-bottom: 88px;
  `;

    const inputWrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '22px'
    }

    const InputStyleSemantic = styled.input`
    text-align: center;
    width: 120px;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 8px;
    padding-top: 4px;
    color: #3b3b3b;
        padding-bottom: 4px;
        border: 2px solid #e2e2e2;        

        /* text-align: center;
        font-weight: bold;
        font-size: 17px; */
        /* margin-bottom: 8px;
        margin-right: 2px;
        margin-left: 2px;
        padding-top: 8px;
        padding-bottom: 8px;
        width: 100% */

    `

    const InputStyleValue = styled.input`
    text-align: center;
    width: 120px;
    font-size: 14px;
    padding-top: 2px;
        padding-bottom: 2px;
        border: 2px solid #e2e2e2;        
    /* text-align: center;
    font-weight: normal;
    font-size: 17px; */
    /* margin-right: 2px;
        margin-left: 2px;
        padding-top: 8px;
        padding-bottom: 8px;
    width: 100% */
`

    return (
        <Wrapper>

            <div style={inputWrapper as React.CSSProperties}>
                <InputStyleSemantic
                    type="text"
                    key="6e03882a"
                    defaultValue={semantic}
                    placeholder="Enter a message"
                    onChange={(e) => semanticInputHandler(e)}
                />
                <InputStyleValue
                    type="text"
                    key="78b51b30"
                    defaultValue={model.hexString}
                    placeholder="Enter a message"
                    onChange={(e) => inputHandeler(e)}
                />
            </div>

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </Wrapper>
    )

}

export default SwatchColumn;