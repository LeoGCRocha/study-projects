// eslint-disable-next-line
import { Palette, PaletteColor } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
    // extend palette color interface to have more atributes like 200,300,400...
    interface PaletteColor {
        [key: number]: string
    }

    interface Palette {
        tertiary: PaletteColor
    }
}