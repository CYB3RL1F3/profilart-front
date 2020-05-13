/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo, useCallback } from "react";
import { Profile } from 'types/Profile';
import { useDispatch } from "react-redux";
import { call } from '../../actions/api';
import { Grid } from "components/atoms";
import { GridCol12 } from "components/atoms/Grid";
import { TabMenu } from 'primereact-working/tabmenu';
import { MenuItem } from "primereact-working/components/menuitem/MenuItem";

export interface ActionBarProps {
  profile: Profile;
  defaultSelected: string | null;
}

export interface Action {
  label: string;
  command: () => void;
  disabled: boolean;
}

export const ActionBar: FC<ActionBarProps> = ({ profile, defaultSelected }) => {
  
  const { uid, residentAdvisor, soundcloud, discogs } = profile;
  const dispatch = useDispatch();
  const canDisplayResidentAdvisor = useMemo(() => 
    !!residentAdvisor && 
    !!residentAdvisor?.DJID && 
    !!residentAdvisor?.accessKey && 
    !!residentAdvisor?.userId, [residentAdvisor]);
  
  const canDisplaySoundcloud = useMemo(() => 
    !!soundcloud && 
    !!soundcloud?.url, [soundcloud]);
    
  const canDisplayDiscogs = useMemo(() => 
    !!discogs && 
    !!discogs?.url, [discogs]);

  const fetchInfos = useCallback(() => {
    dispatch(call(uid, "infos"));
  }, [canDisplayResidentAdvisor, dispatch, uid]);

  const fetchCharts = useCallback(() => {
    if (canDisplayResidentAdvisor) {
      dispatch(call(uid, "charts"));
    }
  }, [canDisplayResidentAdvisor, dispatch, uid]);

  const fetchReleases = useCallback((e) => {
    if (canDisplayDiscogs) {
      dispatch(call(uid, "releases"));
    }
  }, [canDisplayDiscogs, dispatch, uid]);

  const fetchForthcomingEvents = useCallback(() => {
    if (canDisplayResidentAdvisor) {
      dispatch(call(uid, "events", {
        type: 1
      }))
    }
  }, [canDisplayResidentAdvisor, dispatch, uid]);

  const fetchPastEvents = useCallback(() => {
    if (canDisplayResidentAdvisor) {
      dispatch(call(uid, "events", {
        type: 2
      }))
    }
  }, [canDisplayResidentAdvisor, dispatch, uid]);

  const fetchTracks = useCallback(() => {
    if (canDisplaySoundcloud) {
      dispatch(call(uid, "tracks"));
    }
  }, [canDisplaySoundcloud, dispatch, uid]);

  const fetchPosts = useCallback((e) => {
    dispatch(call(uid, "posts"));
  }, [canDisplayResidentAdvisor, dispatch, uid]);

  const items: MenuItem[] = useMemo(() => [
    {
      label: "Infos",
      command: fetchInfos,
      disabled: false
    },
    {
      label: "Charts",
      command: fetchCharts,
      disabled: !canDisplayResidentAdvisor
    },
    {
      label: "Forthcoming events",
      command: fetchForthcomingEvents,
      disabled: !canDisplayResidentAdvisor
    },
    {
      label: "Past events",
      command: fetchPastEvents,
      disabled: !canDisplayResidentAdvisor
    },
    {
      label: "Releases",
      command: fetchReleases,
      disabled: !canDisplayDiscogs
    },
    {
      label: "Tracks",
      command: fetchTracks,
      disabled: !canDisplaySoundcloud
    },
    {
      label: "Posts",
      command: fetchPosts,
      disabled: false
    }
  ], [canDisplayDiscogs, canDisplayResidentAdvisor, canDisplaySoundcloud, fetchCharts, fetchForthcomingEvents, fetchInfos, fetchPastEvents, fetchReleases, fetchTracks])
  const initialItem = items.find(i => i.label?.toLocaleLowerCase() === defaultSelected) || items[0];

  return (
    <Grid className="actionbar">
      <GridCol12>
          <TabMenu
            model={items}
            activeItem={initialItem}
          />
      </GridCol12>
    </Grid>
  )
}
