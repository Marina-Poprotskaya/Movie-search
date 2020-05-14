function composeFilmsAndData(cards, rating, links) {
      const result = cards.map((card, index) => { 
        return {
          ...card,
          rating: rating[index],
          link: links[index]
        }
      })
      return result;
    }

    export { composeFilmsAndData }