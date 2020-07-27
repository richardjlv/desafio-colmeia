import Parse from 'parse/node';
import fs from 'fs';

class Answer {
  constructor() {
    this.initialize();
  }

  initialize() {
    Parse.initialize("Jl21MbJjOzHoq3eNjK0dY1cuRyQnOeu1GNIGQpY3", "Aqy19HFsorwxIhCC3E9IYBQh8WBnkdoMGOdEaYPe");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  async All() {
    const answers = [];

    answers.push(await this.FirstQuestion());
    answers.push(await this.SecondQuestion());
    answers.push(await this.ThirdQuestion());
    answers.push(await this.FourthQuestion());
    answers.push(await this.FifthQuestion());
    answers.push(await this.SixthQuestion());

    return answers;
  }

  async generateCsv() {
    const answers = await this.All();

    let data = 'Pergunta 1;Pergunta 2;Pergunta 3;Pergunta 4;Pergunta 5;Pergunta 6;\n';
    data = answers.reduce((newData, answer) => newData.concat(answer, ';'), data);

    fs.writeFile('answer.csv', data, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

  async FirstQuestion() {
    const Film = Parse.Object.extend("Film");
    const query = new Parse.Query(Film);

    const firstFilm = await query.ascending("releaseDate").first();

    return firstFilm?.get('title');
  }

  async SecondQuestion() {
    const Specie = Parse.Object.extend("Specie");
    const query = new Parse.Query(Specie);

    query.notEqualTo("averageLifespan", null);
    const allSpecies = await query.ascending("averageLifespan").find();

    const species = allSpecies.filter(
      specie => specie.get('averageLifespan') === allSpecies[0].get('averageLifespan'))

    const nameSpecies = species.map((specie) => specie.get('name'));

    return nameSpecies;
  }

  async ThirdQuestion() {
    const Character = Parse.Object.extend("Character");
    const query = new Parse.Query(Character);

    query.equalTo("gender", 'male');
    const charactersMale = await query.count();

    query.equalTo("gender", 'female');
    const charactersFemale = await query.count();

    const response = `M:${charactersMale},F:${charactersFemale}`;

    return response;
  }

  async FourthQuestion() {
    const Character = Parse.Object.extend("Character");
    const query = new Parse.Query(Character);

    query.notEqualTo("height", null);
    const characters = await query.find();

    const averageHeight = characters.reduce(
      (total, character) => total + (character.get('height')), 0) / characters.length;

    return Number(averageHeight.toFixed(2));
  }

  async FifthQuestion() {
    const Specie = Parse.Object.extend("Specie");
    const Character = Parse.Object.extend("Character");

    const querySpecie = new Parse.Query(Specie);
    const queryCharacter = new Parse.Query(Character);

    querySpecie.equalTo("language", 'Gungan basic');
    queryCharacter.matchesQuery("species", querySpecie);

    const characterSpeakGungan = await queryCharacter.find();

    const namesOfCharacters = characterSpeakGungan.map((character) => character.get('name'));

    return namesOfCharacters;
  }

  async SixthQuestion() {
    const Planet = Parse.Object.extend("Planet");
    const Character = Parse.Object.extend("Character");

    const queryPlanet = new Parse.Query(Planet);
    const queryCharacter = new Parse.Query(Character);

    const planet = await queryPlanet.descending('population').first();
    queryCharacter.equalTo("homeworld", planet);

    const charactersCount = await queryCharacter.count();

    return charactersCount;
  }
}

export default new Answer();