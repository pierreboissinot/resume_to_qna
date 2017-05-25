var express = require('express');
var multer = require('multer')
var upload = multer({
  dest: 'uploads/',
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/json' || file.mimetype === 'application/octet-stream') {
      cb(null, true);
    } else {
      cb(new Error('Only JSON format file is supported.'));
    }
  }
})
var router = express.Router();
const fs = require('fs');
const QnAFile = require('./../lib/qnafile.js');
const ResumeFAQ = require('./../lib/resumefaq.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.info(req.app.get('env'));
  res.render('index', { title: 'Resume to QnA' });
});

/* POST JSON resume. */
router.post('/', upload.single('resumejson'), function (req, res, next) {
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      console.log(err.stack);
      throw err;
    };
    let resume = JSON.parse(data);
    let faq = new ResumeFAQ(resume);
    faq.build();
    let qnaFile = new QnAFile(faq, `${req.file.filename}.tsv`);
    qnaFile.save();
    //res.send(faq.getData());
    res.render('result', { title: 'Your QnA', resumeId: req.file.filename, records: faq.getRecords() });
  });
});

/* GET qna.tsv. */
router.get('/qna/:resumeId', function (req, res, next) {
  let filename = `${req.params.resumeId}.tsv`;
  res.sendFile(filename, { root: __dirname + '/../downloads' });
});

module.exports = router;