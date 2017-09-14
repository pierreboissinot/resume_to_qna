# Resume To QnA
Resume to QnA allows you to convert a JSON Resume into a qna.tsv file that you can use as a knowledge database for Microsoft QnA Maker (cognitive service).

QnA is only written in french at the moment.

## Live demo
Unavailable

### Notes

Start in DEV env:
```
npm run start:dev
```

Start in PROD env:
```
npm run start:prod
```

## Docker
### Build
```
docker build -t pboissinot/resume_to_qna .
```

### Run
```
docker run --name my-resume_to_qna -p 3001:3000 -d pboissinot/resume_to_qna
```

Go to http://localhost:3001

### Push to docker hub
* login first
* docker push pboissinot/resume_to_qna
