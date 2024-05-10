"use client";

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { fetchGame } from "../lib/data";

type GameData = {
  name: string;
  background_image: string;
  released: string;
  description: string;
  description_raw: string;
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  esrb_rating: { id: number; name: string; slug: string };
  platforms: {
    platform: {
      name: string;
    };
  }[];
  developers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  publishers: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
};

function getBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  return storage ? JSON.parse(storage) : [];
}

export default function BookMark({ id }: { id: string }) {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [data, setData] = useState<GameData>();
  // const [storage, setStorage] = useState(() => getBookmarks());

  useEffect(() => {
    const storage = localStorage.getItem("bookmarks");
    const parsedStorage = storage && JSON.parse(storage);

    console.log(parsedStorage);
  }, []);

  // useEffect(() => {
  //   if (
  //     storage.find((bookmark) => {
  //       return id === bookmark.id;
  //     })
  //   ) {
  //     console.log("bookmarksss");
  //   }
  // }, []);

  useEffect(() => {
    if (isBookMarked) {
      fetchGame(id).then((res) => {
        console.log(res);
        const { id, background_image, name, released } = res;

        const bookmarkData = {
          id,
          name,
          background_image,
          released,
          type: "game",
        };

        console.log("bookmarked", id, background_image, name, released);
        // id
        // pic
        // name
        // publisher
        // platform
        // released
        // stores
        // type = game, movie, show

        console.log(bookmarkData);

        // const parseStorage = JSON.parse(storage)

        const addBookmark = [...storage, bookmarkData];

        localStorage.setItem("bookmarks", JSON.stringify(addBookmark));
        setData({ ...data, ...res });
      });
    }
  }, [isBookMarked]);

  console.log(data);

  function handleClick() {
    setIsBookMarked(!isBookMarked);
  }

  return (
    <button className="z-10 text-2xl" onClick={handleClick}>
      {isBookMarked ? <FaStar /> : <FaRegStar />}
    </button>
  );
}
