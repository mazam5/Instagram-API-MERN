import mainLogo from "@/assets/main-instagram-logo.png";
import smallLogo from "@/assets/small-logo.jpg";
import { Grid, Home, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const AppSidebar = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const items = [
    {
      title: "Home",
      url: "#home",
      icon: Home,
    },
    {
      title: "My Posts",
      url: "#posts",
      icon: Grid,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-center">
          {open ? (
            <img src={mainLogo} alt="Logo" className="h-full" />
          ) : (
            <img src={smallLogo} alt="Logo" className="h-full" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DialogTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer">
                      <LogOut />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Logout Profile</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout from your profile? You will be
                redirected to the login page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="cursor-pointer"
                onClick={() => setLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
