import Spectro from "../utilities/palettizer-rfc-2/spectro"
import { l_targets } from '../constants'

export class SwatchModel {
    id!: string
    column!: string
    row!: number
    name!: string
    hex!: string
    original?: SwatchModel
    weight!: string
    semantic!: string
    lightness!: number
    LAB!: LAB
    LCH!: LCH
    HSV!: HSV
    colorChecker!: ColorCheckerModel
    isUserDefined!: boolean
    isAnchored!: boolean
    isNeutral!: boolean
    l_target!: number
    WCAG2!: number
    WCAG3!: number
    WCAG2_W_30!: boolean
    WCAG2_W_45!: boolean
    WCAG2_K_30!: boolean
    WCAG2_K_45!: boolean

    constructor( hex: string, column: string) {
        var spectro = new Spectro()

        this.LAB = new LAB(spectro.getLabValue(hex))
        this.LCH = new LCH(spectro.getLchValue(hex))
        this.HSV = new HSV(spectro.getHsvValue(hex))
        this.colorChecker = spectro.getClosestColorCheckerName(hex)
        this.lightness = this.LAB.L
        this.WCAG2 = spectro.getWCAG(hex)
        this.WCAG3 = spectro.getAPCA(hex)
        this.isUserDefined = false
        this.isAnchored = false
        this.isNeutral = false

        this.hex = hex.toUpperCase()
        this.column = column
        this.row = getRow(this.lightness)
        this.l_target = getTarget(this.row)

        let wcag:any = spectro.getWCAGBools(hex)
        this.WCAG2_W_30 = wcag[0]
        this.WCAG2_W_45 = wcag[1]
        this.WCAG2_K_30 = wcag[2]
        this.WCAG2_K_45 = wcag[3]

    }

}

export class ColorCheckerModel {
    name!: string
    dE!: number
    constructor(name: string, dE: number) {
        this.name = name
        this.dE = dE
    }
}

export class LAB {
    L: number
    a: number
    b: number
    constructor(Lab: number[]) {

        this.L = parseFloat(Lab[0].toFixed(2))
        this.a = parseFloat(Lab[1].toFixed(2))
        this.b = parseFloat(Lab[2].toFixed(2))
    }
}

export class LCH {
    L: number
    C: number
    H: number
    constructor(LCH: number[]) {
        this.L = LCH[0]
        this.C = LCH[1]
        this.H = LCH[2]
    }
}

export class HSV {
    H: number
    S: number
    V: number
    constructor(HSV: number[]) {
        this.H = HSV[0]
        this.S = HSV[1]
        this.V = HSV[2]
    }
}

function getRow(L: number) {
    var target = l_targets.reduce(function (prev, curr) {
        return (Math.abs(curr - L) < Math.abs(prev - L) ? curr : prev);
    });
    return l_targets.indexOf(target)
}

function getTarget(index: number) {
    return l_targets[index]
}
