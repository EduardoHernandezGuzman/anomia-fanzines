import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const SOURCE_DIR = "assets/portadas";
const OUTPUT_DIR = "public/img/portadas";
const OUTPUT_WIDTH = 400;
const WEBP_QUALITY = 82;
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const isCheckMode = process.argv.includes("--check");

const formatKb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const isOutdated = async (sourcePath, outputPath) => {
  try {
    const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return sourceStats.mtimeMs > outputStats.mtimeMs;
  } catch {
    return true;
  }
};

const listImages = async (directory) => {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries.filter(
      (entry) => entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    );
  } catch {
    return [];
  }
};

const run = async () => {
  const sources = await listImages(SOURCE_DIR);

  if (sources.length === 0) {
    console.log(`No hay imagenes en ${SOURCE_DIR}/. Nada que optimizar.`);
    return;
  }

  if (!isCheckMode) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  let converted = 0;
  let skipped = 0;
  let sourceBytes = 0;
  let outputBytes = 0;
  const missing = [];
  const expectedOutputs = new Set();

  for (const source of sources) {
    const sourcePath = path.join(SOURCE_DIR, source.name);
    const outputName = `${path.parse(source.name).name}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputName);
    expectedOutputs.add(outputName);

    if (!(await isOutdated(sourcePath, outputPath))) {
      skipped += 1;
      sourceBytes += (await stat(sourcePath)).size;
      outputBytes += (await stat(outputPath)).size;
      continue;
    }

    missing.push(outputName);

    if (isCheckMode) {
      continue;
    }

    await sharp(sourcePath)
      .resize({ width: OUTPUT_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    converted += 1;
    sourceBytes += (await stat(sourcePath)).size;
    outputBytes += (await stat(outputPath)).size;
    console.log(`  ${source.name} -> ${outputName}`);
  }

  if (isCheckMode) {
    if (missing.length > 0) {
      console.error(
        `Faltan o estan desactualizados ${missing.length} WebP: ${missing.join(", ")}\nEjecuta "npm run optimize:images".`,
      );
      process.exitCode = 1;
      return;
    }

    console.log(`OK: ${sources.length} WebP generados y al dia.`);
    return;
  }

  const outputs = await readdir(OUTPUT_DIR);
  const orphans = outputs.filter(
    (file) => path.extname(file).toLowerCase() === ".webp" && !expectedOutputs.has(file),
  );

  for (const orphan of orphans) {
    await unlink(path.join(OUTPUT_DIR, orphan));
    console.log(`  Eliminado huerfano: ${orphan}`);
  }

  const savings = sourceBytes > 0 ? ((1 - outputBytes / sourceBytes) * 100).toFixed(1) : "0";

  console.log(
    `\nOptimizacion completada: ${converted} convertidas, ${skipped} al dia, ${orphans.length} huerfanas eliminadas.`,
  );
  console.log(`Origen: ${formatKb(sourceBytes)} | WebP: ${formatKb(outputBytes)} (-${savings}%)`);
};

run().catch((error) => {
  console.error("Error optimizando imagenes:", error);
  process.exitCode = 1;
});
