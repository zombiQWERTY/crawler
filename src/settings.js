import convict from "convict";

const config = convict({
  locations: {
    doc: "Locations. As array",
    default: []
  },
  repos: {
    doc: "Repos. As string",
    default: ""
  },
  language: {
    doc: "Language. As string",
    default: ""
  },
  type: {
    doc: "Type. As string. Users only available",
    default: "Users"
  },
  selector: {
    doc: "selector. As array.",
    default: []
  },
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  }
});

const env = config.get("env");
config.loadFile(`./config/${env}.json`);
config.validate({ allowed: "strict" });

export const getSettings = () => config;
