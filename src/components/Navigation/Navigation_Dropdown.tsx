import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { dropNavSections, navItem } from "./Navigation";
import {
  ExpandLess,
  ExpandMore,
  Navigation,
  StarBorder,
} from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React, { useEffect } from "react";
import { NavigationItem } from "./Navigation_Item";

export const NavigationDropdown = (props: dropNavSections) => {
  const { dropNavItems, defaultOpen } = props;
  const [open, setOpen] = React.useState(defaultOpen);

  useEffect(() => {
    console.log(props.defaultOpen)
  });

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {dropNavItems.map((nav: navItem) => (
            <NavigationItem title={nav.title} path={nav.path} icon={nav.icon} id={nav.id} />
          ))}
        </List>
      </Collapse>
    </List>
  );
};
