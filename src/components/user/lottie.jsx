import React from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../images/animation.json'


const lottie = () => {
  return (
    <div>
        <div class="flex items-start justify-center h-full">
            <div class="text-center mb-4">
                <Lottie
                    className='mb-4 mr-4 h-72 w-full'
                    loop
                    animationData={lottieJson}
                    play
                />
            </div>
            </div>

    </div>
  )
}

export default lottie;