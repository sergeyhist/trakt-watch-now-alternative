// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     4.0
// @author      Hist
// @grant       GM_addStyle
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==

GM_addStyle(`
div[class^="aw-"] {
  transform-origin: top;
  transition: .3s;
}

div[class^=aw-]::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.aw-search-string, .aw-button {
  border: 0;
  outline: 0;
}

.aw-modal {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
}

.aw-block {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  color: white;
  background-color: #1D1D1D;
  border: 1px solid black;
  border-radius: 3px;
  font-family: proxima nova;
}

.aw-type {
  display: grid;
  gap: 2px;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.aw-content {
  max-height: 100%;
}

.aw-header {
  display: grid;
  gap: 20px;
  padding: 20px;
}

.aw-footer {
  display: grid;
  background: #161616;
}

.aw-button {
  background-color: #b110109e;
  transition: .5s;
}

.aw-button:hover, .aw-button-selected {
  background-color: #b1101063;
}

.aw-content, .aw-select {
  overflow: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.aw-search-string {
  background-color: #333;
  text-align: center;
  font-size: 16px;
  white-space: nowrap;
  border-radius: 3px;
  padding-inline: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.aw-search-options {
  display: grid;
  align-items: center;
  row-gap: 10px;
  grid-template-columns: 80px 1fr;
}

.aw-search-option {
  display: grid;
  line-height: 28px;
  font-size: 14px;
}

.aw-label {
  align-self: baseline;
  margin-top: 3px;
}

.aw-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333;
  border-radius: 3px;
  padding-inline: 7px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
}

.aw-title > span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
}

.aw-select {
  max-height: 127px;
  background: #333;
  border-radius: 0 0 3px 3px;
}

.aw-select > div {
  padding-inline: 7px;
  cursor: pointer;
  background: #161616;
  margin: 3px;
  border-radius: 3px;
}

.aw-select > div:hover {
  background: #6c6c6c;
}

.aw-sources {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
}

.aw-link {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 13px;
  border: 1px solid black;
  border-radius: 3px;
}

.alternative-watch {
  display: flex;
  gap: 10px;
  position: absolute;
  align-items: center;
  justify-content: center;
  transition: .5s;
  color: white;
  padding-inline: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 3px 0 0 0;
  bottom: 0;
  right: 0;
  height: 40px;
  width: 40px;
  max-height: 20%;
  max-width: 30%;
  font-size: 1.7em;
}

.alternative-watch-action {
  top: 0;
  height: 30px;
  width: 100%;
  max-width: 100%;
  opacity: .9;
  border-radius: 0;
  border-bottom: 1px solid black;
}

.alternative-watch-schedule {
  border-radius: 3px;
  position: initial;
  margin-bottom: 5px;
  height: 18px;
  width: fit-content;
  max-width: 100%;
  padding-inline: 1px 5px;
}

.alternative-watch-action::after, .alternative-watch-schedule::after {
  content: 'Watch Now';
  font-size: 13px;
  font-weight: bold;
  padding-top: 2px;
}

.alternative-watch:hover {
  color: white;
  background-color: #9e3131!important;
  text-decoration: none;
}

.aw-hidden {
  transform: scaleY(0)!important;
  max-height: 0!important;
  opacity: 0!important;
  visibility: hidden!important;
  border: 0!important;
  outline: 0!important;
  margin: 0!important;
  padding: 0!important;
}

.aw-unselectable {
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  -o-user-select:none;
  user-select:none;
}
`);

