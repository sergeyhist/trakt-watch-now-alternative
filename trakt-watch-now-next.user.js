// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     3.5
// @author      Hist
// @grant       GM_addStyle
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==

GM_addStyle(`
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

  .aw-modal {
      position: fixed;
      z-index: 100000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
  }

  .aw-content {
      position: fixed;
      display: flex;
      flex-direction: column;
      top: 15%;
      left: 50%;
      transform: translate(-50%);
      width: 85%;
      max-width: 800px;
      height: fit-content;
      max-height: 75%;
  }

  .aw-header {
      color: #fff;
      font-family: proxima nova;
      border: solid black 1px;
      background-size: cover;
      background-position-y: center;
      background-repeat: no-repeat;
      padding-bottom: 2em;
      border-radius: 15px 15px 0 0;
      background-color: black;
  }

  .aw-footer {
      height: 0;
      background-color: black;
      margin-top: -2px;
      border-radius: 0 0 15px 15px;
  }

  .aw-modal::-webkit-scrollbar,
  .aw-content::-webkit-scrollbar {
      width: 0px;
      background: transparent;
  }

  .aw-header, .aw-footer,
  .aw-modal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all .3s ease;
      opacity: 0;
      overflow: hidden;
  }

  #aw-sources,
  #aw-search-options,
  .aw-select,
  #aw-search-string {
      overflow: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;
  }

  #aw-search-string {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      background-color: rgb(0 0 0 / 75%);
      font-size: 16px;
      border-inline: 0;
      border-top: 0;
      border-bottom: solid black 1px;
      white-space: nowrap;
  }

  #aw-search-options {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
  }

  #aw-sources {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      max-height: 100%;
      align-content: flex-start;
      justify-content: center;
  }

  .aw-search-option {
      display: flex;
      flex-flow: row wrap;
      font-size: 13px;
      width: 10em;
      margin: 5px 10px;
  }

  .aw-label {
      text-align: center;
      font-weight: 100;
      width: 100%;
      background-color: rgb(0 0 0 / 75%);
      border: solid black 1px;
      border-radius: 5px;
      margin-bottom: 5px;
  }

  .aw-select {
      width: 100%;
      height: 7em;
      background-color: rgb(0 0 0 / 60%);
      border: solid black 1px;
  }

  .aw-option {
      padding-left: 3px;
      border: solid black 1px;
  }

  .aw-selected {
      background-color: #280202;
      color: white;
  }

  .aw-option:not(.aw-selected):hover {
      background-color: #4c1313;
      color: white;
  }

  .aw-sources-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10em;
      height: 5em;
      margin: 10px;
      color: #fff;
      font-family: proxima nova semibold;
      font-size: 13px;
      border: solid #ffffff 1px;
      border-radius: 5px;
      background-image: linear-gradient(to top, black, rgb(70 2 2 / 58%));
  }

  .aw-sources-item:hover {
      color: #000000;
      background-image: linear-gradient(360deg, #ff1e1ecc, #650d0d73);
      border: solid black 1px;
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

  .main-aw-button .aw-text {
      display: inherit;
      text-transform: uppercase;
      color: inherit;
      font-size: 0.355em;
      position: absolute;
      padding-top: 15px;
      padding-left: 2px;
      font-family: 'proxima nova semibold';
  }

  .schedule-aw-button .aw-text {
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
  .aw-source-name,
  .aw-label,
  .aw-select,
  .aw-content {
      -webkit-user-select:none;
      -khtml-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      -o-user-select:none;
      user-select:none;
  }

  .aw-loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 65px;
      height: 65px;
    }
  .aw-loading div {
      box-sizing: border-box;
      position: absolute;
      width: 64px;
      height: 64px;
      border: 8px solid #fff;
      border-radius: 50%;
      animation: aw-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
  }
  .aw-loading div:nth-child(1) {
      animation-delay: -0.45s;
  }
  .aw-loading div:nth-child(2) {
      animation-delay: -0.3s;
  }
  .aw-loading div:nth-child(3) {
      animation-delay: -0.15s;
  }
  @keyframes aw-loading {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  .aw-content *:focus-visible {
      outline: 0;
  }

  .aw-content *::-webkit-scrollbar {
      width: 5px;
  }

  .aw-content *::-webkit-scrollbar-track {
      background: transparent;
  }

  .aw-content *::-webkit-scrollbar-thumb {
      background: #888;
  }

  .aw-content *::-webkit-scrollbar-thumb:hover {
      background: #555;
  }
`);

