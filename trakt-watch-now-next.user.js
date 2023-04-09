// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     4.6.2
// @author      Hist
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @updateURL   https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 447:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div[class^=aw-]{transform-origin:top;transition:.3s}.aw-search-string,.aw-button,div[class^=aw-]:focus-visible{border:0;outline:0}.aw-modal{position:fixed;z-index:100000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.9)}.aw-block{position:fixed;display:flex;flex-direction:column;top:10%;left:50%;transform:translate(-50%);width:90%;max-width:400px;max-height:80%;color:#fff;background-color:#1d1d1d;border:1px solid #000;border-radius:3px;font-family:proxima nova}.aw-type{display:grid;gap:2px;grid-template-columns:1fr 1fr;border-bottom:1px solid #000}.aw-content{max-height:100%}.aw-header{display:grid;gap:20px;padding:20px}.aw-footer{display:grid;background:#161616}.aw-button{background-color:rgba(177,16,16,.6196078431);transition:.5s}.aw-button:hover,.aw-button:focus,.aw-button:focus-visible,.aw-button-selected{background-color:#9e3131 !important}.aw-content,.aw-select{overflow:hidden;overflow-y:auto;overscroll-behavior:contain}.aw-search-string{background-color:#333;text-align:center;font-size:16px;white-space:nowrap;border-radius:3px;padding-inline:7px;overflow:hidden;text-overflow:ellipsis}.aw-search-options{display:grid;align-items:center;row-gap:10px;grid-template-columns:80px 1fr}.aw-search-option{display:grid;line-height:28px;font-size:14px}.aw-search-option:focus-visible>.aw-title{background-color:#161616}.aw-label{align-self:baseline;margin-top:3px}.aw-title{display:flex;align-items:center;justify-content:space-between;background:#333;border-radius:3px;padding-inline:7px;cursor:pointer;white-space:nowrap;overflow:hidden;height:28px}.aw-title>span:first-child{overflow:hidden;text-overflow:ellipsis}.aw-select{display:grid;padding:5px;max-height:190px;background:#333;border-radius:0 0 3px 3px}.aw-option{margin-top:2px;padding-inline:7px;cursor:pointer;background:#161616;border-radius:3px}.aw-option:hover,.aw-option:focus-visible{background:#6c6c6c}.aw-sources{display:flex;flex-direction:column;padding:20px;gap:10px}.aw-link{flex-shrink:0;display:flex;align-items:center;justify-content:center;height:50px;font-size:13px;border:1px solid #000;border-radius:3px}.alternative-watch{display:flex;gap:10px;position:absolute;align-items:center;justify-content:center;transition:.5s;color:#fff;padding-inline:10px;box-shadow:0 0 10px #000;border-radius:3px 0 0 0;bottom:0;right:0;height:40px;width:40px;max-height:30%;max-width:40%;font-size:1.7em;opacity:.8}.alternative-watch-action{top:0;height:30px;width:100%;max-width:100%;border-radius:0;border-bottom:1px solid #000}.alternative-watch-action-mobile{height:100%;max-height:100%;width:100%;max-width:100%;border-radius:0;opacity:.7}.alternative-watch-schedule{border-radius:3px;position:initial;margin-bottom:5px;height:18px;width:fit-content;max-width:100%;padding-inline:1px 5px;font-size:1.2em;padding-top:2px}.alternative-watch-action::after,.alternative-watch-schedule::after{content:\"Watch Now\";font-size:13px;font-weight:bold;padding-top:2px}.aw-search-cbs{display:flex;justify-content:space-between;gap:20px}.aw-search-cb{display:flex;padding:5px 10px;align-items:center;justify-content:center;border-radius:3px;width:100%}.aw-search-cb:focus-visible{filter:contrast(1.4)}.aw-hidden{transform:scaleY(0) !important;max-height:0 !important;opacity:0 !important;visibility:hidden !important;border:0 !important;outline:0 !important;margin:0 !important;padding:0 !important}.aw-unselectable{-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/english-sources.json
const english_sources_namespaceObject = JSON.parse('[{"name":"General","list":[{"name":"Online","list":[{"name":"Youtube","link":"https://www.youtube.com/results?search_query=%s"},{"name":"Himovies","link":"https://himovies.top/search/%s","space":"-"},{"name":"Sflix.to","link":"https://sflix.to/search/%s","space":"-"},{"name":"Openload Movies","link":"https://openloadmov.net/?s=%s"},{"name":"LookMovie-Movies","link":"https://lookmovie2.to/movies/search/?q=%s"},{"name":"LookMovie-Shows","link":"https://lookmovie2.to/shows/search/?q=%s"},{"name":"C1ne","link":"https://c1ne.co/?s=%s"},{"name":"Rarefilmm","link":"https://rarefilmm.com/?s=%s"},{"name":"SolarMovie","link":"https://www2.solarmovie.to/search.html?q=%s","space":"-"},{"name":"M4uFree","link":"https://ww2.m4ufree.com/search/%s.html","space":"-"}]},{"name":"Torrent","list":[{"name":"RARBG","link":"https://rarbg.to/torrents.php?search=%s"},{"name":"1337x","link":"https://1337x.to/search/%s/1/"},{"name":"SolidTorrents","link":"https://solidtorrents.net/search?q=%s"},{"name":"TorrentGalaxy","link":"https://torrentgalaxy.to/torrents.php?c9=1&c3=1&c46=1&c45=1&c42=1&c4=1&c1=1&c25=1&c41=1&c5=1&c6=1&c7=1&search=%s&lang=0&nox=2#results"},{"name":"Torrents.csv","link":"https://torrents-csv.ml/#/search/torrent/%s/1"},{"name":"CinemaZ","link":"https://cinemaz.to/torrents?in=1&search=%s"},{"name":"The Pirate Bay","link":"https://thepiratebay.org/search/%s/0/3/0"},{"name":"MVGroup","link":"https://forums.mvgroup.org/maintracker.php?forums=all&filter=%s&x=0&y=0&searchwhere=on"},{"name":"Psarips","link":"https://psa.pm/?s=%s"}]},{"name":"DDL","list":[{"name":"HDEncode","link":"https://hdencode.com/?s=%s"},{"name":"RLSBB","link":"http://search.rlsbb.ru/?s=%s"},{"name":"Scene-Rls","link":"http://scene-rls.com/?s=%s"},{"name":"2DDL","link":"https://2ddl.ms/?q=%s"},{"name":"RapidMoviez","link":"http://rmz.cr/search/%s"},{"name":"MegaDDL","link":"https://megaddl.co/?s=%s"},{"name":"MovieParadise","link":"https://movieparadise.org/?s=%s"},{"name":"DDLValley","link":"https://www.ddlvalley.me/search/%s"},{"name":"Psarips","link":"https://psa.pm/?s=%s"},{"name":"Rarefilmm","link":"https://rarefilmm.com/?s=%s"},{"name":"Pahe.in","link":"https://pahe.li/?s=%s"}]},{"name":"Database","list":[{"name":"IMDB","link":"https://www.imdb.com/find?s=tt&q=%s&ref_=nv_sr_sm"},{"name":"TheMovieDB","link":"https://www.themoviedb.org/search?query=%s"},{"name":"TheTVDB","link":"https://thetvdb.com/search?query=%s"}]}]},{"name":"Anime","list":[{"name":"Online","list":[{"name":"GoGoAnime","link":"https://www1.gogoanime.bid/search.html?keyword=%s"},{"name":"Zoro.to","link":"https://zoro.to/search?keyword=%s"},{"name":"AnimeFox","link":"https://animefox.to/search?keyword=%s","space":"+"},{"name":"PactedAnime","link":"https://pactedanime.com/?s=%s","space":"+"}]},{"name":"Torrent","list":[{"name":"Nyaa","link":"https://nyaa.si/?f=0&c=1_2&q=%s","space":"+"},{"name":"Anidex","link":"https://anidex.info/?q=%s"},{"name":"ShanaProject","link":"https://www.shanaproject.com/search/?title=%s"}]},{"name":"DDL","list":[{"name":"AnimeKaizoku","link":"https://animekaizoku.com/?s=%s"},{"name":"Hi10Anime","link":"https://hi10anime.com/?s=%s"},{"name":"AniDL","link":"https://anidl.org/?s=%s"},{"name":"AnimeKayo","link":"https://animekayo.com/?s=%s"},{"name":"Pahe.in","link":"https://pahe.li/?s=%s"}]},{"name":"Database","list":[{"name":"AniList","link":"https://anilist.co/search/anime?search=%s&sort=SEARCH_MATCH"},{"name":"MyAnimeList","link":"https://myanimelist.net/anime.php?q=%s&cat=anime"},{"name":"AniDB","link":"https://anidb.net/anime/?adb.search=%s&do.search=1"}]}]},{"name":"Asian Drama","list":[{"name":"Online","list":[{"name":"Dramacool","link":"https://dramacool.so/search?section=movies&keyword=%s"},{"name":"KissAsian","link":"https://kissasian.la/?s=%s"},{"name":"Dramanice","link":"https://dramanice.so//search.html?keyword=%s"},{"name":"DramaHood","link":"https://kdramahood.com/?s=%s"},{"name":"TDrama","link":"http://tdrama.net/search/?id=%s"},{"name":"MyAsianTV","link":"https://www3.myasiantv.cc/search.html?key=%s","space":"+"}]},{"name":"Torrent","list":[{"name":"Nyaa","link":"https://nyaa.si/?f=0&c=4_1&q=%s","space":"+"},{"name":"AvistaZ","link":"https://avistaz.to/torrents?in=1&search=%s"}]},{"name":"DDL","list":[{"name":"Pahe.in","link":"https://pahe.li/?s=%s"},{"name":"MkvDrama","link":"https://mkvdrama.com/?s=%s"},{"name":"TDrama","link":"http://tdrama.net/search/?id=%s"},{"name":"MyAsianTV","link":"https://www3.myasiantv.cc/search.html?key=%s","space":"+"},{"name":"Sojuoppa","link":"https://sojuoppa.tv/?s=%s","space":"+"}]},{"name":"Database","list":[{"name":"MyDramaList","link":"https://mydramalist.com/search?q=%s"}]}]},{"name":"Cartoon","list":[{"name":"Online","list":[{"name":"KimCartoon","link":"https://kimcartoon.to/AdvanceSearch?cartoonName=%s"},{"name":"WatchCartoonOnline","link":"https://watchcartoononline.bz/?s=%s"}]}]}]');
;// CONCATENATED MODULE: ./src/russian-sources.json
const russian_sources_namespaceObject = JSON.parse('[{"name":"General","list":[{"name":"Online","list":[{"name":"Yandex","link":"https://yandex.ru/search/?text=%s%20%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD"},{"name":"HDRezka","link":"https://rezka.ag/search/?do=search&subaction=search&q=%s"},{"name":"VK Video","link":"https://vk.com/video?q=%s"}]},{"name":"Torrent","list":[{"name":"Rutracker","link":"https://rutracker.org/forum/tracker.php?nm=%s"},{"name":"Kinozal","link":"http://kinozal.tv/browse.php?s=%s"},{"name":"NNMClub","link":"http://nnmclub.to/forum/tracker.php?nm=%s"},{"name":"LostFilm","link":"https://www.lostfilm.tv/search/?q=%s"},{"name":"Rutor","link":"http://rutor.info/search/%s"}]},{"name":"Database","list":[{"name":"Kinopoisk","link":"https://www.kinopoisk.ru/index.php?kp_query=%s"}]}]},{"name":"Anime","list":[{"name":"Online","list":[{"name":"Jut.su","link":"https://jut.su/search/?searchid=1893616&text=%s"},{"name":"AnimeGO","link":"https://animego.org/search/all?q=%s"},{"name":"YokiAnime","link":"https://yokiani.me/anime_search?search=%s"},{"name":"AniMedia","link":"https://m45.animedia.pro/catalog?q=%s"},{"name":"AnimeStars","link":"https://animestars.org/index.php?do=search&subaction=search&story=%s"}]},{"name":"Torrent","list":[{"name":"AnimeLayer","link":"https://www.animelayer.ru/torrents/anime/?q=%s"}]},{"name":"Database","list":[{"name":"Shikimori","link":"https://shikimori.one/animes?search=%s"}]}]},{"name":"Asian Drama","list":[{"name":"Online","list":[{"name":"Doramy.club","link":"https://doramy.club/?s=%s"},{"name":"DoramaFox","link":"https://doramafox.ru/?s=%s"},{"name":"VseDoramy","link":"https://vsedoramy.net/index.php?do=search&subaction=search&story=%s"}]}]}]');
;// CONCATENATED MODULE: ./src/raw-sources.json
const raw_sources_namespaceObject = JSON.parse('[{"name":"Anime","list":[{"name":"Torrent","list":[{"name":"Nyaa","link":"https://nyaa.si/?f=0&c=1_4&q=%s","space":"+"}]}]},{"name":"Asian Drama","list":[{"name":"Torrent","list":[{"name":"Nyaa","link":"https://nyaa.si/?f=0&c=4_4&q=%s","space":"+"}]},{"name":"DDL","list":[{"name":"J-Raws","link":"https://jraws.com/?s=%s","space":"+"}]}]}]');
// EXTERNAL MODULE: ./src/styles.css
var styles = __webpack_require__(447);
;// CONCATENATED MODULE: ./src/index.js







const traktApiKey =
  "d87cd4dc7419e7be1f670003b112ccbd66c4a67e8f360c71abd7a9aef8f46e8d";
const tmdbApiKey = "a6dc8b1bcbeeaf4c970242298ccf059f";
const traktApiHeaders = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": traktApiKey,
};

