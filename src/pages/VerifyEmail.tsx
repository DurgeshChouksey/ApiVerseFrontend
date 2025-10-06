import React from 'react'

import AnimatedBtn1 from '@/components/mvpblocks/animated-btn1'
import { OtpInput } from '@/components/otp-input'
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const VerifyEmail = () => {
  return (
      <div className='rose-gradient bg-background h-screen grid justify-center items-center'>
        <div className="from-background absolute -top-10 left-0 h-1/2 w-full rounded-b-full bg-gradient-to-b to-transparent blur"></div>
        <div className="from-primary/80 absolute -top-64 left-0 h-1/2 w-full rounded-full bg-gradient-to-b to-transparent blur-3xl"></div>
        <Card className={`border-border/70 bg-card/20 w-full shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none`}>
              <CardContent className="space-y-6 p-8">
                <div className='flex flex-col items-center px-3 sm:px-10 py-5 rounded-sm'>
                  <h1 className='mb-2 text-2xl font-bold text-foreground dark:'>Verify Email</h1>
                  <OtpInput />
                  <AnimatedBtn1 action={() => {
                  }} >
                    Submit
                  </AnimatedBtn1>
                </div>
              </CardContent>
          </Card>
      </div>
  )
}

export default VerifyEmail
