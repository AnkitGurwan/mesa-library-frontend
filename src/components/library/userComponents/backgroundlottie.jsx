import React from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../../images/backgroundlottie.json'


const lottie = () => {
  return (
    <div>
        <div class="">
            <div class="">
                <Lottie
                    className='h-full w-full'
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