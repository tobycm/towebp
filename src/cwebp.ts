export default () => {
  if (process.platform === "win32") return "cwebp.exe";
  return "cwebp";
};
