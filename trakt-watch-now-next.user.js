// ==UserScript==
// @name        Trakt Alternative Watch - Next Version
// @namespace   https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/trakt-watch-now.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     1.3
// @author      Hist
// @description Trakt Watch Now Alternative Version
// @icon        https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/logos/logo.png?raw=true
// @downloadURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts
// ==/UserScript==
'use strict';
var watchstyle = `
    .streaming-links,
    #watch-now-country-select,
    #watch-now-powered-by {
        display: none!important;
    }
    #alternative-watch {
        display:inline-block;
    }
    #cb_cname, #cb_year, #cb_season, #cb_episode {
        margin-inline: 2px;
    }
    input#cb_year_text, input#cb_season_text, input#cb_episode_text, input#cb_cname_text {
        display:none;
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
        display: none;
        position: fixed;
        z-index: 100000;
        left: 0!important;
        top: 0!important;
        width: 100%!Important;
        height: 100%!important;
        background-color: rgba(0,0,0,0.4);
    }
    .alternative-watch-content {
        height: 85%;
        overflow: auto;
        overflow-y: overlay;
        overscroll-behavior: contain;
        background-color: #000000de;
        width: 350px;
        position: absolute;
        top: 53%;
        left: 49.9%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
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
    .alternative-watch-close:hover,
    .alternative-watch-close:focus {
        color: #a01717;
        cursor: pointer;
    }
    .watch-now,
    .btn-watch-now {
        display: none!important;
    }
    .trakt-icon-play2-thick {
        transition: all 0.3s;
        color: #9e3131;
        font-size: 1.3em;
    }
    .trakt-icon-play2-thick:hover {
        color: white;
        background-color: #9e3131!important;
    }
    .wt-text {
        display: inline-block;
        text-transform: uppercase;
        color: white;
        font-size: 10px;
        float: right;
        padding-top: 8px;
        padding-right: 8px;
        font-family: proxima nova semibold;
        font-size: 14px;
    }
    .trakt-icon-play2-thick {
        cursor: pointer;
    }
    .wt-source-name {
        text-transform: capitalize; 
    }
    .content-type-button,
    .watch_sources_item,
    .language-button {
        margin-inline: 15px;
    }
    .wt-sources {
        margin-bottom: 20px;
    }
    .watch_sources_item {
        padding-block: 10px;
        background-image: linear-gradient(231deg, #400b0bcc, #650d0d73);
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
        link: `https://ffmovies.co/search?keyword=%s`
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
    }
];
$('html').append(`<div class="alternative-watch-modal"/>`);
$('html').on('click','.alternative-watch-modal', function (event) {
    if(!$(event.target).closest('.alternative-watch-content').length && !$(event.target).is('.alternative-watch-content')) {$('.alternative-watch-modal').css({"display":"none"})}});
