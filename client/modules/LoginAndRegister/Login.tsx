import React, { useState } from 'react';
import platform from 'platform';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import useAction from '../../hooks/useAction';

import Style from './LoginRegister.less';
import { login, getLinkmansLastMessages } from '../../service';
import getFriendId from '../../../utils/getFriendId';
import { Message } from '../../state/reducer';
import convertMessage from '../../../utils/convertMessage';
import { ActionTypes } from '../../state/action';
import Fingerprint2 from 'fingerprintjs2';

/** 登录框 */
function Login() {
    const action = useAction();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprint, setFingerPrint] = useState('');

    // function getFinger(){
    //     let fp: string = '';
    //     Fingerprint2.get((components: any[]) => {
    //         // console.log(components); // an array of components: {key: ..., value: ...}
    //         const values = components.map((component) => component.value);
    //         fp = Fingerprint2.x64hash128(values.join(''), 31);
    //         setFingerPrint(fp);
    //     });
    // }
    // console.log('f', fingerprint);

    async function handleLogin() {
        let fp: string = '';
        // 指纹
        Fingerprint2.get((components: any[]) => {
            // console.log(components); // an array of components: {key: ..., value: ...}
            const values = components.map((component) => component.value);
            fp = Fingerprint2.x64hash128(values.join(''), 31);
            setFingerPrint(fp);
        });
        console.log('get fingerprint', fingerprint);
        const user = await login(
            username,
            password,
            fingerprint,
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
            <h3 className={Style.title}>用户名</h3>
            <Input
                className={Style.input}
                value={username}
                onChange={setUsername}
                onEnter={handleLogin}
            />
            <h3 className={Style.title}>密码</h3>
            <Input
                className={Style.input}
                type="password"
                value={password}
                onChange={setPassword}
                onEnter={handleLogin}
            />
            <button className={Style.button} onClick={handleLogin} type="button">
                登录
            </button>
        </div>
    );
}

export default Login;
