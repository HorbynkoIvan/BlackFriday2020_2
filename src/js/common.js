'use strict';

import './../scss/common.scss';

import $ from 'jquery';

window.$ = window.jQuery = $;

window.addEventListener('DOMContentLoaded', () => {
    openMore();
    function openMore() {
        const $btnMore = $('#btn_more');
        const $shadow = $('.about_top .shadow');
        const $aboutBottom = $('.about_bottom');

        $btnMore.on('click', function () {
            $(this).find('span').text(function (i, text) {
                return text === "Читати повністю" ? "Згорнути" : "Читати повністю";
            })

            $aboutBottom.slideToggle();
            $shadow.fadeToggle()
        })
    }
})