const sources = [
  {
    "type": "Online",
    "category": "General",
    "language": "English,Russian",
    "name": "Youtube",
    "link": "https://www.youtube.com/results?search_query=%s"
  },
  {
    "type": "Online",
    "category": "General,Anime,Cartoon,Asian Drama",
    "language": "Russian",
    "name": "Yandex",
    "link": "https://yandex.ru/search/?text=%s%20%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "HiMovie",
    "link": "https://www5.himovies.to/search/%s",
    "space": "-"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "Batflix",
    "link": "https://batflixmovies.club/?s=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "Soap2day",
    "link": "https://soap2day.ac/search/keyword/%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "Openload Movies",
    "link": "https://openloadmov.net/?s=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "TeaTV",
    "link": "https://teatv.xyz/movies?q=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "SockShare",
    "link": "https://sockshare.ac/search-movies/%s.html"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "English",
    "name": "AniMixPlay",
    "link": "https://animixplay.to/?q=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "English",
    "name": "Dramacool",
    "link": "https://dramacool.so/search?section=movies&keyword=%s"
  },
  {
    "type": "Online",
    "category": "Cartoon",
    "language": "English",
    "name":"KimCartoon",
    "link": "https://kimcartoon.to/AdvanceSearch?cartoonName=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "English",
    "name": "Tenshi",
    "link": "https://tenshi.moe/anime?q=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "English",
    "name": "Zoro.to",
    "link": "https://zoro.to/search?keyword=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "Russian",
    "name": "Jut.su",
    "link": "https://jut.su/search/?searchid=1893616&text=%s"
  },
  {
    "type": "Online",
    "category": "Cartoon",
    "language": "English",
    "name": "WatchCartoonOnline",
    "link": "https://watchcartoononline.bz/?s=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "English",
    "name": "KissAsian",
    "link": "https://kissasian.la/?s=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "English",
    "name": "Dramanice",
    "link": "https://dramanice.so//search.html?keyword=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "English",
    "name": "DramaHood",
    "link": "https://kdramahood.com/?s=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "Russian",
    "name": "AnimeGO",
    "link": "https://animego.org/search/all?q=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "Russian",
    "name": "YokiAnime",
    "link": "https://yokiani.me/anime_search?search=%s"
  },
  {
    "type": "Online, Torrent",
    "category": "Anime",
    "language": "Russian",
    "name": "AniMedia",
    "link": "https://m45.animedia.pro/catalog?q=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "Russian",
    "name": "AnimeStars",
    "link": "https://animestars.org/index.php?do=search&subaction=search&story=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "Russian",
    "name": "Doramy.club",
    "link": "https://doramy.club/?s=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "Russian",
    "name": "DoramaFox",
    "link": "https://doramafox.ru/?s=%s"
  },
  {
    "type": "Online",
    "category": "Asian Drama",
    "language": "Russian",
    "name": "VseDoramy",
    "link": "https://vsedoramy.net/index.php?do=search&subaction=search&story=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "Russian",
    "name": "HDRezka",
    "link": "https://rezka.ag/search/?do=search&subaction=search&q=%s"
  },
  {
    "type": "Online",
    "category": "Anime",
    "language": "English",
    "name": "KickAssAnime",
    "link": "https://www2.kickassanime.rs/search?q=%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "RARBG",
    "link": "https://rarbgtor.org/torrents.php?search=%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name":"1337x",
    "link": "https://1337x.to/search/%s/1/"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "The Pirate Bay",
    "link": "https://thepiratebay.org/search/%s/0/3/0"
  },
  {
    "type": "Torrent",
    "category": "Anime",
    "language": "English,Russian,Raw",
    "name":"Nyaa",
    "link": "https://nyaa.si/?f=0&c=1_0&q=%s"
  },
  {
    "type": "Torrent",
    "category": "Asian Drama",
    "language": "English,Russian,Raw",
    "name":"Nyaa",
    "link": "https://nyaa.si/?f=0&c=4_0&q=%s"
  },
  {
    "type": "Torrent",
    "category": "Anime",
    "language": "English",
    "name": "Anidex",
    "link": "https://anidex.info/?q=%s"
  },
  {
    "type": "Torrent",
    "category": "Anime",
    "language": "English",
    "name": "ShanaProject",
    "link": "https://www.shanaproject.com/search/?title=%s"
  },
  {
    "type": "Torrent",
    "category": "General,Anime",
    "language": "Russian",
    "name": "Rutracker",
    "link": "https://rutracker.org/forum/tracker.php?nm=%s"
  },
  {
    "type": "Torrent",
    "category": "Asian Drama",
    "language": "English",
    "name": "AvistaZ",
    "link": "https://avistaz.to/torrents?in=1&search=%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "CinemaZ",
    "link": "https://cinemaz.to/torrents?in=1&search=%s"
  },
  {
    "type": "Torrent",
    "category": "General,Anime",
    "language": "Russian",
    "name": "Kinozal",
    "link": "http://kinozal.tv/browse.php?s=%s"
  },
  {
    "type": "Torrent",
    "category": "General,Anime",
    "language": "Russian",
    "name": "NNMClub",
    "link": "http://nnmclub.to/forum/tracker.php?nm=%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "Russian",
    "name": "LostFilm",
    "link": "https://www.lostfilm.tv/search/?q=%s"
  },
  {
    "type": "Torrent",
    "category": "General,Anime",
    "language": "Russian",
    "name": "Rutor",
    "link": "http://rutor.info/search/%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "Torrents.csv",
    "link": "https://torrents-csv.ml/#/search/torrent/%s/1"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "TorrentGalaxy",
    "link": "https://torrentgalaxy.to/torrents.php?c9=1&c3=1&c46=1&c45=1&c42=1&c4=1&c1=1&c25=1&c41=1&c5=1&c6=1&c7=1&search=%s&lang=0&nox=2#results"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "SolidTorrents",
    "link": "https://solidtorrents.net/search?q=%s"
  },
  {
    "type": "Torrent",
    "category": "General",
    "language": "English",
    "name": "MVGroup",
    "link": "https://forums.mvgroup.org/maintracker.php?forums=all&filter=%s&x=0&y=0&searchwhere=on"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name":"HDEncode",
    "link": "https://hdencode.com/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name":"RLSBB",
    "link": "http://search.rlsbb.ru/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name":"Scene-Rls",
    "link": "http://scene-rls.com/?s=%s"
  },
  {
    "type": "DDL",
    "category": "Anime",
    "language": "English",
    "name":"AnimeKaizoku",
    "link": "https://animekaizoku.com/?s=%s"
  },
  {
    "type": "Torrent,DDL",
    "category": "Anime",
    "language": "English",
    "name": "Hi10Anime",
    "link": "https://hi10anime.com/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "2DDL",
    "link": "https://2ddl.ms/?q=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "RapidMoviez",
    "link": "http://rmz.cr/search/%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "MegaDDL",
    "link": "https://megaddl.co/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "MovieParadise",
    "link": "https://movieparadise.org/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "DDLValley",
    "link": "https://www.ddlvalley.me/search/%s"
  },
  {
    "type": "DDL",
    "category": "Anime",
    "language": "English",
    "name": "AniDL",
    "link": "https://anidl.org/?s=%s"
  },
  {
    "type": "DDL",
    "category": "Anime",
    "language": "English",
    "name": "AnimeKayo",
    "link": "https://animekayo.com/?s=%s"
  },
  {
    "type": "DDL,Torrent",
    "category": "General",
    "language": "English",
    "name": "Psarips",
    "link": "https://psa.pm/?s=%s"
  },
  {
    "type": "DDL,Online",
    "category": "General",
    "language": "English",
    "name": "Rarefilmm",
    "link": "https://rarefilmm.com/?s=%s"
  },
  {
    "type": "Database",
    "category": "General",
    "language": "English",
    "name": "IMDB",
    "link": "https://www.imdb.com/find?s=tt&q=%s&ref_=nv_sr_sm"
  },
  {
    "type": "Database",
    "category": "General",
    "language": "English",
    "name": "TheMovieDB",
    "link": "https://www.themoviedb.org/search?query=%s"
  },
  {
    "type": "Database",
    "category": "General",
    "language": "English",
    "name": "TheTVDB",
    "link": "https://thetvdb.com/search?query=%s"
  },
  {
    "type": "Database",
    "category": "Anime",
    "language": "English",
    "name": "AniList",
    "link": "https://anilist.co/search/anime?search=%s&sort=SEARCH_MATCH"
  },
  {
    "type": "Database",
    "category": "Anime",
    "language": "English",
    "name": "MyAnimeList",
    "link": "https://myanimelist.net/anime.php?q=%s&cat=anime"
  },
  {
    "type": "Database",
    "category": "Anime",
    "language": "English",
    "name": "AniDB",
    "link": "https://anidb.net/anime/?adb.search=%s&do.search=1"
  },
  {
    "type": "Database",
    "category": "Asian Drama",
    "language": "English",
    "name": "MyDramaList",
    "link": "https://mydramalist.com/search?q=%s"
  },
  {
    "type": "Database",
    "category": "General",
    "language": "Russian",
    "name": "Kinopoisk",
    "link": "https://www.kinopoisk.ru/index.php?kp_query=%s"
  },
  {
    "type": "Database",
    "category": "Anime",
    "language": "Russian",
    "name": "Shikimori",
    "link": "https://shikimori.one/animes?search=%s"
  },
  {
    "type": "DDL",
    "category": "General,Anime,Asian Drama",
    "language": "English",
    "name": "Pahe.in",
    "link": "https://pahe.li/?s=%s"
  },
  {
    "type": "DDL",
    "category": "General",
    "language": "English",
    "name": "MyDuckisDead",
    "link": "http://myduckisdead.org/?s=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "HDO",
    "link": "https://w10.hdonline.eu/searching/%s/",
    "space": "+"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "C1ne",
    "link": "https://c1ne.co/?s=%s"
  },
  {
    "type": "DDL",
    "category": "Asian Drama",
    "language": "English",
    "name": "MkvDrama",
    "link": "https://mkvdrama.com/?s=%s"
  },
  {
    "type": "Online,DDL",
    "category": "Asian Drama",
    "language": "English",
    "name": "TDrama",
    "link": "http://tdrama.net/search/?id=%s"
  },
  {
    "type": "Torrent",
    "category": "Anime",
    "language": "Russian",
    "name": "AnimeLayer",
    "link": "https://www.animelayer.ru/torrents/anime/?q=%s"
  },
  {
    "type": "Online",
    "category": "General",
    "language": "English",
    "name": "SolarMovie",
    "link": "https://www2.solarmovie.to/search.html?q=%s",
    "space": "-"
  },
  {
    "type": "Online,DDL",
    "category": "Asian Drama",
    "language": "English",
    "name": "MyAsianTV",
    "link": "https://www3.myasiantv.cc/search.html?key=%s",
    "space": "+"
  },
  {
    "type": "DDL",
    "category": "Asian Drama",
    "language": "English",
    "name": "Sojuoppa",
    "link": "https://sojuoppa.tv/?s=%s",
    "space": "+"
  },
  {
    "type": "DDL",
    "category": "Asian Drama",
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
  "abs_episode": ""
};

let sourcesList = {};
let sourcesLanguages = [];
let sourcesCategories = [];
let sourcesTypes = [];

for (let source of sources) {
  source.language.replace(/, /g, ',').split(',').forEach((item) => {
    !sourcesLanguages.includes(item) && sourcesLanguages.push(item);
    if (!sourcesList[item]) {sourcesList[item] = {}};
    source.category.replace(/, /g, ',').split(',').forEach((item2) => {
      !sourcesCategories.includes(item2) && sourcesCategories.push(item2);
      if (!sourcesList[item][item2]) {sourcesList[item][item2] = []};
      source.type.replace(/, /g, ',').split(',').forEach((item3) => {
        !sourcesTypes.includes(item3) && sourcesTypes.push(item3);
        !sourcesList[item][item2].includes(item3) && sourcesList[item][item2].push(item3)
      })
    })
  })
};

console.log(sourcesCategories);

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
          if (!node.querySelector('.alternative-watch')) {
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

            node.querySelector('h4').after(awBlock('schedule', attributes));
          };
        };
        break;
        default:
        const actionButtons = node.querySelectorAll('.action-buttons');
        const quickIcons = node.querySelectorAll('.quick-icons');
          
        for (let button of actionButtons) {
          if (!document.querySelector('.btn-watch-now').parentElement.querySelector('.alternative-watch')) {
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
            
            document.querySelector('.btn-watch-now').parentNode.querySelector('.poster').append(awBlock('action', attributes))
          };
        };

        for (let icon of quickIcons) {
          if (!icon.parentElement.querySelector('.alternative-watch')) {
            let link = icon.parentElement.querySelector('meta[itemprop=url]').content;

            attributes.push({
              name: 'aw-data-id',
              value: icon.parentElement.getAttribute(playobject.id)
            });
            attributes.push({
              name: 'aw-data-type',
              value: playobject.type
            });
            attributes.push({
              name: 'aw-data-url',
              value: icon.querySelector('.watch-now').dataset.url
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
            
            icon.parentNode.querySelector('.poster')?.append(awBlock('quick', attributes, getComputedStyle(icon)));
            icon.parentNode.querySelector('.fanart')?.append(awBlock('quick', attributes, getComputedStyle(icon)));
          };
        };
      };
    };
  },500);
};

