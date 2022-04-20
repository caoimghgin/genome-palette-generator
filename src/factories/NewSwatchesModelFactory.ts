
import Palettizer from "../utilities/palettizer-rfc-2/genome"

import { SwatchModel, ISwatchBase } from '../models'

export function SwatchesModelFactory(model: ISwatchBase): SwatchModel[] {

    let genome = new Palettizer(model.hexString, model.semantic, model.columnName)
    
    genome.createSwatchColumn()
    let swatchColumn = genome.swatches
    return swatchColumn

}

