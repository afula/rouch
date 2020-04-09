import React from 'react';

import Dialog from '../../components/Dialog';
import Style from './About.less';
import Common from './Common.less';

interface AboutProps {
    visible: boolean;
    onClose: () => void;
}

function About(props: AboutProps) {
    const { visible, onClose } = props;
    return (
        <Dialog className={Style.about} visible={visible} title="关于" onClose={onClose}>
            <div>
                {/* <div className={Common.block}>
                    <p className={Common.title}>作者主页</p>
                    <a href="https://suisuijiang.com" target="_black" rel="noopener noreferrer">
                        https://suisuijiang.com
                    </a>
                </div> */}
                {/* <div className={Common.block}>
                    <p className={Common.title}>如何运行</p>
                    <a
                        href="https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>架构 / 设计思路</p>
                    <a
                        href="https://github.com/yinxin630/blog/issues/3"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        https://github.com/yinxin630/blog/issues/3
                    </a>
                </div> */}
                {/* <div className={Common.block}>
                    <p className={Common.title}>将fiora安装到主屏(PWA)</p>
                    <ul>
                        <li>点击地址栏最右边三个点按钮(或者地址栏末尾收藏前的按钮)</li>
                        <li>选择&quot;安装 fiora&quot;</li>
                    </ul>
                </div> */}
                <div className={Common.block}>
                    <p className={Common.title}>功能</p>
                    <ul>
                        <li>好友, 群组, 私聊, 群聊</li>
                        <li>文本, 图片, 代码, url等多种类型消息</li>
                        <li>贴吧表情, 滑稽表情, 搜索表情包</li>
                        <li>桌面通知, 声音提醒, 消息语音朗读</li>
                        <li>自定义桌面背景, 主题颜色, 文本颜色</li>
                        <li>查看在线用户, @功能</li>
                        <li>管理员</li>
                        <ul>
                            <li>关小黑屋</li>
                            <li>撤回消息</li>
                            <li>给用户打标签</li>
                            <li>重置用户密码</li>
                            <li>查看用户 ip</li>
                        </ul>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>输入框快捷键</p>
                    <ul>
                        <li>Alt + S: 发送滑稽</li>
                        <li>Alt + D: 发送表情</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>命令消息</p>
                    <ul>
                        <li>-roll [number]: 掷点</li>
                        <li>-rps: 石头剪刀布</li>
                    </ul>
                </div>
                {/* <div className={Common.block}>
                    <p className={Common.title}>友情链接</p>
                    <ul>
                        <li>
                            <a
                                href="https://wangyaxing.cn/"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                木子星兮
                            </a>
                        </li>
                        <li>
                            <a href="http://diy.b7.cn" target="_black" rel="noopener noreferrer">
                                表情生成器
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </Dialog>
    );
}

export default About;
