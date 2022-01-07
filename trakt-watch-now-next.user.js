// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     3.1.17
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
    "tmdb": "",
    "image": "",
    "placeholder": "https://trakt.tv/assets/placeholders/thumb/poster-2561df5a41a5cb55c1d4a6f02d6532cf327f175bda97f4f813c18dea3435430c.png"
};

document.addEventListener("DOMContentLoaded", function () {;
    $('html').on('click','.aw-modal', function (event) {
        if(!$(event.target).closest('.aw-content').length && !$(event.target).is('.aw-content')) {
            $('.aw-modal').css({'opacity':'0'});
            setTimeout(function() {
                $('.aw-modal').remove();
                $('html').off('click', '.aw-sources-item');
                $('html').off('change', `#aw_Language, #aw_Type, #aw_Source`);
                aw_data.title = "";
                aw_data.default_title = "";
                aw_data.image = "";
                aw_data.tmdb = "";
            },500);
        };
    });
    $(function () {
        for (let element of play_item) {
            awButtons(element);
    }});
    $('html').on('click', '#alternative-watch', function () {
        $('html').append(`
            <div class="aw-modal">
                <div class="aw-content">
                    <div class="aw-loading"><div></div><div></div><div></div><div></div></div>
                    <div class="aw-header">
                        <div id="watch-search">
                            <p contenteditable="true" type="text" id="watch-search-string"/>
                        </div>
                    </div>
                    <div class="aw-footer"/>
                </div>
            </div>`);
        $('.aw-modal').css({'opacity':'1'});
        aw_data.id = $(this).attr('aw-data-id');
        aw_data.type = $(this).attr('aw-data-type');
        aw_data.season = $(this).attr('aw-data-season');
        aw_data.episode = $(this).attr('aw-data-episode');
        reqCall_Data(aw_data.type, aw_data.id);
        let main_int = setInterval(function() {
            if (aw_data.image) {
                clearInterval(main_int);
                $('.aw-loading').remove();
                $('.aw-header').css({'background-image':`url(${aw_data.image})`});
                $('#watch-search-string').html(`${aw_data.title}`);
                createLB('Titles',['Default'],1);
                createLB('Additional Info',['None','Year'],2);
                createLB('Language',[],5);
                reqCall_Aliases(aw_data.type, aw_data.id);
                addCategories('language');
                addCategories('type');
                addCategories('source');
                addSites();
                $('.aw-header').css({'opacity':'1'});
                $('.aw-footer').css({'opacity':'1'});
                $('html').on('change', '#aw_Titles', function() {
                    if ($('#aw_Titles').val() != 'Default') {
                        $('#watch-search-string')
                        .html($('#watch-search-string')
                        .html().replace(aw_data.title, $('#aw_Titles').val()));
                        aw_data.title = $('#aw_Titles').val();
                    }
                    else {
                        $('#watch-search-string')
                        .html($('#watch-search-string')
                        .html().replace(aw_data.title, aw_data.default_title));
                        aw_data.title = aw_data.default_title;
                    };
                });
                $('html').on('change', '#aw_Source', function() {
                    updateLBInfo();
                    updateInfo();
                    addSites();
                });
                $('html').on('change', '#aw_Language', function() {
                    addCategories('type');
                    addCategories('source');
                    updateLBInfo();
                    updateInfo();
                    addSites();
                });
                $('html').on('change', '#aw_Type', function() {
                    addCategories('source');
                    updateLBInfo();
                    updateInfo();
                    addSites();
                });
                $('html').on('change', '#aw_Additional_Info', function () {
                    updateInfo();
                });
                $('html').on('click', '.aw-sources-item' , function () {
                    window.open($(this).attr('aw-source-link')
                    .replace('%s', $('#watch-search-string').html().replace(/ /g,'+')), "_blank");
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
        $('.aw-content #watch-search').append(`
        <div style="order:${order}" class="watch-search-option">
        <label for="aw_${type.replace(' ','_')}">${type}</label>
        <select id="aw_${type.replace(' ','_')}" size="1"/></div>`);
        for (let element of items) {
            $(`select#aw_${type.replace(' ','_')}`)
            .append(`<option value="${element}">${element}</option>`);
        };
    };

    function updateLB(type,items_delete,items_add) {
        for (let element of items_delete) {
            $(`#${type} > option[value="${element}"]`).remove();
        };
        for (let element of items_add) {
            if (!$(`select#${type} option[value="${element}"]`).text()) {
                $(`select#${type}`)
                .append(`<option value="${element}">${element.replace('aw_','')
                .replace('_',' ')}</option>`);
            };
        };
    };

    function updateLBInfo() {
        if (($('#aw_Source').val() != 'Online') && ($('#aw_Source').val() != 'Database')) {
            if (aw_data.season) {
                if (aw_data.episode) {
                    updateLB('aw_Additional_Info',[],['Season','Episode','All'])
                } else {
                    updateLB('aw_Additional_Info',[],['Season','All'])
                };
            };
        } else {
            updateLB('aw_Additional_Info',['Season','Episode','All'],[]);
        };
    }

    function updateInfo() {
        switch ($('#aw_Additional_Info').val()) {
            case 'None':
                $('#watch-search-string').html(`${aw_data.title}`);
                break;
            case 'Season':
                $('#watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season));
                break;
            case 'Episode':
                $('#watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+'e'+checkSepNum(aw_data.episode));
                break;
            case 'Year':
                $('#watch-search-string').html(`${aw_data.title}`+' '+`${aw_data.year}`);
                break;
            case 'All':
                if (aw_data.episode) {
                    $('#watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+'e'+checkSepNum(aw_data.episode)+' '+`${aw_data.year}`);
                }
                else {
                    $('#watch-search-string').html(`${aw_data.title}`+' s'+checkSepNum(aw_data.season)+' '+`${aw_data.year}`);
                };
        };
    };

    function addCategories(type) {
        switch (type) {
            case 'language':
                for(let element of aw_sources_list) {
                    for (let item of element.language.split(',')) {
                        updateLB('aw_Language',[],[item]);
                    };
                };
                break;
            case 'type':
                $('#aw_Type').parent().remove();
                createLB('Type',[],4);
                for(let element of aw_sources_list) {
                    if (element.language.includes($('#aw_Language').val())) {
                        for (let item of element.type.split(',')) {
                            updateLB('aw_Type',[],[item]);
                        };
                    }; 
                };
                break;
            case 'source':
                $('#aw_Source').parent().remove();
                createLB('Source',[],3);
                for(let element of aw_sources_list) {
                    if ((element.language.includes($('#aw_Language').val())) &&
                    (element.type.includes($('#aw_Type').val()))) {
                        for (let item of element.source.split(',')) {
                            updateLB('aw_Source',[],[item]);
                        };
                    }; 
                };
        }
    };

    function addSites() {
        $('.aw-footer #aw-sources').remove();
        $('.aw-footer').append(`<div id="aw-sources"/>`);
        for(let element of aw_sources_list) {
            if ((element.type.includes($('#aw_Type').val())) &&
            (element.language.includes($('#aw_Language').val())) &&
            (element.source.includes($('#aw_Source').val()))) {
                $('.aw-content #aw-sources')
                .append(`<div class="aw-sources-item" aw-source-link="${element.link}">
                <div class="aw-source-name">${element.name}</div></div>`);
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
                if (data.backdrop_path) {
                    aw_data.image = 'https://image.tmdb.org/t/p/w500'+data.backdrop_path;
                } else {
                    if (data.poster_path) {
                        aw_data.image = 'https://image.tmdb.org/t/p/w500'+data.poster_path;
                    } else {
                        aw_data.image = aw_data.placeholder;
                    };
                };
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
                if (!$(`#aw_Titles > option[value="${element.title}"]`).text()) {
                    $('#aw_Titles').append(`<option value="${element.title}">${element.title}</option>`);
                };
            };
        });
    };

    function checkSepNum(n) {
        return (n < 10 ? '0' : '') + n;
    };
});
