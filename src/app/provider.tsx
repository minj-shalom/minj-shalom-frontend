"use client";

import { ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { MainErrorFallback } from "@/components";
import { queryConfig } from "@/configs";
import { globalAntTheme, GlobalStyle, theme } from "@/styles";
import "@/assets/index.css";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <ConfigProvider theme={globalAntTheme}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </ConfigProvider>
  );
};
