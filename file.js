
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//文件模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//在JS中加载文件

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class File {
        constructor(src, type) {
                src = Funcs.stringFrom(src);
                type = Funcs.stringFrom(type);
                this.value = null;
                this.promise = new Promise((resolve) => {
                        if (type == "txt") {
                                const xhr = new XMLHttpRequest();
                                xhr.open("get", src, true);
                                xhr.send();
                                xhr.onreadystatechange = () => {
                                        if (xhr.readyState == 4 && xhr.status == 200) {
                                                this.value = xhr.responseText;
                                                resolve();
                                        }
                                };
                        } else if (type == "img") {
                                const elem = document.createElement("img");
                                elem.src = src;
                                elem.onload = () => {
                                        this.value = elem;
                                        resolve();
                                };
                        }
                });
        }
        static onload(files, func) {
                const promises = [];
                Funcs.objForEach(files, (attr) => {
                        if (Funcs.isClassObj(attr, File)) {
                                promises.push(attr.promise);
                        }
                });
                Promise.all(promises).then(func);
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { File };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
