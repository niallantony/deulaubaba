import { DEMO_MODE } from "@/config/demo";
import remote from "./remote/feed";
import mock from "./mock/feed";

export * from "./remote/feed";

export default DEMO_MODE ? mock : remote;
