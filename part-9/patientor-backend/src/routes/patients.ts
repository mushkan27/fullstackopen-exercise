import express from 'express';
import patientsData from '../../data/patientsData';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const patients: NonSensitivePatient[] = patientsData.map(({ ssn, ...rest }) => rest);
  res.json(patients);
});

export default router;
