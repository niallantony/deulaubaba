import { DEMO_MODE } from "@/config/demo";
import remote from "./remote/project";
import mock from "./mock/project";

export * from "./remote/project";

export default DEMO_MODE ? mock : remote;
