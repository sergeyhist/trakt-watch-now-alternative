// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     4.2
// @author      Hist
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// @resource    styles file:///mnt/InternalHDD/Programming/trakt-watch-now-alternative/styles.css
// @resource    englishSources file:///mnt/InternalHDD/Programming/trakt-watch-now-alternative/english-sources.json
// @resource    russianSources file:///mnt/InternalHDD/Programming/trakt-watch-now-alternative/russian-sources.json
// @resource    rawSources file:///mnt/InternalHDD/Programming/trakt-watch-now-alternative/raw-sources.json
// ==/UserScript==

GM_addStyle(GM_getResourceText('styles'));

const sourcesList = [
  {
    name: 'English',
    list: JSON.parse(GM_getResourceText('englishSources'))
  },
  {
    name: 'Russian',
    list: JSON.parse(GM_getResourceText('russianSources'))
  },
  {
    name: 'Raw',
    list: JSON.parse(GM_getResourceText('rawSources'))
  }
];
const sourcesLanguages = [];
const sourcesCategories = [];
const sourcesTypes = [];

sourcesList.forEach(item => sourcesLanguages.push(item.name));
sourcesList.forEach(item => item.list.forEach(item1 => !sourcesCategories.includes(item1.name) && sourcesCategories.push(item1.name)));
sourcesList.forEach(item => item.list.forEach(item1 => item1.list.forEach(item2 => !sourcesTypes.includes(item2.name) && sourcesTypes.push(item2.name))));

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
            
            document.querySelector('.btn-watch-now').parentNode.querySelector('.poster').append(awBlock('action', attributes));
            document.querySelector('.mobile-poster').querySelector('.poster').append(awBlock('action-mobile', attributes));
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

  block.tabIndex = '0';
  block.classList.add('aw-button');
  block.classList.add('alternative-watch');
  block.classList.add('alternative-watch-'+type);
  block.innerHTML = `<div class="trakt-icon-play2-thick">`;
  block.style.backgroundColor = styles?.backgroundColor ? styles.backgroundColor : '#333'; 

  for (let attribute of attributes) {block.setAttribute(attribute.name, attribute.value)};

  block.onclick = (event) => {
    event.preventDefault();    

    const closeModal = (modal) => {
      modal.style.opacity = 0;
      setTimeout(function() {
        awModal.remove();
        aw_data.title = "";
        aw_data.image = "";
        aw_data.abs_episode = "";
      },500);
      block.focus();
    };

    let awModal = document.createElement('div');
    let awBlock = document.createElement('div');
    let awContent = document.createElement('div');
    let awHeader = document.createElement('div');
    let awFooter = document.createElement('div');

    awContent.tabIndex = '-1';

    awModal.classList.add('aw-modal');
    awBlock.classList.add('aw-block');
    awBlock.classList.add('aw-hidden');
    awContent.classList.add('aw-content');
    awContent.classList.add('aw-alternative');
    awHeader.classList.add('aw-header');
    awHeader.classList.add('aw-hidden');
    awFooter.classList.add('aw-footer');
    awFooter.classList.add('aw-hidden');

    awHeader.innerHTML = `<input type="text" class="aw-search-string" tabindex="0"/>`;
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
    createLB('aliases', []);
    createLB('info', ['None']);

    reqCall_Data();

    awBlock.classList.remove('aw-hidden');
    awHeader.classList.remove('aw-hidden');

    awModal.addEventListener('click', (e) => {!awBlock.contains(e.target) && closeModal(awModal)});
    awModal.addEventListener('keydown', (e) => {e.key == 'Escape' && closeModal(awModal)});
  };

  return block;
};

