import { listen } from "./app.mjs";

const PORT = process.env.PORT || 5000;
listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
