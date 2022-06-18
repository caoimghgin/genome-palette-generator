
import Palettizer from "../utilities/palettizer-rfc-2/genome"

import { SwatchModel } from '../models/SwatchModel'
import { ISwatchBase } from "../models/SwatchBase"

export function SwatchesModelFactory(model: ISwatchBase, column: string): SwatchModel[] {

    let genome = new Palettizer(model.hexString, model.semantic, column)
    return genome.createSwatchColumn()

}

