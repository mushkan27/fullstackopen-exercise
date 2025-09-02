// utils.ts
import { NewPatient } from './types';

// helper type checks
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): boolean => {
  return ['male', 'female', 'other'].includes(param.toLowerCase());
};

// parsers
const parseName = (name: unknown): string => {
  if (!isString(name) || name.trim() === '') {
    throw new Error('Invalid or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing dateOfBirth');
  }
  return date;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Invalid or missing ssn');
  }
  return ssn;
};

// main builder
export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid input');
  }

  const obj = object as { [key: string]: unknown };

  return {
    name: parseName(obj.name),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    ssn: parseSsn(obj.ssn),
  };
};
