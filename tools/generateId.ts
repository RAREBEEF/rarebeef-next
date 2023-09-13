const generateId = () => {
  const now = Date.now();
  const dateReverse = now.toString().split("").reverse();
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < dateReverse.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex) + dateReverse[i];
  }

  return id;
};

export default generateId;
