import {
  navItem,
  navSections,
  dropNavSections,
  navigationBody,
  navigation,
} from "./Navigation";
import { NavSectionsTitle } from "./Navigation_Sections";
import { NavigationItem } from "./Navigation_Item";
import { NavigationDropdown } from "./Navigation_Dropdown";
import { Box } from "@mui/material";

function isSection(item: navItem | navSections): item is navSections {
  return (item as navSections).sectionTitle !== undefined;
}

function isDropSection(
  item: navItem | dropNavSections
): item is dropNavSections {
  return (item as dropNavSections).dropNavItems !== undefined;
}

export const NavigationDisplay = () => {
  const data = navigationBody();

  return (
    <Box sx={{ mt: 2 }}>
      {data.map((nav) => (
        <div>
          {isSection(nav) ? (
            <NavSectionsTitle
              sectionTitle={nav.sectionTitle}
              id={""}
            />
          ) : isDropSection(nav) ? (
            <NavigationDropdown
              dropNavItems={nav.dropNavItems}
              defaultOpen={nav.defaultOpen}
              id={""}
            />
          ) : (
            <NavigationItem
              title={nav.title}
              path={nav.path}
              icon={nav.icon}
              id={""}
            />
          )}
        </div>
      ))}
    </Box>
  );
};
