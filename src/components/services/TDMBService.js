

class TDMBService {
    _apiBase = "https://api.themoviedb.org"
    _apiKey = "api_key=4ba38e564bb248d0e396b7f6e91aa2fa"
    _apiImagesBase = "https://image.tmdb.org"
    

    getResourse = async (url) => {
        let res = await fetch(url)

        if (!res.ok){
            throw new Error(`Could not fetch ${url} with status ${res.status}`)
        }

        return await res.json()
    }

    createSession = () => {
        return this.getResourse(`${this._apiBase}/3/authentication/guest_session/new?${this._apiKey}`)
    }

    searchRequest = (searchString) => {
        return this.getResourse(`${this._apiBase}/3/search/movie?${this._apiKey}&language=en-US&query=${searchString}&page=1&include_adult=false`)
    }

    crewRequest = (movieId) => {
        return this.getResourse(`${this._apiBase}/3/movie/${movieId}/credits?${this._apiKey}&language=en-US`)
    }
}

export default TDMBService