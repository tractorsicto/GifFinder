import { useState } from "react";
import { GifList } from "./GifsList.tsx";
import { Header } from "./shared/Header.tsx";
import { SearchBar, PreviousSearch } from "./shared/SearchBar.tsx";
import { getGifsByQuery } from "../apis/Giphy-Dao.ts";
import type { iGif } from "../apis/Giphy-Gif.ts";

export const GifsApp = () => {
    const[gifs, setGifs] = useState<iGif[]>([]);
    const[previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (request: string) => {
        console.log({ request });
    }

    const handleSearch = async(request: string ="") => {
        request = request.trim().toLocaleLowerCase();

        if ( (request.length ===0) || previousTerms.includes(request) ) { }
        else{ setPreviousTerms([request, ...previousTerms.slice(0,7)]);
                  console.log("El reques es: " + { request });
            setGifs(await getGifsByQuery(request, "10", "en"));
        }
    }

    return (
        <>
        {/* Renders the header */}
        <Header title= "Buscador de Gifs" description="Descubre y comparte Gifs" />

        {/* Capture users´ gift teams */}
        <SearchBar type="text" placeholder="Buscar gifs" onSearch={ handleSearch } />

        {/* List the previous terms searched */}
        <PreviousSearch terms={ previousTerms } onLabelClicked={ handleTermClicked } />

        {/*Gifs result*/}
         <GifList gifs={ gifs } />
        </>
    );
}