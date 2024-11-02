    uniform vec2 u_resolution;
    uniform vec2 u_mouse; // Координаты мыши
    uniform float u_time;
    float amount = 0.1;

    const int AMOUNT = 6;
    float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

    void main(){
    vec2 coord = 3. * (gl_FragCoord.xy - u_resolution / 10.0) / min(u_resolution.y, u_resolution.x);
    vec2 mousePos = u_mouse / u_resolution * 2.0 - 1.0; // Нормализуем координаты мыши
    coord.x -= 0.8;
    coord.y -= 1.5;
    float len;

    for (int i = 0; i < AMOUNT; i++){
    len = length(vec2(coord.x, coord.y));

    coord.x = coord.x - cos(coord.y + sin(len)) + cos(u_time / 20.0) - mousePos.x * 0.15;
    coord.y = coord.y + sin(coord.x + cos(len)) + sin(u_time / 4.0) + mousePos.y * 0.08;
}

    coord += random2d(coord) * 0.01;

    vec3 color = vec3(1. * sin(1.*(coord.x + coord.y + 1.0)) + 0.9,
    1. * sin(1.*(coord.x + coord.y + 0.1)) + 0.9,
    0.5 * sin(1.*(coord.x + coord.y + 0.1))+1.0);

    float noise = (random2d(coord) - 0.5) * amount;
    color += vec3(noise);

    // Вычисляем расстояния до левого и правого краев
    float distLeft = gl_FragCoord.x;
    float distRight = u_resolution.x - gl_FragCoord.x;

    // Задаем отдельные ширины затухания для левого и правого краев
    float edgeWidthLeft = u_resolution.x * 0.7; // Настройте значение для левого края
    float edgeWidthRight = u_resolution.x * 0.2; // Настройте значение для правого края

    // Нормализуем расстояния
    float normalizedDistLeft = distLeft / edgeWidthLeft;
    float normalizedDistRight = distRight / edgeWidthRight;

    // Вычисляем факторы затухания с помощью smoothstep
    float edgeFactorLeft = smoothstep(0.0, 1.0, normalizedDistLeft);
    float edgeFactorRight = smoothstep(0.0, 1.0, normalizedDistRight);

    // Комбинируем факторы затухания по X
    float edgeFactorX = edgeFactorLeft * edgeFactorRight;

    // Вычисляем затухание по Y (как ранее)
    float distTop = gl_FragCoord.y;
    float distBottom = u_resolution.y - gl_FragCoord.y;

    float edgeWidthY = u_resolution.y * 0.3; // Настройте для вертикального затухания

    float normalizedDistY = min(distTop, distBottom) / edgeWidthY;
    float edgeFactorY = smoothstep(0.0, 1.0, normalizedDistY);

    // Общий фактор затухания
    float edgeFactor = edgeFactorX * edgeFactorY;

    // Смешиваем цвет с белым на краях
    color = mix(vec3(1.0), color, edgeFactor);

    gl_FragColor = vec4(color, 0.5);
}