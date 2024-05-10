"use server";

export async function fetchMovies(
  query: string,
  sort: string,
  genre: string,
  provider: string,
  minDate: string,
  maxDate: string,
  page: number,
) {
  const newQuery = query ? `&with_text_query=${query}` : "";
  const newGenre = genre ? `&with_genres=${genre}` : "";
  const newProvider = provider ? `&with_watch_providers=${provider}` : "";
  const newMinDate = minDate
    ? `&primary_release_date.gte=${minDate}-01-01`
    : "";
  const newMaxDate = maxDate
    ? `&primary_release_date.lte=${maxDate}-12-31`
    : "";
  const newSort = sort ? `&sort_by=${sort}` : "";

  // await new Promise(resolve => setTimeout(resolve, 5000))

  // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}${newQuery}${newGenre}${newProvider}&watch_region=US${newMinDate}${newMaxDate}&language=en-US&page=${page}${newSort}`)
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.SHOW_API_KEY}${newQuery}${newGenre}${newProvider}&watch_region=US${newMinDate}${newMaxDate}&language=en-US&page=${page}${newSort}`,
  );

  const data = await res.json();

  console.log(data);

  return data;
}

export async function fetchTV(
  query: string,
  sort: string,
  genre: string,
  provider: string,
  minDate: string,
  maxDate: string,
  page: number,
) {
  const newQuery = query ? `&with_text_query=${query}` : "";
  const newGenre = genre ? `&with_genres=${genre}` : "";
  const newProvider = provider ? `&with_watch_providers=${provider}` : "";
  const newMinDate = minDate ? `&air_date.gte=${minDate}-01-01` : "";
  const newMaxDate = maxDate ? `&air_date.lte=${maxDate}-12-31` : "";
  const newSort = sort ? `&sort_by=${sort}` : "";

  // await new Promise(resolve => setTimeout(resolve, 5000))

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.SHOW_API_KEY}${newQuery}${newGenre}${newProvider}&watch_region=US${newMinDate}${newMaxDate}&language=en-US&page=${page}${newSort}`,
  );

  const data = await res.json();

  console.log(data);

  return data;
}

export async function fetchGames(
  query: string,
  sort: string,
  genre: string,
  provider: string,
  minDate: string,
  maxDate: string,
  page: number,
) {
  const newQuery = query ? `&search=${query}` : "";
  const newGenre = genre ? `&genres=${genre}` : "";
  const newProvider = provider ? `&stores=${provider}` : "";
  const newDate =
    minDate || maxDate
      ? `&dates=${minDate ? minDate : "1900"}-01-01,${maxDate ? maxDate : new Date().getFullYear()}-12-31`
      : "";
  const newSort = sort ? `&ordering=${sort}` : "";

  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}${newQuery}${newGenre}${newProvider}${newDate}&page=${page}${newSort}`,
  );

  const data = await res.json();

  // console.log(data)

  return data;
}
