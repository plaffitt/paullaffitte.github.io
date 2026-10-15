import './styles/paullaffitte.scss';

function initZoom() {
  const profilePicture = document.getElementById('profile-picture');

  profilePicture.innerHTML = `<div>${profilePicture.innerHTML}</div>`;
  const zoomContent = profilePicture.children[0];

  let lastMove = Date.now();
  let destination = { x: 0, y: 0 };
  let currentPosition = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0 };
  const mass = 1;
  const tension = 800;
  const friction = 70;

  function spring(value, target, velocity, deltaTime) {
    const displacement = target - value;
    const springForce = -tension * displacement;
    const dampingForce = -friction * velocity;
    const acceleration = (springForce + dampingForce) / mass;
    const newVelocity = velocity + acceleration * deltaTime;

    return {
      velocity: newVelocity,
      value: value - newVelocity * deltaTime,
    };
  }

  function move() {
    const deltaTime = (Date.now() - lastMove) / 1000;
    lastMove = Date.now();
    if (deltaTime > 0.1) {
      return requestAnimationFrame(move);
    }

    const x = spring(currentPosition.x, destination.x, velocity.x, deltaTime);
    const y = spring(currentPosition.y, destination.y, velocity.y, deltaTime);

    if (Math.abs(destination.x - currentPosition.x) < 1 && Math.abs(destination.y - currentPosition.y) < 1) {
      return requestAnimationFrame(move);
    }

    velocity = { x: x.velocity, y: y.velocity };
    currentPosition = { x: x.value, y: y.value  };
    zoomContent.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;

    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);

  profilePicture.addEventListener('mousemove', (e) => {
    const x = e.offsetX - profilePicture.offsetWidth / 2;
    const y = e.offsetY - profilePicture.offsetHeight / 2;
    destination = { x: -x / 20, y: -y / 20 };
  });

  profilePicture.addEventListener('mouseleave', () => {
    zoomContent.removeAttribute('style');
    destination = { x: 0, y: 0 };
  });
}

document.addEventListener('DOMContentLoaded', initZoom);
