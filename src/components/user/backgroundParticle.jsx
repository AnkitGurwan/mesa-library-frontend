import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const BackgroundParticle = () => {
    const options = {
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              area: 1000
            }
          },
          color: {
            // value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
            // value: ["#00ffcc", "#ffd300", "#ff0000", "#147df5"]
            value: ["#07c8f9", "#09a6f3", "#0a85ed", "#0d41e1"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 1
          },
          size: {
            value: { min: 1, max: 8 }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#808080",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1
              }
            },
            push: {
              quantity: 4
            }
          }
        }
      };
    
      const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
      }, []);
    
      return (
        <div className="">
          <Particles options={options} init={particlesInit} />
        </div>
      );
}
 
export default BackgroundParticle;