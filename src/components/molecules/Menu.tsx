import React, { FC, useMemo, useCallback } from "react";
// import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { logout } from "actions/user";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/components/menuitem/MenuItem";

export interface CommandEvent { originalEvent: Event; item: MenuItem; }

export const Menu: FC<RouteComponentProps> = ({ history }) => {
  const command = useCallback((e: CommandEvent) => {
    e.originalEvent.preventDefault();
    e.originalEvent.stopPropagation();
     history.push(e.item.url || "/");
  }, [history]);

  const items: MenuItem[] = useMemo(() => ([
    {
      label: 'My profile',
      icon: 'pi pi-user-edit',
      url: '/',
      command
      
    },
    {
      label: 'Test API',
      icon: 'pi pi-eye',
      url: '/visualize',
      command
    },
    {
      label: 'Manage posts',
      icon: 'pi pi-md-web',
      url: '/posts',
      command
    },
    {
      label: 'Contact support',
      icon: 'pi pi-envelope',
      url: '/support',
      command
    }
  ]), [command]);

  const disconnect = useCallback(async () => {
    await logout()
  }, []);
  return (
    <div className="layout-topbar">
       <div className="layout-topbar-menu-wrapper">
        <Menubar model={items}>
          <Button onClick={disconnect} label="Logout" icon="pi pi-sign-out" />
        </Menubar>
      </div>
    </div>
  )
}

export default withRouter(Menu);
