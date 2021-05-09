// ==UserScript==
// @name        Trakt Alternative Watch - Next Version
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     2.3
// @author      Hist
// @description Trakt Watch Now Alternative Version
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
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
        z-index: 1041;
    }
    .schedule-aw-button {
        border-radius: 2px;
        font-size: 0.7em;
        position: relative;
        top: 5px;
        background-color: #1515158c;
        margin-bottom: 5px;
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
    .schedule-episode.same-show {
        padding-top: 10px!important;
    }
`;
GM_addStyle(watchstyle);
const sources_list = [
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
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'Rarefilmm',
        link: `https://rarefilmm.com/?s=%s`
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
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'Torrents.csv',
        link: `https://torrents-csv.ml/#/search/torrent/%s/1`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'TorrentGalaxy',
        link: `https://torrentgalaxy.to/torrents.php?c9=1&c3=1&c46=1&c45=1&c42=1&c4=1&c1=1&c25=1&c41=1&c5=1&c6=1&c7=1&search=%s&lang=0&nox=2#results`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'SolidTorrents',
        link: `https://solidtorrents.net/search?q=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'Ettv',
        link: `https://www.ettvcentral.com/torrents-search.php?search=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'Psarips',
        link: `https://psa.one/?s=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'HevcBay',
        link: `https://hevcbay.com/?s=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'MVGroup-Documentaries',
        link: `https://forums.mvgroup.org/maintracker.php?forums=all&filter=%s&x=0&y=0&searchwhere=on`
    },
    {
        type: 'torrent',
        content_type: 'anime', 
        language: 'english',
        name: 'NyaaPantsu',
        link: `https://nyaa.net/search?c=_&q=%s`
    },
    {
        type: 'torrent',
        content_type: 'anime', 
        language: 'english',
        name: 'Hi10Anime',
        link: `https://hi10anime.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'x265movies',
        link: `https://x265movies.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'HevcBay',
        link: `https://hevcbay.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'Psarips',
        link: `https://psa.one/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'Crazy4tv',
        link: `http://crazy4tv.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: '2DDL',
        link: `https://2ddl.ms/?q=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'RapidMoviez',
        link: `http://rmz.cr/search/%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'MegaDDL',
        link: `https://megaddl.co/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'MovieParadise',
        link: `https://movieparadise.org/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'GdriveDL',
        link: `https://gdrivedl.com/?s=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'DDLValley',
        link: `https://www.ddlvalley.me/search/%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'Snahp',
        link: `https://snahp.it/?s=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: '9Anime',
        link: `https://www12.9anime.to/search?keyword=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'GMovies',
        link: `https://movies.gnie.world/search?query=%s`
    },
    {
        type: 'ddl',
        content_type: 'general', 
        language: 'english',
        name: 'GMovies',
        link: `https://movies.gnie.world/search?query=%s`
    },
    {
        type: 'online',
        content_type: 'cartoon', 
        language: 'english',
        name: 'WatchCartoonOnline.bz',
        link: `https://watchcartoononline.bz/?s=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeFrenzy',
        link: `https://animefrenzy.org/browse/?search=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeKisa',
        link: `https://animekisa.tv/search?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeHub',
        link: `https://animehub.ac/search/%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'Tenshi',
        link: `https://tenshi.moe/anime?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeVibe',
        link: `https://animevibe.wtf/?s=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'Shiro',
        link: `https://shiro.is/browse/?search=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'AniNow',
        link: `https://aninow.net/search?term=%s`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'KissAsian',
        link: `https://kissasian.la/?s=%s`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'Dramanice',
        link: `https://dramanice.so//search.html?keyword=%s`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'ViewAsian',
        link: `https://viewasian.co/movie/search/%s`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'NewAsianTV',
        link: `https://newasiantv.biz/search/%s.html`
    },
    {
        type: 'online',
        content_type: 'adrama', 
        language: 'english',
        name: 'DramaHood',
        link: `https://kdramahood.com/?s=%s`
    },
    {
        type: 'db',
        content_type: 'general', 
        language: 'english',
        name: 'IMDB',
        link: `https://www.imdb.com/find?s=tt&q=%s&ref_=nv_sr_sm`
    },
    {
        type: 'db',
        content_type: 'general', 
        language: 'english',
        name: 'TheMovieDB',
        link: `https://www.themoviedb.org/search?query=%s`
    },
    {
        type: 'db',
        content_type: 'general', 
        language: 'english',
        name: 'TheTVDB',
        link: `https://thetvdb.com/search?query=%s`
    },
    {
        type: 'db',
        content_type: 'anime', 
        language: 'english',
        name: 'AniList',
        link: `https://anilist.co/search/anime?search=%s&sort=SEARCH_MATCH`
    },
    {
        type: 'db',
        content_type: 'anime', 
        language: 'english',
        name: 'MyAnimeList',
        link: `https://myanimelist.net/anime.php?q=%s&cat=anime`
    },
    {
        type: 'db',
        content_type: 'anime', 
        language: 'english',
        name: 'AniDB',
        link: `https://anidb.net/anime/?adb.search=%s&do.search=1`
    },
    {
        type: 'db',
        content_type: 'adrama', 
        language: 'english',
        name: 'MyDramaList',
        link: `https://mydramalist.com/search?q=%s`
    },
    {
        type: 'db',
        content_type: 'general', 
        language: 'russian',
        name: 'Kinopoisk',
        link: `https://www.kinopoisk.ru/index.php?kp_query=%s`
    },
    {
        type: 'db',
        content_type: 'anime', 
        language: 'russian',
        name: 'Shikimori',
        link: `https://shikimori.one/animes?search=%s`
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
    const play_item= [
        'body:not(.people) .action-buttons',
        '.recent-episodes .grid-item[itemtype]',
        '#seasons-episodes-sortable .grid-item[itemtype]',
        'body.search:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]',
        'body.shows:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]',
        'body.movies:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]',
        '#progress-wrapper .grid-item[itemtype]',
        '#recent-episodes .grid-item[itemtype]',
        '#recently-watched-wrapper .grid-item[itemtype]',
        '#schedule-wrapper .schedule-episode',
        '.calendar-grid .grid-item[itemtype]',
        '.grid-item[itemtype]'
    ];
    $(function () {
        for (const element of play_item) {  
            awButtons(element);
    }});
    $('html').on('click', '#alternative-watch', function () {
        $('.alternative-watch-modal').css({'visibility':'visible','height':'100%','opacity':'1'});
        let original_aw_data=$(this).attr('aw-data');
        let original_aw_name=original_aw_data.split('+|+')[0];
        let original_year_number;
        let original_season_number;
        let original_episode_number;
        let season_number;
        let episode_number;
        let episode_data;
        if (original_aw_data.split('+|+')[1] != 'undefined') {original_year_number=original_aw_data.split('+|+')[1]} else {original_year_number=''};
        if (original_aw_data.split('+|+')[2] != 'undefined') {original_season_number=original_aw_data.split('+|+')[2]} else {original_season_number=''};
        if (original_aw_data.split('+|+')[3] != 'undefined') {original_episode_number=original_aw_data.split('+|+')[3]} else {original_episode_number=''};
        if (original_season_number != '') {season_number='s'+checkSepNum(original_season_number)} else {season_number=''};
        if (original_episode_number != '') {episode_number='e'+checkSepNum(original_episode_number)} else {episode_number=''};
        episode_data=season_number+episode_number;
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
        createList('db-sources-title','Databases');
        addSites();
        $('.alternative-watch-content').on('click','.main-button',function () {openList(this,'.content-type-button')});
        $('.alternative-watch-content').on('click','.content-type-button .wt-title-button',function () {openList(this,'.language-button')});
        $('.alternative-watch-content').on('click','.language-button .wt-title-button',function () {openList(this,'.wt-sources')});
        $('html').on('input', '#cb_year_text,#cb_episode_text,#cb_cname_text', function () {updateString()});
        $('.alternative-watch-modal .watch_sources_item').on("click", function () {
            let search_item_id=this.id.split("-")[1];
            let search_link=sources_list[search_item_id].link.replace('%s', $('.alternative-watch-modal #watch-search-string').html().toLowerCase().replace(/’/g, '%27'));
            window.open(search_link, "_blank");
        });
    });

    function awButtons(playobject) {
        setInterval( function() {
            $('html').find(`${playobject}`).each( function () {
                if (!$(this).find('#alternative-watch').length) {
                    switch (playobject) {
                        case '#recently-watched-wrapper .grid-item[itemtype]':
                        case '#recent-episodes .grid-item[itemtype]':
                        case 'body.search:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]':
                        case 'body.shows:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]':
                        case 'body.movies:not(.calendars) .frame:not(.people,.lists,.users) .grid-item[itemtype]':
                        case '#progress-wrapper .grid-item[itemtype]':
                            awData(this,'quick-alt');
                            break;
                        case '#schedule-wrapper .schedule-episode':
                            awData(this,'schedule');
                            break;
                        case 'body:not(.people) .action-buttons':
                            awData(this,'main');
                            break;
                        case '.recent-episodes .grid-item[itemtype]':
                        case '#seasons-episodes-sortable .grid-item[itemtype]':
                            awData(this,'main-grid');
                            break;
                        case '.calendar-grid .grid-item[itemtype]':
                            awData(this,'calendar');
                            break;
                        default:
                            awData(this,'quick-general');
                    }
                }
            })
        },500);
    }

    function awData (data_object,data_type) {
        let data_name;
        let data_year;
        let data_season;
        let data_episode;
        let data_result;
        let data_link;
        let data_block;
        if (data_type == 'quick-general') {
            data_link=$(data_object).find('meta[itemprop=url]').attr('content');
            data_year=$(data_object).find('h3 > .year').text();
            data_name=$(data_object).find('.titles h3').text().replace(`${data_year}`,'');
            if (data_year == "" || data_year == undefined) {
                data_year=data_link.split('/')[4].split('-').pop();
                if (isNaN(data_year)) {data_year=''}
            }
            if ($(data_object).find('span[itemprop=partOfSeries]').length) {
                data_name=$(data_object).find('span[itemprop=partOfSeries] meta[itemprop=name]').attr('content');
                data_season=$(data_object).find('meta[itemprop=url]').attr('content').split('/')[6];
                data_episode=$(data_object).find('meta[itemprop=url]').attr('content').split('/')[8];
            }
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            let data_block=awBlock('quick',data_result);
            $(data_object).find('.collect').after(`${data_block}`);
            awTooltip();
        }
        else if (data_type == 'quick-alt') {
            data_link=$(data_object).find('meta[itemprop=url]').attr('content');
            if ($(data_object).find('.titles > h5').length) {
                data_name=$(data_object).find('.titles > h5').text();
                data_season=$(data_object).find('.main-title-sxe').text().split('x')[0];
                data_episode=$(data_object).find('meta[itemprop=episodeNumber]').attr('content');
            } else {
                data_year=$(data_object).find('h3 > .year').text();
                data_name=$(data_object).find('h3').text().replace(`${data_year}`,'');
            }
            if (data_year == "" || data_year == undefined) {
                data_year=data_link.split('/')[4].split('-').pop();
                if (isNaN(data_year)) {data_year=''}
            }
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            data_block=awBlock('quick',data_result);
            $(data_object).find('.collect').after(`${data_block}`);
            awTooltip();
        }
        else if (data_type == 'schedule') {
            data_name=$(data_object).find('h4').text();
            data_link=$(data_object).find('h4 > a').attr('href');
            if ($(data_object).find('h5').length) {
                data_link=$(data_object).find('h5 > a').attr('href');
                data_season=data_link.split('/')[4];
                data_episode=data_link.split('/')[6];
            }
            data_year=data_link.split('/')[2].split('-').pop();
            if (isNaN(data_year)) {data_year=''}
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            data_block=awBlock('schedule',data_result);
            $(data_object).append(`${data_block}`);
        }
        else if (data_type == 'main') {
            data_name=$('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[0];
            if ($('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[1] != undefined) {
                data_year=$('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[1].split(')')[0]}
            if (data_year == undefined) {data_year=$('.year').first().text()}
            if ($('div[itemtype]').find('span[itemprop=partOfSeries]').length) {
                data_name=$('div[itemtype]').find('span[itemprop=partOfSeries] meta[itemprop=name]').attr('content');
                data_season=$('div[itemtype]').find('meta[itemprop=url]').attr('content').split('/')[6];
                data_episode=$('div[itemtype]').find('meta[itemprop=url]').attr('content').split('/')[8];
            }
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            data_block=awBlock('main',data_result);
            $(data_object).find('.btn-collect').after(`${data_block}`);
        }
        else if (data_type == 'main-grid') {
            data_name=$('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[0];
            if ($('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[1] != undefined) {
                data_year=$('div[itemtype]').find('meta[itemprop=name]').attr('content').split('(')[1].split(')')[0]}
            if (data_year == undefined) {data_year=$('.year').first().text()}
            if ($('div[itemtype]').find('span[itemprop=partOfSeries]').length) {
                data_name=$('div[itemtype]').find('span[itemprop=partOfSeries] meta[itemprop=name]').attr('content');
                data_season=$('div[itemtype]').find('meta[itemprop=url]').attr('content').split('/')[6];
                data_episode=$('div[itemtype]').find('meta[itemprop=url]').attr('content').split('/')[8];
            }
            data_link=$(data_object).children('a').attr('href');
            data_season=data_link.split('/')[4];
            data_episode=data_link.split('/')[6];
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            data_block=awBlock('quick',data_result);
            $(data_object).find('.collect').after(`${data_block}`);
            awTooltip();
        }
        else if (data_type == 'calendar') {
            data_name=$(data_object).find('.titles h4').first().text();
            data_link=$(data_object).find('.titles-link').attr('href');
            if (data_name.length == 1) {data_name=$(data_object).find('.titles h3').first().text()} else {    
                data_season=data_link.split('/')[4];
                data_episode=data_link.split('/')[6];
            }
            data_year=data_link.split('/')[2].split('-').pop();
            if (isNaN(data_year)) {data_year=''}
            data_result=data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode;
            data_block=awBlock('quick',data_result);
            $(data_object).find('.collect').after(`${data_block}`);
            awTooltip();    
        }
        data_name='';
        data_year='';
        data_season='';
        data_episode='';
    }

    function awBlock(block_type,block_content) {
        let block_icon;
        let block_text;
        if (block_type != 'main') {block_icon='trakt-icon-play2-thick'} else {block_icon='trakt-icon-play2'}
        if (block_type != 'quick') {block_text=`<div class="wt-text">watch now</div>`} else {block_text=''};
        return `<a id="alternative-watch" class="${block_type}-aw-button" aw-data="${block_content}">
        <div class="${block_icon}"/>${block_text}</a>`
    }

    function awTooltip (tooltip_object) {
        $('.quick-aw-button').tooltip({
            title: "Watch Now Alternative",
            placement: 'bottom'
        }).popover('destroy')
    }

    function createCB(cb_type,cb_text,cb_padding,cb_original) {
        $('.alternative-watch-content').find('#watch-search').append(`
            <div class="watch_search_option">
            <input type="checkbox" id="cb_${cb_type}">
            <label for="cb_${cb_type}">${cb_text}</label>
            <input type="text" id="cb_${cb_type}_text" style="padding-right: ${cb_padding}px; width: 55%" value="${cb_original}"></div>`);
    }

    function updateCB(cb_type,cb_value,cb_reset) {
        let update_cb_type='#cb_'+cb_type;
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
        let data_string=$('#cb_cname_text').val()+checkString($('#cb_year_text').val())+checkString($('#cb_episode_text').val());
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
        for(let i=0;i < sources_list.length;i++) {
            let source_type='#'+sources_list[i].type+'-sources-title';
            let source_content_type='#'+sources_list[i].content_type+'-bt';
            let source_language='#'+sources_list[i].language+'-bt';
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
