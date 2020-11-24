'use strict';

import './../scss/common.scss';

import $ from 'jquery';

window.$ = window.jQuery = $;
import slick from 'slick-carousel';

import {mindSlider} from './partials/mind_slider'

window.addEventListener('DOMContentLoaded', () => {
    openMore();
    submitForm();
    initializeTimer();


    function openMore() {
        const $btnMore = $('#btn_more');
        const $shadow = $('.about_top .shadow');
        const $aboutBottom = $('.about_bottom');

        $btnMore.on('click', function () {
            $(this).text(function (i, text) {
                return text === "Читати повністю" ? "Згорнути" : "Читати повністю";
            })

            $aboutBottom.slideToggle();
            $shadow.fadeToggle()
        })
    }

    function submitForm() {
        $(document).on('submit', '.black_friday_2020 #bf2020_form', function (event) {
            event.preventDefault();
            let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let email = $(this).serializeArray()[0].value;

            if (email.length) {
                if (!emailRegExp.test(email)) {
                    email.classList.add('error');
                    $('.js-subscription_tooltip_bf2020').show();
                    return false;
                }

                $.post(window.location.pathname, {email: email, id: 30})
                    .done(function (response) {
                        $('.black_friday_2020 #bf2020_form').html('');
                        $('.black_friday_2020 #bf2020_form').html(' <div class="second_screen js_form_success">\n' +
                            '                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                            '                            <circle cx="24" cy="24" r="22.5" stroke="#00FFF0" stroke-width="3"/>\n' +
                            '                            <path d="M15 23.0963L23.0125 31.1088L35 19.1213" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                            '                        </svg>\n' +
                            '\n' +
                            '                        <div>Ви підписались</div>\n' +
                            '                    </div>');

                        dataLayer.push({
                            'eventCategory': 'landing',
                            'eventAction': 'blackFriday',
                            'eventLabel': 'formSend',
                            'event': 'autoEvent'
                        })
                    })
                    .fail(function (data) {
                        $('.black_friday_2020 #bf2020_form').html('');
                        $('.black_friday_2020 #bf2020_form').html(' <div class="second_screen js_form_success">\n' +
                            '                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                            '                            <circle cx="24" cy="24" r="22.5" stroke="#00FFF0" stroke-width="3"/>\n' +
                            '                            <path d="M15 23.0963L23.0125 31.1088L35 19.1213" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                            '                        </svg>\n' +
                            '\n' +
                            '                        <div>Ви вже підписались</div>\n' +
                            '                    </div>');
                    });
            }

        });
    }

    function setTimePage(e, t, n, o) {
        const i = document.getElementById("days"),
            r = document.getElementById("hours"),
            s = document.getElementById("minutes"),
            a = document.getElementById("seconds");
        i.innerHTML = e,
            r.innerHTML = t,
            s.innerHTML = n,
            a.innerHTML = o
    }

    function initializeTimer() {
        var timerId = '';
        var e, t, n, o = (new Date(2020, 10, 28) - new Date) / 1e3;
        0 < o ?
            (n = (t = (e = o / 60) / 60) / 24, e = 60 * (t - Math.floor(t)), n = Math.floor(n), t = Math.floor(t) - 24 * n, o = Math.floor(60 * (e - Math.floor(e))), e = Math.floor(e), setTimePage(n, t, e, o), timerId = setInterval(function () {
                0 == o ? 0 == e ? 0 == t ? 0 == n ? showMessage(timerId) : (n--, t = 24, o = e = 59) : (t--, o = e = 59) : (e--, o = 59) : o--, setTimePage(n, t, e, o)
            }, 1e3)) :
            $("#timer").hide()
    }

    if (window.innerWidth < 768) {
        mindSlider();
    }

    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     mindSlider();
    // }
})