import { ReactNode, useState } from "react";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarState, setSidebarState] = useState(true);
  return (
    <SidebarProvider
      open={sidebarState}
      onOpenChange={setSidebarState}
      defaultOpen={true}
    >
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default Layout;
