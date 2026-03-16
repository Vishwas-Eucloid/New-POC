const { asyncHandler } = require("../utills/errorHandler");
const offersService = require("../services/offersService");

/**
 * GET /api/offers
 * Fetches products that have active offers applied, returning an array of:
 * [{ "productId": "uuid", "discountedPrice": 8500 }]
 */
const getActiveOffersProducts = asyncHandler(async (request, response) => {
  const data = await offersService.getActiveOffers();
  return response.status(200).json(data);
});

module.exports = {
  getActiveOffersProducts,
};
