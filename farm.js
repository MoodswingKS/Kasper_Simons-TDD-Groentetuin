

const getYieldForPlant = (crop, environmentFactors) => {
    if (!environmentFactors || (environmentFactors.sun === "medium" || environmentFactors.wind === "medium")) {
        return crop.yield;
    }

    if (environmentFactors.sun && environmentFactors.wind) {
        if (environmentFactors.sun) {
            if (environmentFactors.sun === "low") {
                modifierSun = crop.factors.sun.low
            } else if (environmentFactors.sun === "high") {
                modifierSun = crop.factors.sun.high
            }
        }
    
        if (environmentFactors.wind) {
            if (environmentFactors.wind === "low") {
                modifierWind = crop.factors.wind.low
            } else if (environmentFactors.wind === "high") {
                modifierWind = crop.factors.wind.high
            }
        }

        return ((crop.yield * modifierSun) / 100) + ((crop.yield * modifierWind) / 100) + crop.yield;
    }

    if (environmentFactors.sun) {
        if (environmentFactors.sun === "low") {
            modifier = crop.factors.sun.low
        } else if (environmentFactors.sun === "high") {
            modifier = crop.factors.sun.high
        }
        return ((crop.yield * modifier) / 100) + crop.yield;
    }

    if (environmentFactors.wind) {
        if (environmentFactors.wind === "low") {
            modifier = crop.factors.wind.low
        } else if (environmentFactors.wind === "high") {
            modifier = crop.factors.wind.high
        }
        return ((crop.yield * modifier) / 100) + crop.yield;
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