import PricingTwo from '@/components/pricing'
import { checkSubscription, subscribeToApi } from '@/features/subscription/subscriptionInfoSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { AppDispatch } from '@/redux/store';
import { useParams } from 'react-router-dom'

const SubscriptionDetails = () => {

    const dispatch = useAppDispatch<AppDispatch>();
    const {apiId} : any = useParams();

    const handleSubscribe = async () => {
        console.log("rannnn")
        const result = await dispatch(subscribeToApi({ apiId, plan: "Free" }));

        if (result.meta.requestStatus === "fulfilled") {
            // Refresh subscription info after successful subscription
            await dispatch(checkSubscription(apiId));
        }
    };

  return (
    <div>
        <PricingTwo apiId={apiId} handleSubscribe={handleSubscribe}/>
    </div>
  )
}

export default SubscriptionDetails
