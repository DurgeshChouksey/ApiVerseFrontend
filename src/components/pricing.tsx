import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

type ButtonVariant =
  | 'outline'
  | 'default'
  | 'link'
  | 'destructive'
  | 'secondary'
  | 'ghost';

const plans: {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonVariant: ButtonVariant | null | undefined;
  badge: string | null;
}[] = [
  {
    name: 'Free Tier',
    price: '$0 / mo',
    description: '100 requests per day',
    features: [
      '100 API requests/day',
      'Community support',
      'Access to public documentation',
    ],
    buttonVariant: 'outline',
    badge: null,
  },
  {
    name: 'Pro Tier',
    price: '$25 / mo',
    description: '50,000 requests per month',
    features: [
      'Everything in Free Tier',
      '50,000 API requests/month',
      'Email support',
      'API analytics dashboard',
      'Access to premium endpoints',
      'Higher rate limits',
      'API usage analytics',
      'Priority bug fixes',
    ],
    buttonVariant: 'default',
    badge: 'Popular',
  },
  {
    name: 'Enterprise Tier',
    price: '$99 / mo',
    description: 'Unlimited requests',
    features: [
      'Everything in Pro Tier',
      'Unlimited API requests',
      'Dedicated support',
      'API key management',
      'Priority access to new features',
      'SLA & uptime guarantee',
      'Custom integration assistance',
    ],
    buttonVariant: 'outline',
    badge: null,
  },
];

export default function PricingTwo({ apiId, handleSubscribe} : any) {
  return (
    <section className="not-prose relative w-full py-16 md:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            ApiVerse API Pricing Plans
          </h1>
          <p>
            ApiVerse offers flexible API pricing tiers to fit every developer and business need. Choose the plan that matches your usage and scale confidently with robust support and features.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                plan.badge ? 'border border-amber-300' : ''
              }`}
            >
              {plan.badge && (
                <span className="border-primary/20 bg-primary absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-white/20 ring-offset-1 ring-offset-gray-950/5 ring-inset">
                  {plan.badge}
                </span>
              )}

              <CardHeader>
                <CardTitle className="font-medium">{plan.name}</CardTitle>
                <span className="my-3 block text-2xl font-semibold">
                  {plan.price}
                </span>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">
                <Button onClick={handleSubscribe} asChild variant={plan.buttonVariant} className="w-full">
                  <Link to={`/playground/${apiId}`}>
                    Get Started
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
