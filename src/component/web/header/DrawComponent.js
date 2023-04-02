import React, { useState } from "react"
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const DrawComponent = () => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const pages = ['Trang chủ', 'Bài viết', 'Thảo luận', 'Hỏi đáp','Đăng ký','Tìm kiếm']
    return (<>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <List>
                {pages.map((item, index) => {
                    return <ListItemButton key={index}>
                        <ListItemIcon>
                            <ListItemText>{item}</ListItemText>
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