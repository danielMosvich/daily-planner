let timerId = null;

export default function CountdownWorker(event){
  const { minutes, seconds } = event.data;

  let endTime = Date.now() + (minutes * 60 + seconds) * 1000;

  timerId = setInterval(() => {
    const now = Date.now();
    const timeLeft = endTime - now;
    if (timeLeft < 0) {
      clearInterval(timerId);
      postMessage({ timeLeft: 0 });
    } else {
      postMessage({ timeLeft });
    }
  }, 1000);
};