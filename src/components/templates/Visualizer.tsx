import React, { FC, useCallback } from "react";
import { Grid, Card, Message } from "components/atoms";
import {ProgressBar} from 'primereact-working/progressbar';
import ReactJson from 'react-json-view';
import { MessageType } from "components/atoms/Message";
import { Link } from "react-router-dom";
import { Button } from "primereact-working/button";
import { useDispatch } from "react-redux";
import { callUrl } from "actions/api";
import { GridCol12 } from "components/atoms/Grid";
import { BASE_URL } from 'constants/api';
import { APIError } from 'types/Api';
import paths from "paths";
export interface VisualizerProps {
  query: string;
  result: Object | null;
  loading: boolean;
  error: APIError| null;
}

export const Visualizer: FC<VisualizerProps> = ({ error, query, result, loading }) => {
  const dispatch = useDispatch();
  const retry = useCallback(() => {
    dispatch(callUrl(query));
  }, [query, dispatch]);
  let possibleCause = "";
  if (error) {
    switch(true) {
      case query.indexOf("/infos") > -1:
      case query.indexOf("/charts") > -1:
      case query.indexOf("/events") > -1:
        possibleCause = "It's probably due to your Resident Advisor credentials that seems to be wrong."
        break;
      case query.indexOf("/tracks") > -1:
        possibleCause = "It's probably due to your Soundcloud URL that seems to be wrong."
        break;
      case query.indexOf("/releases") > -1:
        possibleCause = "It's probably due to your Discogs URL that seems to be wrong."
        break;
      default:
        possibleCause = "It's probably due to the informations you setup in your profile configuration."
    }
  }
  return (
    <Grid className="visualizer-grid">
      <GridCol12>
        <h4 className="visualizer_query">
          {query !== BASE_URL && query !== "" && (
            <><span className="lbl">Query:</span> <code>{query}</code></>
          )}
          <span className="button_query">
            <Button label="Retry" onClick={retry} />
          </span>
        </h4>
        <hr />
        {loading && (
          <Card className="visualizer">
            <ProgressBar mode="indeterminate" />
          </Card>
        )}
        {!loading && (result || error) && (
          <Card className="visualizer" title="Response: ">
            {error && (
              <Grid>
                <GridCol12>
                  <Message type={MessageType.error} summary="An error occured!" details="This query is failing." />
                </GridCol12>
                <GridCol12 className="errorsPossibles">
                  {error.code.toString() === "500" && (<p>The service is actually broken!</p>)}
                  <p>Reason: {error.message}</p>
                  {error.code.toString() === "500" && (<p>Our team is actually working on it. Please be patient and retry later.</p>)}
                  {error.code.toString() === "400" && (<p>{possibleCause}</p>)}
                  {error.code.toString() === "400" && (<p>Please <Link to={paths.main}>check out your API configuration</Link> and retry.</p>)}
                </GridCol12>
                <GridCol12 className="errorsPossibles">
                  <p><Button onClick={retry} label="Retry action call" /></p>
                </GridCol12>
              </Grid>
            )}
            {!error && result && (
              <ReactJson
                src={result}
                style={{
                    backgroundColor: '#242424',
                    margin: 0,
                    padding: 10,
                    overflowY: 'hidden',
                    overflowX: 'scroll',
                    position: 'unset'
                }}
                theme="shapeshifter"
                iconStyle="triangle"
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            )}
          </Card>
        )}
      </GridCol12>
    </Grid>
  )
}