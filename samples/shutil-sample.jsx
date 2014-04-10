import "console.jsx";
import "shutil.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        console.log(shutil.splitPath("/hello/world"));
    }
}
