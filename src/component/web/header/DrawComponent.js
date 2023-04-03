import React, { useState } from "react"
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const DrawComponent = () => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const pages = [
    {
        badge:'Trang chủ',
        navigate:'/'
    },
    {
        badge:'Bài viết',
        navigate:'/follow'
    },
    {
        badge:'Thảo luận',
        navigate:'/discuss'
    },
    {
        badge:'Hỏi đáp',
        navigate:'/question'
    },
    {
        badge:'Đăng ký',
        navigate:'/login'
    },
    {
        badge:'Tìm kiếm',
        navigate:'/search'
    }]
    return (<>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <List>
                {pages.map((item, index) => {
                    return <ListItemButton key={index} href={item.navigate}>
                        <ListItemIcon>
                            <ListItemText>{item.badge}</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                })}

            </List>
        </Drawer>
        <IconButton sx={{ color: 'black'}} onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon ></MenuIcon>
        </IconButton>
    </>)
}

export default DrawComponent