$('html').on('click', '.alternative-watch-close', function () {$('.alternative-watch-modal').css({"display":"none"})});
var play_item= ['#ondeck-wrapper','#recently-watched-wrapper','#recommendations-shows','#recommendations-movies','div.row.posters#sortable-grid','#schedule-wrapper',
'.frame:not(.people,.lists,.users)','#history-items','#collection-items','#rating-items','#seasons-episodes-sortable','#actor-credits',
'#recent-wrapper','#progress-wrapper','#recommendations-wrapper','#recent-episodes','#summary-wrapper:not(.person)'];
$(function () {
    for (const element of play_item) {  
        playButtons(element);
}});
$('html').on('click', '#alternative-watch', function () {
    $('.alternative-watch-modal').css({"display":"block"});
    var original_aw_name=$(this).attr('aw-data-name');
    var original_year_number=$(this).attr('aw-y-num');
    var original_episode_number=$(this).attr('aw-ep-num');
    var original_season_number=$(this).attr('aw-s-num');
    if (original_season_number != '') {var season_number='s'+checkSepNum(original_season_number)} else {season_number=''};
    if (original_episode_number != '') {var episode_number='e'+checkSepNum(original_episode_number)} else {episode_number=''};
    var episode_data=season_number+episode_number;
    if (episode_data == 's0e0') {episode_data=''};
    $('.alternative-watch-content').remove();
    $('.alternative-watch-modal').append(`<div class="alternative-watch-content"/>`);
    $('.alternative-watch-content').append(`<div class="alternative-watch-close">&times;</div><div id="watch-search"><p type="text" id="watch-search-string"></p></div>`);
    $('.alternative-watch-content').find('#watch-search').append(`<div class="watch_search_options"/>`);
    $('.alternative-watch-content').find('.watch_search_options').append(`
        <div class="watch_search_option">
        <input type="checkbox" id="cb_year">
        <label for="cb_year">Year-number
        <input type="text" id="cb_year_text" style="padding-right: 9px"></label></div>`);
    $('html').on("change", "#cb_year", function () {
        if (this.checked == true){
            $('.alternative-watch-modal').find('#cb_year_text').css({"display":"block"});
            $('#cb_year_text').val(`${original_year_number}`);
            } else {
            $('.alternative-watch-modal').find('#cb_year_text').css({"display":"none"});
            $('#cb_year_text').val('');
            }
    });
    $('.alternative-watch-modal').find('.watch_search_options').append(`
        <div class="watch_search_option">
        <input type="checkbox" id="cb_episode">
        <label for="cb_episode">Episode-data
        <input type="text" id="cb_episode_text" style="padding-right: 7px"></label></div>`);
    $('html').on("change", "#cb_episode", function () {
        if (this.checked == true){
            $('.alternative-watch-modal').find('#cb_episode_text').css({"display":"block"});
            $('#cb_episode_text').val(`${episode_data}`);
            } else {
            $('.alternative-watch-modal').find('#cb_episode_text').css({"display":"none"});
            $('#cb_episode_text').val('');
            }
    });
    $('.alternative-watch-modal').find('.watch_search_options').append(`
        <div class="watch_search_option">
        <input type="checkbox" id="cb_cname">
        <label for="cb_cname">Custom-name
        <input type="text" id="cb_cname_text" value="${original_aw_name}"></label></div>`);
    $('html').on("change", "#cb_cname", function () {
        if (this.checked == true){
            $('.alternative-watch-modal').find('#cb_cname_text').css({"display":"block"});
            } else {
            $('.alternative-watch-modal').find('#cb_cname_text').css({"display":"none"});
            $('#cb_cname_text').val(`${original_aw_name}`);
            }
    });
    $('.alternative-watch-content').append(`<div class="watchsources"/>`);
    $('.alternative-watch-content').find('.watchsources').append(`
    <div id="online-sources-title" class="wt-title"><div class="wt-title-button main-button">Online Sources</div>
    <div id="content-buttons"><div id="general-bt" class="content-type-button" style="display:none"><div class="wt-title-button">General</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="anime-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Anime</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="cartoon-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Cartoons</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="adrama-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Asian Drama</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    </div></div>`);
    $('.alternative-watch-content').find('.watchsources').append(`
    <div id="torrent-sources-title" class="wt-title"><div class="wt-title-button main-button">Torrent Sources</div>
    <div id="content-buttons"><div id="general-bt" class="content-type-button" style="display:none"><div class="wt-title-button">General</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="anime-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Anime</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="cartoon-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Cartoons</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="adrama-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Asian Drama</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    </div></div>`);
    $('.alternative-watch-content').find('.watchsources').append(`
    <div id="ddl-sources-title" class="wt-title"><div class="wt-title-button main-button">DDL Sources</div>
    <div id="content-buttons"><div id="general-bt" class="content-type-button" style="display:none"><div class="wt-title-button">General</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="anime-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Anime</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="cartoon-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Cartoons</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    <div id="adrama-bt" class="content-type-button" style="display:none"><div class="wt-title-button">Asian Drama</div>
    <div id="language-buttons"><div id="english-bt" class="language-button" style="display:none"><div class="wt-title-button">English</div><div class="wt-sources" style="display:none"/></div>
    <div id="russian-bt" class="language-button" style="display:none"><div class="wt-title-button">Russian</div><div class="wt-sources" style="display:none"/></div></div></div>
    </div></div>`);
    addSites();
    $('.alternative-watch-content').on('click','.main-button',function () {
        if ($(this).parent().find('.content-type-button').css('display') == 'none') {
            $(this).parent().find('.content-type-button').css({"display":"block"})}
        else {$(this).parent().find('.content-type-button').css({"display":"none"})}
    });
    $('.alternative-watch-content').on('click','.content-type-button .wt-title-button',function () {
        if ($(this).parent().find('.language-button').css('display') == 'none') {
            $(this).parent().find('.language-button').css({"display":"block"})}
        else {$(this).parent().find('.language-button').css({"display":"none"})}
    });  
    $('.alternative-watch-content').on('click','.language-button .wt-title-button',function () {
        if ($(this).parent().find('.wt-sources').css('display') == 'none') {
            $(this).parent().find('.wt-sources').css({"display":"block"})}
        else {$(this).parent().find('.wt-sources').css({"display":"none"})}
    }); 
    var searchinterval=setInterval( function () {
        var search_string=$('#cb_cname_text').val()+checkString($('#cb_year_text').val())+checkString($('#cb_episode_text').val());
        $('.alternative-watch-modal #watch-search-string').html(`${search_string}`)
        if ($('.alternative-watch-modal').css('display') == 'none') {clearInterval(searchinterval)};
    },200);
    $('.alternative-watch-modal .watch_sources_item').on("click", function () {
        var search_item_id=this.id.split("-")[1];
        var search_link=sources_list[search_item_id].link.replace('%s', $('.alternative-watch-modal #watch-search-string').html());
        window.open(search_link, "_blank");
    });
});

