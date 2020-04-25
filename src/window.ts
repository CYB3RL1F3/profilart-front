declare global {
    interface Window {
        ga: (instruction: string, action: string, ...args: any[]) => void | null;
        cordova: any;
        google: any;
        fbAsyncInit: any;
        FB: {
            login: (a: any, b: any) => void;
            init: (arg: {
                appId: string;
                cookie: boolean;
                xfbml: boolean;
                version: string;
            }) => void;
            api: any;
            getLoginStatus: (arg: (response: any) => any) => void;
        };
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (a: any, b: any) => void;
    }
    interface Navigator {
        userLanguage: string;
    }
}

window.ga = window.ga || null;
window.cordova = window.cordova || null;
window.google = window.google || null;
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null;
navigator.userLanguage = navigator.userLanguage || "";

export default window;