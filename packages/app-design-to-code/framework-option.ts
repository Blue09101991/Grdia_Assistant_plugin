import { Framework } from "@grida/builder-platform-types";

export enum Language {
  jsx = "jsx",
  tsx = "tsx",
  dart = "dart",
  html = "html",
}

export type ReactStylingStrategy = "css" | "styled-components" | "css-in-jsx";

export interface FlutterOption {
  framework: Framework.flutter;
  language: Language.dart;
}

export interface ReactOption {
  framework: Framework.react;
  language: Language.jsx | Language.tsx;
  styling: ReactStylingStrategy;
}

export interface VanillaOption {
  framework: Framework.vanilla;
  language: Language.html;
}

export type FrameworkOption = ReactOption | FlutterOption | VanillaOption;

export const react_presets = {
  react_default: <ReactOption>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "styled-components",
  },
  react_with_styled_components: <ReactOption>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "styled-components",
  },
  react_with_css_in_jsx: <ReactOption>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "css-in-jsx",
  },
  react_with_css: <ReactOption>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "css",
  },
};

export const flutter_presets = {
  flutter_default: <FlutterOption>{
    framework: Framework.flutter,
    language: Language.dart,
  },
};

export const vanilla_presets = {
  vanilla_default: <VanillaOption>{
    framework: Framework.vanilla,
    language: Language.html,
  },
};

export const presets = {
  react: react_presets,
  flutter: flutter_presets,
  vanilla: vanilla_presets,
};

export const all_preset_options__prod = [
  flutter_presets.flutter_default,
  react_presets.react_default,
  react_presets.react_with_styled_components,
  vanilla_presets.vanilla_default,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
];

export const all_preset_options_map__prod = {
  none: null,
  flutter_default: flutter_presets.flutter_default,
  react_default: react_presets.react_default,
  react_with_styled_components: react_presets.react_with_styled_components,
  vanilla_default: vanilla_presets.vanilla_default,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
};

export const lang_by_framework = {
  flutter: [Language.dart],
  react: [Language.jsx, Language.tsx],
  vanilla: [Language.html],
};

export const react_styles: ReactStylingStrategy[] = [
  "styled-components",
  "css-in-jsx",
  "css",
];

export const getpreset = (preset_name: string): FrameworkOption => {
  const _p = all_preset_options_map__prod[preset_name];
  if (_p) {
    return _p;
  }
  throw `"${preset_name}" is not a valid platform preset key`;
};

export const getDefaultPresetNameByFramework = (frameowrk: Framework) => {
  switch (frameowrk) {
    case Framework.flutter:
      return "flutter_default";
    case Framework.react:
      return "react_default";
    case Framework.vanilla:
      return "vanilla_default";
  }
};

export const getDefaultPresetByFramework = (frameowrk: Framework) => {
  return getPresetByName(getDefaultPresetNameByFramework(frameowrk));
};

export function getPresetByName(name: string) {
  return all_preset_options_map__prod[name];
}
