// ==UserScript==
// @name         Trakt Watch Now Sites
// @namespace    https://github.com/sergeyhist/Trakt.tv-Hist-UserScripts/blob/main/trakt-watch-now.user.js
// @version      2.3
// @description  Various sites added to the Watch Now modal
// @author       Hist
// @match        *://trakt.tv/*
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';
var watchstyle = `
    .streaming-links,
    #watch-now-country-select,
    #watch-now-powered-by {
        display: none!important;
    }
    #watch-now-modal {
        top: 10%!important;
        left: 5%!important;
        bottom: 5%!important;
        width: 90%!important;
        margin-left: 0px!important;
    }
    #watch-now-content {
        height: 100%;
        overflow: auto;
    }
    .freesources a {
        display: inline-block;
        font-family: proxima nova;
        margin-bottom: 2%;
        margin-left: 20px;
        text-decoration: none!important;
        width: 120px;
        vertical-align: top;
        text-align: center;
        color: inherit;
    }
    .freesources a .icon {
        padding-inline: 1px;
        background-color: #333;
        color: #fff;
        font-size: 12px;
        line-height: 1;
        height: 60px;
        word-wrap: break-word;
        position: relative;
    }
    .freesources a .icon img {
        width: 100%;
        height: 100%;
        transition: all .5s;
    }
    .freesources a .icon img:hover {
        padding-block: 10px;
        padding-inline: 10px;
    }
    .freesources .title {
        text-transform: uppercase;
        font-family: proxima nova semibold;
        margin-bottom: 10px;
        color: #666;
        border-bottom: solid 1px #ddd;
        padding-left: 30px;
    }
`
GM_addStyle(watchstyle);
$('html').on('show.bs.modal', '#watch-now-modal', function (e) {
    var checkExist = setInterval(function() {
        var streaming_links = $('#watch-now-modal').find('.streaming-links');
        console.debug("Waiting to insert...");
        if (streaming_links.length) {
            clearInterval(checkExist);
            console.log("Element found", streaming_links);
            var long_name=$('#watch-now-modal').find('h3').text();
            var episode_name=$('#watch-now-modal').find('.main-title-sxe').text();
            var season_number=' s0'+episode_name.split("x")[0];
            var episode_number='e'+episode_name.split("x")[1];
            var anime_episode_number=' '+episode_name.split("x")[1];
            var name_of_item=long_name.substring('Where to watch '.length);
            var year_number='';
            if (long_name == "Where to watch ") {
                name_of_item=$('#watch-now-modal').find('h1').text();
                if ( $('#watch-now-modal').find('h1').text().match(/:/) != null ) {
                    if ( name_of_item.split(":")[1].match(/ Season/) != null ) {
                        season_number=' s0'+name_of_item.split(" ").pop();
                        name_of_item=name_of_item.split(":")[0];
                    } else {
                        name_of_item=name_of_item.substring(0,name_of_item.length-5);
                        season_number='';
                        anime_episode_number='';
                    }
                } else {
                    name_of_item=name_of_item.substring(0,name_of_item.length-5);
                    season_number='';
                    anime_episode_number='';
                }
                year_number=' '+$('#watch-now-modal').find('.year').text();
            }
            $('#watch-now-modal').find('.streaming-links').after(`<div class="freesources"/>`);
            var online_sites = [
                {
                    name: 'Youtube',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/youtube.png?raw=true',
                    link: `https://www.youtube.com/results?search_query=${name_of_item}${season_number}${year_number}`
                },
                {
                    name: 'Yes!Movies',
                    color: '#c81c55',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/yesmovies.png?raw=true',
                    link: `https://yesmovies.ag/searching/${name_of_item}.html`
                },
                {
                    name: 'FMovies',
                    color: '#03acc2',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/fmovies.png?raw=true',
                    link: `https://fmovies.to/search?keyword=${name_of_item}`
                },
                {
                    name: 'LookMovie-Movies',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/lookmovie.png?raw=true',
                    link: `https://lookmovie.io/movies/search/?q=${name_of_item}`
                },
                {
                    name: 'LookMovie-Series',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/lookmovie.png?raw=true',
                    link: `https://lookmovie.io/shows/search?q=${name_of_item}`
                },
                {
                    name: 'Vidcloud',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/vidcloud.png?raw=true',
                    link: `https://vidcloud9.com/search.html?keyword=${name_of_item}`
                },
                {
                    name: 'Soap2day',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/soap2day.png?raw=true',
                    link: `https://soap2day.to/search/keyword/${name_of_item}`
                },
                {
                    name: 'BatFlix',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/batflix.png?raw=true',
                    link: `https://ww2.batflix.org/search?q=${name_of_item}`
                },
                {
                    name: 'OpenloadMovies',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/openload.png?raw=true',
                    link: `https://openloadmov.net/?s=${name_of_item}`
                },
                {
                    name: 'LunchFlix',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/lunchflix.png?raw=true',
                    link: `https://www.lunchflix.org/?s=${name_of_item}`
                },
                {
                    name: 'HiMovies',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/himovies.png?raw=true',
                    link: `https://www3.himovies.to/search/${name_of_item}`
                },
                {
                    name: 'PutLocker',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/putlocker.png?raw=true',
                    link: `https://ww2.putlocker123.to/search/${name_of_item}`
                },
                {
                    name: 'Dramacool',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/dramacool.png?raw=true',
                    link: `https://dramacool.so/search?type=movies&keyword=${name_of_item}`
                },
                {
                    name:'KimCartoon',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/kimcartoon.png?raw=true',
                    link: `https://kimcartoon.to/AdvanceSearch?cartoonName=${name_of_item}`
                },
                {
                    name: 'AniMixPlay',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/animix.png?raw=true',
                    link: `https://animixplay.to/?q=${name_of_item}`
                },
                {
                    name: 'KickAssAnime',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/kickass.png?raw=true',
                    link: `https://www2.kickassanime.rs/search?q=${name_of_item}`
                }
                ];
            var source_type='onlinesources';
            addSites(online_sites, source_type);
            $('#watch-now-modal').find('.onlinesources').first().before(`<div class="title">Online Sources</div>`);
            var torrent_sites = [
                //Rarbg
                {
                    name: 'RARBG',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/rarbg.png?raw=true',
                    link: `https://rarbgtor.org/torrents.php?search=${name_of_item}${season_number}${year_number}`
                },
                {
                    name:'1337x',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/1337x.png?raw=true',
                    link: `https://1337x.to/search/${name_of_item}${season_number}${year_number}/1/`
                },
                {
                    name: 'The Pirate Bay',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/tpb.png?raw=true',
                    link: `https://thepiratebay.org/search/${name_of_item}${season_number}${year_number}/0/3/0`
                },
                {
                    name:'Nyaa',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/nyaa.png?raw=true',
                    link: `https://nyaa.si/?f=0&c=1_0&q=${name_of_item}${anime_episode_number}`
                },
                {
                    name: 'Rutracker',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/rutracker.png?raw=true',
                    link: `https://rutracker.org/forum/tracker.php?nm=${name_of_item}`
                }
                ];
            source_type='torrentsources';
            addSites(torrent_sites, source_type);
            $('#watch-now-modal').find('.torrentsources').first().before(`<div class="title">Torrent Sources</div>`);
            var ddl_sites = [
                {
                    name:'HDEncode',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/hdencode.png?raw=true',
                    link: `https://hdencode.com/?s=${name_of_item}${season_number}${year_number}`
                },
                {
                    name:'RLSBB',
                    color: 'black',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/rlsb.png?raw=true',
                    link: `http://search.rlsbb.ru/?s=${name_of_item}${season_number}${year_number}`
                },
                {
                    name:'Scene-Rls',
                    color: 'white',
                    image: 'https://github.com/sergeyhist/Trakt.tv-Watch-Now-Alternative/blob/main/logos/scenerls.png?raw=true',
                    link: `http://scene-rls.com/?s=${name_of_item}${season_number}${year_number}`
                }
                ];
            source_type='ddlsources';
            addSites(ddl_sites, source_type);
            $('#watch-now-modal').find('.ddlsources').first().before(`<div class="title">DDL Sources</div>`);
        }
    }, 100);
});

function addSites(type_sites, type) {
    for(var i=0;i < type_sites.length;i++) {
        $('#watch-now-modal').find('.freesources').last().append(`<a class="${type}" target="_blank" href="${type_sites[i].link}"><div class="icon" style="background-color:${type_sites[i].color};"><img src="${type_sites[i].image}" alt="${type_sites[i].name}"></div><div class="price">${type_sites[i].name}<br></div></a>`);
    }
}
