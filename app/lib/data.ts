export async function fetchMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.SHOW_API_KEY}&append_to_response=credits,recommendations,release_dates,watch/providers`,
  );

  const data = await res.json();

  // console.log(data)
  // console.log(data["watch/providers"].results.CA.rent);
  // console.log(data["watch/providers"].results.CA.buy);

  return data;
}

export async function fetchShow(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.SHOW_API_KEY}&append_to_response=aggregate_credits,content_ratings,recommendations,watch/providers`,
  );

  const data = await res.json();

  // console.log(data);

  return data;
}

export async function fetchGame(id: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.GAME_API_KEY}`,
  );

  const data = await res.json();

  // console.log(data)

  return data;
}