class LocalInfo {
  constructor() {
    this.all = {};
    this.year;
    this.absolute;
    this.language;
    this.category;
    this.source;
    this.alias;
    this.season;
    this.episode;
  }

  get() {
    this.all = JSON.parse(localStorage.getItem(`awLocalInfo_${aw_data.id}`));
    if (this.all) {
      this.year = this.all.year
      this.absolute = this.all.absolute;
      this.language = this.all.language;
      this.category = this.all.category;
      this.source = this.all.source;
      this.alias = this.all.alias;
      this.season = this.all.season;
      this.episode = this.all.episode;
    }
  }

  clear() {
    this.all = {};
    this.year = null;
    this.absolute = null;
    this.language = null;
    this.category = null;
    this.source = null;
    this.alias = null;
    this.season = null;
    this.episode = null;
  }
}

class CB {
  constructor(type) {
    this.type = type;
    this.active;
    this.disabled = false;
    this.label = document.createElement("span");
    this.label.textContent = upFL(type);
    this.block = document.createElement("div");
    this.block.classList.add("aw-search-cb", "aw-unselectable");
    this.block.id = `aw-${type}`;
    this.block.tabIndex = '0';
    this.block.append(this.label);

    this.block.addEventListener("click", () => {
      if (!this.disabled) {
        this.active = !this.active;
        this.setStyles();
        updater();
      }
    });

    this.block.addEventListener("keydown", (e) => {
      if (!this.disabled && e.key == "Enter") {
        this.active = !this.active;
        this.setStyles();
        updater();
      }
    });
  }
  
