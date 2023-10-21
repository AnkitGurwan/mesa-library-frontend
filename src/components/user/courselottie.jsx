import React from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../images/courseanimation.json'


const lottie = () => {
  return (
    <div>
        <div class="">
            <div class="">
                <Lottie
                    className='h-[200px] md:h-[400px] w-[150px] md:w-[400px]'
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