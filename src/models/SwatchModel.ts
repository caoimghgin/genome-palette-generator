import Spectro from "../utilities/palettizer-rfc-2/spectro"

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
    isNeutral!: boolean
    l_target!: number
    WCAG2!: number
    WCAG3!: number
    WCAG_W_30!: boolean
    WCAG_W_45!: boolean
    WCAG_K_30!: boolean
    WCAG_K_45!: boolean

    constructor( hex: string, column: string) {
        var spectro = new Spectro()

        this.hex = hex
        this.column = column
        this.row = 0
        this.l_target = -1

        this.LAB = new LAB(spectro.getLabValue(hex))
        this.LCH = new LCH(spectro.getLchValue(hex))
        this.HSV = new HSV(spectro.getHsvValue(hex))
        this.colorChecker = spectro.getClosestColorCheckerName(hex)
        this.lightness = this.LAB.L
        this.WCAG2 = spectro.getWCAG(hex)
        this.WCAG3 = spectro.getAPCA(hex)
        this.isUserDefined = false
        this.isNeutral = false

        let wcag:any = spectro.getWCAGBools(hex)
        this.WCAG_W_30 = wcag[0]
        this.WCAG_W_45 = wcag[1]
        this.WCAG_K_30 = wcag[2]
        this.WCAG_K_45 = wcag[3]

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
        // this.L = Lab[0]
        this.a = Lab[1]
        this.b = Lab[2]
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
