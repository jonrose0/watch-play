import Link from "next/link";
import Status from "./status";
import BookMark from "./bookmark";

export default function Grid({ data, type }: { data: any; type: string }) {
  return (
    <>
      {data.map((item: any) => {
        return (
          <div
            key={item.id}
            className="grid grid-rows-[4fr_1fr] overflow-hidden rounded transition-transform hover:scale-105"
          >
            {type === "games" ? (
              <Link href={`/${type}/${item.id}`}>
                <img
                  className="h-full w-full object-cover"
                  src={item.background_image}
                  alt=""
                />
              </Link>
            ) : (
              <img
                className="h-full w-full object-cover"
                src={`http://image.tmdb.org/t/p/w780${item.poster_path}`}
                alt=""
              />
            )}
            <div className="relative flex items-center justify-between gap-4 p-4">
              <Link
                href={`/${type}/${item.id}`}
                className="absolute left-0 top-0 h-full w-full bg-stone-900"
              ></Link>
              <Link className="z-10" href={`/${type}/${item.id}`}>
                <h2>{type === "movies" ? item.title : item.name}</h2>
              </Link>
              <BookMark id={item.id} />
            </div>
          </div>
        );
      })}
    </>
  );
}
