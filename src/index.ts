import express from 'express';
import authRouter from '@/modules/auth/auth.routes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
