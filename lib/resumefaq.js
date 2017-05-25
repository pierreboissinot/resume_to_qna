const FAQ = require('./faq.js');
const QnA = require('./qna.js');
const sorry = 'Désolé, je ne peux répondre à votre question';

/**
 * Class representing a QnA for a resume
 */
class ResumeFAQ extends FAQ {

    /**
     * Constructor
     * @param JSONResume resume 
     */
    constructor(resume) {
        super();
        this.resume = resume;
    }

    /**
     * Build the faq from the resume
     */
    build() {
        // basics section
        this.addQnA(new QnA('Quel est votre adresse email ?', this.resume.basics.email));
        this.addQnA(new QnA('Comment vous appelez-vous ?', this.resume.basics.name));
        this.addQnA(new QnA('Quel est votre métier ?', this.resume.basics.label));
        this.addQnA(new QnA('Quel est votre numéro de téléphone ?', this.resume.basics.phone ? this.resume.basics.phone : sorry));
        this.addQnA(new QnA('Avez-vous un site web ?', this.resume.basics.website ? `[${this.resume.basics.website}](${this.resume.basics.website})` : 'Non'));
        this.addQnA(new QnA('Pouvez-vous vous présenter ?', this.resume.basics.summary ? this.resume.basics.summary : sorry));
        this.addQnA(new QnA('Où habitez-vous ?', this.answerAboutLocation(this.resume.basics.location)));

        // profiles section
        this.addQnA(new QnA('Quels sont vos profils ?', this.answerAboutProfiles(this.resume.basics.profiles)));

        // work section
        this.addQnA(new QnA('Où avez-vous travaillé ?', this.resume.work.length > 0 ? this.anwserAboutWork(this.resume) : sorry));

        // education section
        this.addQnA(new QnA('Quel est votre parcours d\'études ?', this.anwserAboutEducation(this.resume)));

        // skill section
        this.addQnA(new QnA('Quelles sont vos compétences ?', this.answerAboutSkills(this.resume)));

        // languages section
        this.addQnA(new QnA('Quelles langues pratiquez-vous ?', this.answerAboutLanguages(this.resume)));

        // wich section ?
        this.addQnA(new QnA('Auriez-vous une photo ?', this.resume.basics.picture ? this.resume.basics.picture : sorry));
    }

    // helpers functions

    /**
     * Get answer about work section
     * @param JSONResume resume 
     */
    anwserAboutWork(resume) {
        let answer = '';
        resume.work.forEach(function (element) {
            let start = new Date(element.startDate);
            let end = new Date(element.endDate);
            answer += `* ${start.getMonth()} ${start.getFullYear()}${element.endDate ? ('-' + end.getMonth() + ' ' + end.getFullYear()) : ''}: ${element.company} en tant que ${element.position}. ${element.summary}<br/>`;
        }, this);
        return answer;
    }

    /**
     * Get answer about the education section
     * @param JSONResume resume 
     */
    anwserAboutEducation(resume) {
        let answer = '';
        resume.education.forEach(function (element) {
            let start = new Date(element.startDate);
            let end = new Date(element.endDate);
            answer += `* ${start.getMonth()} ${start.getFullYear()}${element.endDate ? ('-' + end.getMonth() + ' ' + end.getFullYear()) : ''} ${element.studyType}, ${element.institution}<br/>`;
        }, this);
        return answer;
    }

    /**
     * Get answer about the skills section
     * @param JSONResume resume 
     */
    answerAboutSkills(resume) {
        let answer = '';
        resume.skills.forEach(function (element) {
            answer += `* ${element.name}<br/>`;
        }, this);
        return answer;
    }

    /**
     * Get answer about the languages section
     * @param JSONResume resume 
     */
    answerAboutLanguages(resume) {
        let answer = '';
        resume.languages.forEach(function (element) {
            answer += `* ${element.language} ${(element.fluency ? `(${element.fluency})` : '')} <br/>`;
        }, this);
        return answer;
    }

    /**
     * Get answer about the location section
     * @param Object location 
     */
    answerAboutLocation(location) {
        let answer = [location.address, location.city, location.postalCode, location.region, location.countryCode].filter(elem => { return elem ? elem : null; }).join('<br/>');
        return answer ? answer : sorry;
    }

    /**
     * Get answer about the profiles section
     * @param Object profiles 
     */
    answerAboutProfiles(profiles) {
        let answer = profiles.map(x => { return `* ${x.network}: [${x.username}](${x.url})`; }).join('<br/>');
        return answer ? answer : sorry;
    }
}

module.exports = ResumeFAQ;