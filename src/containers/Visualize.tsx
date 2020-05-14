import React, { FC, useMemo, useEffect } from "react";
import { PageLayout } from "components/layouts/PageLayout";
import { Grid, Message } from "components/atoms";
import { GridCol6 } from "components/atoms/Grid";
import { MessageType } from "components/atoms/Message";
import { useSelector, useDispatch} from 'react-redux';
import { AppState } from 'reducers';
import { ApiReducer } from 'reducers/api';

import { UserReducer } from "reducers/user";

import { Visualizer } from "components/templates/Visualizer";
import { ActionBar } from "components/templates/ActionBar";
import { BASE_URL } from 'constants/api';
import { call } from "actions/api";
import { Footer } from "components/molecules";

export const Visualize: FC = () => {
  const { error, loading, result, url } = useSelector<AppState, ApiReducer>(({ api }) => api);
  const query = useMemo(() => `${BASE_URL}${url.replace(BASE_URL, '')}`.replace('fr//', 'fr/'), [url]);
  const { profile } = useSelector<AppState, UserReducer>(({ user }) => user);
  const dispatch = useDispatch();
  const firstAvailable = useMemo(() => {
    if (!profile) return null;
    if (profile.residentAdvisor) return 'infos';
    if (profile.discogs) return 'releases';
    if (profile.soundcloud) return 'tracks';
    return null;
  }, [profile]);
  useEffect(() => {
    if (!profile) return;
    if (firstAvailable) dispatch(call(profile.uid, firstAvailable));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!profile) return (
     <PageLayout className="visualizePage">
      <Grid>
        <Message type={MessageType.error} summary="Impossible to run this page" details="A profile must be provided" />
      </Grid>
    </PageLayout>
  )
  return (
    <PageLayout className="visualizePage">
      <Grid>
        <GridCol6>
          <h1>Test my API service</h1>
        </GridCol6>
      </Grid>
      <ActionBar defaultSelected={firstAvailable} profile={profile} />
      <Visualizer query={query} result={result} loading={loading} error={error} />
      <Footer />
    </PageLayout>
  )
}
export default Visualize;