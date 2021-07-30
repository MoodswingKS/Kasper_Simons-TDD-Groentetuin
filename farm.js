const getYieldForPlant = (crop) => crop.yield;

const getYieldForCrop = (input) => input.numCrops * input.crop.yield;

const getTotalYield = ({ crops }) => {




(crops[0].numCrops * crops[0].crop.yield)   
+
(crops[1].numCrops * crops[1].crop.yield)




}


module.exports = {
    getYieldForCrop,
    getYieldForPlant,
    getTotalYield
};