import tinycolor from 'tinycolor2'
import convert from 'color-convert'
import Spectro from "./spectro"

class Palettizer {

    constructor(paperWhite, shadeTargetMultiplier) {
        this.paperWhite = paperWhite
        this.shadeTargetMultiplier = shadeTargetMultiplier
        this.spectro = new Spectro()
    }

    createSwatchRow(hexString) {

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
        let swatch085 = "#000000"
        let swatch075 = "#000000"
        let swatch050 = "#000000"
        let swatch035 = "#000000"
        let swatch025 = "#000000"
        let swatch015 = "#000000"
        let swatch000 = "#FFFFFF"

        let color = this.spectro.getColorType(tinycolor(hexString))
        let shadeTargets = createShadeTargets(color.color, this.shadeTargetMultiplier)
        let tintTargets = this.createTintTargets(color.color)

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
            90,
            tintTargets.L_025,
            tintTargets.L_015]

        let desaturationTargets = [75, 60, 50, 45, 18, 8, 3]

        switch (color.name) {

            case "YELLOW":
            case "ORANGE-YELLOW":
            case "ORANGE":
            case "ORANGISH-RED":
            case "PINK":
            case "RED":
            case "MODERATE-RED":
            case "CYAN":
            case "BLUE-SKY":
            case "FOLIAGE-GREEN":
            case "VERDUN-GREEN":
            case "YELLOW-GREEN":
            case "BLUISH-GREEN":
            case "CYANISH-GREEN":
                generateShadesAndTints(color)
                break;
            case "CADMIUM-GREEN":
                generateShadesAndTints(color)
                desaturateTints([100,100,100,100,95,90,75,25,15])
                break;
            case "GREEN":
                generateShadesAndTints(color)
                desaturateTints([100,100,90,80,85,85,55,25,15])

                // if (isPassWCAGTextNormal(color.color)) {
                //     let desaturationTargets = [75, 60, 55, 30, 18, 12, 8, 5]
                //     // if (getSaturationValue(color) > 85) {
                //     //     desaturationTargets = [75, 60, 55, 30, 15, 8, 5, 5]
                //     // }
                //     desaturateTints(desaturationTargets, lightenTargets)
                // }
                // else {
                //     // DOES NOT PASS WCAG
                //     if (getSaturationValue(color.color) > 95) {
                //         let desaturationTargets = [75, 75, 75, 80, 80, 20, 50]
                //         desaturateTints(desaturationTargets, lightenTargets)
                //     } else if (getSaturationValue(color.color) > 90) {
                //         let desaturationTargets = [80, 80, 80, 80, 55, 40, 20]
                //         desaturateTints(desaturationTargets, lightenTargets)
                //     } else if (getSaturationValue(color.color) > 80) {
                //         let desaturationTargets = [75, 75, 75, 60, 50, 20, 15]
                //         desaturateTints(desaturationTargets, lightenTargets)
                //     }

                // }
                break;

            case "FOLIAGE-GREEN":
                createShadesAndTints(color.color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color.color)) {
                    desaturationTargets = [75, 60, 55, 50, 50, 50, 40, 5]
                    //  desaturationTargets = [75, 60, 50, 45, 30, 8, 3]

                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "VERDUN-GREEN":
                createShadesAndTints(color.color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color.color)) {
                    desaturationTargets = [75, 60, 50, 50, 100, 100, 100, 100]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CADMIUM-GREEN":
                createShadesAndTints(color.color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color.color)) {
                    desaturationTargets = [75, 60, 50, 50, 100, 100, 100, 100]
                    // desaturationTargets = [80, 70, 62, 42, 30, 8, 3]

                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;
            case "YELLOW-GREEN":
            case "BLUISH-GREEN":
                createShadesAndTints(color.color, darkenTargets, lightenTargets)
                if (isPassWCAGTextNormal(color.color)) {
                    desaturationTargets = [80, 70, 62, 42, 15, 8, 3]
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;

            case "CYANISH-GREEN":
                createShadesAndTints(color.color, darkenTargets, lightenTargets)
                if (isPassWCAGTextLarge(color.color)) {
                    desaturationTargets = ((isPassWCAGTextNormal(color.tinycolor) ? [80, 70, 62, 42, 15, 8, 3] : [90, 90, 90, 70, 45, 18, 10]))
                    desaturateTints(desaturationTargets, lightenTargets)
                }
                break;




            case "WHITE":
            case "NEUTRAL-80":
            case "NEUTRAL-65":
            case "NEUTRAL-50":
            case "NEUTRAL-35":
            case "BLACK":
                generateShadesAndTints(color)
                break;
            default:
                generateShadesAndTints(color)
                desaturationTargets = [90, 90, 90, 60, 35, 15, 10]
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
            let value = color

            while (getSaturationValue(value) > targetValue) {
                value = desaturate(value)
            }

            return value
        }

        function saturateToTarget(color, targetValue) {
            let value = color
            while (getSaturationValue(value) < targetValue) {
                value = color.saturate(1)
            }
            return value
        }

        function desaturate(color) {
            color.desaturate(1)
            return color
        }

        function getChromaValue(color) {

        }

        function getSaturationValue(color) {



            let result = color.toHsv()
            let saturationValue = result.s
            return saturationValue * 100
        }

        function generateShadesAndTints(color) {

            let fTargets = []

            // IDEAL LIGHTNESS VALUE FOR BASE COLOR
            if ((color.lightness >= 42) && (color.lightness <= 52)) {
                // GIVE NEUTRALS SLIGHLY DARKER 3/4 TONES
                if (color.name.startsWith("NEUTRAL")) {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 50, 45, 40, 35, 25, 15, 8]
                } else {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 50, 45, 40, 35, 28, 22, 12]
                }
            }
            // LIGHTER THAN IDEAL VALUE FOR BASE COLOR
            else if (color.lightness >= 42) {
                let tintStepValue = (95 - color.lightness) / 8
                let shadeStepValue = (1 - color.lightness) / 8
                fTargets = [
                    98,
                    96,
                    color.lightness + (tintStepValue * 7),
                    color.lightness + (tintStepValue * 6),
                    color.lightness + (tintStepValue * 5),
                    color.lightness + (tintStepValue * 4),
                    color.lightness + (tintStepValue * 3),
                    color.lightness + (tintStepValue * 2),
                    color.lightness + (tintStepValue * 1),
                    45,
                    color.lightness + (shadeStepValue * 1),
                    color.lightness + (shadeStepValue * 2),
                    color.lightness + (shadeStepValue * 3.25),
                    color.lightness + (shadeStepValue * 4.25),
                    color.lightness + (shadeStepValue * 5.5)
                ]

            }
            // DARKER THAN IDEAL VALUE FOR BASE COLOR
            else if (color.lightness <= 52) {

                let shadeStepValue = (15 - color.lightness) / 5

                fTargets = [
                    98,
                    95,
                    90,
                    85,
                    80,
                    70,
                    60,
                    55,
                    50,
                    45,
                    color.lightness + (shadeStepValue * 1),
                    color.lightness + (shadeStepValue * 2),
                    color.lightness + (shadeStepValue * 3),
                    color.lightness + (shadeStepValue * 4),
                    color.lightness + (shadeStepValue * 5)]
            }