function awBlock(type, attributes, styles) {
  let block = document.createElement('button');

  block.classList.add('aw-button');
  block.classList.add('alternative-watch');
  block.classList.add('alternative-watch-'+type);
  block.innerHTML = `<div class="trakt-icon-play2-thick">`;
  block.style.backgroundColor = styles?.backgroundColor ? styles.backgroundColor : '#333'; 

  for (let attribute of attributes) {block.setAttribute(attribute.name, attribute.value)};

  block.onclick = (event) => {
    event.preventDefault();

    let awModal = document.createElement('div');
    let awBlock = document.createElement('div');
    let awContent = document.createElement('div');
    let awHeader = document.createElement('div');
    let awFooter = document.createElement('div');

    awModal.classList.add('aw-modal');
    awBlock.classList.add('aw-block');
    awBlock.classList.add('aw-hidden');
    awContent.classList.add('aw-content');
    awContent.classList.add('aw-alternative');
    awHeader.classList.add('aw-header');
    awHeader.classList.add('aw-hidden');
    awFooter.classList.add('aw-footer');
    awFooter.classList.add('aw-hidden');

    awHeader.innerHTML = `<input type="text" class="aw-search-string"/>`;
    awHeader.innerHTML += `<div class="aw-search-options">`;
    
    document.querySelector('body').append(awModal);
    awModal.append(awBlock);
    awBlock.append(awContent);
    awContent.append(awHeader);
    awContent.append(awFooter);

    aw_data.id = block.getAttribute('aw-data-id');
    aw_data.type = block.getAttribute('aw-data-type');
    aw_data.season = block.getAttribute('aw-data-season');
    aw_data.episode = block.getAttribute('aw-data-episode');

    createLB('language', sourcesLanguages);
    createLB('category', sourcesCategories);
    createLB('source', sourcesTypes);

    reqCall_Data();

    awModal.addEventListener('click', (event) => {
      if(!awBlock.contains(event.target)) {
        awModal.style.opacity = 0;
        setTimeout(function() {
          awModal.remove();
          aw_data.title = "";
          aw_data.image = "";
          aw_data.abs_episode = "";
        },500);
      };
    });
  };

  return block;
};

