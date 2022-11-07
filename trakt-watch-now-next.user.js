// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     3.3
// @author      Hist
// @resource    IMPORTED_CSS https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/aw.css
// @resource    IMPORTED_JSON https://raw.githubusercontent.com/sergeyhist/trakt-watch-now-alternative/main/sources.json
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==

GM_addStyle(GM_getResourceText("IMPORTED_CSS"));
const sources = JSON.parse(GM_getResourceText("IMPORTED_JSON"));
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

  function openAW() {
    $('.aw-header').css('background-image', `
    linear-gradient(to top, black, rgb(0 0 0 / 15%)),
    linear-gradient(to right, black, transparent, transparent, transparent, black),
    url(${aw_data.image})`);
    addSites();
    $('.aw-loading').remove();
    $('.aw-header').css('opacity','1');
    setTimeout(function() {
      $('.aw-footer').css({'height':'100%','opacity':'1'});
    },500);
  }

  function createLB(type,items,order) {
    $('#aw-search-options').append(`
      <div style="order:${order}" class="aw-search-option" id="aw-${type}">
        <div class="aw-label">${upFL(type)}</div>
        <div class="aw-select"/>
      </div>
    `);
    if (items) {
      for (let element of items) {
        const listBox = document.querySelector('#aw-'+type+' > .aw-select');
        let listItem = document.createElement('div');

        listItem.classList.add('aw-option');
        listItem.textContent = element;
        listBox.append(listItem);

        listItem.onclick = () => {
          listItem.parentElement.querySelectorAll('.aw-option').forEach((item) => item.classList.contains('aw-selected') && item.classList.remove('aw-selected'));
          listItem.classList.add('aw-selected');
          updateTitle();
          updateInfo();
          addSites();
        };
      };
    };
    $(`#aw-${type} .aw-option`).first().addClass('aw-selected');
  }

  function updateTitle() {
      $('#aw-search-string')
      .html($('#aw-search-string').val()
          .replace(aw_data.title, $('#aw-aliases > .aw-select > .aw-option.aw-selected')
          .text()));
      aw_data.title = $('#aw-aliases > .aw-select > .aw-option.aw-selected').text();
  };

  function updateInfo() {
      switch ($('#aw-info > .aw-select > .aw-option.aw-selected').text()) {
          case 'None':
              $('#aw-search-string').val(aw_data.title);
              break;
          case 'Season':
              $('#aw-search-string').val(aw_data.title+' s'+aw_data.season);
              break;
          case 'Episode':
              $('#aw-search-string').val(aw_data.title+' s'+aw_data.season+'e'+aw_data.episode);
              break;
          case 'Year':
              $('#aw-search-string').val(aw_data.title+' '+aw_data.year);
              break;
          case 'Absolute':
              $('#aw-search-string').val(aw_data.title+' '+aw_data.abs_episode);
              break;
          case 'Season+Year':
              $('#aw-search-string').val(aw_data.title+' s'+aw_data.season+' '+aw_data.year);
              break;
          case 'Episode+Year':
              $('#aw-search-string').val(aw_data.title+' s'+aw_data.season+'e'+aw_data.episode+' '+aw_data.year);
              break;
          case 'Absolute+Year':
              $('#aw-search-string').val(aw_data.title+' '+aw_data.abs_episode+' '+aw_data.year);
      };
  };

  function addSites() {
    let awContent = document.querySelector('.aw-content');
    let awFooter = awContent.querySelector('.aw-footer');
    let awLanguage = awContent.querySelector('#aw-language');
    let awSection = awContent.querySelector('#aw-section');
    let awType = awContent.querySelector('#aw-type');

    awFooter.querySelector('#aw-sources')?.remove();
    awFooter.innerHTML += `<div id="aw-sources"/>`;

    for(let source of sources) {
      if (
        source.type.includes(awType.querySelector('.aw-selected').textContent) &&
        source.language.includes(awLanguage.querySelector('.aw-selected').textContent) &&
        source.section.includes(awSection.querySelector('.aw-selected').textContent)
      ) {
        $('.aw-content #aw-sources').append(`
          <div class="aw-sources-item" data-aw-space="${source.space || '%20'}" data-aw-source="${source.link}">
          <div class="aw-source-name">${source.name}</div></div>
        `);
      };
    };
    let awSourceButtons = document.querySelectorAll('.aw-sources-item');
    for (let item of awSourceButtons) {
      item.onclick = () => {
        let searchString = document.querySelector('#aw-search-string');

        window.open(
          item.dataset.awSource.replace('%s', encodeURIComponent(searchString.value).replace(/%20/g, item.dataset.awSpace))
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
          $('#aw-search-string').val(aw_data.title);
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
              if (data.name) {aw_data.tmdb_title = data.name;};
              if (data.original_name) {aw_data.tmdb_original_title = data.original_name;};
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
          openAW();
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
});
