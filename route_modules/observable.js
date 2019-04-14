const { Observable, of, empty } = require('rxjs');
const { expand } = require('rxjs/operators');

const randomizer = require('../randomizer/randomizer');

let emitShuffledList = function(list, rollNumber){
    // TODO, save each roll to the database
    return Observable.create((observer) => {

        let shuffledList = randomizer.shuffle(list);
        console.log("ShuffledList:", shuffledList, "currentRoll:", rollNumber);
        observer.next({
            list: shuffledList,
            roll: rollNumber + 1
        });
    });
};

module.exports = {
    
    emitObservableList: (raffleList, rollNumber) => {
        console.log("RaffleList:", raffleList, "rollNumber:", rollNumber);
        return of({list: raffleList, roll: 0})
                .pipe(
                    expand(({list, roll}) => roll < rollNumber ? emitShuffledList(list, roll) : empty())
                );
    }
};