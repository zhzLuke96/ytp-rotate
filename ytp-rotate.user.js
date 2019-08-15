// ==UserScript==
// @author          zhzLuke96
// @name            油管视频旋转
// @name:en         youtube player rotate plug
// @version         0.6
// @description     油管的视频旋转插件.
// @description:en  rotate youtebe player.
// @namespace       https://github.com/zhzLuke96/
// @match           https://www.youtube.com/watch?v=*
// @grant           none
// ==/UserScript==

(function () {
    'use strict';
    const rule_name = "ytp_player_user_js"
    const $ = q => document.querySelector(q);
    const $ytp = $(".html5-main-video");
    const $vid = $(".html5-video-player");
    const currentLang = (navigator.language || navigator.browserLanguage || navigator.systemLanguage).toLowerCase();
    const on_zh_lang = currentLang.indexOf("zh") > -1;
    
    const $style = document.createElement('style');
    let currentCSS = {};
    document.getElementsByTagName('head')[0].appendChild($style);
    function setPlayerStyle(rule){
        $style.innerHTML = `.${rule_name}{${rule}}`;
    }
    function toggleRuleTransform(rule){
        if(currentCSS["transform"]){
            if(currentCSS["transform"].indexOf(rule) > -1)
                currentCSS["transform"] = currentCSS["transform"].replace(rule,"")
            else
                currentCSS["transform"] += rule;
        }else{
            currentCSS["transform"] = rule;
        }
        setPlayerStyle(css_dump(currentCSS));
    }
    $ytp.classList.add(rule_name);
    setTimeout(()=>$ytp.addEventListener("resize", refresh_vid_style),1000);

    (rule => {
        var style = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(style);
        style.innerHTML = rule
    })(`
    video.ytp_horizintal{transform:rotateX(180deg)}
    video.ytp_vertical{transform:rotateY(180deg)}
    `)
    let state = 0;

    function css_dump(obj) {
        let ret = "";
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret += `${key}:${obj[key]} !important;`;
            }
        }
        return ret;
    }

    function refresh_vid_style(){
        let css = {};
        let deg = state * 90;
        // let x = state % 2 == 0 ? $ytp.clientWidth : $ytp.clientHeight;
        let y = state % 2 == 1 ? $ytp.clientWidth : $ytp.clientHeight;
        // css.left = ~~(($vid.clientWidth - x * (y / $vid.clientHeight)) / 2) + "px";

        css["transform"] = `rotate(${deg}deg)`;
        css["transform"] += ` scale(${$vid.clientHeight / y})`;
        currentCSS = css;
        setPlayerStyle(css_dump(css));
    }

    function rotate_vid() {
        state = (state + 1) % 4;
        refresh_vid_style()
    }

    function addbutton(html, options, onRight = true) {
        let p, push;
        if (onRight) {
            p = $(".ytp-right-controls");
            push = n => p.insertBefore(n, p.firstElementChild);
        } else {
            // left
            p = $(".ytp-left-controls");
            push = n => p.appendChild(n);
        }
        let b = $(".ytp-settings-button").cloneNode(true);
        b.innerHTML = html;
        b.className = "ytp-button";
        push(b);
        if (options.click) b.addEventListener("click", options.click);
        if (options.css) b.style.cssText = options.css;
        if (options.id) b.id = options.id;
        if (options.title) b.title = options.title;
        return void 0;
    }

    function append_context_menu({
        label,
        content,
        href,
        callback
    }) {
        label = label || "";
        content = content || "";
        const $menu = document.querySelector(".ytp-contextmenu>.ytp-panel>.ytp-panel-menu");
        if (!$menu || $menu.innerHTML == "") {
            setTimeout(() => append_context_menu({
                label,
                content,
                href,
                callback
            }), 1000);
            return
        }
        let $ele = null;
        if (href) {
            $ele = document.querySelector(".ytp-contextmenu>.ytp-panel>.ytp-panel-menu>a.ytp-menuitem").cloneNode(true)
            $ele.href = href;
        } else {
            $ele = document.querySelector(".ytp-contextmenu>.ytp-panel>.ytp-panel-menu>div.ytp-menuitem").cloneNode(true)
        }
        $ele.querySelector(".ytp-menuitem-label").innerHTML = label;
        $ele.querySelector(".ytp-menuitem-content").innerHTML = content;
        if (typeof (callback) == "function") $ele.addEventListener("click", callback)

        $menu.appendChild($ele)
    }

    // rotate 90
    addbutton(`
    <svg viewBox="0 0 1536 1536" aria-labelledby="rwsi-awesome-repeat-title" id="si-awesome-repeat" width="100%" height="100%"><title id="rwsi-awesome-repeat-title">icon repeat</title><path d="M1536 128v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138Q969 256 768 256q-104 0-198.5 40.5T406 406 296.5 569.5 256 768t40.5 198.5T406 1130t163.5 109.5T768 1280q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5T768 1536q-156 0-298-61t-245-164-164-245T0 768t61-298 164-245T470 61 768 0q147 0 284.5 55.5T1297 212l130-129q29-31 70-14 39 17 39 59z"></path></svg>
    `, {
        click: rotate_vid,
        css: "fill:white;width:20px;margin-right:1rem;",
        id: "rotate-btn",
        title: on_zh_lang ? "旋转视频" : "rotate"
    })

    // github link
    append_context_menu({
        label: "-- github --",
        content: "️️⭐",
        href: "https://github.com/zhzLuke96/ytp-rotate",
    })

    // rotate menuitem
    append_context_menu({
        callback: rotate_vid,
        label: on_zh_lang ? "旋转90°" : "rotate 90°",
        content: "️️🔁",
    })

    // flip horizintal
    append_context_menu({
        callback() {
            if (state % 2 == 1)toggleRuleTransform("rotateX(180deg)")
            else toggleRuleTransform("rotateY(180deg)");
        },
        label: on_zh_lang ? "水平翻转" : "flip horizintal",
        content: "️️↔️",
    })

    // flip vertical
    append_context_menu({
        callback() {
            if (state % 2 == 1)toggleRuleTransform("rotateY(180deg)")
            else toggleRuleTransform("rotateX(180deg)");
        },
        label: on_zh_lang ? "垂直翻转" : "flip vertical",
        content: "↕️",
    })

    // picture in picture
    append_context_menu({
        callback() {
            try {
                $("video").requestPictureInPicture();
            } catch (error) {
                let msg = on_zh_lang ? "浏览器不支持[PictureInPicture]或脚本加载错误":"Browser does not support [PictureInPicture] or script loading error";
                console.log(msg);
                alert(msg);
            }
        },
        label: on_zh_lang ? "画中画" : "PIP",
        content: "🖼️",
    })
})();