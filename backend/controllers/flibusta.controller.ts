import { Controller, GET } from 'fastify-decorators';
import { authorPage, getBook } from '../services/flibusta';
import { Stream } from 'stream';

@Controller('/flibusta')
export default class FlibustaController {
    @GET('/author')
    async author(): Promise<string> {
        try{
            const bookURL = await authorPage(107253);
            return bookURL;
        }
        catch(ex){
            throw Error(ex.message);
        }
    }
    
    @GET('/book.epub')
    async book(): Promise<Buffer> {
        try{
            return await getBook(584013);
        }
        catch(ex){
            throw Error(ex.message);
        }
    }
}