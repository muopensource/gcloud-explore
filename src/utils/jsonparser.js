const fs = require('fs');
module.exports = {
  /**
   * @param {String} directory
   */
  mkdirSync(directory) {
    const paths = directory.replace(/\/$/, '').split('/');

    paths.forEach((_, index, dir) => {
      index += 1;
      const path = dir.slice(0, index).join('/');

      !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    });
  },

  //   /**
  //    * Create base directory
  //    * @param dir String, Directory to save the JSON file
  //    * @param recursive Boolean, defaults to false
  //    * @param callback
  //    */

  //   makeDir(dir, recursive = false, callback) {
  //     fs.mkdirSync(dir, { recursive }, (err) => {
  //       if (err) return;
  //       console.log(` Success: created ${dir}`);
  //     });
  //     callback();
  //   },

  //   /**
  //    * Create JSON file
  //    * @param dir String, Directory to save the JSON file
  //    * @param data Object, data to be parsed
  //    * @param file String, name of the file
  //    * @param callback
  //    */

  //   makeJson(dir, data = {}, file, callback) {
  //     if (!fs.existsSync(dir)) {
  //       makeDir(dir, true, () => {
  //         console.log(`${dir} newly created`);
  //       });
  //     }
  //     fs.writeFile(path.join(dir, file), JSON.stringify(data, null, 4), (err) => {
  //       if (err) return err;
  //     });
  //     callback();
  //   },
};
