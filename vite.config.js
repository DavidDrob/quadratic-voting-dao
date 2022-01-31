import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default () => {
  require("dotenv").config({ path: `./.env` });
  // access config with import.meta.env.{configName}

  return defineConfig({
    plugins: [vue()],
  });
};
