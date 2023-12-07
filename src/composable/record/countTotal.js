/**
 * Calculates the total price of an order.
 *
 * @param {Object} order - The order object.
 * @param {Object} order.main - The main dish object.
 * @param {number} order.main.price - The price of the main dish.
 * @param {Object} order.side - The side dish object.
 * @param {number} order.side.price - The price of the side dish.
 * @param {Object} order.drink - The drink object.
 * @param {number} order.drink.price - The price of the drink.
 * @returns {number} The total price of the order.
 */

const countTotal = (order) => {
  const mainPrice = Number(order.main.price)
  const sidePrice = Number(order.side.price)
  const drinkPrice = Number(order.drink.price)

  return mainPrice + sidePrice + drinkPrice
}

export default countTotal
