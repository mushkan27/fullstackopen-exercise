import express from 'express';
import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patientsData';
import { NonSensitivePatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const patients: NonSensitivePatient[] = patientsData.map(({ ssn, ...rest }) => rest);
  res.json(patients);
});

router.post('/', (_req, res) => {
   try {
    const newPatient = toNewPatient(_req.body);
    const patient: Patient = { id: uuid(), ...newPatient };

    patientsData.push(patient);
    res.status(201).json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
