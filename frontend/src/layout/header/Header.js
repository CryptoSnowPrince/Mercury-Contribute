import React from "react";
import {
  Navbar,
  MobileNav,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";

import NavListItem from "./components/NavListItem";
import Connect from "../../components/Connect";


export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="container mx-auto p-2 py-4 bg-transparent border-none backdrop-filter-none shadow-none">
      <div className="relative mx-auto flex justify-between items-center text-white-800">
        <div className="flex items-center">
          <div className="hidden lg:block ml-5">
            <NavListItem size="desktop" />
          </div>
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex gap-3">
          <Connect className="text-trumpos-fontDark text-sm border-2 border-trumpos-panelLight rounded-full px-3 hover:text-trumpos-fontLight" />
        </div>
      </div>
      <MobileNav open={isNavOpen} className="">
        <NavListItem size="mobile" />
      </MobileNav>
    </Navbar>
  );
}
