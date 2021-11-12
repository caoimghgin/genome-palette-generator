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
    "ORANGE" , 
    "PURPLISH-BLUE", 
    "MODERATE-RED",
    "PURPLE" , 
    "YELLOW-GREEN", 
    "ORANGE-YELLOW",
    "BLUE" , 
    "GREEN", 
    "RED",
    "YELLOW" , 
    "MAGENTA", 
    "CYAN",
    "WHITE" , 
    "NEUTRAL-80", 
    "NEUTRAL-65",
    "NEUTRAL-50" , 
    "NEUTRAL-35", 
    "BLACK",
    ]

export const weights = [
    '000',     
    '015', 
    '025', 
    '050', 
    '075', 
    '100', 
    '200', 
    '300', 
    '400', 
    '500', 
    '600', 
    '700', 
    '800', 
    '900',
    '950'    
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
    "CIELAB": { "L": undefined, "a": undefined, "b": undefined},
    "CIELCH": { "L*": undefined, "C*": undefined, "h*": undefined},
    "HSB": { "H": undefined, "S": undefined, "B": undefined},
    "sRBG": { "R": undefined, "G": undefined, "B": undefined},
    "WCAG2AA": { "Normal Text": undefined, "Large Text / UI Components": undefined},
    "hex": undefined,
    "colorChecker": { "name": undefined, "deltaE": undefined},
    "WCAG2": undefined  
}

export const colorCheckerValuesHex = {
    "DARK-SKIN": '745144',
    "LIGHT-SKIN": 'c79481',
    "BLUE-SKY": '5a7b9c', 
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
    "ORANGISH-RED": 'ed4b2b',
    "PINK": 'fd759f',
    "VERDUN-GREEN": '00704a',
    "X-GREEN": '00720d',
}

export const colorCheckerValuesLab = {
    "DARK-SKIN": {L:38, A:14, B:14},
    "LIGHT-SKIN": {L:66, A:18, B:18},
    "BLUE-SKY": {L:50, A:-5, B:-22},
    "FOLIAGE-GREEN": {L:43, A:-13, B:-2},
    "BLUE-FLOWER": {L:55, A:9, B:-25},
    "BLUISH-GREEN": {L:71, A:-33, B:0},
    "ORANGE": {L:63, A:36, B:57},
    "PURPLISH-BLUE": {L:40, A:10, B:-46},
    "MODERATE-RED": {L:51, A:48, B:16},
    "PURPLE": {L:30, A:23, B:-22},
    "YELLOW-GREEN": {L:73, A:-24, B:57},
    "ORANGE-YELLOW": {L:72, A:19, B:68},  
    "BLUE": {L:29, A:14, B:-50},
    "GREEN": {L:55, A:-38, B:31},
    "RED": {L:42, A:53, B:28},
    "YELLOW": {L:82, A:4, B:80},
    "MAGENTA": {L:52, A:50, B:-15},
    "CYAN": {L:51, A:-29, B:-29},
    "WHITE-05": {L:97, A:0, B:0},
    "NEUTRAL-80": {L:81, A:0, B:0},    
    "NEUTRAL-65": {L:67, A:-1, B:-1},
    "NEUTRAL-50": {L:51, A:0, B:0},    
    "NEUTRAL-35": {L:35, A:0, B:-1},
    "BLACK-15": {L:20, A:0, B:-1},    
    "CYANISH-GREEN": {L:57, A:-35, B:-6},
    "ORANGISH-RED": {L:56, A:62, B:54},
    "PINK": {L:67, A:56, B:4},
    "VERDUN-GREEN": {L:40, A:-25, B:46}, 


    //     "GREEN": {L:55, A:-38, B:31},

    // CIELAB: L*: 48.12920437940231 A*: -47.08581114990149 B*: 32.838967190930504
    // CIELAB: L*: 52 A*: -48 B*: 36

    // CIELAB: L*: 41.31587020996055 A*: -46.979684236719194 B*: 42.83681216960419
    // CIELAB: L*: 45 A*: -48 B*: 53

}