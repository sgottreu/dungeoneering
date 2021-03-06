export var Die = 
{
    types: [
        { label : 'd4', num: 4},
        { label : 'd6', num: 6,  adjacent: [ [ 2,3,4,5 ], [ 1,3,4,6 ], [ 1,2,5,6 ], [ 1,2,5,6 ], [ 1,3,4,6 ], [ 2,3,4,6 ] ] },
        { label : 'd8', num: 8},
        { label : 'd10', num: 10},
        { label : 'd12', num: 12},
        { label : 'd20', num: 20, adjacent: [ [6,10,13], [3,7,8], [2,9,11], [5,8,10], [4,7,15], [1,8,9], [3,6,19], [2,5,20], [2,4,6], [3,6,19], [1,4,17], [3,16,20], [13,17,18], [1,12,19], [15,18,20], [5,14,17], [11,18,19], [10,12,15], [12,14,16], [9,13,16], [7,11,14] ] }
    ],

    dieRoll: (uBound, rnd) => {
        let die = Die.types.find(d => { return d.num === uBound });

        let roll = (die.adjacent === undefined) ? Die.oldDieRoll(uBound, rnd) : Die.newDieRoll(uBound, rnd);

        return parseInt(roll, 10);
    },

    oldDieRoll: (uBound, rnd) => {
        let random = (rnd !== undefined) ? rnd : Die.getRandomRoll();
        let roll = Math.floor( random * uBound) + 1;

        return parseInt(roll, 10);
    },

    newDieRoll: (uBound, rnd) => {
        let random = (rnd !== undefined) ? rnd : Die.getRandomRoll();

        let roll = Math.floor( random * uBound) + 1;

        let die = Die.types.find(d => { return d.num === uBound });

        for(var x=0;x<(uBound*2);x++){
            let side = Math.floor( Math.random() * uBound) + 1;

            while( !die.adjacent[roll-1].includes(side) ){
                side = Math.floor( Math.random() * uBound) + 1;
            }
            roll = side;
        }

        return parseInt(roll, 10);
    },


    getRandomRoll: () => {
        return Math.random();
    },

    findMedian: (data) => {

        // extract the .values field and sort the resulting array
        data.sort(function(a, b) {
            return a - b;
        });

        var middle = Math.floor((data.length - 1) / 2); // NB: operator precedence
        if (data.length % 2) {
            return data[middle];
        } else {
            return Math.floor( (data[middle] + data[middle + 1]) / 2.0 );
        }
    }
};