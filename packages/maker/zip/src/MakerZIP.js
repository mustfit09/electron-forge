import MakerBase from '@electron-forge/maker-base';

import path from 'path';
import pify from 'pify';
import { zip } from 'cross-zip';

export default class MakerZIP extends MakerBase {
  name = 'zip';

  isSupportedOnCurrentPlatform() {
    return true;
  }

  async make({
    dir,
    makeDir,
    appName,
    packageJSON,
    targetPlatform,
  }) {
    const zipDir = ['darwin', 'mas'].includes(targetPlatform) ? path.resolve(dir, `${appName}.app`) : dir;

    const zipPath = path.resolve(makeDir, `${path.basename(dir)}-${packageJSON.version}.zip`);

    await this.ensureFile(zipPath);
    await pify(zip)(zipDir, zipPath);

    return [zipPath];
  }
}