function createLB(type, items) {
  const toggleList = (list, e) => {
    if (!list.contains(e.target) || !list.querySelector('.aw-select').classList.contains('aw-hidden')) {
      list.querySelector('.aw-select').classList.add('aw-hidden');
      setTimeout(() => {list.querySelector('.aw-title').style.borderRadius = '3px'}, 100);
    } else {
      list.querySelector('.aw-select').classList.remove('aw-hidden');
      setTimeout(() => {list.querySelector('.aw-title').style.borderRadius = '3px 3px 0 0'}, 100);
    };
  };

  let awSearchOption = document.createElement('div');
  let awLabel = document.createElement('div');
  let awTitle = document.createElement('div');
  let awSelect = document.createElement('div');

  awSearchOption.tabIndex = '0';
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
    for (let item of items) {
      const selectOption = (title) => {
        title.querySelector('span').textContent = option.textContent;
        title.parentElement.focus();
        updateTitle();
        updateInfo();
        updateOptions();
        addSites();
      };

      let option = document.createElement('div');

      option.tabIndex = '0';
      option.textContent = item;
      option.classList.add('aw-option');
      option.classList.add('aw-unselectable');
      awSelect.append(option);

      option.onclick = () => {selectOption(awTitle)};
      option.onkeydown = (e) => {e.key == 'Enter' && selectOption(awTitle)};

      awTitle.querySelector('span').textContent = items[0];
    };
  };

  document.addEventListener('click', (e) => {toggleList(awSearchOption, e)});
  document.addEventListener('keydown', (e) => {e.key == 'Enter' && toggleList(awSearchOption, e)});
};

function updateLB(type, items) {
  const listBox = document.querySelector(`#aw-${type}`);

  for (let item of items) {
    const selectOption = (title) => {
      title.querySelector('span').textContent = option.textContent;
      title.parentElement.focus();
      updateTitle();
      updateInfo();
      updateOptions();
      addSites();
    };

    let option = document.createElement('div');

    option.tabIndex = '0';
    option.textContent = item;
    option.classList.add('aw-option');
    option.classList.add('aw-unselectable');
    listBox.querySelector('.aw-select').append(option);

    option.onclick = () => {selectOption(listBox.querySelector('.aw-title'))};
    option.onkeydown = (e) => {e.key == 'Enter' && selectOption(listBox.querySelector('.aw-title'))};
  };

  if (listBox.querySelector('span').textContent == '') {listBox.querySelector('span').textContent = items[0]}; 
};

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
  const optionsCheck = (title, options, checkArray) => {
    for (let option of options) {
      if (!checkArray.find(element => element.name == option.textContent)) {
        option.classList.add('aw-hidden');

        if (title.textContent == option.textContent) {
          title.textContent = option.parentElement.querySelector('div:not(.aw-hidden)').textContent;
        };
      };
    };
  };

  for (let option of document.querySelectorAll('.aw-option')) {
    option.classList.contains('aw-hidden') && option.classList.remove('aw-hidden');
  };

  optionsCheck(
    awCategory.querySelector('span'),
    awCategory.querySelectorAll('.aw-option'),
    sourcesList.find(element => element.name == awLanguage.querySelector('span').textContent).list
  );
  optionsCheck(
    awSource.querySelector('span'),
    awSource.querySelectorAll('.aw-option'),
    sourcesList
      .find(element => element.name == awLanguage.querySelector('span').textContent).list
      .find(element => element.name == awCategory.querySelector('span').textContent).list
  );
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
  const sources = sourcesList
    .find(element => element.name == awLanguage.querySelector('span').textContent).list
    .find(element => element.name == awCategory.querySelector('span').textContent).list
    .find(element => element.name == awSource.querySelector('span').textContent).list; 

  for(let source of sources) {
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
      const awContent = document.querySelector('.aw-content');
      const awSearchString = document.querySelector('.aw-search-string');
      const awFooter = document.querySelector('.aw-footer');

      aw_data.title = data.title;
      aw_data.year = data.year;
      awSearchString.value = aw_data.title;
      updateLB('aliases', [data.title]);
      updateLB('info', ['Year']);
      aw_data.season && updateLB('info', ['Season','Season+Year']);
      aw_data.episode && reqCall_Episode();
      reqCall_Aliases();
      addSites();
      awFooter.classList.remove('aw-hidden');
      awContent.focus();
    });
};

function reqCall_Aliases() {
  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/aliases`, {method: 'GET', headers: traktApiHeaders})
    .then(response => response.json())
    .then(data => {
      let elementTitles = [];

      data.forEach((element) => !elementTitles.includes(element.title) && elementTitles.push(element.title));
      updateLB('aliases', elementTitles);
    });
};

function reqCall_Episode() {
  fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/seasons/${aw_data.season}/episodes/${aw_data.episode}?extended=full`, {method: 'GET', headers: traktApiHeaders})
    .then(response => response.json())
    .then(data => {
      data.number_abs ? aw_data.abs_episode = checkSepNum(data.number_abs) : aw_data.abs_episode = checkSepNum(data.number);
      updateLB('info', ['Episode','Episode+Year','Absolute','Absolute+Year']);
    });
};