  setStyles() {
    if (this.active) {
      this.block.style.background = '#b110109e'
      this.label.style.opacity = '.8'
    } else {
      this.block.style.background = '#333333';
      this.label.style.opacity = '.5'
    };

    if (this.disabled) {
      this.block.style.opacity = '.2';
      this.block.style.cursor = 'default';
    } else {
      this.block.style.opacity = '1';
      this.block.style.cursor = 'pointer';
    };
  }

  init(type, root) {
    root[type](this.block);
    this.active = localInfo[this.type] == "true" ? true : false;
    this.setStyles();
  }
}

class LB {
  constructor(type) {
    (this.type = type), (this.searchOption = document.createElement("div"));
    this.label = document.createElement("div");
    this.title = document.createElement("div");
    this.select = document.createElement("div");
    this.searchOption.tabIndex = "0";
    this.searchOption.id = "aw-" + this.type;
    this.searchOption.classList.add("aw-search-option", "aw-unselectable");
    this.title.classList.add("aw-title");
    this.title.innerHTML = `<span></span><span class="caret"></span>`;
    this.label.classList.add("aw-label", "aw-unselectable");
    this.label.textContent = upFL(this.type) + ":";
    this.select.classList.add("aw-select", "aw-hidden");
    this.searchOption.append(this.title, this.select);

    document.addEventListener("click", (e) => {
      this.#toggleList(e);
    });

    document.addEventListener("keydown", (e) => {
      e.key == "Enter" && this.#toggleList(e);
    });
  }

