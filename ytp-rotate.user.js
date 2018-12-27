// ==UserScript==
// @author          zhzLuke96
// @name            油管视频旋转
// @name:en         youtube player rotate plug
// @version         0.2
// @description     油管的视频旋转插件.
// @description:en  rotate youtebe player.
// @namespace       https://github.com/zhzLuke96/
// @match           https://www.youtube.com/watch?v=*
// @grant           none
// ==/UserScript==

(function () {
    'use strict';
    var $ = (...args) => document.querySelector.apply(document,args)

    function css_load(text) {
        var ret = {}
        for (var row of text.split(";")) {
            if (row != "") {
                var t = row.split(":")
                ret[t[0].trim()] = t[1].trim();
            }
        }
        return ret
    }

    function css_dump(obj) {
        var ret = ""
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret += `${key}:${obj[key]};`
            }
        }
        return ret
    }
    var $ytp = $(".html5-main-video")
    var $vc = $(".html5-video-player")
    var state = 0

    function rotate_vid() {
        var css = css_load($ytp.style.cssText)
        state = (state + 1) % 4
        if (css["transform"] == undefined) state = 1
        var deg = state * 90

        var x = state % 2 == 0 ? $ytp.clientWidth : $ytp.clientHeight
        var y = state % 2 == 1 ? $ytp.clientWidth : $ytp.clientHeight
        css.left = ~~(($vc.clientWidth - x * (y / $vc.clientHeight)) / 2) + "px"

        css["transform"] = `rotate(${deg}deg)`
        css["transform"] += ` scale(${$vc.clientHeight / y})`
        $ytp.style.cssText = css_dump(css)
    }

    function toggle_tans(el, repr) {
        var css = css_load(el.style.cssText)
        var t = css["transform"]
        if (t) {
            if (t.indexOf(repr) != -1) {
                css["transform"] = t.replace(repr, "")
            } else {
                css["transform"] += " " + repr
            }
        } else {
            css["transform"] = repr
        }
        el.style.cssText = css_dump(css)
    }

    function addbutton(html, options, onRight = true) {
        var p, push;
        if (onRight) {
            p = $(".ytp-right-controls")
            push = n => p.insertBefore(n, p.firstElementChild)
        } else {
            // left
            p = $(".ytp-left-controls")
            push = n => p.appendChild(n)
        }
        var b = $(".ytp-settings-button").cloneNode(true)
        b.innerHTML = html
        b.className = "ytp-button"
        push(b)
        if (options.click) b.addEventListener("click", options.click)
        if (options.css) b.style.cssText = options.css
        if (options.id) b.id = options.id
        if (options.title) b.title = options.title
        return void 0;
    }
    
    // rotate 90
    addbutton(`
    <svg viewBox="0 0 1536 1536" aria-labelledby="rwsi-awesome-repeat-title" id="si-awesome-repeat" width="100%" height="100%"><title id="rwsi-awesome-repeat-title">icon repeat</title><path d="M1536 128v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138Q969 256 768 256q-104 0-198.5 40.5T406 406 296.5 569.5 256 768t40.5 198.5T406 1130t163.5 109.5T768 1280q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5T768 1536q-156 0-298-61t-245-164-164-245T0 768t61-298 164-245T470 61 768 0q147 0 284.5 55.5T1297 212l130-129q29-31 70-14 39 17 39 59z"></path></svg>
    `, {
        click: rotate_vid,
        css: "fill:white;width:20px;margin-right:1rem;",
        id: "rotate-btn",
        title: "rotate"
    })
    
    // flip horizintal
    addbutton(`
    <svg viewBox="0 0 1792 640" aria-labelledby="bmsi-awesome-arrows-h-title" id="si-awesome-arrows-h" width="100%" height="100%"><path d="M1792 320q0 26-19 45l-256 256q-19 19-45 19t-45-19-19-45V448H384v128q0 26-19 45t-45 19-45-19L19 365Q0 346 0 320t19-45L275 19q19-19 45-19t45 19 19 45v128h1024V64q0-26 19-45t45-19 45 19l256 256q19 19 19 45z"></path></svg>
    `, {
        click() {
            if ($ytp.style.cssText.indexOf("transform") == -1)state = 0
            if (state % 2 == 1) toggle_tans($ytp, "rotateX(180deg)")
            else toggle_tans($ytp, "rotateY(180deg)")
        },
        css: "fill:white;width:20px;margin-right:1rem;",
        id: "horizintal-btn",
        title: "horizintal"
    })
    
    // flip vertical
    addbutton(`
    <svg viewBox="0 0 640 1792" aria-labelledby="bnsi-awesome-arrows-v-title" id="si-awesome-arrows-v" width="100%" height="100%"><path d="M640 320q0 26-19 45t-45 19H448v1024h128q26 0 45 19t19 45-19 45l-256 256q-19 19-45 19t-45-19L19 1517q-19-19-19-45t19-45 45-19h128V384H64q-26 0-45-19T0 320t19-45L275 19q19-19 45-19t45 19l256 256q19 19 19 45z"></path></svg>
    `, {
        click() {
            if ($ytp.style.cssText.indexOf("transform") == -1)state = 0
            if (state % 2 == 0) toggle_tans($ytp, "rotateX(180deg)")
            else toggle_tans($ytp, "rotateY(180deg)")
        },
        css: "fill:white;width:10px;margin-right:1rem;",
        id: "vertical-btn",
        title: "vertical"
    })
})();