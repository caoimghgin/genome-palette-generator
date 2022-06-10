export module Matrix {

    export class Grid {
        columns: Column[] = []
    }

    export class Column {
        semantic!: String
        rows: Swatch[] = []
    }

    export class Swatch {
        filter(arg0: (obj: any) => boolean) {
            throw new Error('Method not implemented.')
        }
        id!: string
        column!: string
        row!: number
        name!: string
        hex!: string
        weight!: string | undefined
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
        WCAG2_W_30!: boolean
        WCAG2_W_45!: boolean
        WCAG2_K_30!: boolean
        WCAG2_K_45!: boolean
    }

    class ColorCheckerModel {
        name!: string
        dE!: number
    }

    class LAB {
        L!: number
        a!: number
        b!: number
    }

    class LCH {
        L!: number
        C!: number
        H!: number
    }

    class HSV {
        H!: number
        S!: number
        V!: number
    }

}
