import PricingTwo from "@/components/pricing";
import {
  useSubscribeToApiMutation,
  useCheckSubscriptionQuery,
} from "@/features/subscription/subscriptionApi";
import { useParams } from "react-router-dom";

const SubscriptionDetails = () => {
  const { apiId }: any = useParams();

  // RTK Query hooks
  const { data: subscriptionData, refetch } = useCheckSubscriptionQuery(apiId);
  const [subscribeToApi, { isLoading, isError, error }] =
    useSubscribeToApiMutation();

  const handleSubscribe = async () => {
    try {
      const result = await subscribeToApi({ apiId, plan: "Free" }).unwrap();
      console.log("Subscribed successfully:", result);
      // Refresh subscription info after successful subscription
      refetch();
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  return (
    <div>
      <PricingTwo
        apiId={apiId}
        handleSubscribe={handleSubscribe}
        isSubscribed={subscriptionData?.isSubscribed}
        isLoading={isLoading}
        error={isError ? error : null}
      />
    </div>
  );
};

export default SubscriptionDetails;
