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
const SubscriptionScreen: React.FC = () => {
  const user = currentUserServer();
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [activeSubscription, setActiveSubscription] = useState<boolean>(true);



  // Function to save selected subscription
  const saveSubscription = async () => {
    let price;
    let plan;

    if (selectedSubscription !== null && !activeSubscription) {
      if (selectedSubscription === 0) {
        price = 'price_1Ouu31RoFYuuQacWWbSCnQsF'
        plan = 'Basic'
      }
      else if (selectedSubscription === 1) {
        price = 'price_1Ouu3MRoFYuuQacWKfC8GZPp';
        plan = 'Standard'
      }
      else {
        price = 'price_1Ouu3mRoFYuuQacWqFGMFY0L';
        plan='Premium'
      }
      const result = await subscriptionHandler({
        price: price,
      });
      if (result.url !== null) {

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
      const response = await createSubscriptionAction(plan);

    }
    else {
      setError('You already have an active subscription.');
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if (user) {
          console.log(user)
          const response = await getSubscriptionByUserAction();
          console.log(response);
          if (response && response.status === 'active') {
            setActiveSubscription(true);
          }
          else {
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
    <div className="container mx-auto py-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Choose a Subscription</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockSubscriptions.map((subscription, index) => (
          <div key={subscription.id} className="flex justify-center items-center">
            <div className="rounded-xl p-4 bg-gray-100/70 hover:bg-white hover:shadow-xl duration-500 border border-gray-300 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2 text-center">{subscription.name}</h3>
              <p className="text-gray-600 mb-2 text-center">{subscription.price}</p>
              <ul className="list-disc ml-4 text-center list-none">
                {subscription.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm">{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedSubscription(index)}
                className="mt-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-800 w-full"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedSubscription !== null && (
        <div className="mt-8 flex justify-center items-center">
          <div className="rounded-xl p-4 bg-gray-100/70 hover:bg-white hover:shadow-xl duration-500 border border-gray-300 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2 text-center">Selected Subscription</h3>
            <p className="text-gray-600 mb-2 text-center">Name: {mockSubscriptions[selectedSubscription].name}</p>
            <p className="text-gray-600 mb-2 text-center">Price: {mockSubscriptions[selectedSubscription].price}</p>
            <ul className="list-disc ml-4 text-center list-none">
              {mockSubscriptions[selectedSubscription].features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-sm">{feature}</li>
              ))}
            </ul>
            <button
              onClick={saveSubscription}
              className="mt-4 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-800 w-full"
            >
              Subscribe
            </button>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionScreen;