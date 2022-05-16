
export const url = "https://api.npoint.io/93993ebc2b8a15e89afd/";
export const rowHeight = '44px'
export const columnWidth = '150px'
export const fontSize = '14px'

const options = [
    { value: '0', label: 'All' },
    { value: '1', label: 'NewsKit' },
    { value: '2', label: 'Carbon' },  
    { value: '3', label: 'Lightning' },
    { value: '4', label: 'Ant' },        
    { value: '5', label: 'ColorBox' },        
    { value: '6', label: 'Accessible Palette' },
    { value: '7', label: 'User Defined' },
  ];

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const Event = {
    DISPLAY_SWATCHES: "displaySwatches",
    DISPLAY_SWATCHES_ID: "displaySwatchesId",
    DISPLAY_LEGEND: "displayLegend",
};

export function doFetch() {
    fetch(url + 'cvh_strict')
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
        })
        .catch(console.log);
}

export function doPost() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };

    fetch(url + 'blah', requestOptions)
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
        })
        .catch(console.log);
}


export const columns = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
]

//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

export const semantics = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    info: "info",
    warning: "warning",
    danger: "danger",
    neutral: "neutral"
}

export const colorNames = ["RED", "ORANGE", "YELLOW", "GREEN", "CYAN", "BLUE", "PURPLE", "MAGENTA", "NEUTRAL"]
export const hueValues = [0, 29, 60, 120, 180, 240, 270, 300]
export const neutralTolerance = 16

export const colorCheckerNames = [
    "DARK-SKIN",
    "LIGHT-SKIN",
    "BLUE-SKY",
    "FOLIAGE",
    "BLUE-FLOWER",
    "BLUISH-GREEN",
    "ORANGE",
    "PURPLISH-BLUE",
    "MODERATE-RED",
    "PURPLE",
    "YELLOW-GREEN",
    "ORANGE-YELLOW",
    "BLUE",
    "GREEN",
    "RED",
    "YELLOW",
    "MAGENTA",
    "CYAN",
    "WHITE",
    "NEUTRAL-80",
    "NEUTRAL-65",
    "NEUTRAL-50",
    "NEUTRAL-35",
    "BLACK",
]

export function getKeyValues() {
    let result = []

    for (const [semantic] of Object.entries(semantics)) {
        for (const weight of weights) {
            result.push(semantic + "-" + weight)
        }

    }

    return result

}

export const l_targets = [
    100,
    97.5,
    95,
    90,
    85,
    80,
    75,
    70,
    65,
    60,
    55,
    50,
    45,
    40,
    35,
    30,
    25,
    20,
    15,
    10,
    5,
    0
]

export const weights = [
    '000',
    '015',
    '025',
    '035',
    '050',
    '075',
    '080',
    '085',
    '090',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '750',
    '800',
    '900',
    '950',
    '975',
    '1000'
];

export function targetDensities() {
    return targetDensitiesChroma
}

export function targetSaturation() {
    return targetSaturationChroma
}


const targetDensitiesChroma = {
    '000': 100,
    '015': 97.5,
    '025': 95,
    '050': 86,
    '075': 80,
    '100': 60,
    '200': 57,
    '300': 51,
    '400': 47,
    '500': 41,
    '600': 37,
    '700': 29,
    '800': 20,
    '900': 15,
    '950': 0,
}

const targetSaturationChroma = {
    '000': 0,
    '015': 3,
    '025': 8,
    '050': 18,
    '075': 45,
    '100': 50,
    '200': 60,
    '300': 75,
    '400': undefined,
    '500': undefined,
    '600': undefined,
    '700': undefined,
    '800': undefined,
    '900': undefined,
    '950': undefined,
}

export const dataRow = {
    "semantic": undefined,
    "weight": undefined,
    "rootColorName": undefined,
    "description": undefined,
    "CIELAB": { "L": undefined, "a": undefined, "b": undefined },
    "CIELCH": { "L*": undefined, "C*": undefined, "h*": undefined },
    "HSB": { "H": undefined, "S": undefined, "B": undefined },
    "sRBG": { "R": undefined, "G": undefined, "B": undefined },
    "WCAG2AA": { "Normal Text": undefined, "Large Text / UI Components": undefined },
    "hex": undefined,
    "colorChecker": { "name": undefined, "deltaE": undefined },
    "WCAG2": undefined
}

export const colorCheckerValuesHex = {
    "DARK-SKIN": '745144',
    "LIGHT-SKIN": 'c79481',
    "DARK-TAN": 'A96620',
    "LIGHT-TAN": 'CB894F',
    "BLUE-SKY": '5a7b9c',
    "GOLD": '816D4D',
    "FOLIAGE-GREEN": '4b6c68',
    "BLUE-FLOWER": '8280af',
    "BLUISH-GREEN": '5fbfac',
    "ORANGE": 'e17d30',
    "PURPLISH-BLUE": '435baa',
    "MODERATE-RED": 'c65261',
    "PURPLE": '5d3969',
    "YELLOW-GREEN": '9fbe41',
    "ORANGE-YELLOW": 'e6a227',
    "BLUE": '244093',
    "GREEN": '43944a',
    "RED": 'b33139',
    "YELLOW": 'efc714',
    "MAGENTA": 'c15497',
    "CYAN": '0088aa',
    "WHITE-05": 'f6f6f6',
    "NEUTRAL-80": 'c9c9c9',
    "NEUTRAL-65": 'a0a4a5',
    "NEUTRAL-50": '797979',
    "NEUTRAL-35": '525254',
    "BLACK-15": '303032',
    "CYANISH-GREEN": '199992',
    "LIME-GREEN": '11e617',
    "ORANGISH-RED": 'ed4b2b',
    "PINK": 'fd759f',
    "VERDUN-GREEN": '00704a',
    "VERDON-GREEN-DARK": '637304',
    "CADMIUM-GREEN": '036635',
    "X-GREEN": '00720d',
    "MALACHITE-GREEN": "07b745",
    "MALACHITE-GREEN-DARK": "02ab61",
    "DEEP-BRONZE": "474806",
    "OLIVE-GREEN": "5f835e",
}

export const colorCheckerValuesLab = {
    "DARK-SKIN": { L: 38, A: 14, B: 14 },
    "LIGHT-SKIN": { L: 66, A: 18, B: 18 },
    "DARK-TAN": { L: 50, A: 24, B: 49 },
    "LGHT-TAN": { L: 63, A: 22, B: 41 },
    "BLUE-SKY": { L: 50, A: -5, B: -22 },
    "GOLD": { L: 47, A: 4.61, B: 20.99 },
    "FOLIAGE-GREEN": { L: 43, A: -13, B: -2 },
    "BLUE-FLOWER": { L: 55, A: 9, B: -25 },
    "BLUISH-GREEN": { L: 71, A: -33, B: 0 },
    "ORANGE": { L: 63, A: 36, B: 57 },
    "PURPLISH-BLUE": { L: 40, A: 10, B: -46 },
    "MODERATE-RED": { L: 51, A: 48, B: 16 },
    "PURPLE": { L: 30, A: 23, B: -22 },
    "YELLOW-GREEN": { L: 73, A: -24, B: 57 },
    "ORANGE-YELLOW": { L: 72, A: 19, B: 68 },
    "BLUE": { L: 29, A: 14, B: -50 },
    "GREEN": { L: 55, A: -38, B: 31 },
    "LIME-GREEN": { L: 80, A: -72, B: 73 },
    "RED": { L: 42, A: 53, B: 28 },
    "YELLOW": { L: 82, A: 4, B: 80 },
    "MAGENTA": { L: 52, A: 50, B: -15 },
    "CYAN": { L: 51, A: -29, B: -29 },
    "WHITE-05": { L: 97, A: 0, B: 0 },
    "NEUTRAL-80": { L: 81, A: 0, B: 0 },
    "NEUTRAL-65": { L: 67, A: -1, B: -1 },
    "NEUTRAL-50": { L: 51, A: 0, B: 0 },
    "NEUTRAL-35": { L: 35, A: 0, B: -1 },
    "BLACK-15": { L: 20, A: 0, B: -1 },
    "CYANISH-GREEN": { L: 57, A: -35, B: -6 },
    "ORANGISH-RED": { L: 56, A: 62, B: 54 },
    "PINK": { L: 67, A: 56, B: 4 },
    "VERDUN-GREEN": { L: 40, A: -25, B: 46 },
    "VERDUN-GREEN-DARK": { L: 46, A: -16, B: 49 },
    "CADMIUM-GREEN": { L: 41, A: -36, B: 13 },
    "MALACHITE-GREEN": { L: 62, A: -52, B: 27 },
    "MALACHITE-GREEN-LIGHT": { L: 65, A: -58, B: 45 },
    "DEEP-BRONZE": { L: 30, A: -7, B: 35 },
    "OLIVE-GREEN": { L: 51, A: -19, B: 16 },
}

