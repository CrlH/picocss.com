import { colorFamilies, colorShades } from "~/data/colors";

// Get the indexes of the color family and shade
export const getColorIndexes = (color) => {
  return {
    familyIndex: colorFamilies.indexOf(color.family),
    shadeIndex: colorShades.indexOf(color.shade),
  };
};

// Get the next color
export const getNextColor = (color) => {
  const { familyIndex, shadeIndex } = getColorIndexes(color);
  return {
    family:
      shadeIndex === colorShades.length - 1
        ? colorFamilies[familyIndex + 1] || colorFamilies[0]
        : color.family,
    shade: colorShades[shadeIndex + 1] || colorShades[0],
  };
};

// Get the previous color
export const getPreviousColor = (color) => {
  const { familyIndex, shadeIndex } = getColorIndexes(color);
  return {
    family:
      shadeIndex === 0
        ? colorFamilies[familyIndex - 1] || colorFamilies[colorFamilies.length - 1]
        : color.family,
    shade: colorShades[shadeIndex - 1] || colorShades[colorShades.length - 1],
  };
};

// Get the hex value from the color family and shade using getComputedStyle
export const getHexValue = (color) => {
  if (typeof window !== "undefined") {
    const computedStyle = window.getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(`--pico-color-${color.family}-${color.shade}`).trim();
  }
  return null;
};
