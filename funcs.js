
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//常用函数模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//无

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

//无

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块


class Funcs {
        static isUndefined(srcVar) {
                return ("undefined" == typeof srcVar);
        }
        static isNum(srcVar) {
                return ("number" == typeof srcVar);
        }
        static isString(srcVar) {
                return ("string" == typeof srcVar);
        }
        static isBool(srcVar) {
                return ("boolean" == typeof srcVar);
        }
        static isObj(srcVar) {
                return ("object" == typeof srcVar);
        }
        static isFunc(srcVar) {
                return ("function" == typeof srcVar);
        }
        static isNaN(srcVar) {
                return (
                        isNum(srcVar) &&
                        (srcVar == NaN)
                );
        }
        static isInt(srcVar) {
                return Number.isSafeInteger(srcVar);
        }
        static isUInt(srcVar) {
                return (
                        (Funcs.isInt(srcVar)) &&
                        (srcVar >= 0)
                );
        }
        static isNull(srcVar) {
                return (
                        Funcs.isObj(srcVar) &&
                        (srcVar == null)
                );
        }
        static isNonNullObj(srcVar) {
                return (
                        Funcs.isObj(srcVar) &&
                        (srcVar != null)
                );
        }
        static isClassObj(srcVar, srcClass) {
                return (
                        Funcs.isNonNullObj(srcVar) &&
                        (Funcs.isFunc(srcClass)) &&
                        (srcVar.constructor == srcClass)
                );
        }
        static isArray(srcVar) {
                return Array.isArray(srcVar);
        }
        static numFrom(srcVar, defaultVar) {

                if (Funcs.isUndefined(defaultVar)) {
                        defaultVar = 0;
                } else {
                        defaultVar = Funcs.numFrom(defaultVar);
                }

                if (Funcs.isUndefined(srcVar)) {
                        srcVar = defaultVar;
                } else {
                        srcVar = Number(srcVar);
                }

                return srcVar;
        }
        static intFrom(srcVar, defaultVar) {
                return Math.trunc(Funcs.numFrom(srcVar, defaultVar));
        }
        static uintFrom(srcVar, defaultVar) {
                srcVar = Funcs.intFrom(srcVar, defaultVar);
                return ((srcVar < 0) ? (0) : (srcVar));
        }
        static stringFrom(srcVar, defaultVar) {

                if (Funcs.isUndefined(defaultVar)) {
                        defaultVar = "";
                } else {
                        defaultVar = Funcs.stringFrom(defaultVar);
                }

                if (Funcs.isUndefined(srcVar)) {
                        srcVar = defaultVar;
                } else {
                        srcVar = String(srcVar);
                }

                return srcVar;
        }
        static objFrom(srcVar, defaultVar) {

                const newVar = {};

                if (Funcs.isNonNullObj(defaultVar)) {
                        if (Funcs.isArray(defaultVar)) {
                                newVar = [];
                        }
                        Object.setPrototypeOf(newVar, Object.getPrototypeOf(defaultVar));
                        if (Funcs.isNonNullObj(srcVar)) {
                                Funcs.objPushAttrs(newVar, srcVar);
                        } else {
                                Funcs.objPushAttrs(newVar, defaultVar);
                        }
                } else {
                        if (Funcs.isNonNullObj(srcVar)) {
                                newVar = Funcs.copyObj(srcVar);
                        }
                }

                return newVar;
        }
        static varFrom(srcVar, defaultVar) {
                if (Funcs.isUndefined(defaultVar)) {
                        if (Funcs.isUndefined(srcVar)) {
                                return 0;
                        } else if (Funcs.isNum(srcVar)) {
                                return numFrom(srcVar);
                        } else if (Funcs.isString(srcVar)) {
                                return stringFrom(srcVar);
                        } else if (Funcs.isObj(srcVar)) {
                                return Funcs.objFrom(srcVar);
                        } else {
                                return srcVar;
                        }
                } else {
                        if (Funcs.isNum(defaultVar)) {
                                return Funcs.numFrom(srcVar, defaultVar);
                        } else if (Funcs.isString(defaultVar)) {
                                return Funcs.stringFrom(srcVar, defaultVar);
                        } else if (Funcs.isObj(defaultVar)) {
                                return Funcs.objFrom(srcVar, defaultVar);
                        } else {
                                return srcVar;
                        }
                }
        }
        static objForEach(obj, func, begin, count) {

                if (!Funcs.isNonNullObj(obj)) { return; }
                if (!Funcs.isFunc(func)) { return; }

                const keys = Object.keys(obj);
                begin = Funcs.uintFrom(begin);
                count = Math.min(Funcs.uintFrom(count, keys.length), keys.length);
                for (let i = begin; i < count; i++) {
                        func(obj[keys[i]], keys[i], i);
                }
        }
        static objPushAttrs(tarObj, srcObj) {

                if (!Funcs.isNonNullObj(tarObj)) { return; }
                if (!Funcs.isNonNullObj(srcObj)) { return; }

                Funcs.objForEach(srcObj, (attr, key) => {
                        tarObj[key] = Funcs.copyVar(attr);
                });
        }
        static objAssignAttrs(tarObj, srcObj) {

                if (!Funcs.isNonNullObj(tarObj)) { return; }
                if (!Funcs.isNonNullObj(srcObj)) { return; }

                if (Funcs.isArray(tarObj)) {
                        if (Funcs.isArray(srcObj)) {
                                Funcs.objPushAttrs(tarObj, srcObj);
                        } else {
                                Funcs.objForEach(srcObj, (attr, key, i) => {
                                        tarObj[i] = Funcs.copyVar(attr);
                                });
                        }
                } else {
                        if (Funcs.isArray(srcObj)) {
                                const keys = Object.keys(tarObj);
                                Funcs.objForEach(srcObj, (attr, key, i) => {
                                        tarObj[keys[i]] = Funcs.copyVar(attr);
                                }, 0, keys.length);
                        } else {
                                Funcs.objPushAttrs(tarObj, srcObj);
                        }
                }
        }
        static clearObj(tarVar) {
                if (Funcs.isNonNullObj(tarVar)) {
                        Funcs.objForEach(tarVar, (attr, key) => {
                                delete tarVar[key];
                        });
                }
        }
        static cloneObj(tarVar, srcVar) {

                if (!Funcs.isNonNullObj(tarVar)) { return; }
                if (!Funcs.isNonNullObj(srcVar)) { return; }

                Funcs.clearObj(tarVar);
                Object.setPrototypeOf(tarVar, Object.getPrototypeOf(srcVar));
                Funcs.objPushAttrs(tarVar, srcVar);
        }
        static copyObj(srcVar) {
                let newVar = {};
                if (Funcs.isObj(srcVar)) {
                        if (Funcs.isNull(srcVar)) {
                                newVar = null;
                        } else {
                                if (Funcs.isArray(srcVar)) {
                                        newVar = [];
                                }
                                Object.setPrototypeOf(newVar, Object.getPrototypeOf(srcVar));
                                Funcs.objPushAttrs(newVar, srcVar);
                        }
                }
                return newVar;
        }
        static copyVar(srcVar) {
                if (Funcs.isUndefined(srcVar)) {
                        return 0;
                } else if (Funcs.isObj(srcVar)) {
                        return Funcs.copyObj(srcVar);
                } else {
                        return srcVar;
                }
        }
        static flatArray(srcArray) {
                const newArray = [];
                function recursive(subArray) {
                        if (Funcs.isArray(subArray)) {
                                Funcs.objForEach(subArray, (attr) => {
                                        recursive(attr);
                                });
                        } else {
                                newArray.push(Funcs.copyVar(subArray));
                        }
                }
                if (!Funcs.isUndefined(srcArray)) {
                        recursive([Object.values(arguments)]);
                }
                return newArray;
        }
        static compareFloat(float0, float1) {
                if (
                        (float0 < float1 + Number.MIN_VALUE) &&
                        (float0 > float1 - Number.MIN_VALUE)
                ) {
                        return "eq";
                } else if (float0 < float1) {
                        return "lt";
                } else {
                        return "gt";
                }
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Funcs };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
