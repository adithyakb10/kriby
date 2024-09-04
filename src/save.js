import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

function makeSaveSync(savefilename) {
  return {
    data: {},
    async save() {
      await writeTextFile(savefilename, JSON.stringify(this.data), {
        dir: BaseDirectory.AppLocalData,
      });
    },
    async load() {
      try {
        this.data = JSON.parse(
          await readTextFile(savefilename, { dir: BaseDirectory.AppLocalData })
        );
      } catch {
        this.data = {};
      }
    },
  };
}

export const saveSystem = makeSaveSync("save.json");