const sources = [
  {
    "type": "Online",
    "section": "General",
    "language": "English,Russian",
    "name": "Youtube",
    "link": "https://www.youtube.com/results?search_query=%s"
  },
  {
    "type": "Online",
    "section": "General,Anime,Cartoon,Asian Drama",
    "language": "Russian",
    "name": "Yandex",
    "link": "https://yandex.ru/search/?text=%s%20%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "HiMovie",
    "link": "https://www5.himovies.to/search/%s",
    "space": "-"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "Batflix",
    "link": "https://batflixmovies.club/?s=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "Soap2day",
    "link": "https://soap2day.ac/search/keyword/%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "Openload Movies",
    "link": "https://openloadmov.net/?s=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "TeaTV",
    "link": "https://teatv.xyz/movies?q=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "SockShare",
    "link": "https://sockshare.ac/search-movies/%s.html"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "English",
    "name": "AniMixPlay",
    "link": "https://animixplay.to/?q=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "English",
    "name": "Dramacool",
    "link": "https://dramacool.so/search?section=movies&keyword=%s"
  },
  {
    "type": "Online",
    "section": "Cartoon",
    "language": "English",
    "name":"KimCartoon",
    "link": "https://kimcartoon.to/AdvanceSearch?cartoonName=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "English",
    "name": "Tenshi",
    "link": "https://tenshi.moe/anime?q=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "English",
    "name": "Zoro.to",
    "link": "https://zoro.to/search?keyword=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "Russian",
    "name": "IVI",
    "link": "https://www.ivi.ru/search/?q=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "Russian",
    "name": "Okko",
    "link": "https://okko.tv/search/%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "Russian",
    "name": "Jut.su",
    "link": "https://jut.su/search/?searchid=1893616&text=%s"
  },
  {
    "type": "Online",
    "section": "Cartoon",
    "language": "English",
    "name": "WatchCartoonOnline",
    "link": "https://watchcartoononline.bz/?s=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "English",
    "name": "KissAsian",
    "link": "https://kissasian.la/?s=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "English",
    "name": "Dramanice",
    "link": "https://dramanice.so//search.html?keyword=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "English",
    "name": "DramaHood",
    "link": "https://kdramahood.com/?s=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "Russian",
    "name": "AnimeGO",
    "link": "https://animego.org/search/all?q=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "Russian",
    "name": "YokiAnime",
    "link": "https://yokiani.me/anime_search?search=%s"
  },
  {
    "type": "Online, Torrent",
    "section": "Anime",
    "language": "Russian",
    "name": "AniMedia",
    "link": "https://m45.animedia.pro/catalog?q=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "Russian",
    "name": "AnimeStars",
    "link": "https://animestars.org/index.php?do=search&subaction=search&story=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "Russian",
    "name": "Doramy.club",
    "link": "https://doramy.club/?s=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "Russian",
    "name": "DoramaFox",
    "link": "https://doramafox.ru/?s=%s"
  },
  {
    "type": "Online",
    "section": "Asian Drama",
    "language": "Russian",
    "name": "VseDoramy",
    "link": "https://vsedoramy.net/index.php?do=search&subaction=search&story=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "Russian",
    "name": "HDRezka",
    "link": "https://rezka.ag/search/?do=search&subaction=search&q=%s"
  },
  {
    "type": "Online",
    "section": "Anime",
    "language": "English",
    "name": "KickAssAnime",
    "link": "https://www2.kickassanime.rs/search?q=%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "RARBG",
    "link": "https://rarbgtor.org/torrents.php?search=%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name":"1337x",
    "link": "https://1337x.to/search/%s/1/"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "The Pirate Bay",
    "link": "https://thepiratebay.org/search/%s/0/3/0"
  },
  {
    "type": "Torrent",
    "section": "Anime",
    "language": "English,Russian,Raw",
    "name":"Nyaa",
    "link": "https://nyaa.si/?f=0&c=1_0&q=%s"
  },
  {
    "type": "Torrent",
    "section": "Asian Drama",
    "language": "English,Russian,Raw",
    "name":"Nyaa",
    "link": "https://nyaa.si/?f=0&c=4_0&q=%s"
  },
  {
    "type": "Torrent",
    "section": "Anime",
    "language": "English",
    "name": "Anidex",
    "link": "https://anidex.info/?q=%s"
  },
  {
    "type": "Torrent",
    "section": "Anime",
    "language": "English",
    "name": "ShanaProject",
    "link": "https://www.shanaproject.com/search/?title=%s"
  },
  {
    "type": "Torrent",
    "section": "General,Anime",
    "language": "Russian",
    "name": "Rutracker",
    "link": "https://rutracker.org/forum/tracker.php?nm=%s"
  },
  {
    "type": "Torrent",
    "section": "Asian Drama",
    "language": "English",
    "name": "AvistaZ",
    "link": "https://avistaz.to/torrents?in=1&search=%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "CinemaZ",
    "link": "https://cinemaz.to/torrents?in=1&search=%s"
  },
  {
    "type": "Torrent",
    "section": "General,Anime",
    "language": "Russian",
    "name": "Kinozal",
    "link": "http://kinozal.tv/browse.php?s=%s"
  },
  {
    "type": "Torrent",
    "section": "General,Anime",
    "language": "Russian",
    "name": "NNMClub",
    "link": "http://nnmclub.to/forum/tracker.php?nm=%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "Russian",
    "name": "LostFilm",
    "link": "https://www.lostfilm.tv/search/?q=%s"
  },
  {
    "type": "Torrent",
    "section": "General,Anime",
    "language": "Russian",
    "name": "Rutor",
    "link": "http://rutor.info/search/%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "Torrents.csv",
    "link": "https://torrents-csv.ml/#/search/torrent/%s/1"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "TorrentGalaxy",
    "link": "https://torrentgalaxy.to/torrents.php?c9=1&c3=1&c46=1&c45=1&c42=1&c4=1&c1=1&c25=1&c41=1&c5=1&c6=1&c7=1&search=%s&lang=0&nox=2#results"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "SolidTorrents",
    "link": "https://solidtorrents.net/search?q=%s"
  },
  {
    "type": "Torrent",
    "section": "General",
    "language": "English",
    "name": "MVGroup",
    "link": "https://forums.mvgroup.org/maintracker.php?forums=all&filter=%s&x=0&y=0&searchwhere=on"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name":"HDEncode",
    "link": "https://hdencode.com/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name":"RLSBB",
    "link": "http://search.rlsbb.ru/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name":"Scene-Rls",
    "link": "http://scene-rls.com/?s=%s"
  },
  {
    "type": "DDL",
    "section": "Anime",
    "language": "English",
    "name":"AnimeKaizoku",
    "link": "https://animekaizoku.com/?s=%s"
  },
  {
    "type": "Torrent,DDL",
    "section": "Anime",
    "language": "English",
    "name": "Hi10Anime",
    "link": "https://hi10anime.com/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "2DDL",
    "link": "https://2ddl.ms/?q=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "RapidMoviez",
    "link": "http://rmz.cr/search/%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "MegaDDL",
    "link": "https://megaddl.co/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "MovieParadise",
    "link": "https://movieparadise.org/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "DDLValley",
    "link": "https://www.ddlvalley.me/search/%s"
  },
  {
    "type": "DDL",
    "section": "Anime",
    "language": "English",
    "name": "AniDL",
    "link": "https://anidl.org/?s=%s"
  },
  {
    "type": "DDL",
    "section": "Anime",
    "language": "English",
    "name": "AnimeKayo",
    "link": "https://animekayo.com/?s=%s"
  },
  {
    "type": "DDL,Torrent",
    "section": "General",
    "language": "English",
    "name": "Psarips",
    "link": "https://psa.pm/?s=%s"
  },
  {
    "type": "DDL,Online",
    "section": "General",
    "language": "English",
    "name": "Rarefilmm",
    "link": "https://rarefilmm.com/?s=%s"
  },
  {
    "type": "Database",
    "section": "General",
    "language": "English",
    "name": "IMDB",
    "link": "https://www.imdb.com/find?s=tt&q=%s&ref_=nv_sr_sm"
  },
  {
    "type": "Database",
    "section": "General",
    "language": "English",
    "name": "TheMovieDB",
    "link": "https://www.themoviedb.org/search?query=%s"
  },
  {
    "type": "Database",
    "section": "General",
    "language": "English",
    "name": "TheTVDB",
    "link": "https://thetvdb.com/search?query=%s"
  },
  {
    "type": "Database",
    "section": "Anime",
    "language": "English",
    "name": "AniList",
    "link": "https://anilist.co/search/anime?search=%s&sort=SEARCH_MATCH"
  },
  {
    "type": "Database",
    "section": "Anime",
    "language": "English",
    "name": "MyAnimeList",
    "link": "https://myanimelist.net/anime.php?q=%s&cat=anime"
  },
  {
    "type": "Database",
    "section": "Anime",
    "language": "English",
    "name": "AniDB",
    "link": "https://anidb.net/anime/?adb.search=%s&do.search=1"
  },
  {
    "type": "Database",
    "section": "Asian Drama",
    "language": "English",
    "name": "MyDramaList",
    "link": "https://mydramalist.com/search?q=%s"
  },
  {
    "type": "Database",
    "section": "General",
    "language": "Russian",
    "name": "Kinopoisk",
    "link": "https://www.kinopoisk.ru/index.php?kp_query=%s"
  },
  {
    "type": "Database",
    "section": "Anime",
    "language": "Russian",
    "name": "Shikimori",
    "link": "https://shikimori.one/animes?search=%s"
  },
  {
    "type": "DDL",
    "section": "General,Anime,Asian Drama",
    "language": "English",
    "name": "Pahe.in",
    "link": "https://pahe.li/?s=%s"
  },
  {
    "type": "DDL",
    "section": "General",
    "language": "English",
    "name": "MyDuckisDead",
    "link": "http://myduckisdead.org/?s=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "HDO",
    "link": "https://w10.hdonline.eu/searching/%s/",
    "space": "+"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "C1ne",
    "link": "https://c1ne.co/?s=%s"
  },
  {
    "type": "DDL",
    "section": "Asian Drama",
    "language": "English",
    "name": "MkvDrama",
    "link": "https://mkvdrama.com/?s=%s"
  },
  {
    "type": "Online,DDL",
    "section": "Asian Drama",
    "language": "English",
    "name": "TDrama",
    "link": "http://tdrama.net/search/?id=%s"
  },
  {
    "type": "Torrent",
    "section": "Anime",
    "language": "Russian",
    "name": "AnimeLayer",
    "link": "https://www.animelayer.ru/torrents/anime/?q=%s"
  },
  {
    "type": "Online",
    "section": "General",
    "language": "English",
    "name": "SolarMovie",
    "link": "https://www2.solarmovie.to/search.html?q=%s",
    "space": "-"
  },
  {
    "type": "Online,DDL",
    "section": "Asian Drama",
    "language": "English",
    "name": "MyAsianTV",
    "link": "https://www3.myasiantv.cc/search.html?key=%s",
    "space": "+"
  },
  {
    "type": "DDL",
    "section": "Asian Drama",
    "language": "English",
    "name": "Sojuoppa",
    "link": "https://sojuoppa.tv/?s=%s",
    "space": "+"
  },
  {
    "type": "DDL",
    "section": "Asian Drama",
    "language": "Raw",
    "name": "J-Raws",
    "link": "https://jraws.com/?s=%s",
    "space": "+"
  }
];

