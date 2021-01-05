/**
 * @file AppMain
 * @author zhangzhe
 * @author chenbo09
 */

import _ from 'lodash';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Layout, Breadcrumb} from 'antd';
import {components, utils} from 'baidu-acu-react-common';

import routes from 'configure/routes';
import NotFound from '../../components/common/NotFound';

import renderBreadCrumbs from './renderBreadCrumbs';

const ErrorBoundary = components.ErrorBoundary;
const {Content} = Layout;
const renderRoutes = utils.renderRoutes;

/* globals React */
class AppMain extends React.Component {
    componentDidMount() {
        this.timerId = setTimeout(this.onLoaded, 10000);
    }

    onLoaded = () => {
        this.preloadChunk();
    }

    preloadChunk = () => {
        _.map(routes, ({component}) => {
            component && component.preload();
        });
    };

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const {layout, pathname} = this.props;
        const breadCrumbs = renderBreadCrumbs(layout, pathname);

        return (
            <ErrorBoundary>
                <Layout className="main-area">
                    {breadCrumbs && (
                        <Breadcrumb separator=">">
                            {breadCrumbs}
                        </Breadcrumb>
                    )}
                    <Content className="main-content">
                        <div className="biz-content">
                            <Switch>
                                {renderRoutes(routes)}
                                <Route key="notFound" component={NotFound} />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </ErrorBoundary>
        );
    }
}

export default withRouter(AppMain);