  #toggleList(event) {
    if (
      !this.searchOption.contains(event.target) ||
      !this.searchOption
        .querySelector(".aw-select")
        .classList.contains("aw-hidden")
    ) {
      this.searchOption.querySelector(".aw-select").classList.add("aw-hidden");
      setTimeout(() => {
        this.searchOption.querySelector(".aw-title").style.borderRadius = "3px";
      }, 100);
    } else {
      this.searchOption
        .querySelector(".aw-select")
        .classList.remove("aw-hidden");
      setTimeout(() => {
        this.searchOption.querySelector(".aw-title").style.borderRadius =
          "3px 3px 0 0";
      }, 100);
      setTimeout(() => {
        this.getOptions().forEach((option) => {
          if (option.textContent == this.getTitle()) {
            option.focus({ focusVisible: true });
          }
        });
      }, 200);
    }
  }

  #selectOption(option) {
    this.setTitle(option);
    this.title.focus();
    updater();
  }

  #optionCreate(option) {
    let optionBlock = document.createElement("div");

    optionBlock.tabIndex = "0";
    optionBlock.textContent = option;
    optionBlock.classList.add("aw-option", "aw-unselectable");
    this.select.append(optionBlock);
    this.localInfo &&
      option == this.localInfo[this.type] &&
      (this.title.textContent = option);

    optionBlock.onclick = () => {
      this.#selectOption(option);
    };

    optionBlock.onkeydown = (e) => {
      e.key == "Enter" && this.#selectOption(option);
    };
  }

  setTitle(text) {
    this.title.querySelector("span").textContent = text;
  }

  getTitle() {
    return this.title.querySelector("span").textContent;
  }

  init(root, initial) {
    if (!root.contains(this.label)) {
      localInfo[this.type] && this.setTitle(localInfo[this.type]);
      initial && this.setTitle(initial);
      root.append(this.label, this.searchOption);
    }
  }

  remove() {
    this.label.remove();
    this.searchOption.remove();
  }

  update(items) {
    for (let item of items) {
      this.#optionCreate(item);
    }

    if (this.title.querySelector("span").textContent == "") {
      this.setTitle(items[0]);
    }
  }

  getOptions() {
    return this.searchOption.querySelectorAll(".aw-option");
  }

  isExist(root) {
    return root.contains(this.searchOption);
  }

  clear(onlyOptions = false) {
    !onlyOptions && this.setTitle("");
    this.getOptions().forEach((option) => {
      option.remove();
    });
  }
}

