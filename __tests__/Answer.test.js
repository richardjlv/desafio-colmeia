import ParseMockDB from 'parse-mockdb';
import Parse from 'parse/node'
import Answer from '../src/Answer';

describe('Answer', () => {
  beforeEach(function () {
    ParseMockDB.mockDB(Parse);
  });

  afterEach(function () {
    ParseMockDB.cleanUp();
  });

  it('should be able to answer the first question', async () => {
    const Film = Parse.Object.extend("Film");

    const film = new Film();
    const film2 = new Film();
    const film3 = new Film();

    film.set("releaseDate", '2000-05-25T00:00:00.000Z');
    film.set("title", 'Chapter III');
    await film.save();

    film2.set("releaseDate", '1989-05-25T00:00:00.000Z');
    film2.set("title", 'Chapter V');
    await film2.save();

    film3.set("releaseDate", '1995-06-25T00:00:00.000Z');
    film3.set("title", 'Chapter IV');
    await film3.save();

    const answer = await Answer.FirstQuestion();

    expect(answer).toStrictEqual('Chapter V');
  });

  it('should be able to answer the second question', async () => {
    const Specie = Parse.Object.extend("Specie");

    const specie = new Specie();
    const specie2 = new Specie();
    const specie3 = new Specie();
    const specie4 = new Specie();

    specie.set("averageLifespan", 86);
    specie.set("name", 'Droid');
    await specie.save();

    specie2.set("averageLifespan", 80);
    specie2.set("name", 'Human');
    await specie2.save();

    specie3.set("averageLifespan", 85);
    specie3.set("name", 'Gungan');
    await specie3.save();

    specie4.set("averageLifespan", 80);
    specie4.set("name", 'Ewok');
    await specie4.save();

    const answer = await Answer.SecondQuestion();

    expect(answer).toStrictEqual(['Human', 'Ewok']);
  });

  it('should be able to answer the third question', async () => {
    const Character = Parse.Object.extend("Character");

    const character = new Character();
    const character2 = new Character();
    const character3 = new Character();
    const character4 = new Character();

    character.set("gender", 'male');
    await character.save();

    character2.set("gender", 'female');
    await character2.save();

    character3.set("gender", 'female');
    await character3.save();

    character4.set("gender", 'female');
    await character4.save();

    const answer = await Answer.ThirdQuestion();

    expect(answer).toStrictEqual('M:1,F:3');
  });

  it('should be able to answer the fourth question', async () => {
    const Character = Parse.Object.extend("Character");

    const character = new Character();
    character.set("height", 20);
    await character.save();

    const character2 = new Character();
    character2.set("height", 25);
    await character2.save();

    const character3 = new Character();
    character3.set("height", null);
    await character3.save();

    const character4 = new Character();
    character4.set("height", 15);
    await character4.save();

    const character5 = new Character();
    character5.set("height", null);
    await character5.save();

    const answer = await Answer.FourthQuestion();

    expect(answer).toStrictEqual(20.00);
  });

  it('should be able to answer the fifth question', async () => {
    const Character = Parse.Object.extend("Character");
    const Specie = Parse.Object.extend("Specie");

    const specieDontSpeakGungan = new Specie();
    specieDontSpeakGungan.set("language", 'english');
    await specieDontSpeakGungan.save();

    const specieSpeakGungan = new Specie();
    specieSpeakGungan.set("language", 'Gungan basic');
    await specieSpeakGungan.save();

    const character = new Character();
    character.set("species", specieDontSpeakGungan);
    character.set("name", 'C-3PO');
    await character.save();

    const character2 = new Character();
    character2.set("species", specieSpeakGungan);
    character2.set("name", 'Darth Vader');
    await character2.save();

    const character3 = new Character();
    character3.set("species", specieDontSpeakGungan);
    character3.set("name", 'Han Solo');
    await character3.save();

    const answer = await Answer.FifthQuestion();

    expect(answer).toStrictEqual(['Darth Vader']);
  });

  it('should be able to answer the sixth question', async () => {
    const Planet = Parse.Object.extend("Planet");
    const Character = Parse.Object.extend("Character");

    const smallPlanet = new Planet();
    smallPlanet.set("population", 1000000000);
    await smallPlanet.save();

    const bigPlanet = new Planet();
    bigPlanet.set("population", 50000000000);
    await bigPlanet.save();

    const character = new Character();
    character.set("homeworld", bigPlanet);
    await character.save();

    const character2 = new Character();
    character2.set("homeworld", smallPlanet);
    await character2.save();

    const character3 = new Character();
    character3.set("homeworld", bigPlanet);
    await character3.save();

    const answer = await Answer.SixthQuestion();

    expect(answer).toStrictEqual(2);
  });
});