import type { iGif, iGiphyResponse, iGiphyGif } from "./Giphy-Gif";

const BASE_URL = "https://api.giphy.com/v1/gifs/search";

export const getGifsByQuery = async (request: string, limit: string, lang: string): Promise<iGif[]> => {
    const response = await fetch(`${BASE_URL}?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${request}&limit=${limit}+&lang=${lang}`);

    return (await response.json() as iGiphyResponse).data.map( (gif: iGiphyGif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height),
        size: Number(gif.images.original.size)
        })
    );
}