const sourcesList = [
  {
    name: "English",
    list: english_sources_namespaceObject,
  },
  {
    name: "Russian",
    list: russian_sources_namespaceObject,
  },
  {
    name: "Raw",
    list: raw_sources_namespaceObject,
  },
];
const sourcesLanguages = [];
const sourcesCategories = [];
const sourcesTypes = [];

sourcesList.forEach((item) => {
  sourcesLanguages.push(item.name);
  item.list.forEach((item1) => {
    !sourcesCategories.includes(item1.name) &&
      sourcesCategories.push(item1.name);
    item1.list.forEach(
      (item2) =>
        !sourcesTypes.includes(item2.name) && sourcesTypes.push(item2.name)
    );
  });
});

const playItems = [
  {
    link: '[itemtype="http://schema.org/TVSeries"]',
    id: "data-show-id",
    type: "shows",
  },
  {
    link: '[itemtype="http://schema.org/TVEpisode"]',
    id: "data-show-id",
    type: "shows",
  },
  {
    link: '[itemtype="http://schema.org/TVSeason"]',
    id: "data-show-id",
    type: "shows",
  },
  {
    link: '[itemtype="http://schema.org/Movie"]',
    id: "data-movie-id",
    type: "movies",
  },
  {
    link: ".schedule-episode",
    id: "data-show-id",
    type: "shows",
  },
];

const aw_data = {
  id: "",
  tmdb: "",
  type: "",
  title: "",
  year: "",
  season: "",
  episode: "",
  abs_episode: "",
  seasons: [],
};

const localInfo = new LocalInfo();
const yearCB = new CB("year");
const absoluteCB = new CB("absolute");
const languageLB = new LB("language");
const categoryLB = new LB("category");
const sourceLB = new LB("source");
const aliasLB = new LB("alias");
const seasonLB = new LB("season");
const episodeLB = new LB("episode");

document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement('style');

  style.textContent = styles/* default */.Z;
  document.head.appendChild(style);
  
  for (let element of playItems) {
    awButtons(element);
  }
});

//Functions

function updater() {
  const searchString = document.querySelector(".aw-search-string");
  const searchOptions = document.querySelector(".aw-search-options");
  let selectedLanguage = languageLB.title.querySelector("span").textContent;
  let selectedCategory = categoryLB.title.querySelector("span").textContent;
  let selectedSource = sourceLB.title.querySelector("span").textContent;
  let selectedAlias = aliasLB.title.querySelector("span").textContent;
  let selectedSeason;
  let selectedEpisode;

  const changeSearchString = () => {
    const episodeInfo = () => {
      if (selectedSeason != "None") {
        if (selectedEpisode != "None") {
          if (absoluteCB.active) {
            return " " + selectedEpisode;
          } else {
            return ` s${selectedSeason}e${selectedEpisode}`;
          }
        } else {
          return " s" + selectedSeason;
        }
      } else {
        return "";
      }
    };

    searchString.value =
      (selectedAlias ? selectedAlias : aw_data.title) +
      episodeInfo() +
      (yearCB.active ? " " + aw_data.year : "");
  };

  const optionsCheck = (title, options, checkArray) => {
    for (let option of options) {
      if (!checkArray.find((element) => element.name == option.textContent)) {
        option.classList.add("aw-hidden");

        if (title.textContent == option.textContent) {
          title.textContent = option.parentElement.querySelector(
            "div:not(.aw-hidden)"
          ).textContent;
        }
      }
    }
  };

  if (["Torrent", "DDL"].includes(selectedSource) && aw_data.type == "shows") {
    seasonLB.init(searchOptions, aw_data.season);
    selectedSeason = seasonLB.title.querySelector("span").textContent;
  } else {
    seasonLB.remove();
    selectedSeason = "None";
  }

  if (selectedSeason != "None" && seasonLB.isExist(searchOptions)) {
    episodeLB.init(searchOptions, aw_data.episode);
    selectedEpisode = episodeLB.title.querySelector("span").textContent;
    fetch(
      `https://api.trakt.tv/${aw_data.type}/${
        aw_data.id
      }/seasons/${+selectedSeason}`,
      {
        method: "GET",
        headers: traktApiHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let episodes = [];
        episodeLB.clear({ onlyOptions: true });
        episodeLB.update(["None"]);
        data.forEach((episode) => {
          episodes.push(checkSepNum(episode.number));
        });
        episodeLB.update(episodes);
        selectedEpisode != "None" &&
          !episodes.includes(selectedEpisode) &&
          episodeLB.setTitle(episodes[0]);
        selectedEpisode = episodeLB.title.querySelector("span").textContent;

        changeSearchString();
      });
  } else {
    episodeLB.remove();
    selectedEpisode = "None";

    changeSearchString();
  }

  for (let option of document.querySelectorAll(".aw-option")) {
    option.classList.contains("aw-hidden") &&
      option.classList.remove("aw-hidden");
  }

  optionsCheck(
    categoryLB.title.querySelector("span"),
    categoryLB.getOptions(),
    sourcesList.find((element) => element.name == selectedLanguage).list
  );

  optionsCheck(
    sourceLB.title.querySelector("span"),
    sourceLB.getOptions(),
    sourcesList
      .find((element) => element.name == selectedLanguage)
      .list.find((element) => element.name == selectedCategory).list
  );

  addSites();
    absoluteCB.disabled = selectedEpisode == 'None';
  absoluteCB.setStyles();
}

