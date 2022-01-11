// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     3.2.1
// @author      Hist
// @resource    IMPORTED_CSS https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/aw.css
// @resource    IMPORTED_JSON https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/sources.json
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==
'use strict';
const aw_styles = GM_getResourceText("IMPORTED_CSS"); GM_addStyle(aw_styles);
const aw_sources_list = JSON.parse(GM_getResourceText("IMPORTED_JSON"));
const play_item= [
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
    "default_title": "",
    "title": "",
    "year": "",
    "season": "",
    "episode": "",
    "abs_episode": "",
    "tmdb": "",
    "image": "",
    "placeholder": "https://trakt.tv/assets/placeholders/full/fanart-7fd177378498acd815bf2386dfb1411223785b1c4dc1f4eada7b7e1f357621b4.png.webp"
};

document.addEventListener("DOMContentLoaded", function () {;
    $(function () {
        for (let element of play_item) {
            awButtons(element);
    }});
    $('html').on('click','.aw-modal', function (event) {
        if(!$(event.target).closest('.aw-content').length && !$(event.target).is('.aw-content')) {
            $('.aw-modal').css('opacity','0');
            setTimeout(function() {
                $('.aw-modal').remove();
                $('html').off('click', '.aw-sources-item');
                $('html').off('change', `#aw_Language, #aw_Type, #aw_Source`);
                aw_data.title = "";
                aw_data.default_title = "";
                aw_data.image = "";
                aw_data.tmdb = "";
                aw_data.abs_episode = "";
            },500);
        };
    });
    $('html').on('click', '.aw-option' , function () {
        $(this).parent().find('.aw-option').each(function() {
            $(this).removeClass('aw-selected');
        });
        $(this).addClass('aw-selected');
        updateTitle();
        updateInfo();
        addSites();
    });
    $('html').on('click', '.aw-sources-item' , function () {
        window.open($(this).attr('aw-source-link')
        .replace('%s', $('#aw-search-string').html().replace(/ /g,'+')), "_blank");
    });
    $('html').on('click', '#alternative-watch', function () {
        $('html').append(`
            <div class="aw-modal">
                <div class="aw-content">
                    <div class="aw-loading"><div></div><div></div><div></div><div></div></div>
                    <div class="aw-header">
                        <div contenteditable="true" type="text" id="aw-search-string"/>
                        <div id="aw-search-options"/>
                    </div>
                    <div class="aw-footer"/>
                </div>
            </div>`);
        $('.aw-modal').css('opacity','1');
        aw_data.id = $(this).attr('aw-data-id');
        aw_data.type = $(this).attr('aw-data-type');
        aw_data.season = checkSepNum($(this).attr('aw-data-season'));
        aw_data.episode = checkSepNum($(this).attr('aw-data-episode'));
        createLB('type',['General','Anime','Cartoon','Asian Drama'],3);
        createLB('source',['Online','Torrent','DDL','Database'],4);
        createLB('language',['English','Russian'],5);
        reqCall_Data();
        reqCall_Episode();
        reqCall_Aliases();
        let data_int = setInterval(function() {
            if (aw_data.tmdb) {
                clearInterval(data_int);
                reqCall_Image();
            };
        },500);
        let main_int = setInterval(function() {
            if (aw_data.image) {
                clearInterval(main_int);
                if (aw_data.season) {
                    if (aw_data.episode) {
                        createLB('info',['None','Year','Season','Episode','Absolute','Season+Year','Episode+Year','Absolute+Year'],2);
                    } else {
                        createLB('info',['None','Year','Season','Season+Year'],2);
                    };
                } else {
                createLB('info',['None','Year'],2);
                };
                addSites();
                $('.aw-loading').remove();
                $('.aw-header').css('opacity','1');
                setTimeout(function() {
                    $('.aw-footer').css({'height':'24.9em','opacity':'1'});
                },500);    
            };
        },500);
    });
    
    //Functions

    function awButtons(playobject) {
        setInterval( function() {
            $('html').find(`${playobject.link}`).each( function () {
                let aw_block;
                let aw_data;
                switch (playobject.link) {
                    case '.schedule-episode':
                        if ($(this).parent().parent().parent().find('h3').text().split(' ')[0] == 'Today') {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_data = 'aw-data-id="'+$(this).attr(`${playobject.id}`)+'"';
                                if ($(this).find('h5 > a').attr('href')) {
                                    aw_data = aw_data+' aw-data-type="'+playobject.type+'"';
                                    if ($(this).find('h5 > a').attr('href').includes('/seasons')) {
                                        aw_data = aw_data+' aw-data-season="'+$(this).find('h5 > a').attr('href').split('/')[4]+'"';
                                    };
                                    if ($(this).find('h5 > a').attr('href').includes('/episodes')) {
                                        aw_data = aw_data+' aw-data-episode="'+$(this).find('h5 > a').attr('href').split('/').pop()+'"';
                                    };
                                } else {
                                    aw_data = aw_data+' aw-data-type="movies"';
                                };
                                aw_block = awBlock('schedule', aw_data);
                                $(this).append(`${aw_block}`);
                            };
                        };
                        break;
                    default:
                        $(this).find('.action-buttons').each( function () {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_data = 'aw-data-id="'+$(this).find('.btn-collect').attr(`${playobject.id}`)+'"';
                                aw_data = aw_data+' aw-data-type="'+playobject.type+'"';
                                if ($(this).parents().find('meta[itemprop=url]').attr('content').includes('/seasons')) {
                                    aw_data = aw_data+' aw-data-season="'+
                                    $(this).parents().find('meta[itemprop=url]').attr('content').split('/')[6]+'"';
                                };
                                if ($(this).parents().find('meta[itemprop=url]').attr('content').includes('/episodes')) {
                                    aw_data = aw_data+' aw-data-episode="'+
                                    $(this).parents().find('meta[itemprop=url]').attr('content').split('/').pop()+'"';
                                };
                                aw_block = awBlock('main', aw_data);
                                $(this).find('.btn-collect').after(`${aw_block}`);
                            }
                        })
                        $(this).find('.quick-icons').each( function () {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_data = 'aw-data-id="'+$(this).parent().attr(`${playobject.id}`)+'"';
                                aw_data = aw_data+' aw-data-type="'+playobject.type+'"';
                                if ($(this).parent().find('meta[itemprop=url]').attr('content').includes('/seasons')) {
                                    aw_data = aw_data+' aw-data-season="'+
                                    $(this).parent().find('meta[itemprop=url]').attr('content').split('/')[6]+'"';
                                };
                                if ($(this).parent().find('meta[itemprop=url]').attr('content').includes('/episodes')) {
                                    aw_data = aw_data+' aw-data-episode="'+
                                    $(this).parent().find('meta[itemprop=url]').attr('content').split('/').pop()+'"';
                                };
                                aw_block = awBlock('quick', aw_data);
                                $(this).find('.collect').after(`${aw_block}`);
                            };
                        });
                };
            });
            awTooltip();
        },500);
    };

    function awBlock(type,content) {
        let icon="";
        let text="";
        if (type != 'main') {icon='trakt-icon-play2-thick'} else {icon='trakt-icon-play2'};
        if (type != 'quick') {text=`<div class="aw-text">watch now</div>`} else {text=''};
        return `<a id="alternative-watch" class="${type}-aw-button" ${content}>
        <div class="${icon}"/>${text}</a>`;
    };

    function awTooltip () {
        $('.quick-aw-button').tooltip({
            title: "Watch Now Alternative",
            placement: 'bottom'
        }).popover('destroy');
    };

    function createLB(type,items,order) {
        $('#aw-search-options').append(`
        <div style="order:${order}" class="aw-search-option" id="aw-${type}">
            <div class="aw-label">${upFL(type)}</div>
            <div class="aw-select"/></div>`);
        if (items) {
            for (let element of items) {
                $(`#aw-${type} > .aw-select`)
                .append(`<div class="aw-option">${element}</div>`);
            };
        };
        $(`#aw-${type} .aw-option`).first().addClass('aw-selected');
    };

    function updateTitle() {
        if ($('#aw-aliases > .aw-select > .aw-option.aw-selected').text() != 'Default') {
            $('#aw-search-string')
            .html($('#aw-search-string').html()
                .replace(aw_data.title, $('#aw-aliases > .aw-select > .aw-option.aw-selected')
                .text()));
            aw_data.title = $('#aw-aliases > .aw-select > .aw-option.aw-selected').text();
        }
        else {
            $('#aw-search-string')
            .html($('#aw-search-string')
            .html().replace(aw_data.title, aw_data.default_title));
            aw_data.title = aw_data.default_title;
        };
    }

    function updateInfo() {
        switch ($('#aw-info > .aw-select > .aw-option.aw-selected').text()) {
            case 'None':
                $('#aw-search-string').html(aw_data.title);
                break;
            case 'Season':
                $('#aw-search-string').html(aw_data.title+' s'+aw_data.season);
                break;
            case 'Episode':
                $('#aw-search-string').html(aw_data.title+' s'+aw_data.season+'e'+aw_data.episode);
                break;
            case 'Year':
                $('#aw-search-string').html(aw_data.title+' '+aw_data.year);
                break;
            case 'Absolute':
                $('#aw-search-string').html(aw_data.title+' '+aw_data.abs_episode);
                break;
            case 'Season+Year':
                $('#aw-search-string').html(aw_data.title+' s'+aw_data.season+' '+aw_data.year);
                break;
            case 'Episode+Year':
                $('#aw-search-string').html(aw_data.title+' s'+aw_data.season+'e'+aw_data.episode+' '+aw_data.year);
                break;
            case 'Absolute+Year':
                $('#aw-search-string').html(aw_data.title+' '+aw_data.abs_episode+' '+aw_data.year);
        };
    };

    function addSites() {
        $('.aw-footer #aw-sources').remove();
        $('.aw-footer').append(`<div id="aw-sources"/>`);
        for(let element of aw_sources_list) {
            if (
                element.type
                .includes($('#aw-type > .aw-select > .aw-option.aw-selected').text()) &&
                element.language
                .includes($('#aw-language > .aw-select > .aw-option.aw-selected').text()) &&
                element.source
                .includes($('#aw-source > .aw-select > .aw-option.aw-selected').text())
            ) {
                $('.aw-content #aw-sources')
                .append(`<div class="aw-sources-item" aw-source-link="${element.link}">
                <div class="aw-source-name">${element.name}</div></div>`);
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

    function reqCall_Data() {
        fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '17daa2eaed9a329a2d60ae14ba020245d05bb9151c377d488de8d4293ce5a9ff'
            }
        })
        .then(response => response.json())
        .then(data => {
            aw_data.default_title = data.title;
            aw_data.title = data.title;
            aw_data.year = data.year;
            aw_data.tmdb = data.ids['tmdb'];
            $('#aw-search-string').html(aw_data.title);
        });
    };

    function reqCall_Image() {
        fetch(`https://api.themoviedb.org/3/${aw_data.type.replace('shows','tv').replace('movies','movie')}/${aw_data.tmdb}?api_key=a6dc8b1bcbeeaf4c970242298ccf059f&language=en-US`)
            .then(response => response.json())
            .then(data => {
                if (data.backdrop_path) {
                    aw_data.image = 'https://image.tmdb.org/t/p/w500'+data.backdrop_path;
                } else {
                    if (data.poster_path) {
                        aw_data.image = 'https://image.tmdb.org/t/p/w500'+data.poster_path;
                    } else {
                        aw_data.image = aw_data.placeholder;
                    };
                };
                $('.aw-header').css('background-image', `
                linear-gradient(to top, black, rgb(0 0 0 / 15%)),
                linear-gradient(to right, black, transparent, transparent, transparent, black),
                url(${aw_data.image})`);
            });
    };

    function reqCall_Aliases() {
        fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/aliases`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '17daa2eaed9a329a2d60ae14ba020245d05bb9151c377d488de8d4293ce5a9ff'
            }
        })
        .then(response => response.json())
        .then(data => {
            let element_titles = "Default";
            for (let element of data) {
                if (!element_titles.includes(element.title)) {
                    element_titles=element_titles+','+element.title;
                };
            };
            createLB('aliases',element_titles.split(','),1)
        });
    };

    function reqCall_Episode() {
        fetch(`https://api.trakt.tv/${aw_data.type}/${aw_data.id}/seasons/${aw_data.season}/episodes/${aw_data.episode}?extended=full`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '17daa2eaed9a329a2d60ae14ba020245d05bb9151c377d488de8d4293ce5a9ff'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.number_abs) {
                aw_data.abs_episode = checkSepNum(data.number_abs);
            } else {
                aw_data.abs_episode = checkSepNum(data.number);
            };
        });
    };
});
