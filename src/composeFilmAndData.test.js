import composeFilmsAndData from './composeFilmAndData';
/* eslint-env node, jest */

const cards = [
    {
        Title: 'Iron Man', Year: '2008', imdbID: 'tt0371746', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
    },
    {
        Title: 'Iron Man 3', Year: '2013', imdbID: 'tt1300854', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg',
    },
];
const rating = ['7.9', '7.2'];
const links = ['https://www.imdb.com/title/tt0371746/?ref_=fn_al_tt_1', 'https://www.imdb.com/title/tt1300854/?ref_=fn_al_tt_1'];

const result = [
    {
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
        Title: 'Iron Man',
        Type: 'movie',
        Year: '2008',
        imdbID: 'tt0371746',
        link: 'https://www.imdb.com/title/tt0371746/?ref_=fn_al_tt_1',
        rating: '7.9',
    },
    {
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg',
        Title: 'Iron Man 3',
        Type: 'movie',
        Year: '2013',
        imdbID: 'tt1300854',
        link: 'https://www.imdb.com/title/tt1300854/?ref_=fn_al_tt_1',
        rating: '7.2',
    },
];

describe('composeFilmsAndData', () => {
    test('should be defined', () => {
        expect(composeFilmsAndData(cards, rating, links)).toBeDefined();
    });

    test('should return array', () => {
        expect(composeFilmsAndData(cards, rating, links)).toBeInstanceOf(Array);
    });

    test('should add data in array cards', () => {
        expect(composeFilmsAndData(cards, rating, links)).toEqual(result);
    });
});
