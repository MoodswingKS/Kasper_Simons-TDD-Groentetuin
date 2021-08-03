const { getYieldForCrop, getYieldForPlant, getTotalYield, getCostsForCrop, 
    getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");


describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForPlant with environment", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
    };

    const apples = {
        name: "apple",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    const tomato = {
        name: "tomato",
        yield: 10,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    test("Get yield for corn with 'low' sun", () => {
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    })

    test("Get yield for apples with 'high' wind", () => {
        const environmentFactors = {
            wind: "high",
        };
        expect(getYieldForPlant(apples, environmentFactors)).toBe(30);
    })

    
    test("Get yield for tomato with 'high' sun and 'low' wind", () => {
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        // (10 * 0.5 =) 5 + (10 * -0.2 =) 8 = 13
        expect(getYieldForPlant(tomato, environmentFactors)).toBe(13);
    })
});

describe("getYieldForCrop", () => {
    test("Get yield for crop with no environment factors", () => {
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

describe("getYieldForCrop with environment factors", () => {
    const apples = {
        name: "apple",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    const tomato = {
        name: "tomato",
        yield: 20,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    test("Get yield for crop, with 'high' wind", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };

        const environmentFactors = {
            wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(300);
    });


    test("Get yield for tomato with 'low' sun", () => {
        const input = {
            crop: tomato,
            numCrops: 5,
        };
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(50);
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


describe("getTotalYield with environment factors", () => {
    const apples = {
        name: "apple",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    const tomato = {
        name: "tomato",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  

    test("Get total yield crops, with 'high' wind", () => {
        const crops = [
            { crop: apples, numCrops: 5 },
            { crop: tomato, numCrops: 2 },
        ];

        const environmentFactors = {
            wind: "high",
        };
        expect(getTotalYield({crops}, environmentFactors)).toBe(210);
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

describe("getRevenueForCrop with environment factors", () => {
    const apples = {
        name: "apple",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
        },
    };  
    
    const tomato = {
        name: "tomato",
        yield: 20,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
    };  

    test("Get revenue for crop, with 'high' wind", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };

        const environmentFactors = {
            wind: "high",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(600);
    });

    test("Get revenue for crop, with 'high' wind and 'low' sun", () => {
        const input = {
            crop: tomato,
            numCrops: 10,
        };

        const environmentFactors = {
            wind: "high",
            sun: "low"
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(400);
    });
});


describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    test("Get profit for crop, simple", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(70);
    });

    test("calculate profit, with 0 amount", () => {
        const input = {
            crop: corn,
            numCrops: 0,
        };
        expect(getProfitForCrop(input)).toBe(0);
    });
});


describe("getProfitForCrop with environment factors", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factors: {
            wind: {
                low: -20,
                medium: 0,
                high: 50,
            },
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
    };

    test("Get profit for crop, with 'high' sun", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "sun"
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(80);
    });

    test("calculate profit for crop, with 'high' wind and 'high' sun", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };

        const environmentFactors = {
            wind: "high",
            sun: "high"
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(150);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
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
        expect(getTotalProfit({ crops })).toBe(39);
    });

    test("Calculate total profit with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalProfit({ crops })).toBe(0);
    });
});

describe("getTotalProfit with environment factors", () => {
    test("Calculate total profit multiple crops, with 'low' wind and 'high' sun", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                wind: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                wind: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };
        
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];

        const environmentFactors = {
            wind: "low",
            sun: "high"
        }
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(52.8);

    });
});
