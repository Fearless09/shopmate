"use client";

import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";

type Props = ThemeProviderProps;

export const ThemeProvider = (props: Props) => {
  return <NextThemeProvider {...props} />;
};
