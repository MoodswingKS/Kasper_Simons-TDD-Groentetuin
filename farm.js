

const getYieldForPlant = (crop) => crop.yield;

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


module.exports = {
    getYieldForCrop,
    getYieldForPlant,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop
};