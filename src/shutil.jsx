/**
 * High level file/directory operation methods.
 *
 * @author shibukawa
 *
 * @see https://github.com/shibukawa/shutil.jsx
 *
 * License: The MIT License (MIT)
 */

import "nodejs.jsx/fs.jsx";
import "nodejs.jsx/path.jsx";
import "console.jsx";

class shutil
{
    static function walk(root : string, callback: (string, string[], string[]) -> void) : void
    {
        if (!fs.existsSync(root))
        {
            return;
        }
        var names = fs.readdirSync(root);
        var dirs = [] : string[];
        var nextDirs = [] : string[];
        var files = [] : string[];
        for (var i = 0; i < names.length; i++)
        {
            var name = names[i];
            var childPath = path.join(root, name);
            var stat = fs.statSync(childPath);
            if (stat.isDirectory())
            {
                dirs.push(name);
                nextDirs.push(childPath);
            }
            else if (stat.isFile())
            {
                files.push(name);
            }
        }
        callback(root, dirs, files);
        for (var i = 0; i < nextDirs.length; i++) {
            shutil.walk(nextDirs[i], callback);
        }
    }

    static function mkdirp(directory : string) : boolean {
        return shutil._mkdirp(path.normalize(directory));
    }

    static function _mkdirp(directory : string) : boolean {
        if (fs.existsSync(directory)) {
            var stat = fs.statSync(directory);
            return stat.isDirectory();
        } else {
            var parentpath = path.dirname(directory);
            //var basename = path.basename(directory);
            if (shutil._mkdirp(parentpath)) {
                fs.mkdirSync(directory);
                return true;
            }
            return false;
        }
    }

    static function copyFile(inputPath : string, outputPath : string) : boolean {
        if (inputPath == outputPath)
        {
            return false;
        }
        try
        {
            fs.writeFileSync(outputPath, fs.readFileSync(inputPath));
            return true;
        }
        catch (e : Error)
        {
            console.error("Can't copy: " + e.toString());
            return false;
        }
    }

    static function splitPath(inputpath : string) : string[] {
        var result = [] : string[];
        while (true)
        {
            result.splice(0, 0, path.basename(inputpath));
            var parent = path.dirname(inputpath);
            if (parent == '.')
            {
                break;
            }
            else if (parent == '/')
            {
                result.splice(0, 0, parent);
                break;
            }
            inputpath = parent;
        }
        return result;
    }

    static function rmtree(dirpath : string) : void {
        if (fs.existsSync(dirpath)) {
            var files = fs.readdirSync(dirpath);
            for (var index = 0; index < files.length; index++) {
                var file = files[index];
                var curPath = path.join(dirpath, file);
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    shutil.rmtree(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            }
            fs.rmdirSync(dirpath);
        }
    }
}
