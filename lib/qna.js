/**
 * Class representing a Question/Anwser pair
 */
class QnA {

    /**
     * Constructor
     * @param string q 
     * @param string a 
     */
    constructor(q, a) {
        this.question = q;
        this.answer = a;
    }

    /**
     * Tab formated
     */
    toString() {
        return this.question + '\t' + this.answer; // + '\t' + this.source
    };
}

module.exports = QnA;