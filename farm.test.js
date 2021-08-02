const { getYieldForCrop, getYieldForPlant, getTotalYield, getCostsForCrop, getRevenueForCrop } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    
    test("Get cost for crop, simple", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(10);
    });

    
    test("calculate crop cost, with 0 amount", () => {
        const input = {
            crop: pumpkin,
            numCrops: 0,
        };
        expect(getCostsForCrop(input)).toBe(0);
    });
});

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    test("Get revenue for crop, simple", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(80);
    });

    test("calculate revenue, with 0 amount", () => {
        const input = {
            crop: corn,
            numCrops: 0,
        };
        expect(getRevenueForCrop(input)).toBe(0);
    });
});



