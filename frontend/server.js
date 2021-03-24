const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
.then(()=>{
    const server = express();
    server.get('/result/:mbti', (req,res) => {
      const page = '/result';
      const mbti = req.params.mbti;
      const IE = mbti[0];
      const SN = mbti[1];
      const TF = mbti[2];
      const JP = mbti[3];
      // IE
      let IEscore,SNscore,TFscore,JPscore;
      if(IE == 'I') {
        IEscore = 1;    
      } else {
        IEscore = -1;
      }
      // SN
      if(SN == 'S') {
        SNscore = 1;
      } else {
        SNscore = -1;
      }
      // TF
      if(TF == 'T') {
        TFscore = 1;
      } else {
        TFscore = -1;
      }
      // JP
      if(JP == 'J') {
        JPscore = 1;
      } else {
        JPscore = -1;
      }
      const query = {IE: IEscore, SN: SNscore, TF:TFscore, JP:JPscore};
      
      console.log('query:', query);
      return app.render(req,res,page,query);
    })
    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(3000, (err) => {
        if(err) throw err;
        console.log("> Ready on Server Port: 3000")
    })
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})