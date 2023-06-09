﻿
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

////////////////////////////////

////////////////

////////

////

//顶点模块

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////文件说明

//构造适用于WebGL场景中的顶点

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////预处理

import { Funcs } from "./funcs.js";
import { Vec3D } from "./vec3D.js";
import { Mat3D } from "./mat3D.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////模块

class Vertex{
        constructor(
                baseCoord,
                normVec,
                baseColor,
                coordFuncId,
                colorFuncId
        ) {
                this.baseCoord = Funcs.objFrom(baseCoord, Vec3D.zeroVec);
                this.normVec = Funcs.objFrom(normVec, Vec3D.normVec)
                this.baseColor = Funcs.objFrom(baseColor, Vec3D.unitVec);
                this.coordFuncId = Funcs.uintFrom(coordFuncId);
                this.colorFuncId = Funcs.uintFrom(colorFuncId);
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////全局代码

export { Vertex };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
