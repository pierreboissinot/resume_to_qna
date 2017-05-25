const fs = require('fs');

/**
 * Class representing a file where a QnA is stored
 */
class QnAFile {

    /**
     * Constructor
     * @param FAQ faq 
     * @param string filename 
     */
    constructor(faq, filename) {
        this.faq = faq;
        this.filename = filename ? filename : 'qna.tsv';
    }

    /**
     * Store the serialized object
     */
    save() {
        fs.writeFile(__dirname + '/../downloads/' + this.filename, this.faq.getData(), (err) => {
                if (err) throw err;
        });
    }
}

module.exports = QnAFile;