import { Controller, GET } from 'fastify-decorators';
import { getBook, getGenreBooks, getGenreList, getSearchBooks } from '../services/flibusta';
import { Stream } from 'stream';

@Controller('/flibusta')
export default class FlibustaController {    
    @GET('/genrelist')
    async genrelist(): Promise<{}> {
        try{
            const genres = await getGenreList();
            return genres;
        }
        catch(ex){
            throw Error(ex.message);
        }
    }

    @GET('/genrebooks/:id')
    async genrebooks(Request): Promise<{}> {
        try{
            const { id } = Request.params;
            const genres = await getGenreBooks(id);
            return genres;
        }
        catch(ex){
            throw Error(ex.message);
        }
    }
    

    @GET('/search/:type/:str')
    async search(Request): Promise<{}> {
        try{
            const { str } = Request.params;
            const genres = [
                await getSearchBooks("book", str),
                await getSearchBooks("author", str)
            ];
            //eslint-disable-next-line
            //@ts-ignore
            return [...new Set(genres.flat())];
        }
        catch(ex){
            throw Error(ex.message);
        }
    }
    
    @GET('/:id/book.epub')
    async book(Request): Promise<Stream> {
        try{
            const { id } = Request.params;
            return await getBook(id)
        }
        catch(ex){
            console.error("Book error", ex);
            throw Error(ex.message);
        }
    }
    
    @GET('/download/:id/:type')
    async download(Request): Promise<Stream> {
        try{
            const { id, type } = Request.params;
            return await getBook(id, type);
        }
        catch(ex){
            console.error("Download error", ex);
            throw Error(ex.message);
        }
    }
}