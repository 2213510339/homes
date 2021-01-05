/**
 * @file containers/layout/PrimaryLayout.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import * as LayoutAction from '../../actions/LayoutAction';
import PrimaryLayout from '../../modules/layout/PrimaryLayout';

const PrimaryLayoutContainer = props => (
    <PrimaryLayout {...props} />
);

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    layout: state.layout
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LayoutAction, dispatch)
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PrimaryLayoutContainer)
);
