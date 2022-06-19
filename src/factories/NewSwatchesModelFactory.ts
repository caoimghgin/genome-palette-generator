
import Palettizer from "../utilities/palettizer"
import { SwatchModel } from '../models/SwatchModel'
import { ISwatchBase } from "../models/SwatchBase"

export function SwatchesModelFactory(model: ISwatchBase, column: string, hexValues: string[]): SwatchModel[] {

    let palettizer = new Palettizer(model.hexString, model.semantic, column, hexValues)
    return palettizer.createSwatchColumn()

}

