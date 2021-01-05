/**
 * @file modules/other/NotFound
 * @modify zhangzhe
 */

import React from 'react';
import {Link} from 'react-router-dom';

import './index.less';

export default () => (
    <div className="du-not-found">
        <div className="notfound-image" />
        <div className="content">
            <div className="http-text">抱歉，你访问的页面不存在</div>
            <Link to="/login">返回登录页</Link>
        </div>
    </div>
);
