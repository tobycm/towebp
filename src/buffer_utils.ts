import { randomUUID } from "crypto";
import fs from "fs";
import temp_path from "./temp_path";
import * as webp from "./webpconverter";

function encode_image(filepath: string, type: string) {
  const buf = Buffer.from(fs.readFileSync(filepath));
  if (type == "base64") {
    return buf.toString("base64");
  } else {
    return buf;
  }
}

const base64_to_image = (base64str: string, path: string) => {
  const buf = Buffer.from(base64str, "base64");

  fs.writeFile(path, buf, (error) => {
    if (error) {
      throw error;
    } else {
      console.log("File created from base64 string!");
    }
  });

  return true;
};

// convert base64 image to webpbase64 image
export const base64str2webp = async (base64str: string, image_type: string, options: string, extra_path = "") => {
  const filename = randomUUID();

  const input_file_path = `${temp_path(extra_path)}${filename}.${image_type}`;
  const webp_image_path = `${temp_path(extra_path)}${filename}.webp`;

  if (!base64_to_image(base64str, input_file_path)) {
    console.log("Failed");
    return;
  }

  await webp.cwebp(input_file_path, webp_image_path, options);

  const webp_base64str = encode_image(webp_image_path, "base64");

  fs.unlinkSync(input_file_path);
  fs.unlinkSync(webp_image_path);

  return webp_base64str;
};

// convert image buffer to webp buffer
export const buffer2webp = async (buffer: Buffer, image_type: string, options: string, extra_path = "") => {
  const filename = randomUUID();

  const input_file_path = `${temp_path(extra_path)}${filename}.${image_type}`;
  const webp_image_path = `${temp_path(extra_path)}${filename}.webp`;

  if (!base64_to_image(Buffer.from(buffer).toString("base64"), input_file_path)) throw new Error("Failed to create image from buffer");

  await webp.cwebp(input_file_path, webp_image_path, options);
  const webp_buffer = encode_image(webp_image_path, "buffer");

  fs.unlinkSync(input_file_path);
  fs.unlinkSync(webp_image_path);

  return webp_buffer;
};
