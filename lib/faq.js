const QnA = require('./qna.js');

/**
 * Class respresenting a qna collection
 */
class FAQ {

    /**
     * Default Constructor
     */
    constructor() {
        this.records = []; // QnA collection
        this.records.push(new QnA('Bonjour', 'Bonjour'));
        this.records.push(new QnA('Bonsoir', 'Bonsoir'));
    }

    /**
     * Add a QnA object to records
     * @param QnA qna 
     */
    addQnA(qna) {
        this.records.push(qna);
    }

    /**
     * Utility class to dump records
     */
    getData() {
        return this.records.join('\n');
    }

    /**
     * return this.records
     */
    getRecords() {
        return this.records;
    }
}

module.exports = FAQ;