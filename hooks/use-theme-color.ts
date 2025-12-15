/**
 * Learn more about dark mode:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { dark?: string },
  colorName: keyof typeof Colors.dark
) {
  const colorFromProps = props.dark;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors.dark[colorName];
  }
}
