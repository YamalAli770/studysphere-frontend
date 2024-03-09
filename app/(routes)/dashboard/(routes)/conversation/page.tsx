import { currentUserServer } from '@/lib/user-server';
import Conversation from './_components/conversation';
import { fetchConversations } from '@/lib/data/conversation';



const ConversationPage = async () => {
  const user = await currentUserServer();
  let conversations;
  if (user){
   conversations = await fetchConversations(user.id);
  }
  

  return (
  <>
    {conversations && user ? (
      <Conversation 
      conversations = {conversations}
      currentUser = {user}
      />
    ): (
      <p>Loading</p>
    )}
  </>
  );
};

export default ConversationPage;

