import { exec } from "child_process"; //get child_process module

//now convert image to .webp format
export const cwebp = (input_image: string, output_image: string, options: string, logging = "-quiet") => {
  // input_image: input image(.jpeg, .pnp ....)
  //output_image: output image .webp
  //option: options and quality,it should be given between 0 to 100

  const query = `${options} "${input_image}" -o "${output_image}" "${logging}"`; //command to convert image

  //enwebp() return which platform webp library should be used for conversion
  return new Promise((resolve, reject) => {
    exec(`"cwebp${process.platform === "win32" ? ".exe" : ""}" ${query}`, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout ?? stderr);
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
    exec(`"gif2webp${process.platform === "win32" ? ".exe" : ""}" ${query}`, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout ?? stderr);
    });
  });
};
