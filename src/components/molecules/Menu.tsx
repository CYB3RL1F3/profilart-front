import React, { FC, useMemo, useCallback } from "react";
// import { TabMenu } from 'primereact-working/tabmenu';
import { Menubar } from 'primereact-working/menubar';
import { logout } from "actions/user";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItem } from "primereact-working/components/menuitem/MenuItem";
import { Grid } from "components/atoms";
import { Profile } from 'types/Profile';
import Gravatar from "react-gravatar";

export interface CommandEvent { originalEvent: Event; item: MenuItem; }

export interface MenuProps extends RouteComponentProps {
  profile: Profile | null;
}

export const Menu: FC<MenuProps> = ({ history, location, profile }) => {
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
      command,
      className: location.pathname === "/" ? "selected" : ""
      
    },
    {
      label: 'Test API',
      icon: 'pi pi-eye',
      url: '/visualize',
      command,
      className: location.pathname === "/visualize" ? "selected" : ""
    },
    {
      label: 'Manage newsfeed',
      icon: 'pi pi-md-web',
      url: '/posts',
      command,
      className: location.pathname === "/posts" ? "selected" : ""
    },
    {
      label: 'Contact support',
      icon: 'pi pi-envelope',
      url: '/support',
      command,
      className: location.pathname === "/support" ? "selected" : ""
    }
  ]), [command, location]);

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
