"use client";

import * as S from "./style";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

const drawerWidth = 280;

const Menu = ({ children }) => {
  const router = useRouter();
  const doLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          [`& .MuiPaper-root`]: {
            backgroundColor: "#0a0a0a",
            color: "#fafafa",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <S.Typography variant="h5" color="primary">
            YOURfinance.IO
          </S.Typography>
          <List>
            <ListItem disablePadding>
              <S.Link href="/dashboard">
                <ListItemButton>
                  <ListItemIcon>
                    <GridViewIcon style={{ color: "#fafafa" }} />
                  </ListItemIcon>
                  <ListItemText primary="My Panel" />
                </ListItemButton>
              </S.Link>
            </ListItem>

            <ListItem disablePadding>
              <S.Link href="/category">
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon style={{ color: "#fafafa" }} />
                  </ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItemButton>
              </S.Link>
            </ListItem>

            <ListItem disablePadding>
              <S.Link href="/statement">
                <ListItemButton>
                  <ListItemIcon>
                    <SwapHorizIcon style={{ color: "#fafafa" }} />
                  </ListItemIcon>
                  <ListItemText primary="Statement" />
                </ListItemButton>
              </S.Link>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={doLogout}>
                <ListItemIcon>
                  <LogoutIcon style={{ color: "#fafafa" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Menu;
