// ==UserScript==
// @name        Dark-Trakt
// @namespace   https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/dark-trakt.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     2.3
// @author      Hist
// @description Dark Theme for Trakt.tv
// @run-at      document-start
// @icon        https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/logos/logo.png?raw=true
// @downloadURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/raw/main/scripts/dark-trakt.user.js
// @homepageURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts
// ==/UserScript==
'use strict';
var darkMode=`
    header#top-nav .navbar-nav li>a:hover,
    header#top-nav .navbar-nav li>a.selected {
        color: #ed1c24!important;
    }
    div > #info-wrapper .sidebar .poster {
        border: none!important;
    }
    .left > .comment-wrapper .above-comment,
    .right > .comment-wrapper .above-comment,
    span.toggle-subnav-wrapper.open {
        background-color: #151515!important;
    }
    .popover-content > ul.lists li,
    .grid-item .quick-icons .metadata .popover .popover-title,
    .grid-item .quick-icons .actions .popover .popover-title {
        color: #fff!important;
    }
    .action-buttons > .popover.remove .popover-title {
        color: #fff !important;
    }
    #ondeck-wrapper,
    #schedule-wrapper,
    #network-wrapper,
    #recommendations-wrapper,
    #charts-wrapper,
    #activity-wrapper,
    #recent-wrapper,
    #info-wrapper,
    #history-items,
    #progress-wrapper,
    #collection-items,
    #rating-items,
    #user-comments,
    #network-user-wrapper,
    #hu-ck-s-t-er-content-page,
    .users.lists > section,
    .users.list > div > section,
    .users.watchlist > div > section,
    .users.recommendations > div > section,
    .summary-activity,
    .subnav-wrapper,
    .subnav-wrapper .comment-wrapper,
    .subnav-text,
    body.discover #recent-comments-wrapper #recent-comments-title {
        background-color: #151515!important;
    }
    .actor-tooltip .tooltip-inner {
    background-color: #333!important;
        color: #fff!important;
    }
    .actor-tooltip .tooltip-inner .alt {
    color: #ed1c24!important;
        font-weight: bold!important;
    }
    .subnav-wrapper .left h2 .right a,
    .popover.with-list h3,
    header#top-nav #header-search #header-search-type a,
    #main-search input.footer-search {
        color: #fff!important
    }
    .shade {
        background-image: linear-gradient(to bottom,rgba(0,0,0,0) 0%, rgba(15,15,15,1) 100%)!important;
    }
    body.main.home .hero-wrapper.light h1, 
    body.main.home .hero-wrapper.light h2, 
    body.main.index .hero-wrapper.light h1, 
    body.main.index .hero-wrapper.light h2, 
    body.apps .hero-wrapper.light h1, 
    body.apps .hero-wrapper.light h2, 
    body.welcome .hero-wrapper.light h1, 
    body.welcome .hero-wrapper.light h2, 
    body.branding .hero-wrapper.light h1, 
    body.branding .hero-wrapper.light h2 {
        color: black!important;
    }
    body.apps #apps-icon-wrapper {
        background: -webkit-radial-gradient(center,circle cover,#fff 0%,#000 100%)!important;
    }
    #watch-now-country-select .form-control {
        color: #fff!important;
        background-color: #000!important;
    }
    .custom-list .list-info .info .overview blockquote,
    .comment-wrapper .comment blockquote,
    input, select, textarea {
        background-color: #333;
    } 
    body.discover #recent-comments-wrapper #recent-comments #recent-comments-title .schedule-episode h4,
    body.discover #recent-comments-wrapper #recent-comments #recent-comments-title .schedule-episode h5 {
        color: white!important;
    }
    .comment-wrapper {
        border-radius: 0!important;
    }

    #hu-ck-ster-content-page,
    #hu-ck-ster-desk-top-wrapper,
    #hu-ck-ster-mob-ile-wrapper {
    display: none!important;
    }

    .alert-no-data {
    background-color: #333!important;
    color: #fff!important;
    }

    #auth-form-wrapper,
    .checkin-modal {
    background-color: #151515!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    #auth-form-wrapper .auth-services-wrapper,
    .checkin-modal .auth-services-wrapper {
    background-color: #151515!important;
    border-color: #333!important;
    }

    #auth-form-wrapper .bottom-wrapper,
    .checkin-modal .bottom-wrapper {
    background-color: #151515!important;
    border-color: #333!important;
    }

    #auth-form-wrapper .logo-wrapper .base,
    .checkin-modal .logo-wrapper .base {
    background-color: #151515!important;
    }

    #charts-wrapper h3 {
    color: #bbb!important;
    }

    body:not(.dark-knight) .genre-bars.light .bar label {
    color: #fff!important;
    }

    body:not(.dark-knight) .genre-bars.light .bar label .count a {
    color: #bbb!important;
    }

    .comment-wrapper {
    background-color: #1d1d1d!important;
    }

    .comment-wrapper.featured {
    background-color: #1d1d1d!important;
    }

    .comment-wrapper.featured .above-comment {
    background-color: #333!important;
    }

    .comment-wrapper.list:not(.subnav) {
    background-color: #333!important;
    padding-bottom: 0!important;
    }

    .comment-wrapper.list .above-comment .user-name h4 a.username {
    color: #fff!important;
    }

    .comment-wrapper .pill {
    background-color: #ed1c24!important;
    color: #fff!important;
    }

    .comment-wrapper .above-comment {
    background-color: #333!important;
    }

    .comment-wrapper .above-comment .date {
    color: #fff!important;
    }

    .comment-wrapper .comment mark {
    background-color: #151515!important;
    border-radius: 3px!important;
    color: #ed1c24!important;
    padding: 2px 4px!important;
    }

    body.comments #info-wrapper .pill {
    background-color: #ed1c24!important;
    color: #fff!important;
    }

    .custom-list .list-info .posters .poster-items-wrapper .poster-items .poster-item {
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    .custom-list .list-info .user-actions .icon.btn-list-subscribe {
    color: #fff!important;
    }

    .dropdown .dropdown-menu,
    .dropdown:not(.filter-dropdown) .dropdown-toggle,
    .dropdown.open:not(.filter-dropdown) > .dropdown-toggle {
    background-color: #333!important;
    border-color: #1d1d1d!important;
    color: #fff!important;
    }

    .dropdown .dropdown-menu > li > a {
    color: #fff!important;
    }

    .dropdown .dropdown-menu > li > a:hover {
    background-color: #1d1d1d!important;
    }

    .filter-dropdown .metadata .trakt-icon-wand {
    color: #fff!important;
    }

    .filter-dropdown .metadata .caret {
    color: #fff!important;
    }

    .form-control {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    .form-control[disabled],
    .form-control[readonly] {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    .form-control:focus {
    border-color: #ed1c24!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    header#top-nav #header-search #header-search-query {
    background-color: #333!important;
    color: #fff!important;
    }

    header a {
    color: #fff!important;
    }

    h2 .feed-icons .feed-icon {
    color: #bbb!important;
    }

    .filter-dropdown .icon.trakt-icon-divider {
    color: #fff!important;
    }

    .btn-list-edit-items {
    color: #fff!important;
    }

    #btn-list-edit-lists {
    color: #fff!important;
    }

    .btn-summary:not(.selected):not(:hover):not(.btn-checkin) {
    background-color: #151515!important;
    }

    #info-wrapper .sidebar .external li a,
    #info-wrapper .affiliate-links .section a {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    #info-wrapper .info #actors .posters ul li .name {
    color: #fff!important;
    }

    #info-wrapper .info #actors .posters ul li .character {
    color: #bbb!important;
    }

    #info-wrapper .info .action-buttons > .btn:not(.selected):not(:hover) .side-btn {
    background-color: #000!important;
    color: #fff!important;
    }

    #info-wrapper .sidebar .poster {
    border: 0 !important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    #info-wrapper .sidebar .streaming-links {
    background-color: #333!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    #info-wrapper .sidebar .btn-watch-now {
    background-color: #333!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    }

    #info-wrapper .sidebar .external li a:hover {
    background-color: #ed1c24!important;
    border-color: #ed1c24!important;
    }

    #info-wrapper .affiliate-links .section a:hover {
    background-color: #ed1c24!important;
    border-color: #ed1c24!important;
    }

    #info-wrapper .season-links .links ul li a.selected {
    color: #ed1c24!important;
    }

    .applications h3.instructions,
    .authorized_applications h3.instructions,
    .settings h3.instructions,
    .widgets h3.instructions {
    background-color: #1d1d1d!important;
    border-bottom: solid 1px #333!important;
    }

    hr {
    border-top-color: #333!important;
    }

    #user-menu ul li.dark-knight a {
    display: none!important;
    }

    #network-wrapper .posters .poster {
    border: 0!important;
    }

    #network-wrapper .posters .poster-under {
    background-color: #333!important;
    }

    #network-wrapper .posters .poster-under .text {
    color: #bbb!important;
    }

    #network-wrapper .posters .poster-under .user-avatar img {
    background-color: #333!important;
    border-color: #333!important;
    }

    #network-wrapper .posters .action {
    border-color: #333!important;
    }

    #network-wrapper .posters .activity-date {
    background-color: #333!important;
    color: #fff!important;
    }

    #network-wrapper a:not(.username) {
    color: #fff!important;
    }

    #network-wrapper .alert-no-data {
    background-color: #333!important;
    color: #fff!important;
    }

    .new-comment-wrapper textarea,
    .new-comment-wrapper.update textarea,
    .new-comment-wrapper.update .emojionearea .emojionearea-editor,
    .new-comment-wrapper.update .under-help .checkboxes .btn-group .btn,
    .new-comment-wrapper .emojionearea .emojionearea-editor,
    .new-comment-wrapper .under-help .checkboxes .btn-group .btn {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    .new-comment-wrapper textarea:focus {
    border-color: #ed1c24!important;
    }

    .new-comment-wrapper.update textarea:focus {
    border-color: #ed1c24!important;
    }

    .new-comment-wrapper.update .emojionearea .emojionearea-editor:focus {
    border-color: #ed1c24!important;
    }

    .new-comment-wrapper .emojionearea .emojionearea-editor:focus {
    border-color: #ed1c24!important;
    }

    #ondeck-wrapper .posters .poster {
    border: 0!important;
    }

    #ondeck-wrapper .posters .titles-link {
    color: #fff!important;
    }

    #ondeck-wrapper .grid-item .quick-icons {
    background-color: #333!important;
    border: 0!important;
    }

    #ondeck-wrapper .ignore:hover {
    color: #ed1c24!important;
    }

    ul.pagination li a {
    color: #fff!important;
    }

    ul.pagination li a:hover {
    color: #ed1c24!important;
    }

    ul.pagination li:not(.active) a {
    background-color: #151515!important;
    }

    ul.pagination li .disabled a {
    color: #bbb!important;
    }

    ul.pagination > .disabled > a {
    background-color: #151515!important;
    color: #bbb!important;
    }

    ul.pagination > .disabled > a:hover {
    background-color: #151515!important;
    color: #bbb!important;
    }

    ul.pagination .gap a {
    color: #fff!important;
    }

    .panel {
    background-color: #1d1d1d!important;
    border-color: #333!important;
    }

    .panel .panel-heading {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    .popover-title,
    .frame-wrapper .sidenav .feeds .popover .popover-title {
    background-color: #333!important;
    border-color: #333!important;
    color: #fff!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline td,
    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline th {
    background-color: #333!important;
    border-color: #bbb!important;
    color: #fff!important;
    font-weight: normal!important;
    }

    .popover {
    background-color: #1d1d1d!important;
    }

    .popover .data-wrapper {
    background-color: #333!important;
    }

    .popover .data-wrapper input {
    color: #fff!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker {
    color: #fff!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline {
    background-color: #1d1d1d!important;
    border-top-color: #333!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline .xdsoft_timepicker .xdsoft_time_box {
    border-color: #bbb!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline .xdsoft_timepicker .xdsoft_time_box > div > div {
    background-color: #333!important;
    border-color: #bbb!important;
    color: #fff!important;
    font-weight: normal!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker.xdsoft_inline .xdsoft_label > .xdsoft_select {
    background-color: #333!important;
    border-color: #bbb!important;
    color: #fff!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker .xdsoft_prev {
    -webkit-filter: invert(100%)!important;
    filter: invert(100%)!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker .xdsoft_next {
    -webkit-filter: invert(100%)!important;
    filter: invert(100%)!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker .xdsoft_today_button {
    -webkit-filter: invert(100%)!important;
    filter: invert(100%)!important;
    }

    .popover .data-wrapper .xdsoft_datetimepicker .xdsoft_label i {
    -webkit-filter: invert(100%)!important;
    filter: invert(100%)!important;
    }

    .popover.bottom > .arrow::after {
    border-bottom-color: #333!important;
    border-top-color: #333!important;
    }

    .posters .poster {
    border: 0!important;
    }

    .posters > div .quick-icons {
    border: 0!important;
    }

    section > .container > .posters > .grid-item .quick-icons {
    background-color: #333!important;
    }

    #progress-wrapper .row .main-info .seasons {
    background-color: #1d1d1d!important;
    }

    #progress-wrapper .row .main-info .seasons > div .season-toggle .fa {
    color: #fff!important;
    }

    #progress-wrapper .row .main-info .seasons > div .season-toggle .season {
    color: #fff!important;
    }

    #recently-watched-wrapper .quick-icons {
    background-color: #333!important;
    }

    #recommendations-wrapper .quick-icons {
    background-color: #333!important;
    }

    #recommendations-wrapper .grid-item h4 a {
    color: #bbb!important;
    }

    #recommendations-wrapper .grid-item h4:hover a {
    color: #ed1c24!important;
    }

    .mCS-rounded-dark.mCSB_scrollTools .mCSB_draggerRail {
    background-color: #333!important;
    }

    .mCS-rounded-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: #ed1c24!important;
    }

    .mCS-rounded-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar:hover {
    background-color: #ed1c24!important;
    }

    .mCS-rounded-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar:active {
    background-color: #ed1c24!important;
    }

    .mCS-rounded-dots-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: #ed1c24!important;
    }

    .mCS-rounded-dots-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar:hover {
    background-color: #ed1c24!important;
    }

    .mCS-rounded-dots-dark.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar:active {
    background-color: #ed1c24!important;
    }

    #seasons-episodes-sortable .under-info .titles {
    background-color: #333!important;
    }

    #seasons-episodes-sortable .under-info .episode-stats {
    background-color: #1d1d1d!important;
    }

    #seasons-episodes-sortable .under-info h3 a {
    color: #fff!important;
    }

    .summary-activity .tabs .tab {
    border-color: #333!important;
    color: #fff!important;
    }

    .summary-activity .tabs .tab.selected {
    background-color: #333!important;
    border-bottom-color: #333!important;
    }

    .users-wrapper {
    background-color: #333!important;
    border-color: #333!important;
    }

    body {
    color: #fff!important;
    }

    .grid-item .titles-link {
    color: #fff!important;
    }

    #main-search input.footer-search {
    color: #000!important;
    }
`;
GM_addStyle(darkMode)
