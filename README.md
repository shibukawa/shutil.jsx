shutil.jsx
===========================================

Synopsis
---------------

High level file/directory operation methods.
It is inspired by Python's [shutil](https://docs.python.org/3.4/library/shutil.html) module.

Installation
---------------

```sh
$ npm install shutil.jsx --save-dev
```

API Reference
------------------

### `shutil.walk(path, callback: (string, string[], string[]) -> void) : void`

Traverse directory and returns contents.

```js
import "shutil.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        shutil.walk("/Users/home/myname", (root, dirs, files) -> {
            console.log(root);
            console.log("  dirs in this folder: " + dirs.join(", "));
            console.log("  files in this folder: " + irs.join(", "));
        });
    }
}
```

### `shutil.mkdirp(directory : string) : boolean`

Create a new directory and any necessary subdirectories.

```js
import "shutil.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        shutil.mkdirp("/you/can/create/deep/directories/at/the/same/time");
    }
}
```

### `shutil.copyFile(inputPath : string, outputPath : string) : boolean`

Copy existing file.

```js
import "shutil.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        // back up important file!
        shutil.copy("/Users/myname/.vimrc", "/Users/myname/Dropbox/.vimrc");
    }
}
```

### `shutil.splitPath(path : string) : string[]`

Split path entries and return string array.

```js
import "shutil.jsx";
import "console.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        // back up important file!
        console.log(shutil.splitPath("/Users/myname/.vimrc"));
        // -> '/', Users, myname, .vimrc
    }
}
```

### `shutil.rmtree(path : string) : void`

Remove directory including children folders and files.

```js
import "shutil.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        // clear cache
        shutil.rmtree("/Users/myname/.npm/");
    }
}
```

Development
-------------

## Repository

* Repository: git://github.com/shibukawa/shutil.jsx.git
* Issues: https://github.com/shibukawa/shutil.jsx/issues

## Run Test

```sh
$ grunt test
```

## Build Sample

```sh
$ grunt build
```

## Generate API reference

```sh
$ grunt doc
```

Author
---------

* shibukawa / yoshiki@shibu.jp

License
------------

The MIT License (MIT)

Complete license is written in `LICENSE.md`.
