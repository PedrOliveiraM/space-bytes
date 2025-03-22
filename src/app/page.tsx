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
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
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

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center justify-center gap-5 py-10">
        <SplitText
          text="Bem Vindo ao Space Bytes Delivery!"
          className="text-center text-2xl font-semibold text-[#00D8FF] md:text-5xl"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing={easeInOut}
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <SplitText
          text="Cadastro de endereço!"
          className="text-center text-2xl font-semibold text-[#00D8FF] md:text-3xl"
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
    </div>
  )
}
