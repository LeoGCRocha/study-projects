import { Box } from '@mui/material'
import { styled } from '@mui/system'

const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1rem",
    boxShadow: "0.6rem 0.8rem 0.6rem 0.4rem rgba(0, 0, 0, 0, .8)"
}))

export default DashboardBox