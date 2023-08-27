import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { navItem } from "./Navigation";

export const NavigationItem = (props: navItem) => {
  const { title, path, icon, id } = props;
  return (
    <ListItemButton LinkComponent={"a"} href={path}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
