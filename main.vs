                
precision mediump int;
precision mediump float;

uniform int u_time;

uniform vec3 u_viewBaseCoord;
uniform mat3 u_viewMat;
uniform float u_viewR;
uniform vec3 u_viewBaseColor;
uniform int u_viewCoordFuncId;
uniform int u_viewColorFuncId;

attribute vec3 a_baseCoord;
attribute vec3 a_normVec;
attribute vec3 a_baseColor;
attribute vec2 a_coordFuncId;
attribute vec2 a_colorFuncId;

varying vec3 v_coord;
varying vec3 v_normVec;
varying vec3 v_color;

vec3 funcs(vec3 baseVec, int time, int funcId){
        vec3 newVec;
        if(funcId == 0){
                newVec = baseVec;
        }
        return newVec;
}

float pi = 3.141592654;

void main() {
        vec3 viewCoord = funcs(u_viewBaseCoord, u_time, u_viewCoordFuncId);
        vec3 viewColor = funcs(u_viewBaseColor, u_time, u_viewColorFuncId);
        vec3 coord = funcs(a_baseCoord, u_time, int(a_coordFuncId.x + 0.1));
        vec3 color = funcs(a_baseColor, u_time, int(a_colorFuncId.x + 0.1));
        float coordAbs;
        vec3 coordP;
        float coordPAbs;
        float coordPAngle;

        vec3 debugVec;

        v_coord = coord;
        v_color = color * viewColor;
        v_normVec = a_normVec;

        

        coord = coord - u_viewBaseCoord;

        

        coord = u_viewMat * coord;
        coordAbs = length(coord);

        

        

        coordP = vec3(coord.x, 0.0, coord.z);
        coordPAbs = length(coordP);
        coordPAngle = acos(coordP.z / coordPAbs);
        coordPAngle = pi - coordPAngle;
        if(coord.x < 0.0){
                coord.x = -coordPAngle * u_viewR;
        }else{
                coord.x = coordPAngle * u_viewR;
        }

        coordP = vec3(0.0, coord.y, coord.z);
        coordPAbs = length(coordP);
        coordPAngle = acos(coordP.z / coordPAbs);
        coordPAngle = pi - coordPAngle;
        if(coord.y < 0.0){
                coord.y = -coordPAngle * u_viewR;
        }else{
                coord.y = coordPAngle * u_viewR;
        }

        coord.z = -coordAbs;

        debugVec = coord;

        gl_Position = vec4(coord, 1.0);

        //gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        //gl_PointSize = 10.0;//512.0 * debugVec.x;


}









