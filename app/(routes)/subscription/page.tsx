"use client";
import React, { useState, useEffect } from 'react';
import { createSubscriptionAction } from "@/actions/subscription";
import { subscriptionHandler } from "@/actions/subscription";
import { currentUserServer } from "@/lib/user-server";
import { getSubscriptionByUserAction } from "@/actions/subscription";
import { useRouter } from 'next/navigation';


// Mock subscription data
const mockSubscriptions = [
  { id: 1, name: 'Basic', price: '$10/month', features: ['5 meetings per month'], color: 'bg-blue-200' },
  { id: 2, name: 'Standard', price: '$20/month', features: ['10 meetings per month'], color: 'bg-green-200' },
  { id: 3, name: 'Premium', price: '$30/month', features: ['20 meetings per month'], color: 'bg-yellow-200' },
];
const SubscriptionScreen: React.FC =   () => {
  const user =  currentUserServer();
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [activeSubscription, setActiveSubscription] = useState<boolean>(true); 



  // Function to save selected subscription
  const saveSubscription = async () => {
    let price;
    
    if (selectedSubscription !== null  && !activeSubscription) {
      if(selectedSubscription === 0){
        price='price_1Ouu31RoFYuuQacWWbSCnQsF'
      }
      else if(selectedSubscription === 1){
        price='price_1Ouu3MRoFYuuQacWKfC8GZPp';
      }
      else{
        price='price_1Ouu3mRoFYuuQacWqFGMFY0L';
      }
      const result = await subscriptionHandler({
        price:price,
      });
      if (result.url!==null) {

        router.push(result.url);
      }
      console.log(result)
      if (result == null) {  
        console.log("Result is null")
        return null;
      }

      if ('error' in result) {
        console.error('Error sending message:', result.error);
        // Handle error, show a notification, etc.
      }
    }
    else {
      setError('You already have an active subscription.');
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if(user){
          console.log(user)
          const response = await getSubscriptionByUserAction();
          console.log(response);
          if (response && response.status === 'active') {
            setActiveSubscription(true);
          }
          else{
            setActiveSubscription(false);
          }
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setError('Failed to fetch subscription. Please try again.');
        setActiveSubscription(false);

      }
    };
    fetchSubscription();
  }, [user]);

  return (
    <div className="container mx-auto py-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Choose a Subscription</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockSubscriptions.map((subscription, index) => (
          <div key={subscription.id} className={`border border-gray-300 rounded p-4 ${subscription.color}`}>
            <h3 className="text-lg font-semibold mb-2">{subscription.name}</h3>
            <p className="text-gray-600 mb-2">{subscription.price}</p>
            <ul className="list-disc ml-4">
              {subscription.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-sm">{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedSubscription(index)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {selectedSubscription !== null && (
        <div className="mt-8 border border-gray-300 rounded p-4 bg-white">
          <h3 className="text-lg font-semibold mb-2">Selected Subscription</h3>
          <p>Name: {mockSubscriptions[selectedSubscription].name}</p>
          <p>Price: {mockSubscriptions[selectedSubscription].price}</p>
          <ul className="list-disc ml-4">
            {mockSubscriptions[selectedSubscription].features.map((feature, featureIndex) => (
              <li key={featureIndex} className="text-sm">{feature}</li>
            ))}
          </ul>
          <button
            onClick={saveSubscription}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-400"
          >
            Subscribe
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SubscriptionScreen;