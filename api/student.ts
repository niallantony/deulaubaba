import * as MockAPI from './student.mock';
import * as LiveAPI from './student.live';

const useMock = process.env.USE_MOCK === "true";
const API = useMock ? MockAPI : LiveAPI;

export default API;