const playItems= [
  {
    "link": '[itemtype="http://schema.org/TVSeries"]',
    "id": 'data-show-id',
    "type": 'shows'
  },
  {
    "link": '[itemtype="http://schema.org/TVEpisode"]',
    "id": 'data-show-id',
    "type": 'shows'
  },
  {
    "link": '[itemtype="http://schema.org/TVSeason"]',
    "id": 'data-show-id',
    "type": 'shows'
  },
  {
    "link": '[itemtype="http://schema.org/Movie"]',
    "id": 'data-movie-id',
    "type": 'movies'
  },
  {
    "link": '.schedule-episode',
    "id": 'data-show-id',
    "type": 'shows'
  }
];
const aw_data = {
  "id": "",
  "type": "",
  "title": "",
  "year": "",
  "season": "",
  "episode": "",
  "abs_episode": "",
  "tmdb_id": "",
  "tmdb_title": "",
  "tmdb_original_title": "",
  "image": "",
  "placeholder": "https://trakt.tv/assets/placeholders/full/fanart-7fd177378498acd815bf2386dfb1411223785b1c4dc1f4eada7b7e1f357621b4.png.webp"
};

document.addEventListener("DOMContentLoaded", () => {
  for (let element of playItems) {
    awButtons(element)
  };
})
  
