import { DEMO_MODE } from "@/config/demo";
import remote from "./remote/student";
import mock from "./mock/student";

export * from "./remote/student";

export default DEMO_MODE ? mock : remote;
