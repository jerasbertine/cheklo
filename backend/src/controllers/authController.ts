import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { registerSchema } from "../validators/auth.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { loginSchema } from "../validators/auth.js";
import { verifyPassword } from "../utils/password.js";

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);


  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues});
    return;
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    res.status(409).json({ error: "Email already in use" });
    return;
  }

  const passwordHash = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({ email, passwordHash})
    .returning({ id: users.id, email: users.email});

  if (!newUser) {
    res.status(500).json({ error: "Failed to create user"});
    return;
  }

  const token = generateToken({ userId: newUser.id});

  res.status(201).json({user: newUser, token});
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const isPasswordValid = await verifyPassword(password, existingUser.passwordHash);

  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken({ userId: existingUser.id});

  res.json({user: { id: existingUser.id, email: existingUser.email }, token});
}