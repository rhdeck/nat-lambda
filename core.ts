import { setWrapper, setDefaults } from "@raydeck/serverless-lambda-builder";
import { get as registryGet } from "@raydeck/registry-manager";
import epsagon from "epsagon";
import "source-map-support/register";
//#region epsagon wrapper
if (registryGet("epsagonToken")) {
  epsagon.init({
    token: registryGet("epsagonToken"),
    appName: registryGet("appName"),
    metadataOnly: !!registryGet("epsagonMetaDataOnly"),
  });
  setWrapper(epsagon.lambdaWrapper);
}
//#endregion
//#region role
setDefaults({ role: "MainRole", timeout: 5 });
//#endregion
