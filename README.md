# ytp-rotate - 油管视频旋转脚本

油管视频旋转插件。Tampermonkey脚本。 

## 功能

- 旋转视频播放器视角
- 水平翻转视频
- 垂直翻转视频
- 打开和关闭全屏填充模式
- 打开和关闭画中画模式

## 用法

### 快捷按钮

在播放器右侧控制栏添加了两个快捷按钮:

- 旋转视频按钮: 点击可顺时针旋转视频0度
- 填充屏幕按钮: 点击可切换全屏填充模式

![buttons](https://github.com/zhzLuke96/ytp-rotate/raw/master/docs/btns.png)

> 红框内为本脚本添加内容

### 右键菜单

在视频播放器上右键,可以看到添加的选项:

- 开/关插件: 可以关闭插件避免和其它脚本冲突
- 旋转90°: 显示/切换 旋转角度
- 填充屏幕: 显示/切换 全屏填充模式
- 水平翻转: 显示/切换 水平翻转
- 垂直翻转: 显示/切换 垂直翻转  
- 画中画: 显示/切换 在画中画模式

![menu](https://github.com/zhzLuke96/ytp-rotate/raw/master/docs/menu.png)

> 红框内为本脚本添加内容


## Issues
- [Github Issues](https://github.com/zhzLuke96/ytp-rotate/issues)
- [Greasyfork Feedback](https://greasyfork.org/zh-CN/scripts/375568-%E6%B2%B9%E7%AE%A1%E8%A7%86%E9%A2%91%E6%97%8B%E8%BD%AC/feedback)

## Change Log

### [2.6] - 2024-05-01
- 使用 player 内部组件实例监听变化 (通过首页点进视频时无法显示按钮 #6)

### [2.5] - 2023-12-19
- init bug fix (后台打开视频时出现白边问题 #5)

### [2.4] - 2023-12-16
- 监听resize (后台打开视频时出现白边问题 #5)
- 移除badge

### [2.2] [2.3] - 2023-12-03
- Compatible with new version of YouTube player

### [2.1] - 2023-11-01
- fix vertical rotate bug
- change script namespace

### [2.0] - 2023-10-28
- 重构代码
- 增加svg图标
- 优化插件监听方法
- 增加填充屏幕模式功能
- 移除github链接菜单按钮
- 右键菜单中增加开启关闭插件的选项,可以避免和其它脚本冲突


## License

MIT
