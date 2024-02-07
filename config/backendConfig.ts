import SuperTokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard"
import UserRoles from "supertokens-node/recipe/userroles";
import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://st-dev-559c7aa0-c420-11ee-ad67-f32c277f2e0f.aws.supertokens.io",
      apiKey: "8TlVy=cieJjF5Aon4T5YVF6PI9",
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        signUpFeature: {
          formFields: [{
              id: "accountType"
          }]
        },
        providers: [{
            config: {
                thirdPartyId: "google",
                clients: [{
                    clientId: "941452243058-bn4kg69tib0lm67v0hed6ojfv3vftnm5.apps.googleusercontent.com",
                    clientSecret: "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"
                }]
            }
        }],
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              emailPasswordSignUpPOST: async function (input) {
                if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                    throw Error("Should never come here");
                }

                let accountType = input.formFields.find((f) => f.id === "accountType")?.value as string;

                input.userContext = {
                  ...input.userContext,
                  accountType: accountType
                }

                // First we call the original implementation of signUpPOST.
                let response = await originalImplementation.emailPasswordSignUpPOST!(input);

                return response;
              }
            }
          },
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              emailPasswordSignUp: async function (input) {
                let response = await originalImplementation.emailPasswordSignUp(input);

                if(response.status === "OK" && response.user.loginMethods.length === 1) {
                  let accountType = input.userContext.accountType;
                  await UserRoles.addRoleToUser("public", response.user.id, accountType);
                }
                return response;
              }
            }
          }
        }
      }),
      SessionNode.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: async function (input) {
                let accountType = input.accessTokenPayload['st-role']['v'][0];
                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  accountType: accountType
                }
                return originalImplementation.createNewSession(input);
              }
            }
          }
        }
      }),
      UserRoles.init(),
      Dashboard.init(),
    ],
    isInServerlessEnv: true,
  }
}

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}