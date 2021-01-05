/**
 * @file index
 * @author chenbo09
 */
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import PrimaryLayout from 'containers/layout/PrimaryLayout';
import rootReducer from './reducers';

import './modules/common/css/common.less';
import './components/biz/ai2bStyles/index.less';


const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const App = () => (
    // <Provider store={store}>
    //     <LocaleProvider locale={zhCN}>
    //         <BrowserRouter>
    //             <PrimaryLayout store={store} />
    //         </BrowserRouter>
    //     </LocaleProvider>
    // </Provider>
    <div></div>
);

render(<App />, document.getElementById('react-app'));

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
}
