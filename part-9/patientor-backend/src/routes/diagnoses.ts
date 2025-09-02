import express from 'express';
import diagnosesData from "../../data/diagnosesData";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(diagnosesData);
});

export default router;