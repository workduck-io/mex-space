import { RenderFunction } from '@udecode/plate';

export interface ComboboxKeyDownConfig {
  keys: Record<string, ComboboxItemType>;
  slashCommands: Record<string, SlashCommandConfig>;
}

export interface ComboboxOnChangeConfig {
  key: string;
  trigger: string;
  data: Array<any>;
  icon: string;
}

export interface SlashCommandConfig {
  command: string;
  slateElementType: string;
  options?: any;
  getData?: (element: any) => Record<string, any>;
}

export interface IComboboxItem {
  /**
   * Arbitrary string associated with this option.
   */
  key: string;

  /**
   * Text to render for this option
   */
  text: any;

  /**
   * Text to render for this option
   */
  itemType?: ComboboxItemType;

  /**
   * Icon to be rendered
   */
  icon?: string;

  /**
   * Icon to be rendered on the right
   */
  rightIcons?: string[];

  /**
   * description text if any
   */
  desc?: string;

  /**
   * Whether the option is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Data available to onRenderItem.
   */
  data?: unknown;
}

export enum ComboboxElementType {
  Normal = 0,
  Divider = 1,
  Header = 2,
}

export interface ComboboxItemProps {
  item: any;
}

export interface ComboboxItemType {
  slateElementType: string;
  onCreate: (item: string, options: { parentId?: string }) => void;
  itemRenderer: RenderFunction<ComboboxItemProps>;
}

export interface ComboboxConfig {
  onKeyDownConfig: ComboboxKeyDownConfig;
  onChangeConfig: ComboboxOnChangeConfig;
}