function awButtons(playobject) {
  setInterval(function () {
    let playNodes = document.querySelectorAll(playobject.link);

    for (let node of playNodes) {
      let attributes = [];

      switch (playobject.link) {
        case ".schedule-episode":
          if (
            node.parentElement.parentElement.parentElement
              .querySelector("h3")
              .textContent.split(" ")[0] == "Today"
          ) {
            if (!node.querySelector(".alternative-watch")) {
              attributes.push({
                name: "aw-data-id",
                value: node.getAttribute(playobject.id),
              });

              if (node.querySelector("h5 > a")) {
                let link = node.querySelector("h5 > a").href;

                attributes.push({
                  name: "aw-data-type",
                  value: playobject.type,
                });

                if (link.includes("/seasons")) {
                  attributes.push({
                    name: "aw-data-season",
                    value: checkSepNum(link.split("/")[6]),
                  });
                }
                if (link.includes("/episode")) {
                  attributes.push({
                    name: "aw-data-episode",
                    value: checkSepNum(link.split("/").pop()),
                  });
                }
              } else {
                attributes.push({
                  name: "aw-data-type",
                  value: "movies",
                });
              }

              node.querySelector("h4").after(awBlock("schedule", attributes));
            }
          }
          break;
        default:
          const actionButtons = node.querySelectorAll(".action-buttons");
          const quickIcons = node.querySelectorAll(".quick-icons");

          for (let button of actionButtons) {
            if (
              !document
                .querySelector(".btn-watch-now")
                .parentElement.querySelector(".alternative-watch")
            ) {
              let link = document.querySelector("meta[itemprop=url]").content;

              attributes.push({
                name: "aw-data-id",
                value: button
                  .querySelector(".btn-collect")
                  .getAttribute(playobject.id),
              });
              attributes.push({
                name: "aw-data-type",
                value: playobject.type,
              });

              if (link.includes("/seasons")) {
                attributes.push({
                  name: "aw-data-season",
                  value: checkSepNum(link.split("/")[6]),
                });
              }
              if (link.includes("/episodes")) {
                attributes.push({
                  name: "aw-data-episode",
                  value: checkSepNum(link.split("/").pop()),
                });
              }

              document
                .querySelector(".btn-watch-now")
                .parentNode.querySelector(".poster")
                .append(awBlock("action", attributes));
              document
                .querySelector(".mobile-poster")
                .querySelector(".poster")
                .append(awBlock("action-mobile", attributes));
            }
          }

          for (let icon of quickIcons) {
            if (!icon.parentElement.querySelector(".alternative-watch")) {
              let link =
                icon.parentElement.querySelector("meta[itemprop=url]").content;

              attributes.push({
                name: "aw-data-id",
                value: icon.parentElement.getAttribute(playobject.id),
              });
              attributes.push({
                name: "aw-data-type",
                value: playobject.type,
              });
              attributes.push({
                name: "aw-data-url",
                value: icon.querySelector(".watch-now").dataset.url,
              });

              if (link.includes("/seasons")) {
                attributes.push({
                  name: "aw-data-season",
                  value: checkSepNum(link.split("/")[6]),
                });
              }
              if (link.includes("/episodes")) {
                attributes.push({
                  name: "aw-data-episode",
                  value: checkSepNum(link.split("/").pop()),
                });
              }

              icon.parentNode
                .querySelector(".poster")
                ?.append(awBlock("quick", attributes, getComputedStyle(icon)));
              icon.parentNode
                .querySelector(".fanart")
                ?.append(awBlock("quick", attributes, getComputedStyle(icon)));
            }
          }
      }
    }
  }, 500);
}

