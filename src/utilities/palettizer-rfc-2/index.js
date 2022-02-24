import tinycolor from 'tinycolor2'
import convert from 'color-convert'
import Spectro from "./spectro"

class Palettizer {

    constructor(paperWhite, shadeTargetMultiplier) {
        this.paperWhite = paperWhite
        this.shadeTargetMultiplier = shadeTargetMultiplier
        this.spectro = new Spectro()
    }

    createSwatchColumn(hexString) {

        let swatch950 = "#000000"
        let swatch900 = "#000000"
        let swatch800 = "#000000"
        let swatch700 = "#000000"
        let swatch600 = "#000000"
        let swatch500 = "#000000"
        let swatch400 = "#000000"
        let swatch300 = "#000000"
        let swatch200 = "#000000"
        let swatch100 = "#000000"
        let swatch075 = "#000000"
        let swatch050 = "#000000"
        let swatch025 = "#000000"
        let swatch015 = "#000000"
        let swatch000 = "#FFFFFF"

        let color = tinycolor(hexString)
        let colorSpecs = this.spectro.getColorType(color)
        let shadeTargets = createShadeTargets(color, this.shadeTargetMultiplier)
        let tintTargets = this.createTintTargets(color)

        let darkenTargets = [
            shadeTargets.L_900, 
            shadeTargets.L_800, 
            shadeTargets.L_700, 
            shadeTargets.L_600, 
            shadeTargets.L_500]

        let lightenTargets = [
            tintTargets.L_300, 
            tintTargets.L_200, 
            tintTargets.L_100, 
            tintTargets.L_075, 
            tintTargets.L_050, 
            tintTargets.L_025, 
            tintTargets.L_015]

        let desaturationTargets = [75, 60, 50, 45, 18, 8, 3]

        switch (colorSpecs.name) {

            case "YELLOW":
            case "ORANGE-YELLOW":
                let yooyTintTargets = this.createTintTargetsYOOY(color)
                let yooylightenTargets = [
                    yooyTintTargets.L_300, 
                    yooyTintTargets.L_200, 
                    yooyTintTargets.L_100, 
                    yooyTintTargets.L_075, 
                    yooyTintTargets.L_050, 
                    yooyTintTargets.L_025, 
                    yooyTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, yooylightenTargets)
                break;

            case "ORANGE":            
                let oTintTargets = this.createTintTargetsBase(color)
                let olightenTargets = [
                    oTintTargets.L_300, 
                    oTintTargets.L_200, 
                    oTintTargets.L_100, 
                    oTintTargets.L_075, 
                    oTintTargets.L_050, 
                    oTintTargets.L_025, 
                    oTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, olightenTargets)
            break;

            case "PINK":            
                let pkTintTargets = this.createTintTargetsBase(color)
                let pklightenTargets = [
                    pkTintTargets.L_300, 
                    pkTintTargets.L_200, 
                    pkTintTargets.L_100, 
                    pkTintTargets.L_075, 
                    pkTintTargets.L_050, 
                    pkTintTargets.L_025, 
                    pkTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, pklightenTargets)
            break;             

            case "GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    let desaturationTargets = [75, 60, 55, 42, 28, 8, 3]
                    
                    // need to SATURATE here.
                    // if (getSaturationValue(color) > 90) {
                    //     let desaturationTargets = [75, 60, 50, 45, 30, 8, 3]
                    // }
                    
                    
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "FOLIAGE-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    desaturationTargets = [75, 60, 53, 50, 50, 10, 3]
                    //  desaturationTargets = [75, 60, 50, 45, 30, 8, 3]

                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

                case "CADM-GREEN":
                        createShadesAndTints(color, darkenTargets, lightenTargets)
                        if (isPassWCAGTextNormal(color)) {
                            desaturationTargets = [75, 70, 65, 55, 50, 15, 5]
                            // desaturationTargets = [80, 70, 62, 42, 15, 8, 3]
        
                            desaturateTints(desaturationTargets, lightenTargets)
                        }
                        break;                       

            case "YELLOW-GREEN":
            case "BLUISH-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    desaturationTargets = [80, 70, 62, 42, 15, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CYANISH-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextLarge(color)) {
                    desaturationTargets = ((isPassWCAGTextNormal(color) ? [80, 70, 62, 42, 15, 8, 3] : [90, 90, 90, 70, 45, 18, 10]))
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "ORANGISH-RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (colorSpecs.s > 90) {
                    desaturationTargets = [95, 88, 85, 50, 30, 20, 15]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                desaturationTargets = ((isPassWCAGTextNormal(color) ? [100, 100, 65, 58, 30, 20, 15] : [98, 85, 70, 58, 30, 20, 15]))
                desaturationTargets = [90, 75, 72, 58, 30, 20, 15]
                desaturateTints(desaturationTargets, lightenTargets)
                break;

            case "MODERATE-RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                desaturationTargets = [88, 88, 70, 62, 40, 8, 3]
                desaturateTints(desaturationTargets, lightenTargets)
                break;

            case "MAGENTA":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets =  [88, 88, 70, 62, 40, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "BLUE-SKY":
                createShadesAndTints(color, darkenTargets, lightenTargets) 
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets = [90, 85, 80, 40, 30, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CYAN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets = [88, 80, 70, 62, 38, 10, 3 ]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;
            case "WHITE":
            case "NEUTRAL-80":
            case "NEUTRAL-65":
            case "NEUTRAL-50":
            case "NEUTRAL-35":
            case "BLACK":
                if (colorSpecs.L <= 50) {
                    darkenTargets = [9, 15, 21, 29, 37]
                    lightenTargets = [(colorSpecs.L + 3), 58, 60, 80, 86, 95, 98]
                }
                createShadesAndTints(color, darkenTargets, lightenTargets)

                break;
            default:
            desaturationTargets = [90, 90, 90, 60, 35, 15, 10]
            createShadesAndTints(color, darkenTargets, lightenTargets)
            desaturateTints(desaturationTargets, lightenTargets)
            break;

        }
        return swatchResults()

        ///////////////////////////////////////////////////////////
        /////////////////////////// FUNCTIONS ///////////////////// 
        ///////////////////////////////////////////////////////////

        function createShadeTargets(base, shadeTargetMultiplier) {
            let L_400 = getLightnessValue(base)
            let L_900 = L_400 * shadeTargetMultiplier
    
            let stepValue = (L_400 - L_900) / 5
    
            let L_800 = L_900 + (stepValue * 1)
            let L_700 = L_900 + (stepValue * 2)
            let L_600 = L_900 + (stepValue * 3)
            let L_500 = L_900 + (stepValue * 4)
    
            return {
                L_900: L_900,
                L_800: L_800,
                L_700: L_700,
                L_600: L_600,
                L_500: L_500
            }
        }

        // function setToSaturationTarget(color, targetValue) {
        //     let value = color.clone()

        //     let baseSaturation = getSaturationValue(value)

        // }

        function desaturateToTarget(color, targetValue) {
            let value = color.clone()

            getSaturationValue(value)

            while (getSaturationValue(value) > targetValue) {
                value = desaturate(value)
            }

            return value
        }

        function desaturate(color) {
            color.desaturate(1)
            return color
        }

        function getSaturationValue(color) {
            let result = color.toHsv()
            let saturationValue = result.s
            return saturationValue * 100
        }

        function createShadesAndTints(color, shades, tints) {

            swatch900 = darkenToTarget(color.clone(), shades[0])
            swatch800 = darkenToTarget(color.clone(), shades[1])
            swatch700 = darkenToTarget(color.clone(), shades[2])
            swatch600 = darkenToTarget(color.clone(), shades[3])
            swatch500 = darkenToTarget(color.clone(), shades[4])
            swatch400 = color
            swatch300 = lightenToTarget(color.clone(), tints[0])
            swatch200 = lightenToTarget(color.clone(), tints[1])
            swatch100 = lightenToTarget(color.clone(), tints[2])
            swatch075 = lightenToTarget(color.clone(), tints[3])
            swatch050 = lightenToTarget(color.clone(), tints[4])
            swatch025 = lightenToTarget(color.clone(), tints[5])
            swatch015 = lightenToTarget(color.clone(), tints[6])
        }

        function darkenToTarget(color, targetValue) {
            let result = color.clone()
            while (getLightnessValue(result) > targetValue) {
                result = darken(result)
            }
            return result
        }

        function lightenToTarget(color, targetValue) {
            let result = color.clone()
            while (getLightnessValue(result) < targetValue) {
                result = lighten(result)
            }
            return result
        }

        function getLightnessValue(hexString) {
            return convert.hex.lab(hexString)[0]
        }

        function darken(color) {
            return tinycolor(color.clone()).darken(1)
        }

        function lighten(color) {
            return tinycolor(color.clone()).lighten(1)
        }

        function isPassWCAGTextNormal(color) {
            let value = getLightnessValue(color)
            if (value > 51) { return false }
            return true
        }

        function isPassWCAGTextLarge(color) {
            let value = getLightnessValue(color)
            if (value > 60) { return false }
            return true
        }

        function desaturateTints(desaturationTargets, lightenTargets) {
            swatch300 = desaturateToTarget(swatch300.clone(), desaturationTargets[0])
            swatch300 = lightenToTarget(swatch300.clone(), lightenTargets[0])
            swatch200 = desaturateToTarget(swatch200.clone(), desaturationTargets[1])
            swatch200 = lightenToTarget(swatch200.clone(), lightenTargets[1])
            swatch100 = desaturateToTarget(swatch100.clone(), desaturationTargets[2])
            swatch100 = lightenToTarget(swatch100.clone(), lightenTargets[2])
            swatch075 = desaturateToTarget(swatch075.clone(), desaturationTargets[3])
            swatch075 = lightenToTarget(swatch075.clone(), lightenTargets[3])
            swatch050 = desaturateToTarget(swatch050.clone(), desaturationTargets[4])
            swatch050 = lightenToTarget(swatch050.clone(), lightenTargets[4])
            swatch025 = desaturateToTarget(swatch025.clone(), desaturationTargets[5])
            swatch025 = lightenToTarget(swatch025.clone(), lightenTargets[5])
            swatch015 = desaturateToTarget(swatch015.clone(), desaturationTargets[6])
            swatch015 = lightenToTarget(swatch015.clone(), lightenTargets[6])
        }

        function swatchResults() {

            return {
                swatch000: swatch000,
                swatch015: swatch015.toHexString(),
                swatch025: swatch025.toHexString(),
                swatch050: swatch050.toHexString(),
                swatch075: swatch075.toHexString(),
                swatch075: swatch075.toHexString(),
                swatch100: swatch100.toHexString(),
                swatch200: swatch200.toHexString(),
                swatch300: swatch300.toHexString(),
                swatch400: swatch400.toHexString(),
                swatch500: swatch500.toHexString(),
                swatch600: swatch600.toHexString(),
                swatch700: swatch700.toHexString(),
                swatch800: swatch800.toHexString(),
                swatch900: swatch900.toHexString(),
                swatch950: swatch950,
            }
        }

    }

    createSwatchRow(hexString) {

        let swatch950 = "#000000"
        let swatch900 =  "#000000"
        let swatch800 =  "#000000"
        let swatch700 =  "#000000"
        let swatch600 =  "#000000"
        let swatch500 =  "#000000"
        let swatch400 =  "#000000"
        let swatch300 =  "#000000"
        let swatch200 =  "#000000"
        let swatch100 =  "#000000"
        let swatch075 =  "#000000"
        let swatch050 =  "#000000"
        let swatch025 =  "#000000"
        let swatch015 =  "#000000"
        let swatch000 = "#FFFFFF"

        let color = tinycolor(hexString)
        let colorSpecs = this.spectro.getColorType(color)
        let shadeTargets = createShadeTargets(color, this.shadeTargetMultiplier)
        let tintTargets = this.createTintTargets(color)

        // console.table(colorSpecs)

        let darkenTargets = [
            shadeTargets.L_900, 
            shadeTargets.L_800, 
            shadeTargets.L_700, 
            shadeTargets.L_600, 
            shadeTargets.L_500]

        let lightenTargets = [
            tintTargets.L_300, 
            tintTargets.L_200, 
            tintTargets.L_100, 
            tintTargets.L_075, 
            tintTargets.L_050, 
            tintTargets.L_025, 
            tintTargets.L_015]

        let desaturationTargets = [75, 60, 50, 45, 18, 8, 3]

        switch (colorSpecs.name) {

            case "YELLOW":
            case "ORANGE-YELLOW":
                let yooyTintTargets = this.createTintTargetsYOOY(color)
                let yooylightenTargets = [
                    yooyTintTargets.L_300, 
                    yooyTintTargets.L_200, 
                    yooyTintTargets.L_100, 
                    yooyTintTargets.L_075, 
                    yooyTintTargets.L_050, 
                    yooyTintTargets.L_025, 
                    yooyTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, yooylightenTargets)
                break;

            case "ORANGE":            
                let oTintTargets = this.createTintTargetsBase(color)
                let olightenTargets = [
                    oTintTargets.L_300, 
                    oTintTargets.L_200, 
                    oTintTargets.L_100, 
                    oTintTargets.L_075, 
                    oTintTargets.L_050, 
                    oTintTargets.L_025, 
                    oTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, olightenTargets)
            break;

            case "PINK":            
                let pkTintTargets = this.createTintTargetsBase(color)
                let pklightenTargets = [
                    pkTintTargets.L_300, 
                    pkTintTargets.L_200, 
                    pkTintTargets.L_100, 
                    pkTintTargets.L_075, 
                    pkTintTargets.L_050, 
                    pkTintTargets.L_025, 
                    pkTintTargets.L_015]
                createShadesAndTints(color, darkenTargets, pklightenTargets)
            break;             

            case "GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    let desaturationTargets = [75, 60, 55, 42, 28, 8, 3]
                    
                    // need to SATURATE here.
                    if (getSaturationValue(color) > 90) {
                        let desaturationTargets = [75, 60, 50, 45, 30, 8, 3]
                    }
                    
                    
                    desaturateTints(desaturationTargets, lightenTargets)
                } 
                else {
                    // DOES NOT PASS WCAG
                    if (getSaturationValue(color) > 95) {
                        let desaturationTargets = [75, 75, 75, 80, 80, 20, 50]
                        desaturateTints(desaturationTargets, lightenTargets)
                    } else if (getSaturationValue(color) > 90) {
                        let desaturationTargets = [80, 80, 80, 80, 55, 40, 20]
                        desaturateTints(desaturationTargets, lightenTargets)
                    } else if (getSaturationValue(color) > 80) {
                        let desaturationTargets = [75, 75, 75, 60, 50, 20, 15]
                        desaturateTints(desaturationTargets, lightenTargets)
                    }

                }
                break;

            case "FOLIAGE-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    desaturationTargets = [75, 60, 53, 50, 50, 10, 3]
                    //  desaturationTargets = [75, 60, 50, 45, 30, 8, 3]

                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

           
                case "VERDUN-GREEN":
                    createShadesAndTints(color, darkenTargets, lightenTargets)
                    if (isPassWCAGTextNormal(color)) {
                        desaturationTargets = [75, 70, 65, 55, 55, 15, 5]
                        // desaturationTargets = [80, 70, 62, 42, 30, 8, 3]
    
                        desaturateTints(desaturationTargets, lightenTargets)
                    }
                    break;     

                case "CADMIUM-GREEN":
                    createShadesAndTints(color, darkenTargets, lightenTargets)
                    if (isPassWCAGTextNormal(color)) {
                        desaturationTargets = [75, 70, 65, 55, 55, 15, 5]
                        // desaturationTargets = [80, 70, 62, 42, 30, 8, 3]
    
                        desaturateTints(desaturationTargets, lightenTargets)
                    }
                    break;
                        
                               

            case "YELLOW-GREEN":
            case "BLUISH-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color)) {
                    desaturationTargets = [80, 70, 62, 42, 15, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CYANISH-GREEN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (isPassWCAGTextLarge(color)) {
                    desaturationTargets = ((isPassWCAGTextNormal(color) ? [80, 70, 62, 42, 15, 8, 3] : [90, 90, 90, 70, 45, 18, 10]))
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "ORANGISH-RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if (colorSpecs.s > 90) {
                    desaturationTargets = [95, 88, 85, 50, 30, 20, 15]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                desaturationTargets = ((isPassWCAGTextNormal(color) ? [100, 100, 65, 58, 30, 20, 15] : [98, 85, 70, 58, 30, 20, 15]))
                desaturationTargets = [90, 75, 72, 58, 30, 20, 15]
                desaturateTints(desaturationTargets, lightenTargets)
                break;

            case "MODERATE-RED":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                desaturationTargets = [88, 88, 70, 62, 40, 8, 3]
                desaturateTints(desaturationTargets, lightenTargets)
                break;

            case "MAGENTA":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets =  [88, 88, 70, 62, 40, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "BLUE-SKY":
                createShadesAndTints(color, darkenTargets, lightenTargets) 
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets = [90, 85, 80, 40, 30, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CYAN":
                createShadesAndTints(color, darkenTargets, lightenTargets)
                if ((colorSpecs.s > 90) && (colorSpecs.L < 60)) {
                    desaturationTargets = [88, 80, 70, 62, 38, 10, 3 ]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;
            case "WHITE":
            case "NEUTRAL-80":
            case "NEUTRAL-65":
            case "NEUTRAL-50":
            case "NEUTRAL-35":
            case "BLACK":

                if (colorSpecs.L <= 50) {
                    darkenTargets = [9, 15, 21, 29, 37]
                    lightenTargets = [(colorSpecs.L + 3), 56, 61, 80, 86, 95, 98]
                }
                createShadesAndTints(color, darkenTargets, lightenTargets)

                break;
            default:
            desaturationTargets = [90, 90, 90, 60, 35, 15, 10]
            createShadesAndTints(color, darkenTargets, lightenTargets)
            desaturateTints(desaturationTargets, lightenTargets)
            break;

        }
        return swatchResults()

        ///////////////////////////////////////////////////////////
        /////////////////////////// FUNCTIONS ///////////////////// 
        ///////////////////////////////////////////////////////////

        function createShadeTargets(base, shadeTargetMultiplier) {
            let L_400 = getLightnessValue(base)
            let L_900 = L_400 * shadeTargetMultiplier
    
            let stepValue = (L_400 - L_900) / 5
    
            let L_800 = L_900 + (stepValue * 1)
            let L_700 = L_900 + (stepValue * 2)
            let L_600 = L_900 + (stepValue * 3)
            let L_500 = L_900 + (stepValue * 4)
    
            return {
                L_900: L_900,
                L_800: L_800,
                L_700: L_700,
                L_600: L_600,
                L_500: L_500
            }
        }

        // function setToSaturationTarget(color, targetValue) {
        //     let value = color.clone()

        //     let baseSaturation = getSaturationValue(value)

        // }

        function desaturateToTarget(color, targetValue) {
            let value = color.clone()

            getSaturationValue(value)

            while (getSaturationValue(value) > targetValue) {
                value = desaturate(value)
            }

            return value
        }

        function desaturate(color) {
            color.desaturate(1)
            return color
        }

        function getSaturationValue(color) {
            let result = color.toHsv()
            let saturationValue = result.s
            return saturationValue * 100
        }

        function createShadesAndTints(color, shades, tints) {

            swatch900 = darkenToTarget(color.clone(), shades[0])
            swatch800 = darkenToTarget(color.clone(), shades[1])
            swatch700 = darkenToTarget(color.clone(), shades[2])
            swatch600 = darkenToTarget(color.clone(), shades[3])
            swatch500 = darkenToTarget(color.clone(), shades[4])
            swatch400 = color
            swatch300 = lightenToTarget(color.clone(), tints[0])
            swatch200 = lightenToTarget(color.clone(), tints[1])
            swatch100 = lightenToTarget(color.clone(), tints[2])
            swatch075 = lightenToTarget(color.clone(), tints[3])
            swatch050 = lightenToTarget(color.clone(), tints[4])
            swatch025 = lightenToTarget(color.clone(), tints[5])
            swatch015 = lightenToTarget(color.clone(), tints[6])
        }

        function darkenToTarget(color, targetValue) {
            let result = color.clone()
            while (getLightnessValue(result) > targetValue) {
                result = darken(result)
            }
            return result
        }

        function lightenToTarget(color, targetValue) {
            let result = color.clone()
            while (getLightnessValue(result) < targetValue) {
                result = lighten(result)
            }
            return result
        }

        function getLightnessValue(hexString) {
            return convert.hex.lab(hexString)[0]
        }

        function darken(color) {
            return tinycolor(color.clone()).darken(1)
        }

        function lighten(color) {
            return tinycolor(color.clone()).lighten(1)
        }

        function isPassWCAGTextNormal(color) {
            let value = getLightnessValue(color)
            if (value > 51) { return false }
            return true
        }

        function isPassWCAGTextLarge(color) {
            let value = getLightnessValue(color)
            if (value > 60) { return false }
            return true
        }

        function desaturateTints(desaturationTargets, lightenTargets) {
            swatch300 = desaturateToTarget(swatch300.clone(), desaturationTargets[0])
            swatch300 = lightenToTarget(swatch300.clone(), lightenTargets[0])
            swatch200 = desaturateToTarget(swatch200.clone(), desaturationTargets[1])
            swatch200 = lightenToTarget(swatch200.clone(), lightenTargets[1])
            swatch100 = desaturateToTarget(swatch100.clone(), desaturationTargets[2])
            swatch100 = lightenToTarget(swatch100.clone(), lightenTargets[2])
            swatch075 = desaturateToTarget(swatch075.clone(), desaturationTargets[3])
            swatch075 = lightenToTarget(swatch075.clone(), lightenTargets[3])
            swatch050 = desaturateToTarget(swatch050.clone(), desaturationTargets[4])
            swatch050 = lightenToTarget(swatch050.clone(), lightenTargets[4])
            swatch025 = desaturateToTarget(swatch025.clone(), desaturationTargets[5])
            swatch025 = lightenToTarget(swatch025.clone(), lightenTargets[5])
            swatch015 = desaturateToTarget(swatch015.clone(), desaturationTargets[6])
            swatch015 = lightenToTarget(swatch015.clone(), lightenTargets[6])
        }

        function swatchResults() {

            return {
                swatch000: swatch000,
                swatch015: swatch015.toHexString(),
                swatch025: swatch025.toHexString(),
                swatch050: swatch050.toHexString(),
                swatch075: swatch075.toHexString(),
                swatch075: swatch075.toHexString(),
                swatch100: swatch100.toHexString(),
                swatch200: swatch200.toHexString(),
                swatch300: swatch300.toHexString(),
                swatch400: swatch400.toHexString(),
                swatch500: swatch500.toHexString(),
                swatch600: swatch600.toHexString(),
                swatch700: swatch700.toHexString(),
                swatch800: swatch800.toHexString(),
                swatch900: swatch900.toHexString(),
                swatch950: swatch950,
            }
        }

    }

    getLightnessValue(hexString) {
        return convert.hex.lab(hexString)[0]
    }

    getDensityValue(hexString) {
        let value = convert.hex.lab(hexString)[0]
        return 100-value
    }

    darken(color) {
        return tinycolor(color.clone()).darken(1)
    }

    lighten(color) {
        return tinycolor(color.clone()).lighten(1)
    }

    ///
    /// If base color l-value = 65 or greater, old way.
    /// Else, do new way.
    ///

    createTintTargets(base) {
        let L_400 = this.getLightnessValue(base)

        const midtoneValues = [30, 35, 42, 45, 48, 50, 52, 54, 61]
        const midtoneNames = ["DEEP", "DARK-DEEP", "DARK", "MEDIUM-DARK", "MEDIUM", "MEDIUM-LIGHT", "LIGHT", "BRIGHT", "INVALID"]
        var closest = midtoneValues.reduce(function (prev, curr) {
            return (Math.abs(curr - L_400) < Math.abs(prev - L_400) ? curr : prev);
        });

        let midtone = midtoneNames[midtoneValues.indexOf(closest)]
        let result = undefined

        switch (midtone) {
            case "DEEP":
                return { L_300: 48, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "DARK-DEEP":
                return { L_300: 48, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "DARK":
                return { L_300: 50, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM-DARK":
                return { L_300: 50, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM":
                return { L_300: 49, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM-LIGHT":
                result = { L_300: 53, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "LIGHT":
                result = { L_300: 54, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }
                break;
            case "BRIGHT":
                result = this.createTintTargetsSansWCAG(base)
                break;
            case "INVALID":
                result = { L_300: 50, L_200: 50, L_100: 50, L_075: 50, L_050: 50, L_025: 50, L_015: 50 }
                break;
        }

        return result

    }

    createTintTargetsWCAGtesting(base) {

        let result = { L_300: 50, L_200: 55, L_100: 61, L_075: 80, L_050: 86, L_025: 95, L_015: 98 }

        return result
    }

    createTintTargetsWCAGtestingbetween(base) {

        let result = {
            L_300: 50,
            L_200: 55,
            L_100: 61,
            L_075: 80,
            L_050: 90,
            L_025: 95,
            L_015: 98,
        }

        return result
    }

    createTintTargetsWCAG(base) {
        let L_400 = this.getLightnessValue(base)


        let stepValue = (this.paperWhite - L_400) / 6

        let foobar = (68 - L_400) / 3

        let L_300 = L_400 + (foobar * 1)
        let L_200 = L_400 + (foobar * 2)
        let L_100 = L_400 + (foobar * 3)
        let L_075 = L_400 + (stepValue * 4)
        let L_050 = L_400 + (stepValue * 5)

        // Want a tint between 050 and 015
        let L_025 = ((L_050 - this.paperWhite) / 2) + this.paperWhite
        // if *L value not equal to paperWhite, make slightly lighter
        if ((L_025) + 2 >= this.paperWhite) {
            L_025 = L_025;
        } else {
            L_025 = L_025 + 1;
        }

        let result = {
            L_300: L_300,
            L_200: L_200,
            L_100: L_100,
            L_075: L_075,
            L_050: L_050,
            L_025: L_025,
            L_015: this.paperWhite,
        }

        return result
    }

    createTintTargetsYOOY(base) {
        let L_400 = this.getLightnessValue(base)

        let stepValue = (this.paperWhite - L_400) / 6

        let L_300 = L_400 + (stepValue * 1)
        let L_200 = L_400 + (stepValue * 2)
        let L_100 = L_400 + (stepValue * 3)
        let L_075 = L_400 + (stepValue * 4)
        let L_050 = L_400 + (stepValue * 5)

        // Want a tint between 050 and 015
        let L_025 = ((L_050 - this.paperWhite) / 2) + this.paperWhite
        // if *L value not equal to paperWhite, make slightly lighter
        if ((L_025) + 2 >= this.paperWhite) {
            L_025 = L_025;
        } else {
            L_025 = L_025 + 1;

        }

        let result = {
            L_300: L_300,
            L_200: L_200,
            L_100: L_100,
            L_075: L_075,
            L_050: L_050,
            L_025: L_025,
            L_015: 98,
        }

        return result
    }


    createTintTargetsBase(base) {
        let L_400 = this.getLightnessValue(base)

        let stepValue = (this.paperWhite - L_400) / 6

        let L_300 = L_400 + 2
        let L_200 = L_400 + (stepValue * 2)
        let L_100 = L_400 + (stepValue * 3)
        let L_075 = L_400 + (stepValue * 4)
        let L_050 = L_400 + (stepValue * 5)

        L_200 = ((L_100 - L_300) / 2) + L_300

        // ((79-63) / 2) + 63

        // Want a tint between 050 and 015
        let L_025 = ((L_050 - this.paperWhite) / 2) + this.paperWhite
        // if *L value not equal to paperWhite, make slightly lighter
        if ((L_025) + 2 >= this.paperWhite) {
            L_025 = L_025;
        } else {
            L_025 = L_025 + 1;

        }

        let result = {
            L_300: L_300,
            L_200: L_200,
            L_100: L_100,
            L_075: L_075,
            L_050: L_050,
            L_025: L_025,
            L_015: 98,
        }

        return result
    }

    createTintTargetsSansWCAG(base) {
        let L_400 = this.getLightnessValue(base)

        let stepValue = (this.paperWhite - L_400) / 6

        let L_300 = L_400 + (stepValue * 1)
        let L_200 = L_400 + (stepValue * 2)
        let L_100 = L_400 + (stepValue * 3)
        let L_075 = L_400 + (stepValue * 4)
        let L_050 = L_400 + (stepValue * 5)

        // Want a tint between 050 and 015
        let L_025 = ((L_050 - this.paperWhite) / 2) + this.paperWhite
        // if *L value not equal to paperWhite, make slightly lighter
        if ((L_025) + 2 >= this.paperWhite) {
            L_025 = L_025;
        } else {
            L_025 = L_025 + 1;

        }

        let result = {
            L_300: L_300,
            L_200: L_200,
            L_100: L_100,
            L_075: 82,
            L_050: 86,
            L_025: 95,
            L_015: 98,
        }

        return result
    }

    isDark(hexString) {
        // return tinycolor(hexString).isDark()
        let L = this.spectro.getLightnessValue(hexString)
        return L < 64 ? true : false

    }


}

export default Palettizer;
