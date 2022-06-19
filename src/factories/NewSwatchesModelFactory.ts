
import Palettizer from "../utilities/palettizer"

import { SwatchModel } from '../models/SwatchModel'
import { ISwatchBase } from "../models/SwatchBase"

export function SwatchesModelFactory(model: ISwatchBase, column: string): SwatchModel[] {

    let genome = new Palettizer(model.hexString, model.semantic, column)
    return genome.createSwatchColumn()

}

