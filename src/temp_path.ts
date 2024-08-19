import os from "os";
import path from "path";

export default (extra_path = "") => path.join(os.tmpdir(), "webp_converter", extra_path);