function awBlock(type, attributes, styles) {
  let block = document.createElement("button");

  block.tabIndex = "0";
  block.classList.add("aw-button");
  block.classList.add("alternative-watch");
  block.classList.add("alternative-watch-" + type);
  block.innerHTML = `<div class="trakt-icon-play2-thick">`;
  block.style.backgroundColor = styles?.backgroundColor
    ? styles.backgroundColor
    : "#333";

  for (let attribute of attributes) {
    block.setAttribute(attribute.name, attribute.value);
  }

  block.onclick = (event) => {
    event.preventDefault();

    const closeModal = (modal) => {
      localStorage.setItem(
        `awLocalInfo_${aw_data.id}`,
        JSON.stringify({
          year: yearCB.active.toString(),
          absolute: absoluteCB.active.toString(),
          language: languageLB.title.querySelector("span").textContent,
          category: categoryLB.title.querySelector("span").textContent,
          source: sourceLB.title.querySelector("span").textContent,
          alias: aliasLB.title.querySelector("span").textContent,
          season: seasonLB.title.querySelector("span").textContent,
          episode: episodeLB.title.querySelector("span").textContent,
        })
      );

      modal.style.opacity = 0;

      setTimeout(function () {
        awModal.remove();
        aw_data.title = "";
        aw_data.abs_episode = "";
        aw_data.seasons = [];
        languageLB.clear();
        categoryLB.clear();
        sourceLB.clear();
        aliasLB.clear();
        seasonLB.clear();
        episodeLB.clear();
        localInfo.clear();
      }, 500);

      block.focus();
    };

    let awModal = document.createElement("div");
    let awBlock = document.createElement("div");
    let awContent = document.createElement("div");
    let awHeader = document.createElement("div");
    let awFooter = document.createElement("div");

    awContent.tabIndex = "-1";

    awModal.classList.add("aw-modal");
    awBlock.classList.add("aw-block");
    awBlock.classList.add("aw-hidden");
    awContent.classList.add("aw-content");
    awContent.classList.add("aw-alternative");
    awHeader.classList.add("aw-header");
    awHeader.classList.add("aw-hidden");
    awFooter.classList.add("aw-footer");
    awFooter.classList.add("aw-hidden");

    awHeader.innerHTML = `
      <input type="text" class="aw-search-string" tabindex="0"/>
      <div class="aw-search-cbs"></div>
      <div class="aw-search-options"></div>
    `;

    document.querySelector("body").append(awModal);
    awModal.append(awBlock);
    awBlock.append(awContent);
    awContent.append(awHeader);
    awContent.append(awFooter);

    aw_data.id = block.getAttribute("aw-data-id");
    aw_data.type = block.getAttribute("aw-data-type");
    aw_data.season = block.getAttribute("aw-data-season");
    aw_data.episode = block.getAttribute("aw-data-episode");

    localInfo.get();

    yearCB.init("append", document.querySelector(".aw-search-cbs"));
    absoluteCB.init("append", document.querySelector(".aw-search-cbs"));

    languageLB.init(document.querySelector(".aw-search-options"));
    categoryLB.init(document.querySelector(".aw-search-options"));
    sourceLB.init(document.querySelector(".aw-search-options"));
    aliasLB.init(document.querySelector(".aw-search-options"));
    languageLB.update(sourcesLanguages);
    categoryLB.update(sourcesCategories);
    sourceLB.update(sourcesTypes);
    seasonLB.update(["None"]);
    episodeLB.update(["None"]);

    updater();
    reqCall_Data();

    awBlock.classList.remove("aw-hidden");
    awHeader.classList.remove("aw-hidden");

    document.addEventListener("click", (e) => {
      e.target == awModal && closeModal(awModal);
    });

    document.addEventListener("keydown", (e) => {
      e.key == "Escape" && closeModal(awModal);
    });
  };

  return block;
}

