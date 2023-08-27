import { Divider, ListSubheader } from "@mui/material";
import { navSections } from "./Navigation";

export const NavSectionsTitle = (props: navSections) => {
    const { sectionTitle } = props;
  return (
  <ListSubheader>
    {sectionTitle}
    <Divider />
  </ListSubheader>
  
  )
};
