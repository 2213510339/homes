/**
 * @file: containers/user/routes
 * @author sunwen05
 */

import loadable from 'react-loadable';
import {components} from 'baidu-acu-react-common';

const Loading = components.Loading;

export default [
    {
        path: '/',
        exact: true,
        component: loadable({
            loader: () =>
                import(/* webpackChunkName: 'user' */ /* webpackMode: "lazy" */ './Login'),
            loading: Loading
        })
    },
    {
        path: '/login',
        component: loadable({
            loader: () =>
                import(/* webpackChunkName: 'user' */ /* webpackMode: "lazy" */ './Login'),
            loading: Loading
        })
    },
    {
        path: '/login.html',
        component: loadable({
            loader: () =>
                import(/* webpackChunkName: 'user' */ /* webpackMode: "lazy" */ './Login'),
            loading: Loading
        })
    },
    {
        path: '/dsp/login',
        component: loadable({
            loader: () =>
                import(/* webpackChunkName: 'user' */ /* webpackMode: "lazy" */ './Login'),
            loading: Loading
        })
    },
    {
        path: '/dsp/login.html',
        component: loadable({
            loader: () =>
                import(/* webpackChunkName: 'user' */ /* webpackMode: "lazy" */ './Login'),
            loading: Loading
        })
    }
];
