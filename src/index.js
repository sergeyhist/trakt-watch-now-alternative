"use strict";

import englishSources from './english-sources.json';
import russianSources from './russian-sources.json';
import rawSources from './raw-sources.json';
import styles from './styles.css';

GM_addStyle(styles.toString());

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
    list: englishSources,
  },
  {
    name: "Russian",
    list: russianSources,
  },
  {
    name: "Raw",
    list: rawSources,
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
