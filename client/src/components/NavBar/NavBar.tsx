import React from "react";
import navClass from "./NavBar.module.scss";

interface NavBarProps {
  NavigationList?: LinkProps[];
}

// This is a simplified version of the NavBar component. You can expand it with the logic from NavBar.v01.tsx as needed.
const NavBar = ({ NavigationList }: NavBarProps) => {
  return (
    <nav className={navClass.nav}>
      {/* Add your navigation items here */}
      <ul className={navClass.nav_list}>
        {NavigationList?.map((item: LinkProps, index: number) => (
          <React.Fragment key={item?.id ?? index}>
            {item?.isActive && (
              <li>
                <a
                  href={item?.Value}
                  aria-disabled={item?.isEnabled === false}
                  target={item?.isExternal ? "_blank" : "_self"}
                  rel={item?.isExternal ? "noopener noreferrer" : undefined}
                >
                  {item?.Key}
                </a>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
