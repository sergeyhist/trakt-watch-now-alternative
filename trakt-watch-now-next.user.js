// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     3.1.6
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
        "link": '.schedule-episode[data-show-id]',
        "id": 'data-show-id',
        "type": 'shows'
    },
    {
        "link": '.schedule-episode[data-movie-id]',
        "id": 'data-movie-id',
        "type": 'movies'
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
    "tmdb": "",
    "poster": "",
    "backdrop": ""
};
document.addEventListener("DOMContentLoaded", function () {
    $('html').append(`<div class="aw-modal"/>`);
    $('html').on('click','.aw-modal', function (event) {
        if(!$(event.target).closest('.aw-content').length && !$(event.target).is('.aw-content')) {
            $('.aw-content').remove();
            $('.aw-modal').css({'visibility':'hidden','height':'0','opacity':'0'});
            $('html').off('click', '.aw-sources-item');
            $('html').off('change', `#aw_language, #aw_type, #aw_source`);
            aw_data.title = "";
            aw_data.default_title = "";
            aw_data.poster = "";
            aw_data.backdrop = ""
            aw_data.tmdb = "";
        };
    });
    $(function () {
        for (let element of play_item) {
            awButtons(element);
    }});
    $('html').on('click', '#alternative-watch', function () {
        aw_data.id = $(this).attr('aw-data-id');
        aw_data.type = $(this).attr('aw-data-type');
        aw_data.season = $(this).attr('aw-data-season');
        aw_data.episode = $(this).attr('aw-data-episode');
        reqCall_Data(aw_data.type, aw_data.id);
        $('.aw-modal').append(`<div class="aw-content"/>`);
        $('.aw-modal').css({'visibility':'visible','height':'100%','opacity':'1'});
        $('.aw-content').css({'visibility':'visible','height':'85%','opacity':'1'});
        $('.aw-content').append(`<div class="aw-header"/>`);
        $('.aw-content').append(`<div class="aw-footer"/>`);
        $('.aw-content').append(`<div class="aw-loading"><div></div><div></div><div></div><div></div></div>`);
        let main_int = setInterval(function() {
            if (aw_data.backdrop) {
                clearInterval(main_int);
                $('.aw-loading').remove();
                $('.aw-header').css({'border':'solid black 1px'});
                $('.aw-header').append(`<div id="watch-search"><p contenteditable="true" type="text" id="watch-search-string"></p></div>`);
                if (aw_data.backdrop) {
                    $('.aw-header').css({'background-image':`url(${aw_data.backdrop})`});
                } else if (aw_data.poster) {
                    $('.aw-header').css({'background-image':`url(${aw_data.poster})`});
                };
                $('.aw-footer').css({'background-image':`url("https://trakt.tv/assets/placeholders/thumb/poster-2561df5a41a5cb55c1d4a6f02d6532cf327f175bda97f4f813c18dea3435430c.png")`});
                $('.aw-modal #watch-search-string').html(`${aw_data.title}`);
                createLB("type",['general','anime','cartoon','asian drama'],2);
                createLB("source",['online','torrent','DDL','database'],3);
                createLB_Info(aw_data.season, aw_data.episode);
                createLB("language",['english','russian'],4);
                createLB("titles",['Default']);
                reqCall_Aliases(aw_data.type, aw_data.id);
                addSites();
                $('html').on('change', '#aw_info', function () {
                    switch ($('#aw_info').val()) {
                        case 'none':
                            $('.aw-modal #watch-search-string').html(`${aw_data.title}`);
                            break;
                        case 'season':
                            $('.aw-modal #watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season));
                            break;
                        case 'episode':
                            $('.aw-modal #watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+'e'+checkSepNum(aw_data.episode));
                            break;
                        case 'year':
                            $('.aw-modal #watch-search-string').html(`${aw_data.title}`+' '+`${aw_data.year}`);
                            break;
                        case 'all':
                            if (aw_data.episode) {
                                $('.aw-modal #watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+'e'+checkSepNum(aw_data.episode)+' '+`${aw_data.year}`);
                            }
                            else {
                                $('.aw-modal #watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+' '+`${aw_data.year}`);
                            };
                    };
                });
                $('html').on('change', '#aw_titles', function() {
                    if ($('#aw_titles').val() != 'Default') {
                        $('.aw-modal #watch-search-string')
                        .html($('.aw-modal #watch-search-string')
                        .html().replace(aw_data.title, $('#aw_titles').val()));
                        aw_data.title = $('#aw_titles').val();
                    }
                    else {
                        $('.aw-modal #watch-search-string')
                        .html($('.aw-modal #watch-search-string')
                        .html().replace(aw_data.title, aw_data.default_title));
                        aw_data.title = aw_data.default_title;
                    };
                });
                $('html').on('change', '#aw_source', function() {
                    createLB_Info(aw_data.season, aw_data.episode);
                    $('.aw-modal #watch-search-string').html(`${aw_data.title}`);
                    addSites();
                });
                $('html').on('change', '#aw_language, #aw_type', function() {
                    addSites();
                });
                $('html').on('click', '.aw-sources-item' , function () {
                    let search_item_id=this.id.split("-")[1];
                    let search_link=aw_sources_list[search_item_id].link.replace('%s', $('.aw-modal #watch-search-string').html().replace(/ /g,'+'));
                    window.open(search_link, "_blank");
                });
            }
        },500);
    });
    //Functions
    function awButtons(playobject) {
        setInterval( function() {
            $('html').find(`${playobject.link}`).each( function () {
                let aw_block;
                let aw_data;
                switch (playobject.link) {
                    case '.schedule-episode[data-show-id]':
                        if ($(this).parent().parent().parent().find('h3').text().split(' ')[0] == 'Today') {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_data = 'aw-data-id="'+$(this).attr(`${playobject.id}`)+'"';
                                aw_data = aw_data+' aw-data-type="'+playobject.type+'"';
                                if ($(this).find('h5 > a').attr('href').includes('/seasons')) {
                                    aw_data = aw_data+' aw-data-season="'+$(this).find('h5 > a').attr('href').split('/')[4]+'"';
                                };
                                if ($(this).find('h5 > a').attr('href').includes('/episodes')) {
                                    aw_data = aw_data+' aw-data-episode="'+$(this).find('h5 > a').attr('href').split('/').pop()+'"';
                                };
                                aw_block = awBlock('schedule', aw_data);
                                $(this).append(`${aw_block}`);
                            };
                        };
                        break;
                    case '.schedule-episode[data-movie-id]':
                        if ($(this).parent().parent().parent().find('h3').text().split(' ')[0] == 'Today') {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_data = 'aw-data-id="'+$(this).attr(`${playobject.id}`)+'"';
                                aw_data = aw_data+' aw-data-type="'+playobject.type+'"';
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
    function awBlock(block_type,block_content) {
        let block_icon="";
        let block_text="";
        if (block_type != 'main') {block_icon='trakt-icon-play2-thick'} else {block_icon='trakt-icon-play2'};
        if (block_type != 'quick') {block_text=`<div class="wt-text">watch now</div>`} else {block_text=''};
        return `<a id="alternative-watch" class="${block_type}-aw-button" ${block_content}>
        <div class="${block_icon}"/>${block_text}</a>`;
    };
    function awTooltip () {
        $('.quick-aw-button').tooltip({
            title: "Watch Now Alternative",
            placement: 'bottom'
        }).popover('destroy');
    };

    function createLB(lb_type,lb_items,lb_order) {
        $('.aw-content #watch-search').append(`
        <div style="order:${lb_order}" class="watch-search-option">
        <label for="aw_${lb_type}">${capFL(lb_type)}</label>
        <select id="aw_${lb_type}" size="1"/></div>`);
        for (let i=0; i < lb_items.length; i++) {
            $(`select#aw_${lb_type}`).append(`<option value="${lb_items[i]}">${capFL(lb_items[i])}</option>`);
        };
    };
    function createLB_Info(season, episode) {
        if ($('.aw-content #watch-search').find('#aw_info')) {
            $('#aw_info').parent().remove();
        };
        if (season && (($('#aw_source').val() != 'online') && ($('#aw_source').val() != 'database'))) {
            if (episode) {
                createLB('info',['none','season','episode','year','all'],1);
            }
            else {
                createLB('info',['none','season','year','all'],1);
            }
        }
        else {
            createLB('info',['none','year'],1);
        };
    };
    function addSites() {
        $('.aw-footer #aw-sources').remove();
        $('.aw-footer').append(`<div id="aw-sources"/>`);
        for(let i=0;i < aw_sources_list.length;i++) {
            let aw_type=$('#aw_type').val();
            let aw_language=$('#aw_language').val();
            let aw_source=$('#aw_source').val();
            if ((aw_sources_list[i].content_type.includes(aw_type)) && (aw_sources_list[i].language.includes(aw_language)) && (aw_sources_list[i].type.includes(aw_source))) {
                $('.aw-content #aw-sources').append(`<div class="aw-sources-item wt-title-button" id="watch_sources_item-${i}"><div class="wt-source-name">${aw_sources_list[i].name}</div></div>`);
            };
        };
    };
    function reqCall_Data(type,id) {
        fetch(`https://api.trakt.tv/${type}/${id}`, {
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
            fetch(`https://api.themoviedb.org/3/${type.replace('shows','tv').replace('movies','movie')}/${aw_data.tmdb}?api_key=a6dc8b1bcbeeaf4c970242298ccf059f&language=en-US`)
            .then(response => response.json())
            .then(data => {
                aw_data.poster = 'https://image.tmdb.org/t/p/w500'+data.poster_path;
                aw_data.backdrop = 'https://image.tmdb.org/t/p/w500'+data.backdrop_path;
            });
        });
    };
    function reqCall_Aliases(type,id) {
        fetch(`https://api.trakt.tv/${type}/${id}/aliases`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '17daa2eaed9a329a2d60ae14ba020245d05bb9151c377d488de8d4293ce5a9ff'
            }
        })
        .then(response => response.json())
        .then(data => {
            for (let element of data) {
                if (!$(`#aw_titles > option[value="${element.title}"]`).text()) {
                    $('#aw_titles').append(`<option value="${element.title}">${element.title}</option>`);
                };
            };
        });
    };
    function checkSepNum(n) {
        return (n < 10 ? '0' : '') + n;
    };
    function capFL(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
});
