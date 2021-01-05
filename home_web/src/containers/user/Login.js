/**
 * @file containers/user/Login
 * @author sunwen05
 */

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as UserAction from 'actions/UserAction';
import Login from 'modules/user/Login';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
