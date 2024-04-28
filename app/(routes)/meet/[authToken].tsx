import Meeting from "./_components/meeting";
import { useRouter } from 'next/router'
export default function Page() {  
  const router = useRouter()
  return (
  //  <Meeting/>
  <p>Post: {router.query.authToken}</p>
  )
};
