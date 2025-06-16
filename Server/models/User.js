import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "hr", "recruiter"], default: "hr" },
  },
  {
    timestamps: true,
  }
);

// Password hash before save
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method for password comparison (optional)
// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", UserSchema);
export default User;
