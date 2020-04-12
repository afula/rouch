import React from 'react';
import { useSelector } from 'react-redux';

import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import FunctionBar from './FunctionBar';
import LinkmanList from './LinkmanList';

import Style from './FunctionBarAndLinkmanList.less';
import { State } from '../../state/reducer';
import useAero from '../../hooks/useAero';

function FunctionBarAndLinkmanList() {
    const isLogin = useIsLogin();
    const action = useAction();
    const functionBarAndLinkmanListVisible = useSelector(
        (state: State) => state.status.functionBarAndLinkmanListVisible,
    );
    const aero = useAero();
    const isAdmin = useSelector((state: State) => state.user && state.user.isAdmin);
    if (!functionBarAndLinkmanListVisible) {
        return null;
    }

    function handleClick(e: any) {
        if (e.target === e.currentTarget) {
            action.setStatus('functionBarAndLinkmanListVisible', false);
        }
    }

    return (
        <div className={Style.functionBarAndLinkmanList} onClick={handleClick} role="button">
            <div className={Style.container} {...aero}>
                {isLogin && isAdmin && <FunctionBar />}
                {isLogin && <LinkmanList />}
                {/* 登陆后展示群组和好友信息 */}
                {/* <LinkmanList /> */}
            </div>
        </div>
    );
}

export default FunctionBarAndLinkmanList;
