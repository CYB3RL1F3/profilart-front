import React, { FC, useMemo, useCallback } from "react";
// import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { logout } from "actions/user";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItem } from "primereact/components/menuitem/MenuItem";
import { Grid } from "components/atoms";
import { Profile } from 'types/Profile';
import Gravatar from "react-gravatar";

export interface CommandEvent { originalEvent: Event; item: MenuItem; }

export interface MenuProps extends RouteComponentProps {
  profile: Profile | null;
}

export const Menu: FC<MenuProps> = ({ history, profile }) => {
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

  const disconnect = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await logout();
  }, []);
  return (
    <div className="layout-topbar">
       <div className="layout-topbar-menu-wrapper">
        <Menubar model={items}>
          <Grid>
            <div className="p-menu-item">
              <a className="p-menuitem-link" href="/logout" onClick={disconnect}>
                <span className="pi pi-sign-out" />
                Logout 
              </a>
            </div>
            {profile && profile?.email && (
              <Gravatar className="avatar" email={profile.email} />
            )}
          </Grid>
        </Menubar>
      </div>
    </div>
  )
}

export default withRouter(Menu);
