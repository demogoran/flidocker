import * as cheerio from 'cheerio';
import * as toraxios from 'tor-axios';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { promises } from 'fs';
import { Stream } from 'stream';

const tor = toraxios.torSetup({
    ip: 'localhost',
    port: 9050,
});

export const authorPage = async (id): Promise<string> =>{
    const response = (await tor.get(`http://flibustahezeous3.onion/a/${id}`)).data;
    
    const $ = cheerio.load(response);
    const url = $('a[href*="/read"]+a:contains("epub")').get().map((x)=>$(x).attr('href'));
    console.log(url);

    return url;
}

export const getBook = async (id): Promise<Buffer> => {
    const start = Date.now();
    try{
        await promises.mkdir("./cached");
    }
    catch(ex){
        console.error("Folder already exists");
    }
    console.log(1, Date.now() - start);
    
    const bookPath = `./cached/book.${id}.epub`;
    try{
        await promises.stat(bookPath);
        const fileCached = await promises.readFile(bookPath);
        console.log('created');
        return fileCached;
    }
    catch(ex){
        console.error("File not cached");
    }
    console.log(2, Date.now() - start);

    const response = (await tor.get(`http://flibustahezeous3.onion/b/${id}/epub`, {
        responseType: "arraybuffer"
    })).data;
    console.log(3, Date.now() - start);
    
    await promises.writeFile(bookPath, response, {encoding: null});
    return response;
}

export const getBookPDF = async (id, width, height): Promise<Buffer> =>{
    console.log(1);
    try{
        await promises.mkdir("./cached");
    }
    catch(ex){
        console.error("Folder already exists");
    }
    const bookPath = `./cached/book.${id}.${width}.${height}.pdf`;

    console.log(2);
    try{
        const fileCached = await promises.readFile(bookPath);
        return fileCached;
    }
    catch(ex){
        console.error("File not cached");
    }
    
    const response = (await tor.get(`http://flibustahezeous3.onion/b/${id}/read`)).data;
    const $ = cheerio.load(response);
    const html = $('.book').get().map(x=>$(x).html()).join('<br>');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
        height: height / 0.75,
        width: width / 0.75,
        scale: 1 / 0.75,
        printBackground: true,
     });
   
     console.log(3);
    await browser.close();
    await promises.writeFile(bookPath, pdf);

    console.log(4);
    return pdf;
}