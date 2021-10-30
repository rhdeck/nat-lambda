import "./core";
import {
  makeAPIGatewayLambda,
  setWrapper,
} from "@raydeck/serverless-lambda-builder";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import epsagon from "epsagon";
import fetch from "cross-fetch";
let wrapper: (...args: any[]) => any = (f) => f;
const token = process.env.epsagonToken;
if (token) {
  epsagon.init({
    token,
    appName: process.env.appName || "defaultName",
    metadataOnly: !!process.env.epsagonMetaDataOnly,
  });
  wrapper = epsagon.lambdaWrapper;
}
setWrapper(wrapper);
export const recordingTester = makeAPIGatewayLambda({
  path: "/recording",
  method: "post",
  private: false,
  func: <Handler<APIGatewayProxyEvent, APIGatewayProxyResult>>(async (
    event: APIGatewayProxyEvent
  ) => {
    console.log(event);
    // const { body } = event;
    // if (!body) throw new Error("cannot make test recording");
    // const { voice, key } = <
    //   { voice: "Matthew" | "Joanna"; message: string; key: string }
    // >JSON.parse(body);
    // if (!voice || !body || !key) throw new Error("cannot make test recording");
    const result = await fetch(
      "https://hooks.zapier.com/hooks/catch/5907640/bhgumkv/",
      {
        method: "POST",
        body: JSON.stringify({ test: "this is a" }),
      }
    );
    const json = await result.json();

    return { statusCode: 200, body: JSON.stringify(json) };
  }),
});
