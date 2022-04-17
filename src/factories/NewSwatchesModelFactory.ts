
import Spectro from "../utilities/palettizer-rfc-2/spectro"
import Palettizer from "../utilities/palettizer-rfc-2/genome"

import { SwatchModel, LAB, HSV, LCH, ISwatchBase, ColorCheckerModel } from '../models'
import { weights } from '../constants'

const spectro = new Spectro();

export function SwatchesModelFactory(model: ISwatchBase): SwatchModel[] {

    let genome = new Palettizer(model.hexString, model.semantic)
    
    genome.createSwatchColumn()
    let swatchColumn = genome.swatches
    console.log(swatchColumn)
    return swatchColumn

}