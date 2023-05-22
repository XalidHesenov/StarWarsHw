class ApiService {
    _apiBase = "https://swapi.dev/api"
    async getResources(url){
        const responce = await fetch(`${this._apiBase}${url}`)
        if (!responce.ok){
            throw new Error(`Could not fetch ${url}, recived ${responce.status}`)
        }
        return await responce.json()
    }

    async getPeople(){
        const people = await this.getResources(`/people/`)
        return people.map(p => this._transformPerson(p))
    }
    getPerson(id){
        const person = this.getResources(`/people/${id}/`).result
        return this._transformPerson(person)
    }

    async getAllPlanets(){
        const planets = await this.getResources(`/planets/`)
        return planets.map(p => this._transformPlanet(p));
    }
    async getPlanet(id){
        const planet = await this.getResources(`/planets/${id}/`)
        return this._transformPlanet(planet)
    }

    async getAllStarships(){
        const starships = await this.getResources(`/starships/`)
        return starships.map(s => this._transformStarship(s));
    }
    getStarship(id){
        const starship = this.getResources(`/starships/${id}/`)
        return this._transformStarship(starship)
    }

    _transformPlanet(planet){
        const id = this._extractId(planet)
        return{
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
    
    _transformPerson(person) {
        return {
          id: this._extractId(person),
          name: person.name,
          gender: person.gender,
          birthYear: person.birth_year,
          eyeColor: person.eye_color,
        };
      }
    
      _transformStarship(starship) {
        return {
          id: this._extractId(starship),
          name: starship.name,
          model: starship.model,
          starshipClass: starship.starship_class,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cost: starship.cost_in_credits,
        };
      }

    _extractId(item){
        const idRegExp =/\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
    }

}

export default ApiService;


// fetch("https://www.swapi.tech/api/people/1/")
//     .then((res)=>res.json())
//     .then((data)=>{
//         console.log(data.result.properties.name)})