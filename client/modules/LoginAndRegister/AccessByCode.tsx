import React, { useState } from 'react';
import platform from 'platform';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import useAction from '../../hooks/useAction';

import Style from './LoginRegister.less';
import { loginByCode, getLinkmansLastMessages } from '../../service';
import getFriendId from '../../../utils/getFriendId';
import { Message } from '../../state/reducer';
import convertMessage from '../../../utils/convertMessage';
import { ActionTypes } from '../../state/action';
import config from '../../../config/server';

/** 登录框 */
function AccessByCode() {
    const action = useAction();
    const dispatch = useDispatch();
    // const [username, setUsername] = useState('');
    const [code, setCode] = useState('');

    async function handleLoginByCode() {
        console.log(` >>> login code :${code}`);
        const user = await loginByCode(
            code,
            platform.os?.family,
            platform.name,
            platform.description,
        );
        if (user) {
            action.setUser(user);
            action.toggleLoginRegisterDialog(false);
            window.localStorage.setItem('token', user.token);

            const linkmanIds = [
                ...user.groups.map((group: any) => group._id),
                ...user.friends.map((friend: any) => getFriendId(friend.from, friend.to._id)),
            ];
            const linkmanMessages = await getLinkmansLastMessages(linkmanIds);
            Object.values(linkmanMessages).forEach(
                // @ts-ignore
                (messages: Message[]) => messages.forEach(convertMessage),
            );
            dispatch({
                type: ActionTypes.SetLinkmansLastMessages,
                payload: linkmanMessages,
            });
        }
    }

    return (
        <div className={Style.loginRegister}>
            {/* <h3 className={Style.title}>用户名</h3> */}
            {/* <Input */}
            {/*    className={Style.input} */}
            {/*    value={username} */}
            {/*    onChange={setUsername} */}
            {/*    onEnter={handleLogin} */}
            {/* /> */}
            {/*<h3 className={Style.title}>Please Input Your Access Code</h3>*/}
            <Input
                className={Style.input}
                type="code"
                value={code}
                onChange={setCode}
                placeholder="Please Input Your Access Code"
                onEnter={handleLoginByCode}
            />
            <button className={Style.button} onClick={handleLoginByCode} type="button">
                Submit
            </button>
        </div>
    );
}

export default AccessByCode;
