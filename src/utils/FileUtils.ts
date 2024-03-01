import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;

const fileDir = FileSystem.cacheDirectory + "data/";
const fileUri = (fileName: string) => fileDir + `${fileName}.txt`;

/**
 * Checks if gif directory exists. If not, creates the directory.
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(fileDir);

  if (!dirInfo.exists) {
    console.log("VitaSense directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true });

    // This call allows android to link SAF URI to Expo FileSystem
    if (Platform.OS == "android")
      StorageAccessFramework.getUriForDirectoryInRoot("VitaSense");
  }
}

/**
 * Returns the text contents at the specified file.
 *
 * If file cannot be found, create new empty file and return empty string.
 * @param fileName
 * @returns
 */
export async function readFile(fileName: string): Promise<string> {
  await ensureDirExists();

  console.log(fileUri(fileName));

  const fileInfo = await FileSystem.getInfoAsync(fileUri(fileName));
  if (!fileInfo.exists) {
    // File does not exist, create new empty file
    await saveFile(fileName, "");
    return "";
  }

  const text = await FileSystem.readAsStringAsync(fileUri(fileName));
  return text;
}

/**
 * Saves string content to specified file name.
 * @param fileName
 * @param content
 */
export async function saveFile(fileName: string, content: string) {
  try {
    await FileSystem.writeAsStringAsync(fileUri(fileName), content);
    console.log("Saved:", fileName);
  } catch (e) {
    console.error("Couldn't save string:", fileName, e);
  }
}
