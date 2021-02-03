import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring'

const translation = (x, y) => `translate(${x / 20}px,${y / 20}px)`
const ProfilePicture = ({ picture, fullname}) => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 800, friction: 70 } }))
  const imgRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const calc = (x, y) => dimensions ? [-(x - dimensions.width / 2), -(y - dimensions.height / 2)] : [0, 0]

  useEffect(() => {
    if (imgRef.current) {
      setDimensions({
        height: imgRef.current.offsetHeight,
        width: imgRef.current.offsetWidth,
      });
    }
  }, [imgRef]);

  return (
    <div
      id="profile-picture"
      className="zoom mb-3"
      onMouseMove={ ({ offsetX: x, offsetY: y }) => set({ xy: calc(x, y) }) }
      onMouseLeave={ () => set({ xy: [0, 0] }) }
    >
      <animated.div  style={{ transform: props.xy.interpolate(translation) }}>
        <img src={ picture } alt={ fullname } ref={ imgRef } />
      </animated.div>
    </div>
  )
}

export default ProfilePicture;