import express from 'express';
import config from './config/config';
import http from 'http';
import userRoutes from './routes/user';
import courseRoutes from './routes/course';
import courseMemberRoutes from './routes/courseMember';
import evaluationRoutes from './routes/evaluation';
import evalReportRoutes from './routes/evalReport';
import problemRoutes from './routes/problem';
import bodyParser from 'body-parser';

const app = express();

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(() => {
  console.log(`server is listening on ${config.server.port}`);
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', courseMemberRoutes);
app.use('/api', evaluationRoutes);
app.use('/api', evalReportRoutes);
app.use('/api', problemRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  console.log(
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
