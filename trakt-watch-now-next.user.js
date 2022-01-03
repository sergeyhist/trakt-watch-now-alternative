// ==UserScript==
// @name        Trakt.tv Watch Now Alternative
// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js
// @match       *://trakt.tv/*
// @version     2.6.9
// @author      Hist
// @description Alternative version for trakt.tv watch now modal
// @run-at      document-start
// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js
// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative
// ==/UserScript==
'use strict';
document.addEventListener("DOMContentLoaded", function () {
    const sources_list = [];
    const aw_styles = document.createElement("link");
    aw_styles.setAttribute("rel", "stylesheet");
    aw_styles.setAttribute("type", "text/css");
    aw_styles.setAttribute("href", "https://raw.githubusercontent.com/sergeyhist/histscript.github.io/gh-pages/123.css?token=APVTWKAUJHL75QDVIP2KZODB2MXOS");
    document.getElementsByTagName("head")[0].appendChild(aw_styles);
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
        '[itemtype="http://schema.org/TVSeries"]',
        '[itemtype="http://schema.org/TVEpisode"]',
        '[itemtype="http://schema.org/TVSeason"]',
        '[itemtype="http://schema.org/Movie"]',
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
        $('.alternative-watch-content').append(`<div id="watch-search"><p type="text" id="watch-search-string"></p></div>`)
        $('.alternative-watch-modal #watch-search-string').html(`${original_aw_name}`)
        /*createCB('year','Year','')
        createCB('episode','Episode','')
        createCB('cname','Title',original_aw_name);
        $('html').on('change', `#cb_year`, function () {updateCB('year',original_year_number,'')})
        $('html').on('change', `#cb_episode`, function () {updateCB('episode',episode_data,'')})
        $('html').on('change', `#cb_cname`, function () {updateCB('cname','',original_aw_name)})*/
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
                        if ($(this).parent().parent().parent().find('h3').text().split(' ')[0] == 'Today') {
                            if (!$(this).find('#alternative-watch').length) {
                                if ($(this).find('h5 > a').length) { aw_link=$(this).find('h5 > a').attr('href') }
                                else { aw_link=$(this).find('h4 > a').attr('href') }
                                aw_result=awData(2,aw_link)
                                aw_block=awBlock('schedule',aw_result)
                                $(this).append(`${aw_block}`)
                            }
                        }
                        break
                    default:
                        $(this).find('.action-buttons').each( function () {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_link=$(this).parents().find('meta[itemprop=url]').attr('content')
                                aw_result=awData(4,aw_link)
                                aw_block=awBlock('main',aw_result)
                                $(this).find('.btn-collect').after(`${aw_block}`)
                            }
                        })
                        $(this).find('.quick-icons').each( function () {
                            if (!$(this).find('#alternative-watch').length) {
                                aw_link=$(this).parent().find('meta[itemprop=url]').attr('content')
                                aw_result=awData(4,aw_link)
                                aw_block=awBlock('quick',aw_result)
                                $(this).find('.collect').after(`${aw_block}`)
                            }
                        })
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
        if (data_link) {
            data_year=data_link.split('/')[startnum].split('-').pop()
            if (isNaN(data_year)) {data_year=''; data_name=data_link.split('/')[startnum].replace(/-/g,' ')}
            else {data_name=data_link.split('/')[startnum].replace(/-/g,' ').replace(` ${data_year}`,'')}
            data_season=data_link.split('/')[startnum+2]
            data_episode=data_link.split('/')[startnum+4]
            return data_name+'+|+'+data_year+'+|+'+data_season+'+|+'+data_episode
        }
        else {return 0}
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