//Functions

function awButtons(playobject) {
  setInterval( function() {
    let playNodes = document.querySelectorAll(playobject.link);

    for (let node of playNodes) {
      let attributes = [];

      switch (playobject.link) {
        case '.schedule-episode':
          if (node.parentElement.parentElement.parentElement.querySelector('h3').textContent.split(' ')[0] == 'Today') {
            if (!node.querySelector('#alternative-watch')) {
              attributes.push({
                name: 'aw-data-id',
                value: node.getAttribute(playobject.id)
              });

              if (node.querySelector('h5 > a').getAttribute('href')) {
                let link = node.querySelector('h5 > a').href;

                attributes.push({
                  name: 'aw-data-type',
                  value: playobject.type
                });

                if (link.includes('/seasons')) {
                  attributes.push({
                    name: 'aw-data-season',
                    value: checkSepNum(link.split('/')[6])
                  });
                };
                if (link.includes('/episode')) {
                  attributes.push({
                    name: 'aw-data-episode',
                    value: checkSepNum(link.split('/').pop())
                  });
                };
              } else {
                attributes.push({
                  name: 'aw-data-type',
                  value: 'movies'
                });
              };

              node.append(awBlock('schedule', attributes));
            };
          };
          break;
        default:
          const actionButtons = node.querySelectorAll('.action-buttons');
          const quickIcons = node.querySelectorAll('.quick-icons');
            
          for (let button of actionButtons) {
            if (!button.querySelector('#alternative-watch')) {
              let link = document.querySelector('meta[itemprop=url]').content;

              attributes.push({
                name: 'aw-data-id',
                value: button.querySelector('.btn-collect').getAttribute(playobject.id)
              });
              attributes.push({
                name: 'aw-data-type',
                value: playobject.type
              });

              if (link.includes('/seasons')) {
                attributes.push({
                  name: 'aw-data-season',
                  value: checkSepNum(link.split('/')[6])
                });
              };
              if (link.includes('/episodes')) {
                attributes.push({
                  name: 'aw-data-episode',
                  value: checkSepNum(link.split('/').pop())
                });
              };
              
              button.querySelector('.btn-collect').after(awBlock('main', attributes))
            };
          };

          for (let icon of quickIcons) {
            if (!icon.querySelector('#alternative-watch')) {
              let link = icon.parentElement.querySelector('meta[itemprop=url]').content;

              attributes.push({
                name: 'aw-data-id',
                value: icon.parentElement.getAttribute(playobject.id)
              });
              attributes.push({
                name: 'aw-data-type',
                value: playobject.type
              });

              if (link.includes('/seasons')) {
                attributes.push({
                  name: 'aw-data-season',
                  value: checkSepNum(link.split('/')[6])
                });
              };
              if (link.includes('/episodes')) {
                attributes.push({
                  name: 'aw-data-episode',
                  value: checkSepNum(link.split('/').pop())
                });
              };
              
              icon.querySelector('.collect').after(awBlock('quick', attributes))
            };
          };
      };
    };
  },500);
};

