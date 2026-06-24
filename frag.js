const frag = `
  ${includes}

  uniform sampler2D image;

  varying vec3 v_position;
  varying vec3 v_normal;
  varying vec2 v_uv;

  void main () {
    gl_FragColor = texture2D(image, v_uv);
  }
`
