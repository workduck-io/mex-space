import {
  PlatePluginComponent,
  PlatePlugin,
  createPlugins,
  createPlateUI,
} from '@udecode/plate';
import { generatePlugins } from '../plugins';

export const usePlugins = (
  components: Record<string, PlatePluginComponent<any | undefined>> = {},
  withMexPlugins: boolean,
  customPlugins?: Array<PlatePlugin>,
  comboboxPlugin?: PlatePlugin
) => {
  const getPlugins = (
    plugins: Array<PlatePlugin>,
    components: Record<string, PlatePluginComponent<any | undefined>>
  ) => {
    if (comboboxPlugin) {
      plugins.push(comboboxPlugin);
    }
    return createPlugins(plugins, {
      components: createPlateUI(components),
    });
  };

  const plugins = getPlugins(
    customPlugins ?? generatePlugins(withMexPlugins),
    components
  );

  return {
    plugins,
  };
};
