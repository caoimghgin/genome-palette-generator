import tinycolor from 'tinycolor2'
import convert from 'color-convert'
import Spectro from "./spectro"
import chroma from "chroma-js"
import { l_targets } from '../../constants'

class Palettizer {

    constructor(paperWhite, shadeTargetMultiplier) {
        this.paperWhite = paperWhite
        this.shadeTargetMultiplier = shadeTargetMultiplier
        this.spectro = new Spectro()
    }

    createSwatchRow(hexString) {



        let swatch000 = "#FFFFFF"
        let swatch015 = "#CCCCCC"
        let swatch025 = "#CCCCCC"
        let swatch035 = "#CCCCCC"
        let swatch050 = "#CCCCCC"
        let swatch075 = "#CCCCCC"
        let swatch080 = "#CCCCCC"
        let swatch085 = "#CCCCCC"
        let swatch090 = "#CCCCCC"
        let swatch100 = "#CCCCCC"
        let swatch200 = "#CCCCCC"
        let swatch300 = "#CCCCCC"
        let swatch400 = "#CCCCCC"
        let swatch500 = "#CCCCCC"
        let swatch600 = "#CCCCCC"
        let swatch700 = "#CCCCCC"
        let swatch750 = "#CCCCCC"
        let swatch800 = "#CCCCCC"
        let swatch900 = "#CCCCCC"
        let swatch950 = "#CCCCCC"
        let swatch975 = "#CCCCCC"
        let swatch1000 = "#000000"


        let color = this.spectro.getColorType(tinycolor(hexString))

        switch (color.name) {

            case "GREEN":
            case "CYANISH-GREEN":
            case "CADMIUM-GREEN":
            case "DEEP-BRONZE":
            case "LIGHT-TAN":
            case "CYANISH-GREEN":
            case "FOLIAGE-GREEN":
            case "PURPLISH-BLUE":
            case "BLUE-SKY":
            case "RED":
            case "VERDUN-GREEN-DARK":
            case "LIME-GREEN":
            case "YELLOW-GREEN":
            case "VERDUN-GREEN":
            case "OLIVE-GREEN":
            case "MALACHITE-GREEN":
            case "MALACHITE-GREEN-LIGHT":
            case "DARK-TAN":
                generateShadesAndTints4(color)
                break;
            default:
                generateShadesAndTints4(color)
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


        function desaturateToTarget2(color, targetValue) {
            let value = color
            while (getSaturationValue2(value) > targetValue) {
                value = desaturate(value)
            }
            return value
        }

        function getSaturationValue2(color) {
            let hexValue = color.toHexString()
            let z = chroma(hexValue).get('lch.c');
            return z
        }

        function desaturate2(color) {

            let hexValue = color.toHexString()
            let z = chroma(hexValue).desaturate(1)
            let result = tinycolor(z)
            return result
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
            let hexValue = color.toHexString()
            let z = chroma(hexValue).get('lch.c');
            console.log(z)
            ///
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
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 25, 15, 8]
                } else {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 28, 22, 12]
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

            else if ((color.lightness >= 35) && (color.lightness <= 52)) {

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
                    49,
                    45,
                    color.lightness + (shadeStepValue * 1),
                    color.lightness + (shadeStepValue * 2),
                    color.lightness + (shadeStepValue * 3),
                    color.lightness + (shadeStepValue * 4),
                    color.lightness + (shadeStepValue * 5)]

            }

