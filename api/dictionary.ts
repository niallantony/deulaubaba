import * as MockAPI from './dictionary.mock';
import * as LiveAPI from './dictionary.live';

const useMock = process.env.EXPO_PUBLIC_USE_MOCK === "true";
const API = useMock ? MockAPI : LiveAPI;

export default API;
