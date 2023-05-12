
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//三维矢量

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//无

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { Mat3D } from "./mat3D.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class Vec3D{
        constructor(elems) {
                this.elems = (() => {
                        elems = Funcs.flatArray(Object.values(arguments));
                        if (Funcs.isClassObj(elems[0], Vec3D)) {
                                return Funcs.copyObj(elems[0].elems);
                        } else {
                                elems.length = 3;
                                for (let i = 0; i < 3; i++) {
                                        elems[i] = Funcs.numFrom(elems[i]);
                                }
                                return elems;
                        }
                })();
        }
        add(vec) {
                vec = new Vec3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        vec.elems[i] += elem;
                });
                return vec;
        }
        sub(vec) {
                vec = new Vec3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        vec.elems[i] = elem - vec.elems[i];
                });
                return vec;
        }
        mul(vec) {
                vec = new Vec3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        vec.elems[i] *= elem;
                });
                return vec;
        }
        div(vec) {
                vec = new Vec3D(Object.values(arguments));
                Funcs.objForEach(this.elems, (elem, i) => {
                        vec.elems[i] = elem / vec.elems[i];
                });
                return vec;
        }
        scalarMul(scalar) {
                const vec = new Vec3D();
                const args = Funcs.flatArray(Object.values(arguments));
                scalar = Funcs.numFrom(args[0], 1.0);
                Funcs.objForEach(this.elems, (elem, i) => {
                        vec.elems[i] = scalar * elem;
                });
                return vec;
        }
        dotMul(vec) {
                vec = new Vec3D(Object.values(arguments));
                let result = 0.0;
                Funcs.objForEach(this.elems, (elem, i) => {
                        result += (elem * vec.elems[i]);
                });
                return result;
        }
        crossMul(vec) {
                vec = new Vec3D(Object.values(arguments));
                const newVec = new Vec3D();
                for (let i = 0; i < 3; i++) {
                        let add1 = (i + 1) % 3;
                        let add2 = (i + 2) % 3;
                        newVec.elems[i] = this.elems[add1] * vec.elems[add2] - this.elems[add2] * vec.elems[add1];
                }
                return newVec;
        }
        abs(vec) {
                let result = 0.0;
                Funcs.objForEach(this.elems, (elem, i) => {
                        result += (elem * elem);
                });
                return Math.sqrt(result);
        }
        toPolar() {
                const rho = this.abs();
                const theta = Math.acos(this.elems[2] / rho);
                const rhoXY = rho * Math.sin(theta);
                let phi = Math.acos(this.elems[0] / rhoXY);
                if (this.elems[1] < 0) phi = 2.0 * Math.PI - phi;
                return new Vec3D(rho, theta, phi);
        }
        toRect() {
                const rho = this.elems[0];
                const theta = this.elems[1];
                const phi = this.elems[2];
                const z = rho * Math.cos(theta);
                const rhoXY = rho * Math.sin(theta);
                const x = rhoXY * Math.cos(phi);
                const y = rhoXY * Math.sin(phi);
                return new Vec3D(x, y, z);
        }
        static zeroVec = new Vec3D();
        static unitVec = new Vec3D(1.0, 1.0, 1.0);
        static normVec = Vec3D.unitVec.scalarMul(1.0 / Vec3D.unitVec.abs());
        toNorm() {
                const abs = this.abs();
                if (Funcs.compareFloat(abs, 0.0) == "eq") {
                        return copyObj(Vec3D.normVec);
                } else {
                        return this.scalarMul(1.0 / this.abs());
                }
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Vec3D };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
