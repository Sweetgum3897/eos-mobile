import { getDefaultConfig } from "expo/metro-config";
import type { MetroConfig } from "metro-config";

const defaultConfig = getDefaultConfig(__dirname);

const config: MetroConfig = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    resolverMainFields: ["react-native", "browser", "main"],
  },
};

export default config;