function createLB(type, items) {
  let awSearchOption = document.createElement('div');
  let awLabel = document.createElement('div');
  let awTitle = document.createElement('div');
  let awSelect = document.createElement('div');

  awSearchOption.id = 'aw-'+type;
  awSearchOption.classList.add('aw-search-option');
  awSearchOption.classList.add('aw-unselectable');
  awTitle.classList.add('aw-title');
  awTitle.innerHTML = `<span></span><span class="caret"></span>`;
  awLabel.classList.add('aw-label');
  awLabel.classList.add('aw-unselectable');
  awLabel.textContent = upFL(type)+':';
  awSelect.classList.add('aw-select');
  awSelect.classList.add('aw-hidden');

  awSearchOption.append(awTitle);
  awSearchOption.append(awSelect);
  document.querySelector('.aw-search-options').append(awLabel);
  document.querySelector('.aw-search-options').append(awSearchOption);

  if (items) {
    for (let element of items) {
      let option = document.createElement('div');

      option.textContent = element;
      option.classList.add('aw-unselectable');
      awSelect.append(option);

      option.onclick = () => {
        awTitle.querySelector('span').textContent = option.textContent;
        updateTitle();
        updateInfo();
        updateOptions();
        addSites();
      };

      awTitle.querySelector('span').textContent = items[0];
    };
  };

  document.addEventListener('click', (e) => {
    if (!awSearchOption.contains(e.target) || !awSearchOption.querySelector('.aw-select').classList.contains('aw-hidden')) {
      awSearchOption.querySelector('.aw-select').classList.add('aw-hidden');
      setTimeout(() => {awSearchOption.querySelector('.aw-title').style.borderRadius = '3px'}, 100);
    } else {
      awSearchOption.querySelector('.aw-select').classList.remove('aw-hidden');
      setTimeout(() => {awSearchOption.querySelector('.aw-title').style.borderRadius = '3px 3px 0 0'}, 100);
    };
  });
}