            swatch900 = darkenToTarget(color.color.clone(), fTargets[14])
            swatch800 = darkenToTarget(color.color.clone(), fTargets[13])
            swatch700 = darkenToTarget(color.color.clone(), fTargets[12])
            swatch600 = darkenToTarget(color.color.clone(), fTargets[11])
            swatch500 = darkenToTarget(color.color.clone(), fTargets[10])
            swatch400 = color.color
            swatch300 = lightenToTarget(color.color.clone(), fTargets[8])
            swatch200 = lightenToTarget(color.color.clone(), fTargets[7])
            swatch100 = lightenToTarget(color.color.clone(), fTargets[6])
            swatch085 = lightenToTarget(color.color.clone(), fTargets[5])
            swatch075 = lightenToTarget(color.color.clone(), fTargets[4])
            swatch050 = lightenToTarget(color.color.clone(), fTargets[3])
            swatch035 = lightenToTarget(color.color.clone(), fTargets[2])
            swatch025 = lightenToTarget(color.color.clone(), fTargets[1])
            swatch015 = lightenToTarget(color.color.clone(), fTargets[0])
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
            swatch085 = lightenToTarget(color.clone(), 70)
            swatch075 = lightenToTarget(color.clone(), tints[3])
            swatch050 = lightenToTarget(color.clone(), tints[4])
            swatch035 = lightenToTarget(color.clone(), tints[5])
            swatch025 = lightenToTarget(color.clone(), tints[6])
            swatch015 = lightenToTarget(color.clone(), tints[7])
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

