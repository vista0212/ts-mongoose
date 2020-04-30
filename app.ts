import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import { IUser, User } from 'models/user.model';

dotenv.config();

const app: express.Application = express();
const connect = mongoose.connect;
const DB_URL = process.env.DB_URL;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post('/create', async (req: express.Request, res: express.Response) => {
  const { name, gender }: IUser = req.body;

  await User.create({ name, gender }).catch((err) => {
    console.log(err);
    throw new Error('Database Error');
  });

  res.json({
    success: true,
  });
});

app.get('/', async (req: express.Request, res: express.Response) => {
  const user: IUser[] = await User.find().catch((err) => {
    console.log(err);
    throw new Error('Database Error');
  });

  res.json({
    success: true,
    data: user,
  });
});

app.patch('/update', async (req: express.Request, res: express.Response) => {
  const { _id, name, gender }: IUser = req.body;

  const user: IUser = await User.findOne({ _id }).catch((err) => {
    console.log(err);
    throw new Error('Database Error');
  });

  if (!user) {
    throw new Error('Not Found User');
  }

  await user.update({ name, gender }).catch((err) => {
    console.log(err);
    throw new Error('Database Error');
  });

  res.json({
    success: true,
    data: user,
  });
});

app.use((req, res, next) => {
  // err.status = 404;
  res.json({
    success: false,
    message: 'Not Found Page',
  });
});

connect(DB_URL)
  .then(() => console.log('DB connected!'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export default app;
