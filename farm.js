

const getYieldForPlant = (crop) => crop.yield;

const getYieldForCrop = (input) => input.numCrops * input.crop.yield;

const getTotalYield = ({ crops }) => {
    const arrayYield = crops.map(c => getYieldForCrop(c));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    const totalYield = arrayYield.reduce(reducer);

    return totalYield;

}

module.exports = {
    getYieldForCrop,
    getYieldForPlant,
    getTotalYield
};