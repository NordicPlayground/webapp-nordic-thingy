// Converts a number representing a color into an RGB value
export const colorToRgb = (color) => {
  let rgb;
  switch (color) {
  case 1:
    rgb = {red: 255, green: 0, blue: 0};
    break;
  case 2:
    rgb = {red: 0, green: 128, blue: 0};
    break;
  case 3:
    rgb = {red: 255, green: 255, blue: 0};
    break;
  case 4:
    rgb = {red: 0, green: 0, blue: 255};
    break;
  case 5:
    rgb = {red: 128, green: 0, blue: 128};
    break;
  case 6:
    rgb = {red: 0, green: 255, blue: 255};
    break;
  case 7:
    rgb = {red: 255, green: 255, blue: 255};
    break;
  default:
    rgb = {red: 0, green: 255, blue: 255};
  }
  return rgb;
};

// Converts an RGB value into a number representing a color
export const rgbToColor = (rgb) => {
  let color;
  switch (true) {
  case rgb.red === 255 && rgb.green === 0 && rgb.blue === 0:
    color = 1;
    break;
  case rgb.red === 0 && rgb.green === 128 && rgb.blue === 0:
    color = 2;
    break;
  case rgb.red === 255 && rgb.green === 255 && rgb.blue === 0:
    color = 3;
    break;
  case rgb.red === 0 && rgb.green === 0 && rgb.blue === 255:
    color = 4;
    break;
  case rgb.red === 128 && rgb.green === 0 && rgb.blue === 128:
    color = 5;
    break;
  case rgb.red === 0 && rgb.green === 255 && rgb.blue === 255:
    color = 6;
    break;
  case rgb.red === 255 && rgb.green === 255 && rgb.blue === 255:
    color = 7;
    break;
  default:
    color = undefined;
  }

  return color;
};
