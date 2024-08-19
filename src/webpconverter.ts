import { execFile as exec } from "child_process"; //get child_process module
import * as buffer_utils from "./buffer_utils"; //get buffer utilities
import enwebp from "./cwebp"; //get cwebp module(converts other image format to webp)
import gifwebp from "./gwebp"; //get gif2webp module(convert git image to webp)

//convert base64 to webp base64
export const str2webpstr = async (base64str: string, image_type: string, options: string, extra_path: string) => {
  // base64str of image
  // base64str image type jpg,png ...
  //option: options and quality,it should be given between 0 to 100

  return await buffer_utils.base64str2webp(base64str, image_type, options, extra_path);
};

//convert buffer to webp buffer
export const buffer2webpbuffer = async (buffer: Buffer, image_type: string, options: string, extra_path: any) => {
  // buffer of image
  // buffer image type jpg,png ...
  //option: options and quality,it should be given between 0 to 100

  return await buffer_utils.buffer2webp(buffer, image_type, options, extra_path);
};

//now convert image to .webp format
export const cwebp = (input_image: string, output_image: string, options: string, logging = "-quiet") => {
  // input_image: input image(.jpeg, .pnp ....)
  //output_image: output image .webp
  //option: options and quality,it should be given between 0 to 100

  const query = `${options} "${input_image}" -o "${output_image}" "${logging}"`; //command to convert image

  //enwebp() return which platform webp library should be used for conversion
  return new Promise((resolve, reject) => {
    exec(`"${enwebp()}"`, query.split(/\s+/), { shell: true }, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout ? stdout : stderr);
    });
  });
};

/******************************************************* gif2webp *****************************************************/

//now convert .gif image to .webp format
export const gwebp = (input_image: string, output_image: string, options: string, logging = "-quiet") => {
  // input_image: input image(.jpeg, .pnp ....)
  //output_image: /output image .webp
  //option: options and quality,it should be given between 0 to 100

  const query = `${options} "${input_image}" -o "${output_image}" "${logging}"`; //command to convert image

  //gifwebp() return which platform webp library should be used for conversion
  return new Promise((resolve, reject) => {
    //execute command
    exec(`"${gifwebp()}"`, query.split(/\s+/), { shell: true }, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout ? stdout : stderr);
    });
  });
};
