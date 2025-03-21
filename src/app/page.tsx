'use client'
import Particles from '@/blocks/Backgrounds/Particles/Particles'
import SplitText from '@/blocks/TextAnimations/SplitText/SplitText'
import { easeInOut } from 'framer-motion'
import { FormRegister } from './_components/FormRegister'

export default function Home() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <div className="bg-opacity-40 absolute top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5">
        <SplitText
          text="Welcome to Space Bytes Delivery!"
          className="text-center text-2xl font-semibold text-[#00D8FF] md:text-5xl"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing={easeInOut}
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <FormRegister />
      </div>

      <Particles
        particleColors={['#00d8ff', '#00d8ff']}
        particleCount={600}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  )
}
