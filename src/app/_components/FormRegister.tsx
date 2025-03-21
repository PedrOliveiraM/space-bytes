import Stepper, { Step } from '@/blocks/Components/Stepper/Stepper'

export function FormRegister() {
  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step)
      }}
      onFinalStepCompleted={() => console.log('All steps completed!')}
      backButtonText="Previous"
      nextButtonText="Next"
      color="blue"
      className="mx-auto h-96 w-full max-w-md"
    >
      <Step>
        <h2>Welcome to the React Bits stepper!</h2>
        <p>Check out the next step!</p>
      </Step>
      <Step>
        <h2>Step 2</h2>
        <p>Custom step content!</p>
      </Step>
      <Step>
        <h2>How about an input?</h2>
        <input
          onChange={(e) => console.log(e.target.value)}
          placeholder="Your name?"
        />
      </Step>
      <Step>
        <h2>Final Step</h2>
        <p>You made it!</p>
      </Step>
    </Stepper>
  )
}
