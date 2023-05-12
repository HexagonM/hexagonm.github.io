
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//主模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//在Index.html中加载的JS代码

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { File } from "./file.js";
import { Vec3D } from "./vec3D.js";
import { Mat3D } from "./mat3D.js";
import { Vertex } from "./vertex.js";
import { Thing } from "./thing.js";
import { Scene } from "./scene.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

function main() {

//         const vecs = [];
//         vecs[0] = new Vec3D();
//         vecs[1] = new Vec3D(1, 2);
//         vecs[2] = new Vec3D(1, 2, 3, 4);
//         vecs[3] = new Vec3D(1, 2, 3);
//         vecs[4] = new Vec3D([1, 2, 3]);
//         vecs[5] = new Vec3D(vecs[3]);
//         vecs[6] = vecs[3].add(vecs[4]);
//         vecs[7] = vecs[6].sub(vecs[3]);
//         vecs[8] = vecs[3].mul(vecs[4]);
//         vecs[9] = vecs[6].div(vecs[3]);
//         vecs[10] = new Vec3D(vecs[3].scalarMul(3.0));
//         vecs[11] = new Vec3D(vecs[3].dotMul(vecs[4]));
//         vecs[12] = new Vec3D(vecs[3].dotMul(1, 2, 3));
//         vecs[13] = new Vec3D(vecs[3].dotMul([1, 2, 3]));
//         vecs[14] = new Vec3D(2, 0, 0).crossMul(new Vec3D(0, 2, 0));
//         vecs[15] = new Vec3D(vecs[3].abs());
//         vecs[16] = vecs[3].toPolar();
//         vecs[17] = vecs[16].toRect();
// 
//         Funcs.objForEach(vecs, (elem, i) => {
//                 console.log("vecs", i, ":", elem.elems);
//         });
        
        const vsFile = new File("./main.vs", "txt");
        const fsFile = new File("./main.fs", "txt");
        File.onload([
                vsFile,
                fsFile
        ], filesOnload);

        function filesOnload() {
                
                const scene = new Scene("canvas0", vsFile.value, fsFile.value);
                //console.log(scene.glVars);
                const thing = new Thing();

                thing.addCube();

                scene.addThings(thing);

                let yAngle = -Math.PI / 4.0;
                let xAngle = Math.PI / 4.0;

                scene.setView(new Vertex(new Vec3D(0.5, 0.5, 0.5), new Vec3D(yAngle, xAngle, 1.0)));
                scene.setAmbientLight(new Vertex(new Vec3D(0.0, 0.0, 0.0), new Vec3D(10.0, 0.0, 0.0)));
                scene.setTime();

                console.log(scene);

                
                scene.draw();

                window.buttonLeftOnclick = function () {
                        yAngle -= (Math.PI / 90.0);
                        scene.setView(new Vertex(new Vec3D(0.5, 0.5, 0.5), new Vec3D(yAngle, xAngle, 1.0)));
                        scene.draw();
                };
                window.buttonRightOnclick = function () {
                        yAngle += (Math.PI / 90.0);
                        scene.setView(new Vertex(new Vec3D(0.5, 0.5, 0.5), new Vec3D(yAngle, xAngle, 1.0)));
                        scene.draw();
                };
                window.buttonDownOnclick = function () {
                        xAngle += (Math.PI / 90.0);
                        scene.setView(new Vertex(new Vec3D(0.5, 0.5, 0.5), new Vec3D(yAngle, xAngle, 1.0)));
                        scene.draw();
                };
                window.buttonUpOnclick = function () {
                        xAngle -= (Math.PI / 90.0);
                        scene.setView(new Vertex(new Vec3D(0.5, 0.5, 0.5), new Vec3D(yAngle, xAngle, 1.0)));
                        scene.draw();
                };

        }
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

main();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
