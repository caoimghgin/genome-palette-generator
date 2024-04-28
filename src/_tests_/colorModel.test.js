
import { SwatchModel } from "../models/SwatchModel";

test('swatch semantic to be "primary"', () => {
    const value = "#FFFFFF"
    const column = "A"
    const semantic = "primary"
    let swatch = new SwatchModel(value, column, semantic)
    expect(swatch.semantic).toBe(semantic);
    console.log(swatch)
});