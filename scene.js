
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//场景模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//用于WebGL向canvas显示场景

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { Vec3D } from "./vec3D.js";
import { Mat3D } from "./mat3D.js";
import { Vertex } from "./vertex.js";
import { Thing } from "./thing.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class Scene {
        static floatAbsMax = Math.pow(2, 14);
        static floatAbsMin = Math.pow(2, -10);
        static baseViewVertex = (() => {
                const vertex = new Vertex();
                vertex.baseCoord = new Vec3D(0.0, 0.0, Scene.floatAbsMax);
                vertex.normVec = new Vec3D(0.0, 0.0, Scene.floatAbsMax);
                vertex.baseColor = Funcs.copyObj(Vec3D.unitVec);
                vertex.coordFuncId = 0;
                vertex.colorFuncId = 0;
                return vertex;
        })();
        static basePointLightVertex = (() => {
                const vertex = new Vertex();
                vertex.baseCoord = Funcs.copyObj(Vec3D.normVec).scalarMul(Scene.floatAbsMax);
                vertex.normVec = Funcs.copyObj(Vec3D.normVec).scalarMul(-Math.PI);
                vertex.baseColor = Funcs.copyObj(Vec3D.unitVec);
                vertex.coordFuncId = 0;
                vertex.colorFuncId = 0;
                return vertex;
        })();
        static baseAmbientLightVertex = (() => {
                const vertex = new Vertex();
                vertex.baseCoord = Funcs.copyObj(Vec3D.zeroVec);
                vertex.normVec = Funcs.copyObj(Vec3D.normVec).scalarMul(Scene.floatAbsMax);
                vertex.baseColor = Funcs.copyObj(Vec3D.zeroVec);
                vertex.coordFuncId = 0;
                vertex.colorFuncId = 0;
                return vertex;
        })();
        constructor(canvasId, vSSource, fSSource) {
                canvasId = Funcs.stringFrom(canvasId);
                vSSource = Funcs.stringFrom(vSSource);
                fSSource = Funcs.stringFrom(fSSource);
                this.canvas = (() => {
                        const canvas = document.getElementById(canvasId);
                        canvas.width = 512;
                        canvas.height = 512;
                        canvas.parentNode.style.textAlign = "center";
                        return canvas;
                })();
                this.gl = (() => {
                        const gl = this.canvas.getContext('webgl');
                        gl.clearColor(0.0, 0.0, 0.0, 1.0);
                        gl.clear(gl.COLOR_BUFFER_BIT);

                        function fnShaderCodeCompile(gl, shaderType, shaderSource) {
                                const shader = gl.createShader(shaderType);
                                gl.shaderSource(shader, shaderSource);
                                gl.compileShader(shader);
                                return shader;
                        }
                        const program = gl.createProgram();
                        const vertexShader = fnShaderCodeCompile(gl, gl.VERTEX_SHADER, vSSource);
                        const fragmentShader = fnShaderCodeCompile(gl, gl.FRAGMENT_SHADER, fSSource);
                        gl.attachShader(program, vertexShader);
                        gl.attachShader(program, fragmentShader);
                        gl.linkProgram(program);
                        gl.useProgram(program);
                        gl.program = program;
                        
                        gl.enable(gl.CULL_FACE);
                        //gl.cullFace(gl.BACK);
                        gl.enable(gl.DEPTH_TEST);
                        return gl;
                })();
                this.glVars = (() => {
                        const glVars = {};

                        glVars.u_absorptivity = this.gl.getUniformLocation(this.gl.program, 'u_absorptivity');
                        glVars.u_time = this.gl.getUniformLocation(this.gl.program, 'u_time');

                        glVars.u_viewBaseCoord = this.gl.getUniformLocation(this.gl.program, 'u_viewBaseCoord');
                        glVars.u_viewMat = this.gl.getUniformLocation(this.gl.program, 'u_viewMat');
                        glVars.u_viewR = this.gl.getUniformLocation(this.gl.program, 'u_viewR');
                        glVars.u_viewBaseColor = this.gl.getUniformLocation(this.gl.program, 'u_viewBaseColor');
                        glVars.u_viewCoordFuncId = this.gl.getUniformLocation(this.gl.program, 'u_viewCoordFuncId');
                        glVars.u_viewColorFuncId = this.gl.getUniformLocation(this.gl.program, 'u_viewColorFuncId');

                        glVars.u_pointLightBaseCoord = this.gl.getUniformLocation(this.gl.program, 'u_pointLightBaseCoord');
                        glVars.u_pointLightVec = this.gl.getUniformLocation(this.gl.program, 'u_pointLightVec');
                        glVars.u_pointLightBaseColor = this.gl.getUniformLocation(this.gl.program, 'u_pointLightBaseColor');
                        glVars.u_pointLightCoordFuncId = this.gl.getUniformLocation(this.gl.program, 'u_pointLightCoordFuncId');
                        glVars.u_pointLightColorFuncId = this.gl.getUniformLocation(this.gl.program, 'u_pointLightColorFuncId');

                        glVars.u_ambientLightBaseCoord = this.gl.getUniformLocation(this.gl.program, 'u_ambientLightBaseCoord');
                        glVars.u_ambientLightR = this.gl.getUniformLocation(this.gl.program, 'u_ambientLightR');
                        glVars.u_ambientLightBaseColor = this.gl.getUniformLocation(this.gl.program, 'u_ambientLightBaseColor');
                        glVars.u_ambientLightCoordFuncId = this.gl.getUniformLocation(this.gl.program, 'u_ambientLightCoordFuncId');
                        glVars.u_ambientLightColorFuncId = this.gl.getUniformLocation(this.gl.program, 'u_ambientLightColorFuncId');

                        glVars.baseCoordBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glVars.baseCoordBuffer);
                        const a_baseCoord = this.gl.getAttribLocation(this.gl.program, "a_baseCoord");
                        this.gl.vertexAttribPointer(a_baseCoord, 3, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(a_baseCoord);

                        glVars.normVecBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glVars.normVecBuffer);
                        const a_normVec = this.gl.getAttribLocation(this.gl.program, "a_normVec");
                        this.gl.vertexAttribPointer(a_normVec, 3, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(a_normVec);

                        glVars.baseColorBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glVars.baseColorBuffer);
                        const a_baseColor = this.gl.getAttribLocation(this.gl.program, "a_baseColor");
                        this.gl.vertexAttribPointer(a_baseColor, 3, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(a_baseColor);

                        glVars.coordFuncIdBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glVars.coordFuncIdBuffer);
                        const a_coordFuncId = this.gl.getAttribLocation(this.gl.program, "a_coordFuncId");
                        this.gl.vertexAttribPointer(a_coordFuncId, 1, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(a_coordFuncId);

                        glVars.colorFuncIdBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glVars.colorFuncIdBuffer);
                        const a_colorFuncId = this.gl.getAttribLocation(this.gl.program, "a_colorFuncId");
                        this.gl.vertexAttribPointer(a_colorFuncId, 1, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(a_colorFuncId);

                        glVars.indexBuffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, glVars.indexBuffer);

                        return glVars;
                })();
                this.baseTime = (new Date()).getTime();

                this.setAbsorptivity();
                this.setTime();
                this.setView();
                this.setPointLight();
                this.setAmbientLight();
                
                this.baseCoords = [];
                this.normVecs = [];
                this.baseColors = [];
                this.coordFuncIds = [];
                this.colorFuncIds = [];

                this.indexs = [];
        }
        setAbsorptivity(color) {
                color = Funcs.objFrom(color, Vec3D.zeroVec);
                this.absorptivity = Funcs.copyObj(color.elems);
        }
        setTime(time) {
                this.time = Funcs.uintFrom(time, (new Date()).getTime() - this.baseTime);
        }
        setView(vertex) {
                vertex = Funcs.objFrom(vertex, Scene.baseViewVertex);
                this.viewBaseCoord = Funcs.copyObj(vertex.baseCoord.elems);
                this.viewMat = Funcs.copyObj(
                        Mat3D.angleMat(0, vertex.normVec.elems[1]).matMul(
                                Mat3D.angleMat(1, vertex.normVec.elems[0])
                        ).trans().elems
                );
                this.viewR = vertex.normVec.elems[2];
                this.viewBaseColor = Funcs.copyObj(vertex.baseColor.elems);
                this.viewCoordFuncId = vertex.coordFuncId;
                this.viewColorFuncId = vertex.colorFuncId;
        }
        setPointLight(vertex) {
                vertex = Funcs.objFrom(vertex, Scene.basePointLightVertex);
                this.pointLightBaseCoord = Funcs.copyObj(vertex.baseCoord.elems);
                this.pointLightVec = Funcs.copyObj(vertex.normVec.elems);
                this.pointLightBaseColor = Funcs.copyObj(vertex.baseColor.elems);
                this.pointLightCoordFuncId = vertex.coordFuncId;
                this.pointLightColorFuncId = vertex.colorFuncId;
        }
        setAmbientLight(vertex) {
                vertex = Funcs.objFrom(vertex, Scene.baseAmbientLightVertex);
                this.ambientLightBaseCoord = Funcs.copyObj(vertex.baseCoord.elems);
                this.ambientLightR = Funcs.copyObj(vertex.normVec).abs();
                this.ambientLightBaseColor = Funcs.copyObj(vertex.baseColor.elems);
                this.ambientLightCoordFuncId = vertex.coordFuncId;
                this.ambientLightColorFuncId = vertex.colorFuncId;
        }
        addThings(things) {
                things = Funcs.flatArray(Object.values(arguments));
                const thisObj = this;
                function recursive(subThings) {
                        Funcs.objForEach(subThings, (thing) => {
                                if (Funcs.isClassObj(thing, Thing)) {
                                        const count = thisObj.baseCoords.length / 3;
                                        Funcs.objForEach(thing.vertexs, (vertex) => {
                                                Funcs.objForEach(vertex.baseCoord.elems, (elem) => {
                                                        thisObj.baseCoords.push(elem);
                                                });
                                                Funcs.objForEach(vertex.normVec.elems, (elem) => {
                                                        thisObj.normVecs.push(elem);
                                                });
                                                Funcs.objForEach(vertex.baseColor.elems, (elem) => {
                                                        thisObj.baseColors.push(elem);
                                                });
                                                thisObj.coordFuncIds.push(vertex.coordFuncId);
                                                thisObj.colorFuncIds.push(vertex.colorFuncId);
                                        });
                                        Funcs.objForEach(thing.indexs, (index) => {
                                                thisObj.indexs.push(count + index);
                                        });
                                        recursive(thing.subThings);
                                }
                        });
                }
                recursive(things);
        }
        draw() {
                this.gl.uniform3fv(this.glVars.u_absorptivity, this.absorptivity);
                this.gl.uniform1i(this.glVars.u_time, this.time);

                this.gl.uniform3fv(this.glVars.u_viewBaseCoord, this.viewBaseCoord);
                this.gl.uniformMatrix3fv(this.glVars.u_viewMat, false, this.viewMat);
                this.gl.uniform1f(this.glVars.u_viewR, this.viewR);
                this.gl.uniform3fv(this.glVars.u_viewBaseColor, this.viewBaseColor);
                this.gl.uniform1i(this.glVars.u_viewCoordFuncId, this.viewCoordFuncId);
                this.gl.uniform1i(this.glVars.u_viewColorFuncId, this.viewColorFuncId);

                this.gl.uniform3fv(this.glVars.u_pointLightBaseCoord, this.pointLightBaseCoord);
                this.gl.uniform3fv(this.glVars.u_pointLightVec, this.pointLightVec);
                this.gl.uniform3fv(this.glVars.u_pointLightBaseColor, this.pointLightBaseColor);
                this.gl.uniform1i(this.glVars.u_pointLightCoordFuncId, this.pointLightCoordFuncId);
                this.gl.uniform1i(this.glVars.u_pointLightColorFuncId, this.pointLightColorFuncId);

                this.gl.uniform3fv(this.glVars.u_ambientLightBaseCoord, this.ambientLightBaseCoord);
                this.gl.uniform1f(this.glVars.u_ambientLightR, this.ambientLightR);
                this.gl.uniform3fv(this.glVars.u_ambientLightBaseColor, this.ambientLightBaseColor);
                this.gl.uniform1i(this.glVars.u_ambientLightCoordFuncId, this.ambientLightCoordFuncId);
                this.gl.uniform1i(this.glVars.u_ambientLightColorFuncId, this.ambientLightColorFuncId);

                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.baseCoordBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.baseCoords), this.gl.STATIC_DRAW);

                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.normVecBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normVecs), this.gl.STATIC_DRAW);

                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.baseColorBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.baseColors), this.gl.STATIC_DRAW);

                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.coordFuncIdBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordFuncIds), this.gl.STATIC_DRAW);

                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.colorFuncIdBuffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colorFuncIds), this.gl.STATIC_DRAW);

                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.glVars.indexBuffer);
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexs), this.gl.STATIC_DRAW);
                
               

                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                this.gl.drawElements(this.gl.TRIANGLES, this.indexs.length, this.gl.UNSIGNED_SHORT, 0);





                // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glVars.baseCoordBuffer);
                // const coords = [
                //         0.0, 0.0, 0.0, 
                //         0.2, 0.0, 0.0,
                //         0.0, 0.2, 0.0
                // ];
                // this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW);
                // this.gl.drawArrays(this.gl.POINTS, 0, 3);
                //this.gl.drawArrays(this.gl.POINTS, 1, 1);
                //this.gl.drawArrays(this.gl.TRIANGLES, 0, 24);
                //this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);





        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Scene };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
