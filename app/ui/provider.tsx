export default function Provider({
  type,
  provider,
}: {
  type: string;
  provider: {
    logo_path: string;
    provider_name: string;
  }[];
}) {
  return (
    <>
      <div className="grid grid-cols-[5rem_1fr] border-b-[1px] border-[#ededed33] p-4 last-of-type:border-b-0">
        <p>{type}:</p>{" "}
        <div className="flex flex-wrap gap-4">
          {provider &&
            provider.map((item) => {
              return (
                <div className="max-w-12">
                  <img
                    src={`http://image.tmdb.org/t/p/w342${item.logo_path}`}
                    alt=""
                  />
                  {/* <p className='text-xs text-center'>{item.provider_name}</p> */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