function addSites() {
  const awFooter = document.querySelector(".aw-footer");
  const awSearchString = document.querySelector(".aw-search-string");
  const selectedLanguage = languageLB.title.querySelector("span").textContent;
  const selectedCategory = categoryLB.title.querySelector("span").textContent;
  const selectedSource = sourceLB.title.querySelector("span").textContent;

  awFooter.querySelector(".aw-sources")?.remove();
  awFooter.innerHTML += `<div class="aw-sources"/>`;

  const awSources = document.querySelector(".aw-sources");
  const sources = sourcesList
    .find((element) => element.name == selectedLanguage)
    .list.find((element) => element.name == selectedCategory)
    .list.find((element) => element.name == selectedSource).list;

  for (let source of sources) {
    let awLink = document.createElement("button");
    let awSourceName = document.createElement("div");

    awLink.classList.add("aw-link");
    awLink.classList.add("aw-button");
    awSourceName.classList.add("aw-source-name");

    awLink.dataset.awSpace = source.space || "%20";
    awLink.dataset.awSource = source.link;
    awSourceName.textContent = source.name;

    awLink.append(awSourceName);
    awSources.append(awLink);
  }

  const awLinks = document.querySelectorAll(".aw-link");

  for (let link of awLinks) {
    link.onclick = () => {
      window.open(
        link.dataset.awSource.replace(
          "%s",
          encodeURIComponent(awSearchString.value).replace(
            /%20/g,
            link.dataset.awSpace
          )
        )
      );
    };
  }
}

function checkSepNum(n) {
  return (n < 10 ? "0" : "") + n;
}

function upFL(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

//API Functions

async function reqCall_Data() {
  const awContent = document.querySelector(".aw-content");
  const awFooter = document.querySelector(".aw-footer");

  const [traktInfoResponse, seasonInfoResponse] = await Promise.allSettled([
    fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}`, {
      method: "GET",
      headers: traktApiHeaders,
    }),
    aw_data.type == "shows" &&
      fetch(
        `https://api.trakt.tv/${aw_data.type}/${aw_data.id}/seasons?extended=full`,
        {
          method: "GET",
          headers: traktApiHeaders,
        }
      ),
  ]);

  const traktInfo =
    traktInfoResponse.status == "fulfilled" &&
    traktInfoResponse.value &&
    (await traktInfoResponse.value.json());
  const seasonInfo =
    seasonInfoResponse.status == "fulfilled" &&
    seasonInfoResponse.value &&
    (await seasonInfoResponse.value.json());

  aw_data.type == "shows" && seasonInfo?.forEach((season) => {
    aw_data.seasons.push(checkSepNum(season.number));
  });

  aw_data.title = traktInfo.title;
  aliasLB.update([aw_data.title]);
  aw_data.year = traktInfo.year;
  aw_data.tmdb = traktInfo.ids.tmdb;
  reqCall_Aliases(aw_data.title);
  aw_data.type == "shows" && seasonInfo && seasonLB.update(aw_data.seasons);

  updater();
  awFooter.classList.remove("aw-hidden");
  awContent.focus();
}

async function reqCall_Aliases(title) {
  let titles = [];
  const [tmdbDataResponse, traktTitlesResponse, tmdbTitlesResponse] =
    await Promise.allSettled([
      fetch(
        `https://api.themoviedb.org/3/${
          aw_data.type == "shows" ? "tv" : "movie"
        }/${aw_data.tmdb}?api_key=${tmdbApiKey}&language=en-US`,
        { method: "GET" }
      ),
      fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/aliases`, {
        method: "GET",
        headers: traktApiHeaders,
      }),
      fetch(
        `https://api.themoviedb.org/3/${
          aw_data.type == "shows" ? "tv" : "movie"
        }/${
          aw_data.tmdb
        }/alternative_titles?api_key=${tmdbApiKey}&language=en-US`,
        { method: "GET" }
      ),
    ]);

  const tmdbData =
    tmdbDataResponse.status == "fulfilled" &&
    (await tmdbDataResponse.value.json());
  const traktTitles =
    traktTitlesResponse.status == "fulfilled" &&
    (await traktTitlesResponse.value.json());
  const tmdbTitles =
    tmdbTitlesResponse.status == "fulfilled" &&
    (await tmdbTitlesResponse.value.json());

  tmdbData?.original_name && titles.push(tmdbData.original_title);
  tmdbData?.original_title && titles.push(tmdbData.original_title);
  traktTitles?.forEach((item) => titles.push(item.title));
  tmdbTitles?.titles?.forEach((item) => titles.push(item.title));
  tmdbTitles?.results?.forEach((item) => titles.push(item.title));

  aliasLB.update(
    [...new Set(titles)].filter((element) => element && element != title)
  );
}

})();

/******/ })()
;