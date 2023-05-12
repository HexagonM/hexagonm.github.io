
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//事物模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//构造适用于WebGL场景中的事物

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { Vec3D } from "./vec3D.js";
import { Mat3D } from "./mat3D.js";
import { Vertex } from "./vertex.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class Thing{
        constructor(vertexs, indexs, subThings) {
                this.vertexs = (() => { 
                        const newVertexs = [];
                        vertexs = Funcs.flatArray(vertexs);
                        Funcs.objForEach(vertexs, (elem) => {
                                if (Funcs.isClassObj(elem, Vertex)) { newVertexs.push(elem); }
                        });
                        return newVertexs;
                })();
                this.indexs = (() => {
                        const newIndexs = [];
                        indexs = Funcs.flatArray(indexs);
                        Funcs.objForEach(indexs, (elem) => {
                                newIndexs.push(Funcs.uintFrom(elem));
                        });
                        return newIndexs;
                })();
                this.subThings = (() => {
                        const newSubThings = [];
                        subThings = Funcs.flatArray(subThings);
                        Funcs.objForEach(subThings, (elem) => {
                                if (Funcs.isClassObj(elem, Thing)) { newSubThings.push(elem); }
                        });
                        return newSubThings;
                })();
        }
        addCube() {
                const count = this.vertexs.length;

                const vertex000 = new Vertex(new Vec3D(0.0, 0.0, 0.0), Vec3D.normVec, new Vec3D(1.0, 0.0, 0.0));
                const vertex100 = new Vertex(new Vec3D(0.2, 0.0, 0.0), Vec3D.normVec, new Vec3D(0.0, 1.0, 0.0));
                const vertex010 = new Vertex(new Vec3D(0.0, 0.2, 0.0), Vec3D.normVec, new Vec3D(0.0, 0.0, 1.0));
                const vertex001 = new Vertex(new Vec3D(0.0, 0.0, 0.2), Vec3D.normVec, new Vec3D(1.0, 1.0, 0.0));
                const vertex110 = new Vertex(new Vec3D(0.2, 0.2, 0.0), Vec3D.normVec, new Vec3D(0.0, 1.0, 1.0));
                const vertex011 = new Vertex(new Vec3D(0.0, 0.2, 0.2), Vec3D.normVec, new Vec3D(1.0, 0.0, 1.0));
                const vertex101 = new Vertex(new Vec3D(0.2, 0.0, 0.2), Vec3D.normVec, new Vec3D(1.0, 1.0, 1.0));
                const vertex111 = new Vertex(new Vec3D(0.2, 0.2, 0.2), Vec3D.normVec, new Vec3D(1.0, 1.0, 1.0));

                this.vertexs.push(Funcs.copyObj(vertex000));
                this.vertexs.push(Funcs.copyObj(vertex010));
                this.vertexs.push(Funcs.copyObj(vertex110));
                this.vertexs.push(Funcs.copyObj(vertex100));

                this.vertexs.push(Funcs.copyObj(vertex001));
                this.vertexs.push(Funcs.copyObj(vertex101));
                this.vertexs.push(Funcs.copyObj(vertex111));
                this.vertexs.push(Funcs.copyObj(vertex011));

                this.vertexs.push(Funcs.copyObj(vertex000));
                this.vertexs.push(Funcs.copyObj(vertex100));
                this.vertexs.push(Funcs.copyObj(vertex101));
                this.vertexs.push(Funcs.copyObj(vertex001));

                this.vertexs.push(Funcs.copyObj(vertex010));
                this.vertexs.push(Funcs.copyObj(vertex011));
                this.vertexs.push(Funcs.copyObj(vertex111));
                this.vertexs.push(Funcs.copyObj(vertex110));

                this.vertexs.push(Funcs.copyObj(vertex000));
                this.vertexs.push(Funcs.copyObj(vertex001));
                this.vertexs.push(Funcs.copyObj(vertex011));
                this.vertexs.push(Funcs.copyObj(vertex010));

                this.vertexs.push(Funcs.copyObj(vertex100));
                this.vertexs.push(Funcs.copyObj(vertex110));
                this.vertexs.push(Funcs.copyObj(vertex111));
                this.vertexs.push(Funcs.copyObj(vertex101));

                for (let i = 0; i < 6; i++) {
                        this.indexs.push(count + i * 4 + 0);
                        this.indexs.push(count + i * 4 + 1);
                        this.indexs.push(count + i * 4 + 2);
                        this.indexs.push(count + i * 4 + 0);
                        this.indexs.push(count + i * 4 + 2);
                        this.indexs.push(count + i * 4 + 3);
                }


                





        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Thing };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
