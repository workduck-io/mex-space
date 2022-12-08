/**
  :root {
    --shadow-color: 205deg 8% 62%;

    --shadow-elevation-low:
      0px 0.8px 1px hsl(var(--shadow-color) / 0.29),
      0px 2.7px 3.3px -1.7px hsl(var(--shadow-color) / 0.42);

    --shadow-elevation-medium:
      0px 0.8px 1px hsl(var(--shadow-color) / 0.27),
      0px 4px 5px -0.9px hsl(var(--shadow-color) / 0.35),
      0px 13.7px 17px -1.7px hsl(var(--shadow-color) / 0.43);

    --shadow-elevation-high:
      0px 0.8px 1px hsl(var(--shadow-color) / 0.31),
      0px 7.3px 9px -0.4px hsl(var(--shadow-color) / 0.36),
      0px 15.9px 19.7px -0.9px hsl(var(--shadow-color) / 0.41),
      0px 32.2px 39.8px -1.3px hsl(var(--shadow-color) / 0.46),
      -0.1px 61.9px 76.6px -1.7px hsl(var(--shadow-color) / 0.52);
  }
 */

/**
 * Generates the shadows palette
 * @param color The color of the shadows, provide in string hsl  Ex: '234deg 36% 7%'
 */
export const shadows = (color: string) => ({
  color,
  small: `0px 0.8px 1px hsl(${color} / 0.29), 0px 2.7px 3.3px -1.7px hsl(${color} / 0.42)`,
  medium: `0px 0.8px 1px hsl(${color} / 0.27), 0px 4px 5px -0.9px hsl(${color} / 0.35), 0px 13.7px 17px -1.7px hsl(${color} / 0.43)`,
  large: `0px 0.8px 1px hsl(${color} / 0.31), 0px 7.3px 9px -0.4px hsl(${color} / 0.36), 0px 15.9px 19.7px -0.9px hsl(${color} / 0.41), 0px 32.2px 39.8px -1.3px hsl(${color} / 0.46), -0.1px 61.9px 76.6px -1.7px hsl(${color} / 0.52)`
})
