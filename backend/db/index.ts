import { LibAuthor } from './libavtor';
import { LibAuthorName } from './libavtorname';
import { LibBook } from './libbook';
import { LibGenre } from './libgenre';
import { LibGenreList } from './libgenrelist';
import { LibSeqName } from './libseqname';
import { LibBAnnotation } from './libbannotations';

LibGenreList.hasMany(LibGenre, {foreignKey: 'GenreId'})
LibGenre.belongsTo(LibGenreList, {foreignKey: 'GenreId'});

LibGenre.hasMany(LibBook, {foreignKey: 'BookId'})
LibBook.belongsTo(LibGenre, {foreignKey: 'BookId'});


LibBook.belongsTo(LibBAnnotation, {foreignKey: 'BookId', targetKey: 'BookId'});
LibBAnnotation.belongsTo(LibBook, {foreignKey: 'BookId', targetKey: 'BookId'});


LibBook.belongsToMany(LibGenreList, { through: 'LibGenre', foreignKey: "BookId", otherKey: "GenreId"  });
LibBook.belongsToMany(LibAuthorName, { through: 'LibAvtor', foreignKey: "BookId", otherKey: "AvtorId"  });

export {
    LibAuthor, LibAuthorName, LibBook, LibGenre, LibGenreList, LibSeqName, LibBAnnotation
}