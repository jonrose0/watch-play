import { fetchMovie } from "@/app/lib/data";
import Provider from "@/app/ui/provider";

type MovieData = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  runtime: number;
  genres: Genre[];
  release_dates: ReleaseDates;
  production_companies: ProductionCompany[];
  status: string;
  "watch/providers": WatchProviders;
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
};

type ReleaseDates = {
  results: ReleaseDatesResult[];
};

type ReleaseDatesResult = {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
};

type ReleaseDate = {
  certification: string;
  descriptors: any[];
  iso_639_1: string;
  note: string;
  release_date: Date;
  type: number;
};

type WatchProviders = {
  results: Results;
};

type Results = {
  US: AE;
};

type AE = {
  link: string;
  buy: Flatrate[];
  flatrate?: Flatrate[];
  rent: Flatrate[];
};

type Flatrate = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: MovieData = await fetchMovie(id);

  // console.log(data);

  return (
    <div className="mx-auto max-w-7xl py-20 sm:grid sm:grid-cols-2 sm:grid-rows-[repeat(4,_auto)_1fr] sm:gap-x-12 sm:gap-y-3 sm:p-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr]">
      <div className="mx-auto max-w-96 sm:row-span-4 sm:mx-0 sm:max-w-none">
        <img
          className="w-full"
          src={`http://image.tmdb.org/t/p/w342${data.poster_path}`}
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl font-bold sm:col-start-2 lg:text-left">
        {data.title}
      </h1>
      <div className="border-b-[1px] border-[#ededed33] px-8 py-4 sm:col-start-2 lg:border-b-0 lg:p-0">
        <p>
          <span>genres:</span>{" "}
          {data.genres.map((item, i) => {
            return i + 1 === data.genres.length ? item.name : `${item.name}, `;
          })}
        </p>
      </div>
      <div className="sm:col-start-2 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Rated:</span>{" "}
            {data.release_dates.results.map((item) => {
              return item.iso_3166_1 === "US"
                ? item.release_dates[0].certification
                : "";
            })}
          </p>
        </div>
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Released:</span>{" "}
            {new Date(data.release_date.toString()).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>
        </div>
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>Runtime:</span>{" "}
            {`${Math.floor(data.runtime / 60)}h ${Math.floor(
              data.runtime % 60,
            )}m`}
          </p>
        </div>
        {/* <div className='border-b-[1px] border-[#ededed33] py-4 px-8'>
					<Producers pro={data.production_companies} />
				</div> */}
        <div className="border-b-[1px] border-[#ededed33] px-8 py-4">
          <p>
            <span>status:</span> {data.status}
          </p>
        </div>
      </div>
      <div className="sm:col-start-2 sm:row-span-2 sm:row-start-4 lg:col-start-3 lg:row-start-4">
        <h2 className="text-center text-2xl font-bold lg:hidden">
          where to watch
        </h2>
        {data["watch/providers"].results.US?.flatrate && (
          <Provider
            type={"stream"}
            provider={data["watch/providers"].results.US?.flatrate}
          />
        )}
        <Provider
          type={"rent"}
          provider={data["watch/providers"].results.US?.rent}
        />
        <Provider
          type={"buy"}
          provider={data["watch/providers"].results.US?.buy}
        />
      </div>
      <div className="sm:row-start-5 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-0">
        <h2 className="text-center text-2xl font-bold lg:hidden">overview</h2>
        <p className="leading-7">{data.overview}</p>
      </div>
    </div>
  );
}
