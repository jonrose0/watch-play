import { fetchGame } from "@/app/lib/data";
import BookMark from "@/app/ui/bookmark";
import Image from "next/image";

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

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: GameData = await fetchGame(id);

  const desc = data.description_raw.split("\r\n").filter((str) => {
    return str.length > 0;
  });

  console.log(data);
  console.log(data.stores);

  return (
    <div className="mx-auto max-w-7xl py-20 sm:grid sm:grid-cols-2 sm:grid-rows-[repeat(4,_auto)_1fr] sm:gap-x-12 sm:gap-y-3 sm:p-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr]">
      <div className="mx-auto max-w-96 sm:row-span-3 sm:mx-0 sm:max-w-none">
        <Image
          src={data.background_image}
          className="h-full object-cover"
          width={500}
          height={480}
          alt=""
        />
        {/* <img
          className="h-full object-cover"
          src={data.background_image}
          alt=""
        /> */}
      </div>
      <div className="flex gap-4 sm:col-start-2">
        <h1 className="text-center text-4xl font-bold lg:text-left">
          {data.name}
        </h1>
        <BookMark id={id} />
      </div>
      <div className="border-b-[1px] border-[#ededed33] px-8 py-4 sm:col-start-2 lg:border-b-0 lg:p-0">
        <p>
          <span>genres:</span>{" "}
          {data.genres.map((item) => {
            return item.name;
          })}
        </p>
      </div>
      <div className="sm:col-start-2 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Rated:</span> {data.esrb_rating.name}
          </p>
        </div>
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Released:</span> {data.released}
          </p>
        </div>
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Platforms:</span>{" "}
            {data.platforms.map((platform) => {
              return platform.platform.name;
            })}
          </p>
        </div>
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Developers:</span>{" "}
            {data.developers.map((dev) => {
              return dev.name;
            })}
          </p>
        </div>

        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Publishers:</span>{" "}
            {data.publishers.map((publisher) => {
              return publisher.name;
            })}
          </p>
        </div>
      </div>
      <div className="sm:col-start-2 sm:row-span-2 sm:row-start-4 lg:col-start-3 lg:row-start-4">
        <h2 className="text-center text-2xl font-bold lg:hidden">
          where to play
        </h2>
        <div className="flex flex-wrap gap-4">
          {data.stores.map((s) => {
            return (
              <a href={`https://${s.store.domain}`} target="_blank">
                {s.store.name}
              </a>
            );
          })}
        </div>
      </div>
      <div className="sm:row-start-5 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-0">
        <h2 className="text-center text-2xl font-bold lg:hidden">overview</h2>
        <div className="grid gap-4">
          {desc.map((para) => {
            return <p className="indent-8 leading-7">{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
