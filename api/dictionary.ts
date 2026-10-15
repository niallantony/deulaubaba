import { DEMO_MODE } from "@/config/demo";
import remote from "./remote/dictionary";
import mock from "./mock/dictionary";

export * from "./remote/dictionary";

export default DEMO_MODE ? mock : remote;