function awBlock(type, attributes) {
  let icon = type != 'main' ? 'trakt-icon-play2-thick' : 'trakt-icon-play2';

  let block = document.createElement('a');
  block.id = 'alternative-watch';
  block.classList.add(type+'-aw-button');
  for (let attribute of attributes) {
    block.setAttribute(attribute.name, attribute.value);
  };
  block.innerHTML = `<div class="${icon}">`;
  if (type != 'quick') {block.innerHTML += `<div class="aw-text">watch now</div>`};

  block.onclick = () => {
    let awModal = document.createElement('div');
    let awLoading = document.createElement('div');
    let awContent = document.createElement('div');
    let awHeader = document.createElement('div');
    let awFooter = document.createElement('div');

    awModal.classList.add('aw-modal');
    awLoading.classList.add('aw-loading');
    awContent.classList.add('aw-content')
    awHeader.classList.add('aw-header')
    awFooter.classList.add('aw-footer')

    awHeader.innerHTML = `<input type="text" id="aw-search-string"/>`;
    awHeader.innerHTML += `<div id="aw-search-options">`;
    
    document.querySelector('html').append(awModal);
    awModal.append(awLoading);
    awLoading.append(document.createElement('div'));
    awLoading.append(document.createElement('div'));
    awLoading.append(document.createElement('div'));
    awLoading.append(document.createElement('div'));
    awModal.append(awContent);
    awContent.append(awHeader);
    awContent.append(awFooter);

    awModal.style.opacity = 1;

    aw_data.id = block.getAttribute('aw-data-id');
    aw_data.type = block.getAttribute('aw-data-type');
    aw_data.season = block.getAttribute('aw-data-season');
    aw_data.episode = block.getAttribute('aw-data-episode');

    createLB('section',['General','Anime','Cartoon','Asian Drama'],3);
    createLB('type',['Online','Torrent','DDL','Database'],4);
    createLB('language',['English','Russian','Raw'],5);

    reqCall_Data();

    awModal.addEventListener('click', (event) => {
      if(!awContent.contains(event.target)) {
        awModal.style.opacity = 0;
        setTimeout(function() {
          awModal.remove();
          aw_data.title = "";
          aw_data.image = "";
          aw_data.tmdb_id = "";
          aw_data.tmdb_title = "";
          aw_data.tmdb_original_title = "";
          aw_data.abs_episode = "";
        },500);
      };
    });
  };

  return block;
};

