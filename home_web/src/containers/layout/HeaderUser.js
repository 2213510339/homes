/**
 * @file containers/layout/HeaderUser.js
 * @author sunwen05
 */

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import * as UserAction from 'actions/UserAction';
import HeaderUser from 'modules/layout/HeaderUser';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    userDetail: state.user.userDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserAction, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderUser));
