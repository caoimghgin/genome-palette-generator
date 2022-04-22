
import Palettizer from "../utilities/palettizer-rfc-2/genome"

import { SwatchModel, ISwatchBase } from '../models'

export function SwatchesModelFactory(model: ISwatchBase, column: string): SwatchModel[] {

    let genome = new Palettizer(model.hexString, model.semantic, column)
    
    genome.createSwatchColumn()
    let swatchColumn = genome.swatches
    return swatchColumn

}

