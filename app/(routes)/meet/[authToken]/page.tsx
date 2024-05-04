import ConferenceProviderWrapper from "../_components/conference-provider-wrapper";

export default function Meet({params}:{params: { authToken: string}}){
    return(
    <ConferenceProviderWrapper authToken={params.authToken}/>
);
}
