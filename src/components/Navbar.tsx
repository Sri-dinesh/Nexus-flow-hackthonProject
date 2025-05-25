import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AuthButtons from './AuthButtons';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const MobileNavLink = ({ to, children, end }: { to: string; children: React.ReactNode; end?: boolean }) => {
    const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
    
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "block px-3 py-2 rounded-md text-base font-medium",
            isActive ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          )
        }
        onClick={() => setMobileMenuOpen(false)}
        end={end}
      >
        {children}
      </NavLink>
    );
  };
  
  const SearchBar = () => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[200px] justify-start gap-2 pl-3 text-muted-foreground md:w-[300px]"
          >
            <Search className="h-4 w-4" />
            <span>Search properties...</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => {
                  setOpen(false)
                  navigate("/search?q=Miami")
                }}>
                  <span>Miami, FL</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  setOpen(false)
                  navigate("/search?q=New York")
                }}>
                  <span>New York, NY</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  setOpen(false)
                  navigate("/search?q=Los Angeles")
                }}>
                  <span>Los Angeles, CA</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-xl font-bold text-primary">
              <span>EstateNexus</span>
            </a>
            
            <div className="hidden md:flex ml-10 space-x-4">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/properties">Properties</NavLink>
              <NavLink to="/agents">Agents</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block mr-4">
              <SearchBar />
            </div>
            
            <AuthButtons />
            
            <div className="md:hidden ml-4">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t">
            <MobileNavLink to="/" end>Home</MobileNavLink>
            <MobileNavLink to="/properties">Properties</MobileNavLink>
            <MobileNavLink to="/agents">Agents</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
            <div className="px-3 py-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
