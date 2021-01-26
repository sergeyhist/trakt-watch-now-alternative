// ==UserScript==
// @name        Trakt Alternative Watch - Next Version
// @namespace   https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/trakt-watch-now.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     1.7
// @author      Hist
// @description Trakt Watch Now Alternative Version
// @run-at      document-start
// @icon        https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/logos/logo.png?raw=true
// @downloadURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts
// ==/UserScript==
'use strict';
var watchstyle = `
    .streaming-links,
    .watch-now,
    .btn-watch-now,
    a.btn.btn-block.btn-summary.btn-watch-now.visible-xs.selected {
        display: none!important;
    }
    .btn-collect,
    .btn-list {
        margin-top: 3px!important;
    }
    #cb_cname, #cb_year, #cb_season, #cb_episode {
        margin-inline: 2px;
        cursor: pointer;
    }
    input#cb_year_text, input#cb_season_text, input#cb_episode_text, input#cb_cname_text {
        float: right;
        margin-left: 5px;
        font-size: 15px;
        width: 60%;
    }
    #watch-search {
        display: block;
        color: #fff;
        background-color: rgba(0,0,0,.7);
        padding: 20px 30px;
        font-size: 22px;
        font-family: proxima nova;
        text-align: left;
        border-bottom: solid black 1px;
        background-image: linear-gradient(to right, #0000006e, #691b1b8a);
    }
    #watch-search-string {
        text-transform: capitalize;
    }
    .watch_search_option {
        display: table;
        font-size: 16px;
        height: 30px;
        width: 100%
    }
    .watch_search_option label {
        font-size: 15px;
        float: right;
        padding-top: 2px;
        padding-left: 2px;
        font-weight: 100;
        position: fixed;
        left: 14%;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
    .watch_search_option input {
        font-size: 16px;
        border-radius: 2px;
        border: solid #232020 1px;
        color: #fff;
        background-color: #00000040;
    } 
    .alternative-watch-modal {
        position: fixed;
        z-index: 100000;
        left: 0!important;
        top: 0!important;
        width: 100%!important;
        background-color: rgba(0,0,0,0.4);
    }
    .alternative-watch-content {
        height: 85%;
        overflow: auto;
        overflow-y: overlay;
        overscroll-behavior: contain;
        background-color: #000000de;
        width: 340px;
        position: absolute;
        top: 53%;
        left: 49.9%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .alternative-watch-content::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
    .alternative-watch-close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
        margin-right: 10px;
        margin-top: 4px;
    }
    .wt-title {
        margin-inline: 4%;
        font-family: proxima nova semibold;
        margin-block: 10px;
        text-align: center;
        overflow: hidden;
    }
    .wt-title-button {
        color: #fff;
        padding-block: 5px;
        text-align: center; 
        font-family: proxima nova semibold;
        font-size: 15px;
        border: solid #232020 1px;
        border-radius: 2px;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        -o-user-select:none;
        user-select:none;
        background-image: linear-gradient(to right, #0000006e, #691b1b8a);
        margin-block: 3px;
    }
    .wt-source-name:hover,
    .wt-title-button:hover,
    .watch_search_option label:hover,
    .alternative-watch-close:hover,
    .alternative-watch-close:focus {
        color: #a01717;
        cursor: pointer;
    }
    .wt-source-name {
        text-transform: capitalize; 
    }
    .alternative-watch-modal,
    .content-type-button,
    .language-button,
    .wt-sources,
    input#cb_year_text,
    input#cb_season_text,
    input#cb_episode_text,
    input#cb_cname_text {
        overflow: hidden;
        visibility: hidden;
        transition: opacity .4s ease;
        height: 0;
        opacity: 0;
    }
    .content-type-button,
    .watch_sources_item,
    .language-button {
        margin-inline: 15px;
    }
    .watch_sources_item {
        padding-block: 10px;
        background-image: linear-gradient(231deg, #400b0bcc, #650d0d73);
    }
    #alternative-watch {
        display: inline-block;
        position: relative;
        transition: all .5s;
        color: #9e3131;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
    #alternative-watch:hover {
        cursor: pointer;
        color: white;
        background-color: #9e3131!important;
        text-decoration: none!important;
    }
    .main-aw-button {
        margin-top: 5px;
        height: 54px;
        width: 100%;
        border: solid 1px #9e3131;
        font-size: 3.4em;
        line-height: 1.428571429;
        background-color: inherit;
        z-index: 1199;
    }
    .schedule-aw-button {
        border-radius: 2px;
        font-size: 0.7em;
        position: relative;
        top: 7px;
        background-color: #1515158c;
    }
    .quick-aw-button > .trakt-icon-play2-thick {
        font-size: 1.5em;
        text-align: start;
    }
    .schedule-aw-button > .trakt-icon-play2-thick {
        font-size: 2em;
    }
    .main-aw-button > .trakt-icon-play2 {
        padding-top: 2.4px;
        vertical-align: top;
        margin-left: -1px;
    }
    .main-aw-button .wt-text {
        display: inherit;
        text-transform: uppercase;
        color: inherit;
        font-size: 0.355em;
        position: absolute;
        padding-top: 15px;
        padding-left: 2px;
        font-family: 'proxima nova semibold';
    }
    .schedule-aw-button .wt-text {
        display: inherit;
        text-transform: uppercase;
        color: white;
        padding-right: 7px;
        font-family: 'proxima nova semibold';
        padding-top: 2px;
        vertical-align: middle;
    }
`;
GM_addStyle(watchstyle);
var sources_list = [
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'Youtube',
        link: `https://www.youtube.com/results?search_query=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'Yes!Movies',
        link: `https://yesmovies.ag/searching/%s.html`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'FMovies',
        link: `https://fmovies.to/search?keyword=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'LookMovie-Movies',
        link: `https://lookmovie.io/movies/search/?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'LookMovie-Series',
        link: `https://lookmovie.io/shows/search?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'Vidcloud',
        link: `https://vidcloud9.com/search.html?keyword=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'Soap2day',
        link: `https://soap2day.to/search/keyword/%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'BatFlix',
        link: `https://ww2.batflix.org/search?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'OpenloadMovies',
        link: `https://openloadmov.net/?s=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'LunchFlix',
        link: `https://www.lunchflix.org/?s=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'HiMovies',
        link: `https://www3.himovies.to/search/%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'PutLocker',
        link: `https://ww2.putlocker123.to/search/%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'Rarefilmm',
        link: `https://rarefilmm.com/?s=%s`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'Dramacool',
        link: `https://dramacool.so/search?type=movies&keyword=%s`
    },
    {
        type: 'online',
        content_type: 'cartoon', 
        language: 'english',
        name:'KimCartoon',
        link: `https://kimcartoon.to/AdvanceSearch?cartoonName=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AniMixPlay',
        link: `https://animixplay.to/?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'KickAssAnime',
        link: `https://www2.kickassanime.rs/search?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AniWatch',
        link: `https://aniwatch.me/search?q=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name:'HDEncode',
        link: `https://hdencode.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name:'RLSBB',
        link: `http://search.rlsbb.ru/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name:'Scene-Rls',
        link: `http://scene-rls.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'anime', 
        language: 'english',
        name:'AnimeKaizoku',
        link: `https://animekaizoku.com/?s=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'RARBG',
        link: `https://rarbgtor.org/torrents.php?search=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name:'1337x',
        link: `https://1337x.to/search/%s/1/`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'The Pirate Bay',
        link: `https://thepiratebay.org/search/%s/0/3/0`
    },
    {
        type: 'torrent',
        content_type: 'anime', 
        language: 'english',
        name:'Nyaa',
        link: `https://nyaa.si/?f=0&c=1_0&q=%s`
    },
    {
        type: 'torrent',
        content_type: 'anime', 
        language: 'english',
        name: 'Anidex',
        link: `https://anidex.info/?q=%s`
    },
    {
        type: 'torrent',
        content_type: 'anime', 
        language: 'english',
        name: 'ShanaProject',
        link: `https://www.shanaproject.com/search/?title=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'russian',
        name: 'Rutracker',
        link: `https://rutracker.org/forum/tracker.php?nm=%s`
    },
    {
        type: 'torrent',
        content_type: 'adrama', 
        language: 'english',
        name: 'AvistaZ',
        link: `https://avistaz.to/torrents?in=1&search=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'CinemaZ',
        link: `https://cinemaz.to/torrents?in=1&search=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'russian',
        name: 'Kinozal',
        link: `http://kinozal.tv/browse.php?s=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'IVI',
        link: `https://www.ivi.ru/search/?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'Okko',
        link: `https://okko.tv/search/%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'Megogo',
        link: `https://megogo.ru/ru/search-extended?q=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'russian',
        name: 'NNMClub',
        link: `http://nnmclub.to/forum/tracker.php?nm=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'LostFilm',
        link: `https://www.lostfilm.tv/search/?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'Yandex',
        link: `https://yandex.ru/search/?text=%s%20%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'russian',
        name: 'Rutor',
        link: `http://rutor.info/search/%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'russian',
        name: 'Jut.su',
        link: `https://jut.su/search/?searchid=1893616&text=%s`
    }
];
document.addEventListener("DOMContentLoaded", function () {
    $('html').append(`<div class="alternative-watch-modal"/>`);
    $('html').on('click','.alternative-watch-modal', function (event) {
        if(!$(event.target).closest('.alternative-watch-content').length && !$(event.target).is('.alternative-watch-content')) {
            $('.alternative-watch-content').remove();
            $('.alternative-watch-modal').css({'visibility':'hidden','height':'0','opacity':'0'})}});
    $('html').on('click', '.alternative-watch-close', function () {
        $('.alternative-watch-content').remove();
        $('.alternative-watch-modal').css({'visibility':'hidden','height':'0','opacity':'0'})});
    var play_item= ['#ondeck-wrapper','#recently-watched-wrapper','#recommendations-shows','#recommendations-movies','div.row.posters#sortable-grid','#schedule-wrapper',
    '.frame:not(.people,.lists,.users)','#history-items','#collection-items','#rating-items','#seasons-episodes-sortable','#actor-credits',
    '#recent-wrapper','#progress-wrapper','#recommendations-wrapper','#recent-episodes','body'];
    $(function () {
        for (const element of play_item) {  
            playButtons(element);
    }});
    $('html').on('click', '#alternative-watch', function () {
        $('.alternative-watch-modal').css({'visibility':'visible','height':'100%','opacity':'1'});
        var original_aw_name=$(this).attr('aw-data-name');
        var original_year_number=$(this).attr('aw-y-num');
        var original_episode_number=$(this).attr('aw-ep-num');
        var original_season_number=$(this).attr('aw-s-num');
        if (original_season_number != '') {var season_number='s'+checkSepNum(original_season_number)} else {season_number=''};
        if (original_episode_number != '') {var episode_number='e'+checkSepNum(original_episode_number)} else {episode_number=''};
        var episode_data=season_number+episode_number;
        if (episode_data == 's0e0') {episode_data=''};
        $('.alternative-watch-modal').append(`<div class="alternative-watch-content"/>`);
        $('.alternative-watch-content').append(`<div class="alternative-watch-close">&times;</div><div id="watch-search"><p type="text" id="watch-search-string"></p></div>`);
        $('.alternative-watch-modal #watch-search-string').html(`${original_aw_name}`);
        createCB('year','Year-number','9','');
        createCB('episode','Episode-data','7','');
        createCB('cname','Custom-name','0',original_aw_name);
        $('html').on("change", `#cb_year`, function () {updateCB('year',original_year_number,'')});
        $('html').on("change", `#cb_episode`, function () {updateCB('episode',episode_data,'')});
        $('html').on("change", `#cb_cname`, function () {updateCB('cname','',original_aw_name)});
        createList('online-sources-title','Online Sources');
        createList('torrent-sources-title','Torrent Sources');
        createList('ddl-sources-title','DDL Sources');
        addSites();
        $('.alternative-watch-content').on('click','.main-button',function () {openList(this,'.content-type-button')});
        $('.alternative-watch-content').on('click','.content-type-button .wt-title-button',function () {openList(this,'.language-button')});
        $('.alternative-watch-content').on('click','.language-button .wt-title-button',function () {openList(this,'.wt-sources')});
        $('html').on('input', '#cb_year_text,#cb_episode_text,#cb_cname_text', function () {updateString()});
        $('html').on('change', '.grid-item[itemtype]', function () {alert('quick')});
        $('.alternative-watch-modal .watch_sources_item').on("click", function () {
            var search_item_id=this.id.split("-")[1];
            var search_link=sources_list[search_item_id].link.replace('%s', $('.alternative-watch-modal #watch-search-string').html());
            window.open(search_link, "_blank");
        });
    });

    function playButtons(playobject) {
        if ($('html').find(`${playobject}`).length) {
            var playinterval=setInterval( function() {
                searchData(playobject,'div[itemtype]','main',4,'meta[itemprop=url]','content','.action-buttons > .btn-collect','watch now');
                if ($(`${playobject}`).find('#alternative-watch').length) {
                    clearInterval(playinterval);
                    $('.quick-aw-button').tooltip({
                        title: "Watch Now Alternative",
                        placement: 'bottom'
                    }).popover('destroy')
                } else {
                    searchData(playobject,'.grid-item[itemtype]','quick',4,'meta[itemprop=url]','content','.collect','');
                    searchData(playobject,'.schedule-episode','schedule',2,'h4 a,h5 a','href','h6','watch now');
                };
            },100);
        }
    }

    function searchData(data_object,data_find,data_type,data_number,data_link,data_attr,data_after,data_text) {
        $(`${data_object}`).find(`${data_find}`).each( function () {
            if (data_type != 'schedule') {var data_item=$(this).find(`${data_link}`).first().attr(`${data_attr}`)} else {
                var data_item=$(this).find(`${data_link}`).last().attr(`${data_attr}`)};
            if (data_item != null) {var data_item_name=data_item.split('/')[data_number].replaceAll('-',' ').trim()};
            if (data_item_name != null) {var data_year_number=data_item_name.split(' ').pop()};
            if (isNaN(data_year_number)) {data_year_number=''} else {data_item_name=data_item_name.replace(`${data_year_number}`,'').trim()};
            if (data_item != null) {var data_season_number=data_item.split('/')[data_number+2]};
            if (data_item != null) {var data_episode_number=data_item.split('/')[data_number+4]};
            if (data_season_number == null) {data_season_number=''};
            if (data_episode_number == null) {data_episode_number=''};
            if (data_type != 'main') {var data_icon_object=`<div class="trakt-icon-play2-thick" />`} else {var data_icon_object=`<div class="trakt-icon-play2" />`};
            if (data_text != '') {var data_text_object=`<div class="wt-text">${data_text}</div>`} else {var data_text_object=''};
            var data_block=`
            <a id="alternative-watch" class="${data_type}-aw-button" aw-data-name="${data_item_name}" 
            aw-ep-num="${data_episode_number}" aw-s-num="${data_season_number}" aw-y-num="${data_year_number}">
            ${data_icon_object}${data_text_object}</a>`
            if (data_item != null) {if (data_after != '') {$(this).find(`${data_after}`).after(`${data_block}`)} else {$(this).after(`${data_block}`)}};
        })
    }

    function createCB(cb_type,cb_text,cb_padding,cb_original) {
        $('.alternative-watch-content').find('#watch-search').append(`
            <div class="watch_search_option">
            <input type="checkbox" id="cb_${cb_type}">
            <label for="cb_${cb_type}">${cb_text}</label>
            <input type="text" id="cb_${cb_type}_text" style="padding-right: ${cb_padding}px; width: 55%" value="${cb_original}"></div>`);
    }

    function updateCB(cb_type,cb_value,cb_reset) {
        var update_cb_type='#cb_'+cb_type;
        if ($(`${update_cb_type}:checked`).length) {
            $('.alternative-watch-content').find(`#cb_${cb_type}_text`).css({'visibility':'visible','height':'auto','opacity':'1'});
            if (cb_type != 'cname') {$(`#cb_${cb_type}_text`).val(`${cb_value}`)};
        } else {
            $('.alternative-watch-content').find(`#cb_${cb_type}_text`).css({'visibility':'hidden','height':'0','opacity':'0'});
            $(`#cb_${cb_type}_text`).val(`${cb_reset}`);
        }
        updateString(); 
    }

    function updateString() {
        var data_string=$('#cb_cname_text').val()+checkString($('#cb_year_text').val())+checkString($('#cb_episode_text').val());
        $('.alternative-watch-modal #watch-search-string').html(`${data_string}`) 
    }
    
    function createList(list_type,list_name) {
        $('.alternative-watch-content').append(`
        <div id="${list_type}" class="wt-title"><div class="wt-title-button main-button">${list_name}</div>
        <div id="content-buttons"><div id="general-bt" class="content-type-button"><div class="wt-title-button">General</div>
        <div id="language-buttons"><div id="english-bt" class="language-button"><div class="wt-title-button">English</div><div class="wt-sources"/></div>
        <div id="russian-bt" class="language-button"><div class="wt-title-button">Russian</div><div class="wt-sources"/></div></div></div>
        <div id="anime-bt" class="content-type-button"><div class="wt-title-button">Anime</div>
        <div id="language-buttons"><div id="english-bt" class="language-button"><div class="wt-title-button">English</div><div class="wt-sources"/></div>
        <div id="russian-bt" class="language-button"><div class="wt-title-button">Russian</div><div class="wt-sources"/></div></div></div>
        <div id="cartoon-bt" class="content-type-button"><div class="wt-title-button">Cartoons</div>
        <div id="language-buttons"><div id="english-bt" class="language-button"><div class="wt-title-button">English</div><div class="wt-sources"/></div>
        <div id="russian-bt" class="language-button"><div class="wt-title-button">Russian</div><div class="wt-sources"/></div></div></div>
        <div id="adrama-bt" class="content-type-button"><div class="wt-title-button">Asian Drama</div>
        <div id="language-buttons"><div id="english-bt" class="language-button"><div class="wt-title-button">English</div><div class="wt-sources"/></div>
        <div id="russian-bt" class="language-button"><div class="wt-title-button">Russian</div><div class="wt-sources"/></div></div></div>
        </div></div>`);
    }

    function openList(list_object,list_type) {
            if ($(list_object).parent().find(`${list_type}`).css('opacity') == '0') {
                $(list_object).parent().find(`${list_type}`).each( function () {
                    if ($(this).find('.watch_sources_item').length) {$(this).css({'visibility':'visible','height':'auto','opacity':'1'})}})}
            else {$(list_object).parent().find(`${list_type}`).css({'visibility':'hidden','height':'0','opacity':'0'})}
    }

    function addSites() {
        for(var i=0;i < sources_list.length;i++) {
            var source_type='#'+sources_list[i].type+'-sources-title';
            var source_content_type='#'+sources_list[i].content_type+'-bt';
            var source_language='#'+sources_list[i].language+'-bt';
            $(`${source_type}`).find(`${source_content_type}`).find(`${source_language}`).children('.wt-sources').append(`<div class="watch_sources_item wt-title-button" id="watch_sources_item-${i}"><div class="wt-source-name">${sources_list[i].name}</div></div>`);
        }
    }

    function checkSepNum(n) {
        return (n < 10 ? '0' : '') + n;
    }
    function checkString(s) {
        return (s == '' ? '': ' ') + s
    }
})
