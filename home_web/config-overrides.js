const { override, fixBabelImports } = require('customize-cra');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    })
);
module.exports = {
    rules: {
        'import/no-unresolved': 'off',
        'import/order': 'off', // 不需要引入顺序验证
        'react/jsx-no-bind': [
            'warn',
            {
                allowArrowFunctions: true // 暂且允许箭头函数，来提升代码可读性
            }
        ],
        'comma-dangle': ['error', 'never'], // 不允许最后多余的逗号
        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
    }
}