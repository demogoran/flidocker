import * as fs from "fs";
import * as toraxios from "tor-axios";
import axios from "axios";
import { promises } from "fs";
import { Op } from "sequelize";
import { Model } from "sequelize/types";

import { LibGenreList, LibBook, LibAuthorName, LibBAnnotation } from "../db";
import { Stream } from "stream";

const tor = toraxios.torSetup({
  ip: "localhost",
  port: 9050,
});

export const getGenreBooks = async (id): Promise<Model<any, any>[]> => {
  const genres = await LibBook.findAll({
    include: [
      {
        model: LibGenreList,
        where: { GenreId: id },
      },
      LibAuthorName,
    ],
  });
  return genres;
};

export const getGenreList = async (): Promise<Model<any, any>[]> => {
  const genres = await LibGenreList.findAll({});
  return genres;
};

export const getSearchBooks = async (type, str): Promise<Model<any, any>[]> => {
  const searchParams =
    type === "book"
      ? {
          Title: {
            [Op.like]: `%${str}%`,
          },
        }
      : {
          "$libavtorname_models.FirstName$": {
            [Op.like]: `%${str}%`,
          },
          "$libavtorname_models.LastName$": {
            [Op.like]: `%${str}%`,
          },
        };

  // add index to annotation
  const books = await LibBook.findAll({
    where: {
      [Op.or]: searchParams,
    },
    include: [
      {
        model: LibAuthorName,
        attributes: ["FirstName", "LastName"],
      },
      {
        model: LibBAnnotation,
        attributes: ["Body"],
      },
    ],
    attributes: ["BookId", "Title", "Modified", "Deleted"],
  });

  //eslint-disable-next-line
  //@ts-ignore
  return books.filter((x) => x.Deleted !== "1");
};

export const getBook = async (id, type = "epub"): Promise<Stream> => {
  const start = Date.now();
  try {
    await promises.mkdir("./cached");
  } catch (ex) {
    console.error("Folder already exists");
  }
  console.log(1, Date.now() - start);

  const bookPath = `./cached/book.${id}.${type}`;
  try {
    await promises.stat(bookPath);
    const fileCached = await fs.createReadStream(bookPath);
    console.log("created");
    return fileCached;
  } catch (ex) {
    console.error("File not cached");
  }
  console.log(2, Date.now() - start);

  /* console.log('try change session');
    await tor.torNewSession();
    console.log('session changed'); */

  console.log(`http://flibustahezeous3.onion/b/${id}/${type}`);

  const flibustaUrl = `http://flibusta.is/b/${id}/${type}`;
  const headInfo = await axios(flibustaUrl, { method: "HEAD" });
  const isFileAvailable =
    headInfo.status === 200 && headInfo.headers["content-length"] > 50000;

  console.log("Is download from tor:", !isFileAvailable);

  const axiosObj = !isFileAvailable ? tor : axios;
  const axiosURL = !isFileAvailable
    ? `http://flibustahezeous3.onion/b/${id}/${type}`
    : flibustaUrl;

  const responseStream = (await axiosObj.get(axiosURL, {
    responseType: "stream",
    onDownloadProgress: (progress) => {
      console.log("Progress", progress);
    },
  })).data;
  responseStream.pipe(fs.createWriteStream(bookPath));
  return responseStream;
};