function createLB(type,items,order) {
  let awSearchOption = document.createElement('div');
  let awLabel = document.createElement('div');
  let awSelect = document.createElement('div');

  awSearchOption.id = 'aw-'+type;
  awSearchOption.style.order = order;
  awSearchOption.classList.add('aw-search-option');
  awLabel.textContent = upFL(type);
  awLabel.classList.add('aw-label');
  awSelect.classList.add('aw-select');

  awSearchOption.append(awLabel);
  awSearchOption.append(awSelect);
  document.querySelector('#aw-search-options').append(awSearchOption);

  if (items) {
    for (let element of items) {
      let awOption = document.createElement('div');

      awOption.classList.add('aw-option');
      awOption.textContent = element;
      awSelect.append(awOption);

      awOption.onclick = () => {
        awOption.parentElement.querySelectorAll('.aw-option').forEach((item) => item.classList.contains('aw-selected') && item.classList.remove('aw-selected'));
        awOption.classList.add('aw-selected');
        updateTitle();
        updateInfo();
        addSites();
      };
    };
  };

  awSelect.querySelector('.aw-option').classList.add('aw-selected');
}

function updateTitle() {
  const awSearchString = document.querySelector('#aw-search-string');
  const selectedAlias = document.querySelector('#aw-aliases').querySelector('.aw-selected').textContent;
  
  awSearchString.value = awSearchString.value.replace(aw_data.title, selectedAlias);
  aw_data.title = selectedAlias;
};

function updateInfo() {
  const awSearchString = document.querySelector('#aw-search-string');
  const selectedInfo = document.querySelector('#aw-info').querySelector('.aw-selected').textContent;

  switch (selectedInfo) {
    case 'None':
      awSearchString.value = aw_data.title;
      break;
    case 'Season':
      awSearchString.value = aw_data.title+' s'+aw_data.season;
      break;
    case 'Episode':
      awSearchString.value = aw_data.title+' s'+aw_data.season+'e'+aw_data.episode;
      break;
    case 'Year':
      awSearchString.value = aw_data.title+' '+aw_data.year;
      break;
    case 'Absolute':
      awSearchString.value = aw_data.title+' '+aw_data.abs_episode;
      break;
    case 'Season+Year':
      awSearchString.value = aw_data.title+' s'+aw_data.season+' '+aw_data.year;
      break;
    case 'Episode+Year':
      awSearchString.value = aw_data.title+' s'+aw_data.season+'e'+aw_data.episode+' '+aw_data.year;
      break;
    case 'Absolute+Year':
      awSearchString.value = aw_data.title+' '+aw_data.abs_episode+' '+aw_data.year;
  };
};