export const X = {
    "FOLIAGE-GREEN": { L: 43, A: -13, B: -2 },
    "BLUISH-GREEN": { L: 71, A: -33, B: 0 },
    "YELLOW-GREEN": { L: 73, A: -24, B: 57 },
    "GREEN": { L: 55, A: -38, B: 31 },
    "LIME-GREEN": { L: 80, A: -72, B: 73 },
    "CYANISH-GREEN": { L: 57, A: -35, B: -6 },
    "VERDUN-GREEN": { L: 40, A: -25, B: 46 },
    "VERDUN-GREEN-DARK": { L: 46, A: -16, B: 49 },
    "CADMIUM-GREEN": { L: 41, A: -36, B: 13 },
    "MALACHITE-GREEN": { L: 62, A: -52, B: 27 },
    "MALACHITE-GREEN-LIGHT": { L: 65, A: -58, B: 45 },
}

export const swatchExportDictionary = {
    "primary-015": "",
    "primary-025": "",
    "primary-050": "",
    "primary-075": "",
    "primary-100": "",
    "primary-200": "",
    "primary-300": "",
    "primary-400": "",
    "primary-500": "",
    "primary-600": "",
    "primary-700": "",
    "primary-800": "",
    "primary-900": "",
    "secondary-015": "",
    "secondary-025": "",
    "secondary-050": "",
    "secondary-075": "",
    "secondary-100": "",
    "secondary-200": "",
    "secondary-300": "",
    "secondary-400": "",
    "secondary-500": "",
    "secondary-600": "",
    "secondary-700": "",
    "secondary-800": "",
    "secondary-900": "",
    "success-015": "",
    "success-025": "",
    "success-050": "",
    "success-075": "",
    "success-100": "",
    "success-200": "",
    "success-300": "",
    "success-400": "",
    "success-500": "",
    "success-600": "",
    "success-700": "",
    "success-800": "",
    "success-900": "",
    "info-015": "",
    "info-025": "",
    "info-050": "",
    "info-075": "",
    "info-100": "",
    "info-200": "",
    "info-300": "",
    "info-400": "",
    "info-500": "",
    "info-600": "",
    "info-700": "",
    "info-800": "",
    "info-900": "",
    "warning-015": "",
    "warning-025": "",
    "warning-050": "",
    "warning-075": "",
    "warning-100": "",
    "warning-200": "",
    "warning-300": "",
    "warning-400": "",
    "warning-500": "",
    "warning-600": "",
    "warning-700": "",
    "warning-800": "",
    "warning-900": "",
    "danger-015": "",
    "danger-025": "",
    "danger-050": "",
    "danger-075": "",
    "danger-100": "",
    "danger-200": "",
    "danger-300": "",
    "danger-400": "",
    "danger-500": "",
    "danger-600": "",
    "danger-700": "",
    "danger-800": "",
    "danger-900": "",
    "neutral-000": "",
    "neutral-015": "",
    "neutral-025": "",
    "neutral-050": "",
    "neutral-075": "",
    "neutral-100": "",
    "neutral-200": "",
    "neutral-300": "",
    "neutral-400": "",
    "neutral-500": "",
    "neutral-600": "",
    "neutral-700": "",
    "neutral-800": "",
    "neutral-900": "",
    "neutral-950": "",
}

