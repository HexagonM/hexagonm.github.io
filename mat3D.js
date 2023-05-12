
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//三维矩阵

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//无

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { Vec3D } from "./vec3D.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class Mat3D{
        constructor(elems) {
                this.elems = (() => {
                        elems = Funcs.flatArray(Object.values(arguments));
                        if (Funcs.isClassObj(elems[0], Mat3D)) {
                                return Funcs.copyObj(elems[0].elems);
                        } else {
                                elems.length = 9;
                                for (let i = 0; i < 9; i++) {
                                        elems[i] = Funcs.numFrom(elems[i]);
                                }
                                return elems;
                        }
                })();
        }
        add(mat) {
                mat = new Mat3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        mat.elems[i] += elem;
                });
                return mat;
        }
        sub(mat) {
                mat = new Mat3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        mat.elems[i] = elem - mat.elems[i];
                });
                return mat;
        }
        mul(mat) {
                mat = new Mat3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        mat.elems[i] *= elem;
                });
                return mat;
        }
        div(mat) {
                mat = new Mat3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        mat.elems[i] = elem / mat.elems[i];
                });
                return mat;
        }
        scalarMul(scalar) {
                const mat = new Mat3D();
                const args = Funcs.flatArray(Object.values(arguments));
                scalar = Funcs.numFrom(args[0], 1.0);
                Funcs.objForEach(this.elems, (elem, i) => {
                        mat.elems[i] = scalar * elem;
                });
                return mat;
        }
        matMul(mat) {
                mat = new Mat3D(Object.values(arguments));
                const newMat = new Mat3D();
                for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                                for (let k = 0; k < 3; k++) {
                                        newMat.elems[i * 3 + j] += (this.elems[i * 3 + k] * mat.elems[k * 3 + j]);
                                }
                        }
                }
                return newMat;
        }
        trans() {
                const mat = new Mat3D();
                for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                                mat.elems[i * 3 + j] = this.elems[j * 3 + i];
                        }
                }
                return mat;
        }
        matMulVec(vec) {
                vec = new Vec3D(Object.values(arguments));
                const newVec = new Vec3D();
                for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                                newVec.elems[i] += (this.elems[i * 3 + j] * vec.elems[j]);
                        }
                }
                return newVec;
        }
        static angleMat(i, angle) {

                i = Funcs.uintFrom(i) % 3;
                angle = Funcs.numFrom(angle);

                const i1 = (i + 1) % 3;
                const i2 = (i + 2) % 3;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);
                
                const mat = new Mat3D();
                mat.elems[i * 3 + i] = 1.0;
                mat.elems[i1 * 3 + i1] = cosAngle;
                mat.elems[i2 * 3 + i2] = cosAngle;
                mat.elems[i1 * 3 + i2] = -sinAngle;
                mat.elems[i2 * 3 + i1] = sinAngle;
                return mat;
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Mat3D };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
