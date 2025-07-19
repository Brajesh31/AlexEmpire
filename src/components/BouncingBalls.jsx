import { useEffect, useRef } from "react";

const BouncingBalls = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.5;
    const friction = 0.8;
    const balls = [];

    const colors = ["#FFD700", "#E6BE8A", "#DAA520", "#B8860B", "#FFCC00", "#FF5733", "#3498DB", "#9B59B6", "#2ECC71", "#F1C40F"];

    class Ball {
      constructor(x, y, radius, color, velocity, bouncy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.bouncy = bouncy;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x - this.radius / 4,
          this.y - this.radius / 4,
          this.radius / 5,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, "#ffffffcc");
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, "#00000099");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        if (this.y + this.radius + this.velocity.y >= canvas.height) {
          this.velocity.y = -this.velocity.y * friction;
          if (!this.bouncy && Math.abs(this.velocity.y) < 1) {
            this.velocity.y = 0;
          }
        } else {
          this.velocity.y += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.bouncy) {
          this.velocity.y -= Math.random() * 0.2;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
      }
    }

    function drawBackground() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = "rgba(255, 215, 0, 0.2)"; // Faint gold
        ctx.lineWidth = Math.random() * 2;
        ctx.stroke();
        ctx.closePath();
      }
    }

    function init() {
      drawBackground();
      for (let i = 0; i < 30; i++) {
        let radius = Math.random() * 50 + 10;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height / 4);
        let color = colors[Math.floor(Math.random() * colors.length)];
        let velocity = { x: (Math.random() - 0.5) * 4, y: Math.random() * 5 };
        let bouncy = Math.random() < 0.3;

        balls.push(new Ball(x, y, radius, color, velocity, bouncy));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      drawBackground();
      balls.forEach((ball) => ball.update());
    }

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      balls.length = 0;
      init();
    });

    init();
    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }}></canvas>;
};

export default BouncingBalls;