        function desaturateTints(desaturationTargets) {

            let lightnessTarget300 = getLightnessValue(swatch300.toHexString())
            let lightnessTarget200 = getLightnessValue(swatch200.toHexString())
            let lightnessTarget100 = getLightnessValue(swatch100.toHexString())
            let lightnessTarget085 = getLightnessValue(swatch085.toHexString())
            let lightnessTarget075 = getLightnessValue(swatch075.toHexString())
            let lightnessTarget050 = getLightnessValue(swatch050.toHexString())
            let lightnessTarget035 = getLightnessValue(swatch035.toHexString())
            let lightnessTarget025 = getLightnessValue(swatch025.toHexString())
            let lightnessTarget015 = getLightnessValue(swatch015.toHexString())

            // swatch300 = desaturateToTarget(swatch300.clone(), desaturationTargets[0] + 10)
            // swatch200 = desaturateToTarget(swatch200.clone(), desaturationTargets[1] + 10)
            // swatch100 = desaturateToTarget(swatch100.clone(), desaturationTargets[2] + 10)
            // swatch085 = desaturateToTarget(swatch085.clone(), desaturationTargets[3] + 10)
            // swatch075 = desaturateToTarget(swatch075.clone(), desaturationTargets[4] + 10)
            // swatch050 = desaturateToTarget(swatch050.clone(), desaturationTargets[5] + 10)
            // swatch035 = desaturateToTarget(swatch035.clone(), desaturationTargets[6] + 10)
            // swatch025 = desaturateToTarget(swatch025.clone(), desaturationTargets[7] + 10)
            // swatch015 = desaturateToTarget(swatch015.clone(), desaturationTargets[8] + 10)

            // swatch300 = lightenToTarget(swatch300.clone(), lightnessTarget300)
            // swatch200 = lightenToTarget(swatch200.clone(), lightnessTarget200 +)
            // swatch100 = lightenToTarget(swatch100.clone(), lightnessTarget100 + 3)
            // swatch085 = lightenToTarget(swatch085.clone(), lightnessTarget085 + 3)
            // swatch075 = lightenToTarget(swatch075.clone(), lightnessTarget075 + 3)
            // swatch050 = lightenToTarget(swatch050.clone(), lightnessTarget050 + 2)        
            // swatch035 = lightenToTarget(swatch035.clone(), lightnessTarget035 + 2)
            // swatch025 = lightenToTarget(swatch025.clone(), lightnessTarget025 + 1)
            // swatch015 = lightenToTarget(swatch015.clone(), lightnessTarget015 + 0)

            swatch300 = desaturateToTarget(swatch300.clone(), desaturationTargets[0])
            swatch200 = desaturateToTarget(swatch200.clone(), desaturationTargets[1])
            swatch100 = desaturateToTarget(swatch100.clone(), desaturationTargets[2])
            swatch085 = desaturateToTarget(swatch085.clone(), desaturationTargets[3])
            swatch075 = desaturateToTarget(swatch075.clone(), desaturationTargets[4])
            swatch050 = desaturateToTarget(swatch050.clone(), desaturationTargets[5])
            swatch035 = desaturateToTarget(swatch035.clone(), desaturationTargets[6])
            swatch025 = desaturateToTarget(swatch025.clone(), desaturationTargets[7])
            swatch015 = desaturateToTarget(swatch015.clone(), desaturationTargets[8])

            swatch300 = lightenToTarget(swatch300.clone(), lightnessTarget300)
            swatch200 = lightenToTarget(swatch200.clone(), lightnessTarget200)
            swatch100 = lightenToTarget(swatch100.clone(), lightnessTarget100)
            swatch085 = lightenToTarget(swatch085.clone(), lightnessTarget085)
            swatch075 = lightenToTarget(swatch075.clone(), lightnessTarget075)
            swatch050 = lightenToTarget(swatch050.clone(), lightnessTarget050)        
            swatch035 = lightenToTarget(swatch035.clone(), lightnessTarget035)
            swatch025 = lightenToTarget(swatch025.clone(), lightnessTarget025)
            swatch015 = lightenToTarget(swatch015.clone(), lightnessTarget015)

        }

        function swatchResults() {

            return {
                swatch000: swatch000,
                swatch015: swatch015.toHexString(),
                swatch025: swatch025.toHexString(),
                swatch035: swatch035.toHexString(),
                swatch050: swatch050.toHexString(),
                swatch075: swatch075.toHexString(),
                swatch085: swatch085.toHexString(),
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
        return 100 - value
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
                return { L_300: 48, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "DARK-DEEP":
                return { L_300: 48, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "DARK":
                return { L_300: 50, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM-DARK":
                return { L_300: 50, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM":
                return { L_300: 49, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "MEDIUM-LIGHT":
                result = { L_300: 53, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "LIGHT":
                result = { L_300: 54, L_200: 57, L_100: 60, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }
                break;
            case "BRIGHT":
                result = this.createTintTargetsSansWCAG(base)
                break;
            case "INVALID":
                result = { L_300: 50, L_200: 50, L_100: 50, L_075: 50, L_050: 50, L_035: 50, L_025: 50, L_015: 50 }
                break;
        }

        return result

    }

    createTintTargetsWCAGtesting(base) {

        let result = { L_300: 50, L_200: 55, L_100: 61, L_075: 80, L_050: 86, L_035: 90, L_025: 95, L_015: 98 }

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

        let stepValue = (this.paperWhite - L_400) / 7

        let L_300 = L_400 + (stepValue * 1)
        let L_200 = L_400 + (stepValue * 2)
        let L_100 = L_400 + (stepValue * 3)
        let L_075 = L_400 + (stepValue * 4)
        let L_085 = L_400 + (stepValue * 4.5)
        let L_050 = L_400 + (stepValue * 5)
        let L_035 = L_400 + (stepValue * 6)

        // Want a tint between 035 and 015
        let L_025 = ((L_035 - this.paperWhite) / 2) + this.paperWhite
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
            L_085: L_085,
            L_075: L_075,
            L_050: L_050,
            L_035: L_035,
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
