import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = import.meta.url;
const __dirname = path.dirname(new URL(__filename).pathname).substring(1);
const inputDir = path.resolve(__dirname, '../public/images');
const args = process.argv.slice(2);
const specifiedFile = args[0];

const sizes = [
  { width: 412, suffix: '-412w' },
  { width: 853, suffix: '-853w' },
];

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let filesToProcess = files;
  if (specifiedFile) {
    if (!files.includes(specifiedFile)) {
      console.error(`Specified file not found: ${specifiedFile}`);
      return;
    }
    filesToProcess = [specifiedFile];
  }

  filesToProcess.forEach(file => {
    if (file.endsWith('.webp')) {
      const inputFilePath = path.join(inputDir, file);
      const fileName = path.parse(file).name;
      const fileExt = path.parse(file).ext;

      sizes.forEach(size => {
        const outputFileName = `${fileName}${size.suffix}${fileExt}`;
        const outputFilePath = path.join(inputDir, outputFileName);

        const command = `ffmpeg -i "${inputFilePath}" -vf scale=${size.width}:-1 "${outputFilePath}"`;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error generating ${outputFileName}:`, error);
            return;
          }
          console.log(`Generated ${outputFileName}`);
        });
      });
    }
  });
});