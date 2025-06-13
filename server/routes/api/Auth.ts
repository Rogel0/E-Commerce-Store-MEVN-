import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  try {
    // 1. Get user data from request body
    const { email, password, phoneNumber, fullName, profilePicture, address } =
      req.body;

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber ? Number(phoneNumber) : undefined,
      fullName,
      profilePicture,
      address: {
        street: address?.street,
        city: address?.city,
        state: address?.state,
        zip: address?.zip ? Number(address.zip) : undefined,
      },
    });
    const savedUser = await newUser.save();

    // 5. Exclude password from response
    const userObj = savedUser.toObject();
    delete (userObj as any).password;

    // 6. Respond with the new user (without password)
    res.status(201).json(userObj);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const userObj = user.toObject();
    delete (userObj as any).password;

    res.status(200).json(userObj);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
