import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
          ],
          signUpForm: {
            formFields: [
              {
                id: "accountType",
                label: "Account Type",
                inputComponent: ({ value, name, onChange }) => (
                  <div data-supertokens="inputContainer">
                    <div data-supertokens="inputWrapper ">
                        <select
                            style={{
                                border: "unset",
                                borderRadius: "6px",
                                height: "32px",
                                backgroundColor: "#fafafa",
                                color: "#757575",
                                letterSpacing: "1.2px",
                                fontSize: "14px",
                                width: "100%",
                                marginRight: "25px",
                                padding: "1px 0 1px 10px"
                            }}
                            value={value}
                            name={name}
                            onChange={(e) => onChange(e.target.value)}>
                            <option value="" disabled hidden>
                                Select an option
                            </option>
                            <option value="mentor">Mentor</option>
                            <option value="mentee">Mentee</option>
                        </select>
                    </div>
                  </div>
                ),
              }
            ]
          }
        },
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
              if (context.redirectToPath !== undefined) {
                  // we are navigating back to where the user was before they authenticated
                  return context.redirectToPath;
              }
              if (context.isNewPrimaryUser) {
                  // user signed up
                  return "/dashboard/profile";
              } else {
                  // user signed in
                  return "/dashboard/feed";
              }
          }
          return undefined;
        },
      }),
      SessionReact.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  }
}