function addSites() {
  const awFooter = document.querySelector('.aw-footer');
  const awLanguage = document.querySelector('#aw-language');
  const awSection = document.querySelector('#aw-section');
  const awType = document.querySelector('#aw-type');
  const awSearchString = document.querySelector('#aw-search-string');

  awFooter.querySelector('#aw-sources')?.remove();
  awFooter.innerHTML += `<div id="aw-sources"/>`;

  const awSources = document.querySelector('#aw-sources');

  for(let source of sources) {
    if (
      source.type.includes(awType.querySelector('.aw-selected').textContent) &&
      source.language.includes(awLanguage.querySelector('.aw-selected').textContent) &&
      source.section.includes(awSection.querySelector('.aw-selected').textContent)
    ) {
      let awSourcesItem = document.createElement('div');
      let awSourceName = document.createElement('div');

      awSourcesItem.classList.add('aw-sources-item');
      awSourceName.classList.add('aw-source-name');

      awSourcesItem.dataset.awSpace = source.space || '%20';
      awSourcesItem.dataset.awSource = source.link;
      awSourceName.textContent = source.name;
      
      awSourcesItem.append(awSourceName);
      awSources.append(awSourcesItem);
    };
  };

  const awSourceButtons = document.querySelectorAll('.aw-sources-item');
  
  for (let item of awSourceButtons) {
    item.onclick = () => {
      window.open(
        item.dataset.awSource.replace('%s', encodeURIComponent(awSearchString.value).replace(/%20/g, item.dataset.awSpace))
      );
    };
  };
};

function checkSepNum(n) {
    return (n < 10 ? '0' : '') + n;
};

function upFL(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

//API Functions
const traktApiKey = 'd87cd4dc7419e7be1f670003b112ccbd66c4a67e8f360c71abd7a9aef8f46e8d';
const tmdbApiKey = 'a6dc8b1bcbeeaf4c970242298ccf059f';

function reqCall_Data() {
  const awSearchString = document.querySelector('#aw-search-string');

  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': traktApiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    aw_data.title = data.title;
    aw_data.year = data.year;
    aw_data.tmdb_id = data.ids['tmdb'];
    awSearchString.value = aw_data.title;
    if (aw_data.episode) {
      reqCall_Episode();
    } else {
      if (aw_data.season) {
        createLB('info',['None','Year','Season','Season+Year'],2);
      } else {
        createLB('info',['None','Year'],2);
      };

      reqCall_TMDB_Data();
    };
  });
};

function reqCall_TMDB_Data() {
  fetch(`https://api.themoviedb.org/3/${aw_data.type.replace('shows','tv').replace('movies','movie')}/${aw_data.tmdb_id}?api_key=${tmdbApiKey}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      if (data.backdrop_path) {
        aw_data.image = 'https://image.tmdb.org/t/p/w1280'+data.backdrop_path;
      } else {
        if (data.poster_path) {
          aw_data.image = 'https://image.tmdb.org/t/p/w1280'+data.poster_path;
        } else {
          aw_data.image = aw_data.placeholder;
        };
      };
      if (data.name) {aw_data.tmdb_title = data.name};
      if (data.original_name) {aw_data.tmdb_original_title = data.original_name};

      reqCall_Aliases();
    });
};

function reqCall_Aliases() {
  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/aliases`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': traktApiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    let element_titles = aw_data.title;
    for (let element of data) {
      if (!element_titles.includes(element.title)) {
        element_titles=element_titles+','+element.title;
      };
    };
    if (!element_titles.includes(aw_data.tmdb_title)) {
      element_titles=element_titles+','+aw_data.tmdb_title;
    };
    if (!element_titles.includes(aw_data.tmdb_original_title)) {
      element_titles=element_titles+','+aw_data.tmdb_original_title;
    };

    createLB('aliases',element_titles.split(','),1)
    
    const awHeader = document.querySelector('.aw-header');
    const awFooter = document.querySelector('.aw-footer');
    const awLoading = document.querySelector('.aw-loading');

    awHeader.style.backgroundImage = `
      linear-gradient(to top, black, rgb(0 0 0 / 15%)),
      linear-gradient(to right, black, transparent, transparent, transparent, black),
      url(${aw_data.image})
    `;
    
    addSites();
    awLoading.remove();
    awHeader.style.opacity = 1;

    setTimeout(function() {
      awFooter.style.height = '100%';
      awFooter.style.opacity = 1;
    },500);
  });
};

function reqCall_Episode() {
  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/seasons/${aw_data.season}/episodes/${aw_data.episode}?extended=full`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': traktApiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.number_abs) {
      aw_data.abs_episode = checkSepNum(data.number_abs);
    } else {
      aw_data.abs_episode = checkSepNum(data.number);
    };

    createLB('info',['None','Year','Season','Episode','Absolute','Season+Year','Episode+Year','Absolute+Year'],2);
    reqCall_TMDB_Data();
  });
};