            else if (color.lightness <= 35) {

                let shadeStepValue = (5 - color.lightness) / 5

                fTargets = [
                    98,
                    95,
                    90,
                    85,
                    80,
                    70,
                    60,
                    55,
                    49,
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

        function generateShadesAndTints2(color) {

            let fTargets = []

            // IDEAL LIGHTNESS VALUE FOR BASE COLOR
            if ((color.lightness >= 42) && (color.lightness <= 52)) {
                // GIVE NEUTRALS SLIGHLY DARKER 3/4 TONES
                if (color.name.startsWith("NEUTRAL")) {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 25, 15, 8]
                } else {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 28, 22, 12]
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

            else if ((color.lightness >= 35) && (color.lightness <= 52)) {

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
                    49,
                    45,
                    color.lightness + (shadeStepValue * 1),
                    color.lightness + (shadeStepValue * 2),
                    color.lightness + (shadeStepValue * 3),
                    color.lightness + (shadeStepValue * 4),
                    color.lightness + (shadeStepValue * 5)]

            }

            else if (color.lightness <= 35) {

                let shadeStepValue = (5 - color.lightness) / 5

                fTargets = [
                    98,
                    95,
                    90,
                    85,
                    80,
                    70,
                    60,
                    55,
                    49,
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

            swatch300 = lightenToTarget2(color.color.clone(), fTargets[8])
            swatch200 = lightenToTarget2(color.color.clone(), fTargets[7])
            swatch100 = lightenToTarget2(color.color.clone(), fTargets[6])
            swatch085 = lightenToTarget2(color.color.clone(), fTargets[5])
            swatch075 = lightenToTarget2(color.color.clone(), fTargets[4])
            swatch050 = lightenToTarget2(color.color.clone(), fTargets[3])
            swatch035 = lightenToTarget2(color.color.clone(), fTargets[2])

            swatch025 = lightenToTarget2(color.color.clone(), fTargets[1])
            swatch015 = lightenToTarget2(color.color.clone(), 98)
        }

        function generateShadesAndTints3(color) {




            const weights = ["000", "015", "025", "035", "050", "075", "085", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
            const l_star = [100, 97.5, 95, 90, 85, 80, 70, 60, 55, 50, 45, 40, 35, 30, 20, 15, 0]
            var closest = l_star.reduce(function (prev, curr) {
                return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
            });
            let index = l_star.indexOf(closest)
            let thingIwant = weights[index]
            console.log("chosen color is " + color.hex + " weight:" + thingIwant)





            let fTargets = []

            // IDEAL LIGHTNESS VALUE FOR BASE COLOR
            if ((color.lightness >= 42) && (color.lightness <= 52)) {
                // GIVE NEUTRALS SLIGHLY DARKER 3/4 TONES
                if (color.name.startsWith("NEUTRAL")) {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 25, 15, 8]
                } else {
                    fTargets = [98, 95, 90, 85, 80, 70, 60, 55, 49, 45, 40, 35, 28, 22, 12]
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

            else if ((color.lightness >= 35) && (color.lightness <= 52)) {

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
                    49,
                    45,
                    color.lightness + (shadeStepValue * 1),
                    color.lightness + (shadeStepValue * 2),
                    color.lightness + (shadeStepValue * 3),
                    color.lightness + (shadeStepValue * 4),
                    color.lightness + (shadeStepValue * 5)]

            }

            else if (color.lightness <= 35) {

                let shadeStepValue = (5 - color.lightness) / 5

                fTargets = [
                    98,
                    95,
                    90,
                    85,
                    80,
                    70,
                    60,
                    55,
                    49,
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

            let colorModel = 'lch'
            let c = color.color.clone().toHexString()
            let a = chroma.scale([c, '#FFFFFF']).mode(colorModel).colors(12)
            let b = chroma.scale([a[10], '#FFFFFF']).mode(colorModel).colors(3)


            let testing = [100, 98, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]

            swatch300 = tinycolor(a[1])
            swatch200 = tinycolor(a[2])
            swatch100 = tinycolor(a[3])
            swatch085 = tinycolor(a[5])
            swatch075 = tinycolor(a[7])
            swatch050 = tinycolor(a[8])
            swatch035 = tinycolor(a[9])
            swatch025 = tinycolor(a[10])
            swatch015 = tinycolor(b[1])

            // given 'color', I should be able to map it to correct
            // weight immediatly. If closest L* is 45, then it is 400
            // and all works as normal.
            //
            // Likewise, if the L* match is 60
        }

        function populateGrid(color) {
            const hex = ["FFFFFF", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"]
            console.log("Lenght is =" + l_targets.length)
            var closest = l_targets.reduce(function (prev, curr) {
                return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
            });
            let index = l_targets.indexOf(closest)
            hex[index] = color.hex
            //
            // Place chosen color in correct weight row
            //
            swatch000 = tinycolor(hex[0])
            swatch015 = tinycolor(hex[1])
            swatch025 = tinycolor(hex[2])
            swatch035 = tinycolor(hex[3])
            swatch050 = tinycolor(hex[4])
            swatch075 = tinycolor(hex[5])
            swatch080 = tinycolor(hex[6])
            swatch085 = tinycolor(hex[7])
            swatch090 = tinycolor(hex[8])
            swatch100 = tinycolor(hex[9])
            swatch200 = tinycolor(hex[10])
            swatch300 = tinycolor(hex[11])
            swatch400 = tinycolor(hex[12])
            swatch500 = tinycolor(hex[13])
            swatch600 = tinycolor(hex[14])
            swatch700 = tinycolor(hex[15])
            swatch750 = tinycolor(hex[16])
            swatch800 = tinycolor(hex[17])
            swatch900 = tinycolor(hex[19])
            swatch950 = tinycolor(hex[20])
            swatch975 = tinycolor(hex[21])

             return index
        }



        function generateShadesAndTints4(color) {

            let index = populateGrid(color)
            return

            // if (flag == true) {
            //     return
            // } else {
            //     flag = true
            // }
            

            // // const weights = ["000", "015", "025", "035", "050", "075", "085", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
            // const l_star = [100, 97.5, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0] // move to constants, name l_targets.
            // const hex = ["FFFFFF", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"]
            // var closest = l_star.reduce(function (prev, curr) {
            //     return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
            // });
            // let index = l_star.indexOf(closest)
            // hex[index] = color.hex
            let colorModel = 'lch'


            //
            // Place chosen color in correct weight row
            //
            // swatch015 = tinycolor(hex[1])
            // swatch025 = tinycolor(hex[2])
            // swatch035 = tinycolor(hex[3])
            // swatch050 = tinycolor(hex[4])
            // swatch075 = tinycolor(hex[5])
            // swatch080 = tinycolor(hex[6])
            // swatch085 = tinycolor(hex[7])
            // swatch090 = tinycolor(hex[8])
            // swatch100 = tinycolor(hex[9])
            // swatch200 = tinycolor(hex[10])
            // swatch300 = tinycolor(hex[11])
            // swatch400 = tinycolor(hex[12])
            // swatch500 = tinycolor(hex[13])
            // swatch600 = tinycolor(hex[14])
            // swatch700 = tinycolor(hex[15])
            // swatch750 = tinycolor(hex[16])
            // swatch800 = tinycolor(hex[17])
            // swatch900 = tinycolor(hex[19])
            // swatch950 = tinycolor(hex[20])
            // swatch975 = tinycolor(hex[21])

            // var c = color.color.clone().toHexString()
            // var a = chroma.scale([c, '#FFFFFF']).mode(colorModel).colors(12)
            // var b = chroma.scale([a[10], '#FFFFFF']).mode(colorModel).colors(3)


            if (index <= 12) {

                var c = color.color.clone().toHexString()
                var a = chroma.scale([c, '#FFFFFF']).mode(colorModel).colors(index)
                var b = chroma.scale([a[index - 2], '#FFFFFF']).mode(colorModel).colors(3)
                var j = chroma.scale([c, '#000000']).mode(colorModel).colors(index-2)

                // return
            }


            if (index == 12) {


                console.log(j)
                //
                // If 400 weight, generate tints
                //
                var j = chroma.scale([c, '#000000']).mode(colorModel).colors(10)

                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[10])
                swatch035 = tinycolor(a[9])
                swatch050 = tinycolor(a[8])
                swatch075 = tinycolor(a[7])
                swatch080 = tinycolor(a[6])
                swatch085 = tinycolor(a[5])
                swatch090 = tinycolor(a[4])
                swatch100 = tinycolor(a[3])
                swatch200 = tinycolor(a[2])
                swatch300 = tinycolor(a[1])

                swatch500 = tinycolor(j[1])
                swatch600 = tinycolor(j[2])
                swatch700 = tinycolor(j[3])
                swatch750 = tinycolor(j[4])
                swatch800 = tinycolor(j[5])
                swatch900 = tinycolor(j[6])
                swatch950 = tinycolor(j[7])
                swatch975 = tinycolor(j[8])       
                
                // 0: "#4d65cb"
                // 1: "#3a57bb"
                // 2: "#244aab"
                // 3: "#003d9b"
                // 4: "#00318c"
                // 5: "#00257d"
                // 6: "#001a6e"
                // 7: "#000f60"
                // 8: "#000000"                


            } else if (index == 11) {
                //
                // If 300 weight, generate tints
                //
                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[9])
                swatch035 = tinycolor(a[8])
                swatch050 = tinycolor(a[7])
                swatch075 = tinycolor(a[6])
                swatch080 = tinycolor(a[5])
                swatch085 = tinycolor(a[4])
                swatch090 = tinycolor(a[3])
                swatch100 = tinycolor(a[2])
                swatch200 = tinycolor(a[1])

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(11)


                swatch400 = tinycolor(j[1])
                swatch500 = tinycolor(j[2])
                swatch600 = tinycolor(j[3])
                swatch700 = tinycolor(j[4])
                swatch750 = tinycolor(j[5])
                swatch800 = tinycolor(j[6])
                swatch900 = tinycolor(j[7])
                swatch950 = tinycolor(j[8])
                swatch975 = tinycolor(j[9])                     

            } else if (index == 10) {
                //
                // If 200 weight, generate tints
                //
                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[8])
                swatch035 = tinycolor(a[7])
                swatch050 = tinycolor(a[6])
                swatch075 = tinycolor(a[5])
                swatch080 = tinycolor(a[4])
                swatch085 = tinycolor(a[3])
                swatch090 = tinycolor(a[2])
                swatch100 = tinycolor(a[1])

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(12)

                swatch300 = tinycolor(j[1])
                swatch400 = tinycolor(j[2])
                swatch500 = tinycolor(j[3])
                swatch600 = tinycolor(j[4])
                swatch700 = tinycolor(j[5])
                swatch750 = tinycolor(j[6])
                swatch800 = tinycolor(j[7])
                swatch900 = tinycolor(j[8])
                swatch950 = tinycolor(j[9])
                swatch975 = tinycolor(j[10])                  

            } else if (index == 9) {
                //
                // If 100 weight, generate tints
                //
                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[7])
                swatch035 = tinycolor(a[6])
                swatch050 = tinycolor(a[5])
                swatch075 = tinycolor(a[4])
                swatch080 = tinycolor(a[3])
                swatch085 = tinycolor(a[2])
                swatch090 = tinycolor(a[1])

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(13)

                swatch200 = tinycolor(j[1])
                swatch300 = tinycolor(j[2])
                swatch400 = tinycolor(j[3])
                swatch500 = tinycolor(j[4])
                swatch600 = tinycolor(j[5])
                swatch700 = tinycolor(j[6])
                swatch750 = tinycolor(j[7])
                swatch800 = tinycolor(j[8])
                swatch900 = tinycolor(j[9])
                swatch950 = tinycolor(j[10])
                swatch975 = tinycolor(j[11])                   

            } else if (index == 8) {

                //
                // If 90 weight, generate tints
                //

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(14)

                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[6])
                swatch035 = tinycolor(a[5])
                swatch050 = tinycolor(a[4])
                swatch075 = tinycolor(a[3])
                swatch080 = tinycolor(a[2])
                swatch085 = tinycolor(a[1])
                // swatch090
                swatch100 = tinycolor(j[1])
                swatch200 = tinycolor(j[2])
                swatch300 = tinycolor(j[3])
                swatch400 = tinycolor(j[4])
                swatch500 = tinycolor(j[5])
                swatch600 = tinycolor(j[6])
                swatch700 = tinycolor(j[7])
                swatch750 = tinycolor(j[8])
                swatch800 = tinycolor(j[9])
                swatch900 = tinycolor(j[10])
                swatch950 = tinycolor(j[11])
                swatch975 = tinycolor(j[12])                    

            } else if (index == 7) {

                                //
                // If 85 weight, generate tints
                //
                j = chroma.scale([c, '#000000']).mode(colorModel).colors(15)


                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[5])
                swatch035 = tinycolor(a[4])
                swatch050 = tinycolor(a[3])
                swatch075 = tinycolor(a[2])
                swatch080 = tinycolor(a[1])
                // swatch085
                swatch090 = tinycolor(j[1])
                swatch100 = tinycolor(j[2])
                swatch200 = tinycolor(j[3])
                swatch300 = tinycolor(j[4])
                swatch400 = tinycolor(j[5])
                swatch500 = tinycolor(j[6])
                swatch600 = tinycolor(j[7])
                swatch700 = tinycolor(j[8])
                swatch750 = tinycolor(j[9])
                swatch800 = tinycolor(j[10])
                swatch900 = tinycolor(j[11])
                swatch950 = tinycolor(j[12])
                swatch975 = tinycolor(j[13]) 

            } else if (index == 6) {

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(16)

                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[4])
                swatch035 = tinycolor(a[3])
                swatch050 = tinycolor(a[2])
                swatch075 = tinycolor(a[1])
                // swatch080
                swatch085 = tinycolor(j[1])
                swatch090 = tinycolor(j[2])
                swatch100 = tinycolor(j[3])
                swatch200 = tinycolor(j[4])
                swatch300 = tinycolor(j[5])
                swatch400 = tinycolor(j[6])
                swatch500 = tinycolor(j[7])
                swatch600 = tinycolor(j[8])
                swatch700 = tinycolor(j[9])
                swatch750 = tinycolor(j[10])
                swatch800 = tinycolor(j[11])
                swatch900 = tinycolor(j[12])
                swatch950 = tinycolor(j[13])
                swatch975 = tinycolor(j[14]) 

            } else if (index == 5) {

                j = chroma.scale([c, '#000000']).mode(colorModel).colors(17)


                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[3])
                swatch035 = tinycolor(a[2])
                swatch050 = tinycolor(a[1])
                                // swatch075
                                swatch080 = tinycolor(j[1])
                                swatch085 = tinycolor(j[2])
                                swatch090 = tinycolor(j[3])
                                swatch100 = tinycolor(j[4])
                                swatch200 = tinycolor(j[5])
                                swatch300 = tinycolor(j[6])
                                swatch400 = tinycolor(j[7])
                                swatch500 = tinycolor(j[8])
                                swatch600 = tinycolor(j[9])
                                swatch700 = tinycolor(j[10])
                                swatch750 = tinycolor(j[11])
                                swatch800 = tinycolor(j[12])
                                swatch900 = tinycolor(j[13])
                                swatch950 = tinycolor(j[14])
                                swatch975 = tinycolor(j[15]) 
            } else if (index == 4) {
                j = chroma.scale([c, '#000000']).mode(colorModel).colors(18)

                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[2])
                swatch035 = tinycolor(a[1])
                // swatch050
                swatch075 = tinycolor(j[1])
                swatch080 = tinycolor(j[2])
                swatch085 = tinycolor(j[3])
                swatch090 = tinycolor(j[4])
                swatch100 = tinycolor(j[5])
                swatch200 = tinycolor(j[6])
                swatch300 = tinycolor(j[7])
                swatch400 = tinycolor(j[8])
                swatch500 = tinycolor(j[9])
                swatch600 = tinycolor(j[10])
                swatch700 = tinycolor(j[11])
                swatch750 = tinycolor(j[12])
                swatch800 = tinycolor(j[13])
                swatch900 = tinycolor(j[14])
                swatch950 = tinycolor(j[15])
                swatch975 = tinycolor(j[16]) 
            } else if (index == 3) {
                j = chroma.scale([c, '#000000']).mode(colorModel).colors(19)

                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[1])
                //swatch035
                swatch050 = tinycolor(j[1])
                swatch075 = tinycolor(j[2])
                swatch080 = tinycolor(j[3])
                swatch085 = tinycolor(j[4])
                swatch090 = tinycolor(j[5])
                swatch100 = tinycolor(j[6])
                swatch200 = tinycolor(j[7])
                swatch300 = tinycolor(j[8])
                swatch400 = tinycolor(j[9])
                swatch500 = tinycolor(j[10])
                swatch600 = tinycolor(j[11])
                swatch700 = tinycolor(j[12])
                swatch750 = tinycolor(j[13])
                swatch800 = tinycolor(j[14])
                swatch900 = tinycolor(j[15])
                swatch950 = tinycolor(j[16])
                swatch975 = tinycolor(j[17])                 
            } else if (index == 2) {
                swatch015 = tinycolor(b[1])
                swatch025 = tinycolor(a[1])
            }



            // given 'color', I should be able to map it to correct
            // weight immediatly. If closest L* is 45, then it is 400
            // and all works as normal.
            //
            // Likewise, if the L* match is 60
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


        function lightenToTarget2(color, targetValue) {

            let z = lighten2Targ(color, targetValue)
            // return z

            let result = z.clone()
            while (getLightnessValue(result) < targetValue) {
                result = lighten(result)
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

        function lighten2Targ(color, target) {
            let result = chroma(color.toHexString()).set('lab.l', target);
            return tinycolor(result.hex())
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

        function overlayBaseToTint() {


            let x = chroma.scale([swatch015.clone().toHexString(), swatch100.clone().toHexString()]).colors(7);
            // console.log(x)
            swatch025 = tinycolor(x[1])
            swatch035 = tinycolor(x[2])
            swatch050 = tinycolor(x[3])
            swatch075 = tinycolor(x[4])
            swatch085 = tinycolor(x[5])

            return
            let base = swatch400.clone().toHexString()
            let x15 = swatch015.clone().toHexString()

            let x25 = swatch025.clone().toHexString()
            let x35 = swatch035.clone().toHexString()
            let x50 = swatch050.clone().toHexString()
            let x75 = swatch075.clone().toHexString()

            swatch015 = tinycolor(chroma.mix(base, x15, 0.95, 'lab').hex())
            swatch025 = tinycolor(chroma.mix(base, x25, 0.95, 'lab').hex())
            swatch035 = tinycolor(chroma.mix(base, x35, 0.95, 'lab').hex())
            swatch050 = tinycolor(chroma.mix(base, x50, 0.95, 'lab').hex())
            swatch075 = tinycolor(chroma.mix(base, x75, 0.95, 'lab').hex())

        }


        function desaturateTints2(desaturationTargets) {

            let lightnessTarget300 = getLightnessValue(swatch300.toHexString())
            let lightnessTarget200 = getLightnessValue(swatch200.toHexString())
            let lightnessTarget100 = getLightnessValue(swatch100.toHexString())
            let lightnessTarget085 = getLightnessValue(swatch085.toHexString())
            let lightnessTarget075 = getLightnessValue(swatch075.toHexString())
            let lightnessTarget050 = getLightnessValue(swatch050.toHexString())
            let lightnessTarget035 = getLightnessValue(swatch035.toHexString())
            let lightnessTarget025 = getLightnessValue(swatch025.toHexString())
            let lightnessTarget015 = getLightnessValue(swatch015.toHexString())

            swatch300 = desaturateToTarget2(swatch300.clone(), desaturationTargets[0])
            swatch200 = desaturateToTarget2(swatch200.clone(), desaturationTargets[1])
            swatch100 = desaturateToTarget2(swatch100.clone(), desaturationTargets[2])
            swatch085 = desaturateToTarget2(swatch085.clone(), desaturationTargets[3])
            swatch075 = desaturateToTarget2(swatch075.clone(), desaturationTargets[4])
            swatch050 = desaturateToTarget2(swatch050.clone(), desaturationTargets[5])
            swatch035 = desaturateToTarget2(swatch035.clone(), desaturationTargets[6])
            swatch025 = desaturateToTarget2(swatch025.clone(), desaturationTargets[7])
            swatch015 = desaturateToTarget2(swatch015.clone(), desaturationTargets[8])

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
                swatch080: swatch080.toHexString(),
                swatch085: swatch085.toHexString(),
                swatch090: swatch090.toHexString(),
                swatch100: swatch100.toHexString(),
                swatch200: swatch200.toHexString(),
                swatch300: swatch300.toHexString(),
                swatch400: swatch400.toHexString(),
                swatch500: swatch500.toHexString(),
                swatch600: swatch600.toHexString(),
                swatch700: swatch700.toHexString(),
                swatch750: swatch750.toHexString(),
                swatch800: swatch800.toHexString(),
                swatch900: swatch900.toHexString(),
                swatch950: swatch950.toHexString(),
                swatch975: swatch975.toHexString(),
                swatch1000: swatch1000,
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