function updateTitle() {
  const awSearchString = document.querySelector('.aw-search-string');
  const selectedAlias = document.querySelector('#aw-aliases').querySelector('span').textContent;
  
  awSearchString.value = awSearchString.value.replace(aw_data.title, selectedAlias);
  aw_data.title = selectedAlias;
};

function updateInfo() {
  const awSearchString = document.querySelector('.aw-search-string');
  const selectedInfo = document.querySelector('#aw-info').querySelector('span').textContent;

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

function updateOptions() {
  const awLanguage = document.querySelector('#aw-language');
  const awCategory = document.querySelector('#aw-category');
  const awSource = document.querySelector('#aw-source');

  for (let option of awCategory.querySelector('.aw-select').querySelectorAll('div')) {
    if (!Object.keys(sourcesList[awLanguage.querySelector('span').textContent]).includes(option.textContent)) {
      !option.classList.contains('aw-hidden') && option.classList.add('aw-hidden');
      if (awCategory.querySelector('span').textContent == option.textContent) {awCategory.querySelector('span').textContent = awCategory.querySelector('.aw-select').querySelector('div:not(.aw-hidden)').textContent};
    } else {
      option.classList.contains('aw-hidden') && option.classList.remove('aw-hidden');
    };
  };

  for (let option of awSource.querySelector('.aw-select').querySelectorAll('div')) {
    if (!sourcesList[awLanguage.querySelector('span').textContent][awCategory.querySelector('span').textContent].includes(option.textContent)) {
      !option.classList.contains('aw-hidden') && option.classList.add('aw-hidden');
      if (awSource.querySelector('span').textContent == option.textContent) {awSource.querySelector('span').textContent = awSource.querySelector('.aw-select').querySelector('div:not(.aw-hidden)').textContent};
    } else {
      option.classList.contains('aw-hidden') && option.classList.remove('aw-hidden');
    };
  };
};

function addSites() {
  const awFooter = document.querySelector('.aw-footer');
  const awLanguage = document.querySelector('#aw-language');
  const awCategory = document.querySelector('#aw-category');
  const awSource = document.querySelector('#aw-source');
  const awSearchString = document.querySelector('.aw-search-string');

  awFooter.querySelector('.aw-sources')?.remove();
  awFooter.innerHTML += `<div class="aw-sources"/>`;

  const awSources = document.querySelector('.aw-sources');

  for(let source of sources) {
    if (
      source.type.includes(awSource.querySelector('span').textContent) &&
      source.language.includes(awLanguage.querySelector('span').textContent) &&
      source.category.includes(awCategory.querySelector('span').textContent)
    ) {
      let awLink = document.createElement('button');
      let awSourceName = document.createElement('div');

      awLink.classList.add('aw-link');
      awLink.classList.add('aw-button');
      awSourceName.classList.add('aw-source-name');

      awLink.dataset.awSpace = source.space || '%20';
      awLink.dataset.awSource = source.link;
      awSourceName.textContent = source.name;
      
      awLink.append(awSourceName);
      awSources.append(awLink);
    };
  };

  const awLinks = document.querySelectorAll('.aw-link');
  
  for (let link of awLinks) {
    link.onclick = () => {
      window.open(
        link.dataset.awSource.replace('%s', encodeURIComponent(awSearchString.value).replace(/%20/g, link.dataset.awSpace))
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
const traktApiHeaders = {
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': traktApiKey
};

function reqCall_Data() {
  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}`, {method: 'GET', headers: traktApiHeaders})
    .then(response => response.json())
    .then(async data => {
      const awSearchString = document.querySelector('.aw-search-string');
      const awBlock = document.querySelector('.aw-block');
      const awHeader = document.querySelector('.aw-header');
      const awFooter = document.querySelector('.aw-footer');

      aw_data.title = data.title;
      aw_data.year = data.year;
      awSearchString.value = aw_data.title;

      if (aw_data.episode) {
        await reqCall_Episode();
      } else {
        if (aw_data.season) {
          createLB('info',['None','Year','Season','Season+Year']);
        } else {
          createLB('info',['None','Year']);
        };
      };
      await reqCall_Aliases();
      addSites();
      awBlock.classList.remove('aw-hidden');
      awHeader.classList.remove('aw-hidden');
      awFooter.classList.remove('aw-hidden');
    });
};

async function reqCall_Aliases() {
  await fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/aliases`, {method: 'GET', headers: traktApiHeaders})
    .then(response => response.json())
    .then(data => {
      let elementTitles = [aw_data.title];

      for (let element of data) {!elementTitles.includes(element.title) && elementTitles.push(element.title)};

      createLB('aliases', elementTitles);
    });
};

async function reqCall_Episode() {
  await fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/seasons/${aw_data.season}/episodes/${aw_data.episode}?extended=full`, {method: 'GET', headers: traktApiHeaders})
    .then(response => response.json())
    .then(data => {
      data.number_abs ? aw_data.abs_episode = checkSepNum(data.number_abs) : aw_data.abs_episode = checkSepNum(data.number);

      createLB('info', ['None','Year','Season','Episode','Absolute','Season+Year','Episode+Year','Absolute+Year']);
    });
};
