import express from 'express';
import config from './config/config';
import http from 'http';
import cors from 'cors';

import auth from './middleware/auth';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import courseRoutes from './routes/course';
import courseMemberRoutes from './routes/courseMember';
import evaluationRoutes from './routes/evaluation';
import evalReportRoutes from './routes/report';
import clubRoutes from './routes/club';
import clubAdminRoutes from './routes/clubAdmin';
import contestRoutes from './routes/contest';
import problemRoutes from './routes/problem';
import testcaseRoutes from './routes/testcase';
import submissionRoutes from './routes/submission';
import standingsRoutes from './routes/standings';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

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
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }

    next();
});

// middleware
app.use(auth.authenticateToken);

/** Routes */
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', courseMemberRoutes);
app.use('/api', evaluationRoutes);
app.use('/api', evalReportRoutes);
app.use('/api', clubRoutes);
app.use('/api', clubAdminRoutes);
app.use('/api', contestRoutes);
app.use('/api', problemRoutes);
app.use('/api', testcaseRoutes);
app.use('/api', submissionRoutes);
app.use('/api', standingsRoutes);

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
