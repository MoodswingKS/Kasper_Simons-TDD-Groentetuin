

const getYieldForPlant = (crop, environmentFactors) => {
    if (!environmentFactors || !crop.factors) {
        return crop.yield;
    }

    if (environmentFactors.sun === "low") {
        return crop.yield * 0.5;
    } else if (environmentFactors.sun === "high") {
        return crop.yield * 1.5;
    }

};

const getYieldForCrop = (input) => input.numCrops * input.crop.yield;

const getTotalYield = ({ crops }) => {
    const arrayYield = crops.map(c => getYieldForCrop(c));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const totalYield = arrayYield.reduce(reducer);

    return totalYield;

}

const getCostsForCrop = (input) => input.numCrops;

const getRevenueForCrop = (input) => getYieldForCrop(input) * 2;

const getProfitForCrop = (input) => getRevenueForCrop(input) - getCostsForCrop(input);

const getTotalProfit = ({ crops }) => {
    const arrayProfit = crops.map(c => getProfitForCrop(c));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const totalProfit = arrayProfit.reduce(reducer);

    return totalProfit;
}

module.exports = {
    getYieldForCrop,
    getYieldForPlant,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};