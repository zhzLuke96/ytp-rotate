# ytp-rotate - YouTube Video Rotator UserScript

## Features
- Rotate the video player view 
- Flip video horizontally
- Flip video vertically
- Toggle fullscreen fill mode
- Toggle picture-in-picture mode

## Usage

### Shortcut Buttons
Two shortcut buttons are added to the right side of the player controls:

- Rotate Video button: Click to rotate the video clockwise by 0 degrees
- Fill Screen button: Click to toggle fullscreen fill mode

![buttons](https://github.com/zhzLuke96/ytp-rotate/raw/master/docs/btns.png)

> Red box shows script additions

### Right Click Menu
Right click on the video player to see added options:

- Toggle Script: Turn the script on/off to avoid conflicts with other scripts
- Rotate 90°: Show/toggle rotation angle  
- Fill Screen: Show/toggle fullscreen fill mode
- Flip Horizontal: Show/toggle horizontal flip
- Flip Vertical: Show/toggle vertical flip
- Picture-in-Picture: Show/toggle picture-in-picture mode

![menu](https://github.com/zhzLuke96/ytp-rotate/raw/master/docs/menu.png)

> Red box shows script additions

## Issues

- [Github Issues](https://github.com/zhzLuke96/ytp-rotate/issues)
- [Greasyfork Feedback](https://greasyfork.org/zh-CN/scripts/375568-%E6%B2%B9%E7%AE%A1%E8%A7%86%E9%A2%91%E6%97%8B%E8%BD%AC/feedback)


## Change Log

### [2.8] - 2024-08-09
- fix TrustedHTML issues

### [2.7] - 2024-05-18
- add update function trigger timing

### [2.6] - 2024-05-01
- 使用 player 内部组件实例监听变化 (通过首页点进视频时无法显示按钮 #6)
 
### [2.5] - 2023-12-19
- init bug fix (后台打开视频时出现白边问题 #5)
 
### [2.4] - 2023-12-16
- observer on resize
- remove badge

### [2.2] [2.3] - 2023-12-03
- Compatible with new version of YouTube player

### [2.1] - 2023-11-01
- Fix vertical rotate bug
- Change script namespace

### [2.0] - 2023-10-28  
- Refactor code
- Add SVG icons
- Improve script listener methods
- Add fill screen mode
- Remove GitHub link menu button
- Add toggle script option to right click menu to avoid conflicts


## License
MIT
