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

    let override:string = "wsj"

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
                    break;
                case "B":
                    return SwatchesModelFactory(base, column, ["#8856CB", "#C0A1FF", "#59348A"])
                    break;
                case "C":
                    return SwatchesModelFactory(base, column, ["#816D4D", "#9E855E", "#69583E"])
                    break;
                case "D":
                    return SwatchesModelFactory(base, column, ["#0A8200", "#73EF69", "#064F00"])
                    break;
                case "E":
                    return SwatchesModelFactory(base, column, ["#E10000", "#FF8585", "#BA0000"])
                    break;
                case "F":
                    return SwatchesModelFactory(base, column, ["#FFCF3D", "#FFECB1", "#5B3D2F"])
                    break;
                default:
                    return SwatchesModelFactory(base, column, [base.hexString])
            }
        } else {
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