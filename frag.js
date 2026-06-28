const frag = `
  ${includes}

  uniform float time;
  uniform sampler2D image;
  uniform vec2 mouse;
  uniform vec2 touchUv;

  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  struct Light {
    vec3 position;
    vec3 color;
  };

  // light direction, surface direction, ambient, diffuse
  vec3 addLight(Light l) {

    vec3 dx = dFdx(v_position);
    vec3 dy = dFdy(v_position);
    vec3 newNormal = normalize(cross(dx,dy));

    vec3 L = normalize(l.position - v_position);

    vec3 N = mix(v_normal, newNormal, 0.5);

    float ambientScore = 0.1;
    vec3 ambientColor = ambientScore * l.color;

    float diffuseScore = max(dot(L, N), 0.0);
    vec3 diffuseColor = diffuseScore * l.color;

    return ambientColor + diffuseColor;
  }

  void main () {
    vec4 objectColor = texture2D(image, v_uv);

    Light l = Light(
      vec3(0.0, 0.0, 10),
      vec3(1.0, 1.0, 1.0)
    );

    vec3 rgb = addLight(l) * objectColor.rgb;
    vec4 finalColor = vec4(rgb, 1.0);

    gl_FragColor = finalColor;
  }
`
