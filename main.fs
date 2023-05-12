
precision mediump int;
precision mediump float;

uniform vec3 u_absorptivity;
uniform int u_time;

uniform vec3 u_pointLightBaseCoord;
uniform vec3 u_pointLightVec;
uniform vec3 u_pointLightBaseColor;
uniform int u_pointLightCoordFuncId;
uniform int u_pointLightColorFuncId;

uniform vec3 u_ambientLightBaseCoord;
uniform float u_ambientLightR;
uniform vec3 u_ambientLightBaseColor;
uniform int u_ambientLightCoordFuncId;
uniform int u_ambientLightColorFuncId;

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

void main() {
        vec3 ambientLightCoord = funcs(u_ambientLightBaseCoord, u_time, u_ambientLightCoordFuncId);
        vec3 ambientLightColor = funcs(u_ambientLightBaseColor, u_time, u_ambientLightColorFuncId);

        vec3 color = vec3(0.0, 0.0, 0.0);

        if(length(v_coord - ambientLightCoord) <= u_ambientLightR){
                color = v_color * ambientLightColor;
        }

        gl_FragColor = vec4(color, 1.0);

        


        //gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}












