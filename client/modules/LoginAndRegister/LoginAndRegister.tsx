import React from 'react';
import { useSelector } from 'react-redux';

import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '../../components/Tabs';
import Style from './LoginAndRegister.less';
import AccessByCode from './AccessByCode';
// import Register from './Register';
import Dialog from '../../components/Dialog';
import { State } from '../../state/reducer';
import useAction from '../../hooks/useAction';

function LoginAndRegister() {
    const action = useAction();
    const loginRegisterDialogVisible = useSelector(
        (state: State) => state.status.loginRegisterDialogVisible,
    );

    return (
        <Dialog
            visible={loginRegisterDialogVisible}
            closable={false}
            onClose={() => action.toggleLoginRegisterDialog(true)}
        >
            <Tabs
                className={Style.login}
                defaultActiveKey="login"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="Login" key="login">
                    <AccessByCode />
                </TabPane>
                {/*                <TabPane tab="注册" key="register">
                    <Register />
                </TabPane> */}
            </Tabs>
        </Dialog>
    );
}

export default LoginAndRegister;
