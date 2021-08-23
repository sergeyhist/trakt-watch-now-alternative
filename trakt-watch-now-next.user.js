// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     2.6.8
// @author      Hist
// @description Alternative version for trakt.tv watch now modal 
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
    input#cb_year_text, input#cb_season_text, input#cb_episode_text, input#cb_cname_text,
    select#aw_language, select#aw_type, select#aw_source {
        float: right;
        margin-left: 5px;
        font-size: 15px;
        width: 60%;
        background-color: #000000b3;
    }
    #watch-search {
        display: block;
        width: 340px;
        position: absolute;
        top: 80px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%);
        color: #fff;
        background-color: rgba(0,0,0,.7);
        padding: 10px 15px 5px;
        font-size: 20px;
        font-family: proxima nova;
        text-align: left;
        background-image: linear-gradient(to right, #0000006e, #691b1b8a);
    }
    .watch-search-option {
        display: table;
        font-size: 16px;
        height: 30px;
        width: 100%
    }
    .watch-search-option label {
        font-size: 15px;
        padding-top: 2px;
        padding-left: 2px;
        font-weight: 100;
    }
    .watch-search-option input,
    .watch-search-option select {
        font-size: 16px;
        border-radius: 2px;
        border: solid #232020 1px;
        color: #fff;
        background-color: #00000040;
    } 
    .watch-search-option input[type="checkbox"] {
        position: fixed;
        left: 30%;
    }
    .alternative-watch-modal {
        position: fixed;
        z-index: 100000;
        left: 0!important;
        top: 0!important;
        width: 100%!important;
        background-color: rgba(0,0,0,0.4);
    }
    #aw-sources::-webkit-scrollbar {
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
        border: solid #000000 1px;
        border-radius: 5px;
        background-image: linear-gradient(360deg, #1b04047d, #580d0d99);
        margin-block: 3px;
    }
    .wt-title-button:hover {
        color: #000000;
        background-image: linear-gradient(360deg, #ff1e1ecc, #650d0d73);
    }
    .watch-search-option label[for=cb_cname]:hover,
    .watch-search-option label[for=cb_year]:hover,
    .watch-search-option label[for=cb_episode]:hover,
    .alternative-watch-close:hover,
    .alternative-watch-close:focus {
        color: #a01717;
        
    }
    .alternative-watch-modal,
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
    #aw-sources {
        display: block;
        width: 340px;
        position: absolute;
        top: 275px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%);
        padding: 10px 15px 5px;
        background-color: #000000de;
        max-height: 55%;
        border: solid black 3px;
        overflow: auto;
        overflow-y: overlay;
        overscroll-behavior: contain;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .aw-sources-item {
        padding-block: 15px;
        margin-block: 5px;
    }
    #alternative-watch {
        display: inline-block;
        position: relative;
        transition: all .5s;
        color: #9e3131;
    }
    #alternative-watch:hover {
        color: white;
        background-color: #9e3131!important;
        text-decoration: none!important;
    }
    .main-aw-button {
        margin-top: 3px;
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
    #alternative-watch, 
    .wt-title-button,
    .alternative-watch-close,
    .watch-search-option label,
    .watch-search-option select {
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
`;
GM_addStyle(watchstyle);
const sources_list = [
    {
        type: 'online',
        content_type: 'general', 
        language: 'english,russian',
        name: 'Youtube',
        link: `https://www.youtube.com/results?search_query=%s`
    },
    {
        type: 'database, torrent',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeK',
        link: `https://animek.fun/search?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'CrunchyRoll',
        link: `https://www.crunchyroll.com/search?from=search&q=%s`
    },
    {
        type: 'online',
        content_type: 'general,anime,cartoon,asian drama', 
        language: 'russian',
        name: 'Yandex',
        link: `https://yandex.ru/search/?text=%s%20%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD`
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
        name: 'HiMovie',
        link: `https://www5.himovies.to/search/%s`
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
        name: 'TeaTV',
        link: `https://teatv.xyz/movies?q=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'english',
        name: 'SockShare',
        link: `https://sockshare.ac/search-movies/%s.html`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
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
        name: 'Tenshi',
        link: `https://tenshi.moe/anime?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'Zoro.to',
        link: `https://zoro.to/search?keyword=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name:'HDEncode',
        link: `https://hdencode.com/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name:'RLSBB',
        link: `http://search.rlsbb.ru/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name:'Scene-Rls',
        link: `http://scene-rls.com/?s=%s`
    },
    {
        type: 'DDL',
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
        link: `https://nyaa.si/?f=0&c=1_2&q=%s`
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
        content_type: 'asian drama', 
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
        type: 'torrent',
        content_type: 'general', 
        language: 'russian',
        name: 'LostFilm',
        link: `https://www.lostfilm.tv/search/?q=%s`
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
        type: 'torrent,DDL',
        content_type: 'general', 
        language: 'english',
        name: 'Psarips',
        link: `https://psa.one/?s=%s`
    },
    {
        type: 'torrent',
        content_type: 'general', 
        language: 'english',
        name: 'MVGroup-Documentaries',
        link: `https://forums.mvgroup.org/maintracker.php?forums=all&filter=%s&x=0&y=0&searchwhere=on`
    },
    {
        type: 'torrent,DDL',
        content_type: 'anime', 
        language: 'english',
        name: 'Hi10Anime',
        link: `https://hi10anime.com/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'Crazy4tv',
        link: `http://crazy4tv.com/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: '2DDL',
        link: `https://2ddl.ms/?q=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'RapidMoviez',
        link: `http://rmz.cr/search/%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'MegaDDL',
        link: `https://megaddl.co/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'MovieParadise',
        link: `https://movieparadise.org/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'DDLValley',
        link: `https://www.ddlvalley.me/search/%s`
    },
    {
        type: 'DDL',
        content_type: 'general', 
        language: 'english',
        name: 'Snahp',
        link: `https://snahp.it/?s=%s`
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
        content_type: 'asian drama', 
        language: 'english',
        name: 'KissAsian',
        link: `https://kissasian.la/?s=%s`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
        language: 'english',
        name: 'Dramanice',
        link: `https://dramanice.so//search.html?keyword=%s`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
        language: 'english',
        name: 'DramaHood',
        link: `https://kdramahood.com/?s=%s`
    },
    {
        type: 'database',
        content_type: 'general', 
        language: 'english',
        name: 'IMDB',
        link: `https://www.imdb.com/find?s=tt&q=%s&ref_=nv_sr_sm`
    },
    {
        type: 'database',
        content_type: 'general', 
        language: 'english',
        name: 'TheMovieDB',
        link: `https://www.themoviedb.org/search?query=%s`
    },
    {
        type: 'database',
        content_type: 'general', 
        language: 'english',
        name: 'TheTVDB',
        link: `https://thetvdb.com/search?query=%s`
    },
    {
        type: 'database',
        content_type: 'anime', 
        language: 'english',
        name: 'AniList',
        link: `https://anilist.co/search/anime?search=%s&sort=SEARCH_MATCH`
    },
    {
        type: 'database',
        content_type: 'anime', 
        language: 'english',
        name: 'MyAnimeList',
        link: `https://myanimelist.net/anime.php?q=%s&cat=anime`
    },
    {
        type: 'database',
        content_type: 'anime', 
        language: 'english',
        name: 'AniDB',
        link: `https://anidb.net/anime/?adb.search=%s&do.search=1`
    },
    {
        type: 'database',
        content_type: 'asian drama', 
        language: 'english',
        name: 'MyDramaList',
        link: `https://mydramalist.com/search?q=%s`
    },
    {
        type: 'database',
        content_type: 'general', 
        language: 'russian',
        name: 'Kinopoisk',
        link: `https://www.kinopoisk.ru/index.php?kp_query=%s`
    },
    {
        type: 'database',
        content_type: 'anime', 
        language: 'russian',
        name: 'Shikimori',
        link: `https://shikimori.one/animes?search=%s`
    },
    {
        type: 'DDL',
        content_type: 'anime', 
        language: 'english',
        name: 'Ani60FPS',
        link: `https://www.anime60fps.com/search?q=%s`
    },
    {
        type: 'DDL',
        content_type: 'anime', 
        language: 'english',
        name: 'AniDL',
        link: `https://anidl.org/?s=%s`
    },
    {
        type: 'DDL',
        content_type: 'anime', 
        language: 'english',
        name: 'AnimeKayo',
        link: `https://animekayo.com/?s=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'russian',
        name: 'AnimeGO',
        link: `https://animego.org/search/all?q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'russian',
        name: 'YokiAnime',
        link: `https://yokiani.me/anime_search?search=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'russian',
        name: 'AniMedia',
        link: `https://amedia.cc/index.php?do=search&subaction=search&story=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'russian',
        name: 'AnimeStars',
        link: `https://animestars.org/index.php?do=search&subaction=search&story=%s`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
        language: 'russian',
        name: 'Doramy.club',
        link: `https://doramy.club/?s=%s`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
        language: 'russian',
        name: 'DoramaFox',
        link: `https://doramafox.ru/?s=%s`
    },
    {
        type: 'online',
        content_type: 'asian drama', 
        language: 'russian',
        name: 'VseDoramy',
        link: `https://vsedoramy.net/index.php?do=search&subaction=search&story=%s`
    },
    {
        type: 'online',
        content_type: 'general', 
        language: 'russian',
        name: 'HDRezka',
        link: `https://rezka.ag/search/?do=search&subaction=search&q=%s`
    },
    {
        type: 'online',
        content_type: 'anime', 
        language: 'english',
        name: 'YugenAnime',
        link: `https://yugenani.me/search/?q=%s`
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
        name: '5Anime',
        link: `https://5anime.net/search.html?keyword=%s`
    },
    {
        type: 'DDL,online',
        content_type: 'general', 
        language: 'english',
        name: 'Rarefilmm',
        link: `https://rarefilmm.com/?s=%s`
    }

];
document.addEventListener("DOMContentLoaded", function () {
    $('html').append(`<div class="alternative-watch-modal"/>`)
    $('html').on('click','.alternative-watch-modal', function (event) {
        if(!$(event.target).closest('.alternative-watch-content').length && !$(event.target).is('.alternative-watch-content')) {
            $('.alternative-watch-content').remove()
            $('.alternative-watch-modal').css({'visibility':'hidden','height':'0','opacity':'0'})
            $('html').off('click', '.aw-sources-item')
            $('html').off('change', `#cb_year`)
            $('html').off('change', `#cb_episode`)
            $('html').off('change', `#cb_cname`)
            $('html').off('change', `#aw_language, #aw_type, #aw_source`)
            $('html').off('input', '#cb_year_text, #cb_episode_text, #cb_cname_text')
        }})
    const play_item= [
        'div[itemtype="http://schema.org/TVSeries"]',
        'div[itemtype="http://schema.org/TVEpisode"]',
        'div[itemtype="http://schema.org/TVSeason"]',
        'div[itemtype="http://schema.org/Movie"]',
        '.schedule-episode'
    ];
    $(function () {
        for (const element of play_item) {  
            awButtons(element)
    }});
    $('html').on('click', '#alternative-watch', function () {
        $('.alternative-watch-modal').css({'visibility':'visible','height':'100%','opacity':'1'})
        let original_aw_data=$(this).attr('aw-data')
        let original_aw_name=original_aw_data.split('+|+')[0]
        let original_year_number=""
        let original_season_number=""
        let original_episode_number=""
        let original_poster=""
        let season_number=""
        let episode_number=""
        let episode_data=""
        if (original_aw_data.split('+|+')[1] != 'undefined') {original_year_number=original_aw_data.split('+|+')[1]} else {original_year_number=''}
        if (original_aw_data.split('+|+')[2] != 'undefined') {original_season_number=original_aw_data.split('+|+')[2]} else {original_season_number=''}
        if (original_aw_data.split('+|+')[3] != 'undefined') {original_episode_number=original_aw_data.split('+|+')[3]} else {original_episode_number=''}
        if (original_season_number != '') {season_number='s'+checkSepNum(original_season_number)} else {season_number=''}
        if (original_episode_number != '') {episode_number='e'+checkSepNum(original_episode_number)} else {episode_number=''}
        episode_data=season_number+episode_number
        if (episode_data == 's0e0') {episode_data=''}
        //original_poster=original_aw_data.split('+|+')[4]
        $('.alternative-watch-modal').append(`<div class="alternative-watch-content"/>`)
        $('.alternative-watch-content').append(`<div id="watch-search"><p type="text" id="watch-search-string" class="hidden"></p></div>`)
        $('.alternative-watch-modal #watch-search-string').html(`${original_aw_name}`)
        createCB('year','Year','')
        createCB('episode','Episode','')
        createCB('cname','Title',original_aw_name);
        $('html').on('change', `#cb_year`, function () {updateCB('year',original_year_number,'')})
        $('html').on('change', `#cb_episode`, function () {updateCB('episode',episode_data,'')})
        $('html').on('change', `#cb_cname`, function () {updateCB('cname','',original_aw_name)})
        createLB("language",['english','russian'])
        createLB("type",['general','anime','cartoon','asian drama'])
        createLB("source",['online','torrent','DDL','database'])
        addSites()
        $('html').on('change', `#aw_language, #aw_type, #aw_source`, function () {addSites()})
        $('html').on('input', '#cb_year_text, #cb_episode_text, #cb_cname_text', function () {updateString()})
        $('html').on('click', '.aw-sources-item' , function () {
            let search_item_id=this.id.split("-")[1];
            let search_link=sources_list[search_item_id].link.replace('%s', $('.alternative-watch-modal #watch-search-string').html().replace(/ /g,'+'))
            window.open(search_link, "_blank")
        });
    });

    function awButtons(playobject) {
        setInterval( function() {
            $('html').find(`${playobject}`).each( function () {
                let aw_link=""
                let aw_block=""
                let aw_result=""
                switch (playobject) {
                    case '.schedule-episode':
                        if (!$(this).find('#alternative-watch').length) {
                            if ($(this).find('h5 > a').length) { aw_link=$(this).find('h5 > a').attr('href') }
                            else { aw_link=$(this).find('h4 > a').attr('href') }
                            aw_result=awData(2,aw_link)
                            aw_block=awBlock('schedule',aw_result)
                            $(this).append(`${aw_block}`)
                        }
                        break
                    default:
                        if (!$(this).find('.action-buttons > #alternative-watch').length) {
                            aw_link=$(this).find('meta[itemprop=url]').attr('content')
                            aw_result=awData(4,aw_link)
                            if ($(this).find('.action-buttons').length) {
                                aw_block=awBlock('main',aw_result)
                                $(this).find('.btn-collect').after(`${aw_block}`)
                            }
                        }
                        if (!$(this).find('.actions > #alternative-watch').length) {
                            aw_link=$(this).find('meta[itemprop=url]').attr('content')
                            aw_result=awData(4,aw_link)
                            if ($(this).find('.actions').length) {
                                aw_block=awBlock('quick',aw_result)
                                $(this).find('.collect').after(`${aw_block}`)
                            }
                        }
                }
            })
            awTooltip()
        },500)
    }

    function awData(startnum,data_link) {
        let data_name=""
        let data_episode=""
        let data_season=""
        let data_year=""
        data_year=data_link.split('/')[startnum].split('-').pop()
        if (isNaN(data_year)) {data_year=''; data_name=data_link.split('/')[4].replace(/-/g,' ')}
        else {data_name=data_link.split('/')[startnum].replace(/-/g,' ').replace(` ${data_year}`,'')}
        data_season=data_link.split('/')[startnum+2]
        data_episode=data_link.split('/')[startnum+4]
        return data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode
    }

    function awBlock(block_type,block_content) {
        let block_icon=""
        let block_text=""
        if (block_type != 'main') {block_icon='trakt-icon-play2-thick'} else {block_icon='trakt-icon-play2'}
        if (block_type != 'quick') {block_text=`<div class="wt-text">watch now</div>`} else {block_text=''}
        return `<a id="alternative-watch" class="${block_type}-aw-button" aw-data="${block_content}">
        <div class="${block_icon}"/>${block_text}</a>`
    }

    function awTooltip () {
        $('.quick-aw-button').tooltip({
            title: "Watch Now Alternative",
            placement: 'bottom'
        }).popover('destroy')
    }

    function createCB(cb_type,cb_text,cb_original) {
        $('.alternative-watch-content #watch-search').append(`
            <div class="watch-search-option">
            <label for="cb_${cb_type}">${cb_text}</label>
            <input type="checkbox" id="cb_${cb_type}">
            <input type="text" id="cb_${cb_type}_text" value="${cb_original}"></div>`)
    }

    function updateCB(cb_type,cb_value,cb_reset) {
        let update_cb_type='#cb_'+cb_type;
        if ($(`${update_cb_type}:checked`).length) {
            $('.alternative-watch-content').find(`#cb_${cb_type}_text`).css({'visibility':'visible','height':'auto','opacity':'1'})
            if (cb_type != 'cname') {$(`#cb_${cb_type}_text`).val(`${cb_value}`)}
        } else {
            $('.alternative-watch-content').find(`#cb_${cb_type}_text`).css({'visibility':'hidden','height':'0','opacity':'0'})
            $(`#cb_${cb_type}_text`).val(`${cb_reset}`)
        }
        updateString(); 
    }

    function createLB(lb_type,lb_items) {
        $('.alternative-watch-content #watch-search').append(`
        <div class="watch-search-option">
        <label for="aw_${lb_type}">${capFL(lb_type)}</label>
        <select id="aw_${lb_type}" size="1"/></div>`)
        for (let i=0; i < lb_items.length; i++) {
            $(`select#aw_${lb_type}`).append(`<option value="${lb_items[i]}">${capFL(lb_items[i])}</option>`)
        }
    }

    function updateString() {
        let data_string=$('#cb_cname_text').val()+checkString($('#cb_year_text').val())+checkString($('#cb_episode_text').val())
        $('.alternative-watch-modal #watch-search-string').html(`${data_string}`) 
    }

    function addSites() {
        $('.alternative-watch-content #aw-sources').remove()
        $('.alternative-watch-content').append(`<div id="aw-sources"/>`)
        for(let i=0;i < sources_list.length;i++) {
            let aw_type=$('#aw_type').val()
            let aw_language=$('#aw_language').val()
            let aw_source=$('#aw_source').val()
            if ((sources_list[i].content_type.includes(aw_type)) && (sources_list[i].language.includes(aw_language)) && (sources_list[i].type.includes(aw_source))) {
                $('.alternative-watch-content #aw-sources').append(`<div class="aw-sources-item wt-title-button" id="watch_sources_item-${i}"><div class="wt-source-name">${sources_list[i].name}</div></div>`)
            }
        }
    }

    function checkSepNum(n) {
        return (n < 10 ? '0' : '') + n
    }
    function checkString(s) {
        return (s == '' ? '': ' ') + s
    }
    function capFL(s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
})