function playButtons(playobject) {
    var consoleplayflag=0;
    if ($('html').find(`${playobject}`).length) {
        var playinterval=setInterval( function() {
            if ($(`${playobject}`).find('#alternative-watch').length) {clearInterval(playinterval)} else {
                $(`${playobject}`).find('.quick-icons').each( function () {
                    var play_item=$(this).parent().find('meta[itemprop=url]').first().attr('content');
                    if (play_item != null) {var play_item_name=play_item.split('/')[4].replaceAll('-',' ').trim()};
                    if (play_item_name != null) {var play_year_number=play_item_name.split(' ').pop()};
                    if (isNaN(play_year_number)) {play_year_number=''} else {play_item_name=play_item_name.replace(`${play_year_number}`,'').trim()};
                    if (play_item != null) {var play_season_number=play_item.split('/')[6]};
                    if (play_item != null) {var play_episode_number=play_item.split('/')[8]};
                    if (play_season_number == null) {play_season_number=''};
                    if (play_episode_number == null) {play_episode_number=''};
                    $(this).find('.collect').after(`
                    <a id="alternative-watch" aw-data-name="${play_item_name}" aw-ep-num="${play_episode_number}" aw-s-num="${play_season_number}" aw-y-num="${play_year_number}">
                    <div class="trakt-icon-play2-thick"></div></a>`);
                    if (consoleplayflag == 0) {consoleplayflag=1; console.log(`${playobject} - find buttons...`)};
                });
                if ($(`${playobject}`).find('.movie,.show,.season,.episode').length) {
                    $(`${playobject}`).find('h1').each( function () {
                        var play_item=$(this).parents().find('meta[itemprop=url]').first().attr('content');
                        if (play_item != null) {var play_item_name=play_item.split('/')[4].replaceAll('-',' ').trim()};
                        if (play_item_name != null) {var play_year_number=play_item_name.split(' ').pop()};
                        if (isNaN(play_year_number)) {play_year_number=''} else {play_item_name=play_item_name.replace(`${play_year_number}`,'').trim()};
                        if (play_item != null) {var play_season_number=play_item.split('/')[6]};
                        if (play_item != null) {var play_episode_number=play_item.split('/')[8]};
                        if (play_season_number == null) {play_season_number=''};
                        if (play_episode_number == null) {play_episode_number=''};
                        $(this).after(`
                        <div id="alternative-watch" aw-data-name="${play_item_name}" aw-ep-num="${play_episode_number}" aw-s-num="${play_season_number}" aw-y-num="${play_year_number}">
                        <div style="margin: 2px; font-size: 30px; border: solid 1px white; border-radius: 2px; background-color: #1515158c" class="trakt-icon-play2-thick"><div class="wt-text">watch now</div></div></div>`);
                    });
                };
                $(`${playobject}`).find('.schedule-episode').each( function () {
                    var play_item=$(this).find('h5 a').attr('href');
                    if (play_item != null) {var play_item_name=play_item.split('/')[2].replaceAll('-',' ').trim()};
                    if (play_item_name != null) {var play_year_number=play_item_name.split(' ').pop()};
                    if (isNaN(play_year_number)) {play_year_number=''} else {play_item_name=play_item_name.replace(`${play_year_number}`,'').trim()};
                    if (play_item != null) {var play_season_number=play_item.split('/')[4]};
                    if (play_item != null) {var play_episode_number=play_item.split('/')[6]};
                    if (play_season_number == null) {play_season_number=''};
                    if (play_episode_number == null) {play_episode_number=''};
                    $(this).append(`
                    <div id="alternative-watch" aw-data-name="${play_item_name}" aw-ep-num="${play_episode_number}" aw-s-num="${play_season_number}" aw-y-num="${play_year_number}">
                    <div style="font-size: 20px; margin-top: 10px; border-radius: 2px; background-color: #1515158c" class="trakt-icon-play2-thick">
                    <div class="wt-text" style="font-size: 11px; padding-top: 5px;">watch now</div></div></div>`);
                });
            };
        },100);
    }
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
