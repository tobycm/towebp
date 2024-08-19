export default () => {
  if (process.platform === "win32") return "gif2webp.exe";
  return "gif2webp";
};
