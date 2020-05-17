export default function composeFilmsAndData(cards, rating, links, imdbIDList) {
    const result = cards.map((card, index) => ({
        ...card,
        rating: rating[index],
        link: links[index],
        id: imdbIDList[index],
    }));
    return result;
}
