import { theme as antTheme, ThemeConfig } from "antd";
import { theme } from "./theme";

export const globalAntTheme: ThemeConfig = {
  algorithm: antTheme.darkAlgorithm,
  token: {
    colorPrimary: theme.colors.cyan,
    colorBgBase: theme.colors.ink,
    colorTextBase: theme.colors.ice,
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, "Segoe UI", sans-serif',
  },
  components: {},
};
