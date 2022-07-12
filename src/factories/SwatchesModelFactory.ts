
import Palettizer from "../utilities/palettizer"
import { SwatchModel } from '../models/SwatchModel'

export function SwatchesModelFactory(column: string, semantic: string, hexValues: string[]): SwatchModel[] {

    let palettizer = new Palettizer(column, semantic, hexValues)
    return palettizer.createSwatchColumn()

}

