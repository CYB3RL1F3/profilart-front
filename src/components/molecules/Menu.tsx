import React, { FC, useMemo, useCallback, useState } from "react";
// import { TabMenu } from 'primereact-working/tabmenu';
import { Menubar } from 'primereact-working/menubar';
import { Sidebar } from 'primereact-working/sidebar';
import { logout } from "actions/user";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItem } from "primereact-working/components/menuitem/MenuItem";
import { Grid } from "components/atoms";
import { PanelMenu } from 'primereact-working/panelmenu';
import { Profile } from 'types/Profile';
import Gravatar from "react-gravatar";
import paths from "paths";

export interface CommandEvent { originalEvent: Event; item: MenuItem; }

export interface MenuProps extends RouteComponentProps {
  profile: Profile | null;
}

export const Menu: FC<MenuProps> = ({ history, location, profile }) => {

  const [visible, toggle] = useState<boolean>(false);

  const open = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(!visible)
  }, [toggle, visible]);

  const close = useCallback(() => toggle(false), [toggle]);

  const command = useCallback((e: CommandEvent) => {
    e.originalEvent.preventDefault();
    e.originalEvent.stopPropagation();
     history.push(e.item.url || paths.main);
     close();
  }, [history, close]);

  const getClassName = useCallback((path: string) => location.pathname === path ? "selected" : "", [location.pathname])

  const items: MenuItem[] = useMemo(() => ([
    {
      label: 'My profile',
      icon: 'pi pi-user-edit',
      url: paths.main,
      command,
      className: getClassName(paths.main)
      
    },
    {
      label: 'Test API',
      icon: 'pi pi-eye',
      url: paths.visualize,
      command,
      className: getClassName(paths.visualize)
    },
    {
      label: 'Manage newsfeed',
      icon: 'pi pi-md-web',
      url: paths.posts,
      command,
      className: getClassName(paths.posts)
    },
    {
      label: 'Notification center',
      icon: 'pi pi-md-notifications',
      url: paths.notifications,
      command,
      className: getClassName(paths.notifications)
    },
    {
      label: 'Contact support',
      icon: 'pi pi-envelope',
      url: paths.support,
      command,
      className: getClassName(paths.support)
    }
  ]), [command, getClassName]);

  const disconnect = useCallback(async (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.originalEvent) e.originalEvent.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    await logout();
  }, []);

  const logoutMenuItem = {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: disconnect
  }
  return (
    <div className="layout-topbar">
       <div className="layout-topbar-menu-wrapper">
        <Menubar model={items}>
          <Grid>
            <div className="p-menu-item">
              <a className="p-menuitem-link" href="/logout" onClick={disconnect}>
                <span className="pi pi-sign-out" />
                Logout &nbsp;
              </a>
            </div>
            {profile && profile?.email && (
              <Gravatar className="avatar" email={profile.email} />
            )}
          </Grid>
        </Menubar>
      </div>
      <Sidebar baseZIndex={1} visible={visible} position="right" onHide={close}>
          <div className="menumobile">
              {profile && profile?.email && (
                <Gravatar className="avatar" email={profile.email} />
              )}
              <PanelMenu model={[
                ...items,
                logoutMenuItem
              ]} style={{width:'300px'}}/>
          </div>
      </Sidebar>
      <div className="layout-topbar-menu-mobile-wrapper">
        <div className="layout-topbar-menu-mobile-wrapper-title">
          Profilart
        </div>
        <a href="/" onClick={open} className="layout-topbar-menu-mobile-wrapper-menubtn">
          <span className="pi pi-md-menu" />
        </a>
      </div>
    </div>
  )
}

export default withRouter(Menu);
