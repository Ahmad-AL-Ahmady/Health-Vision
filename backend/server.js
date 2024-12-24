const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

// تأكد من وجود المتغيرات قبل استخدامها
const DB = process.env.DATABASE
  ? process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
  : "";

// اضف console.log للتحقق من القيم
console.log("Checking environment variables:");
console.log("DATABASE exists:", !!process.env.DATABASE);
console.log("DATABASE_PASSWORD exists:", !!process.env.DATABASE_PASSWORD);
console.log("Final DB string:", DB);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("DB connection error:", err));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
