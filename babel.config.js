module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

const MODULE_RESOLVER = [
  "module-resolver",
  {
    extensions: [".ts", ".tsx", ".native.ts", ".native.tsx", ".android.ts", ".android.tsx", ".ios.ts", ".ios.tsx", ".txt"],
    alias: {
      "@src": "./src",
    },
  },
];