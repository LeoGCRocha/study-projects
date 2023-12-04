import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'

const gridTemplatelargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
    `
const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "i"
    "j"
    "j"
    "j"
    `

const Dashboard = () => {
    // const { palette } = useTheme()
    const isAboveMediumScreens = useMediaQuery("(min-width: 1000px)")

    return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
        sx={
            isAboveMediumScreens ? {
                gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplatelargeScreens,
            }
            : {
                gridTemplate: gridTemplateSmallScreens,
                gridAutoColumns: "1fr",
                gridAutoRows: "80px" 
            }
        }>
        <Row1 />
        <Row2 />
    </Box>
    )
}

export default Dashboard