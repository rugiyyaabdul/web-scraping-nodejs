const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');


app.get('/reportaz',(req,res)=>{

    const url = 'https://report.az/son-xeberler/today/';
    axios.get(url).then((response)=>{

        let obj = {};
        const $ = cheerio.load(response.data)

        const images = $(".image a img");
        const titles = $(".title");
        const dates = $(".news-date");

        titles.each((index)=>{
            obj[index] = {
                'images' : "",
                'titles' : "",
                'dates' : "",
            };
            obj[index]['image'] = $(images[index]).attr('src');
            obj[index]['title'] = $(titles[index]).text();
            obj[index]['news-date'] = $(dates[index]).text();
        });
        res.send(obj);

    });
});


app.listen(2024);