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
      dropNavItems: [
        {
          id: "3.1",
          title: "Create a Workout",
          path: "/profile/create_workout",
          icon: <AccountBoxIcon />,
        },
        {
          id: "3.2",
          title: "Created Workouts",
          path: "/profile/created_workouts",
          icon: <AccountBoxIcon />,
        },
      ], id: "3",
      defaultOpen: true,
    }
  ];
};
