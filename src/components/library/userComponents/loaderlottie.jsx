import React from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../../images/loaderanimation.json'


const lottie = () => {
  return (
    <div className='h-full'>
        <div class="h-full flex justify-center items-center">
                <Lottie
                    className='h-[200px] md:h-[500px] w-[200px] md:w-[500px]'
                    loop
                    animationData={lottieJson}
                    play
                />
            </div>

    </div>
  )
}

export default lottie;