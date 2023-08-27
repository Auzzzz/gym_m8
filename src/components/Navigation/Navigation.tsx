import * as React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export type navItem = {
  id: string;
  title: string;
  path: string;
  icon: string | string[] | React.ReactNode;
};

export type navSections = {
  id: string;
  sectionTitle: string;
};

export type dropNavSections = {
  id: string;
  dropNavItems: navItem[];
  defaultOpen: boolean;
};

export type navigation = (navItem | navSections | dropNavSections)[];

export const navigationBody = (): navigation => {
  return [
    {
      id: "1",
      title: "Profile",
      path: "/profile",
      icon: <AccountBoxIcon />,
    },
    {
      id: "2",
      sectionTitle: "Test",
    },
    {
      id: "3",
      title: "Profile",
      path: "/profile",
      icon: <AccountBoxIcon />,
    },
    {
      dropNavItems: [
        {
          id: "3.1",
          title: "Create a Workout",
          path: "/profile/userworkout",
          icon: <AccountBoxIcon />,
        },
        {
          id: "3.2",
          title: "Profile 2",
          path: "/profile2",
          icon: <AccountBoxIcon />,
        },
        {
          id: "3.3",
          title: "Profile 3",
          path: "/profile3",
          icon: <AccountBoxIcon />,
        },
      ], id: "3",
      defaultOpen: true,
    }
  ];
};
