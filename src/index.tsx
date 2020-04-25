import React from 'react';
import { render } from 'react-dom';
import { sessionService } from 'redux-react-session';
import store, { history } from './store';
import Root from 'Root';
import "./index.css";
import "./window";

const options = {
    refreshOnCheckAuth: true,
    redirectPath: '/login',
    driver: 'LOCALSTORAGE'
};

sessionService.initSessionService(store, options).then(() => {
    render(
        <Root store={store} history={history} />,
        document.getElementById('root')
    );

    // @ts-ignore
    if (isDev && module.hot) {
        // @ts-ignore
        module.hot.accept('./Root', () => {
            const { configureStore, history : newHistory } = require('./store');
            const newStore = configureStore();
            const NewRoot = require('./Root').default;
            render(
                <NewRoot store={newStore} history={newHistory} />,
                document.getElementById('root')
            );
        });
    }
}).catch(() => {
    render(
        <Root store={store} history={history} />,
        document.getElementById('root')
    );
});
