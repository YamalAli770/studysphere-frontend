// import Meeting from "./_components/meeting";
export default function Meet({params}:{params: { authToken: string}}){
    //  <Meeting/>
    return(<h1>auth Token {params.authToken}</h1>);
}
