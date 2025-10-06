import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/70 shadow-primary/10 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_var(--primary)]">
          <div className="relative z-10 grid gap-0 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-primary">
                GET STARTED WITH API'VERSE
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Ready to{' '}
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  Elevate
                </span>{' '}
                Your API Experience?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Explore, test, and manage APIs seamlessly with API'VERSE. Unlock the power of instant API access and efficient subscription management.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-full bg-[#0A0F2C] p-2 text-[pink]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 10L9 11.5L12.5 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Discover APIs Instantly
                    </h3>
                    <p className="text-muted-foreground">
                      Browse an extensive catalog of APIs across multiple categories.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-full bg-[#0A0F2C] p-2 text-[pink]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 10L9 11.5L12.5 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Test APIs Instantly
                    </h3>
                    <p className="text-muted-foreground">
                      Make real-time API calls and test responses directly in the platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 rounded-full bg-[#0A0F2C] p-2 text-[pink]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 10L9 11.5L12.5 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Secure Your API Keys
                    </h3>
                    <p className="text-muted-foreground">
                      Manage and protect your API keys with advanced security features.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-transparent text-foreground p-8 md:p-12 lg:p-16">
              <div className="absolute top-0 right-0 h-full w-full opacity-10"></div>
              <div className="relative z-10">
                <h3 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                  Don&apos;t Miss Out On The Future of API Integration
                </h3>
                <p className="mb-8 text-muted-foreground">
                  Streamline your development process and accelerate innovation with API'VERSE.
                </p>

                <div className="mt-10 rounded-xl border border-primary/20 bg-background/70 p-6 backdrop-blur-md shadow-primary/10 shadow-xl">
                  <p className="text-lg font-medium">
                    &quot;API'VERSE transformed how we discover and manage APIs, making integration effortless and secure.&quot;
                  </p>
                  <p className="mt-3 font-medium text-muted-foreground">
                    — Alex Johnson, CTO, Tech Innovators Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
