import { DEMO_MODE } from "@/config/demo";
import remote from "./remote/user";
import mock from "./mock/user";

export * from "./remote/user";

export default DEMO_MODE ? mock : remote;
