import z from "zod";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .trim() // ✅ automatically removes spaces at start and end
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .regex(/^[A-Za-z_]/, "Username cannot start with a number"),

    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .regex(/^[A-Za-z ]+$/, "Full name can only contain letters and spaces"),

    email: z
    .email("Please enter a valid email address")
    .min(8, "Email is too short"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
      .regex(/[0-9]/, "Password must include at least one number (0-9)")
      .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),

    confirm_password: z.string(),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password Mismatch",
    path: ["confirm_password"],
  })

.superRefine((data, ctx) => {
  const files = data.avatar as FileList | undefined;
  if (files && files.length > 0 && files instanceof FileList) {
    const file = files[0];

    if (file.size > MAX_AVATAR_SIZE) {
      ctx.addIssue({
        code: "custom",
        path: ["avatar"],
        message: `Avatar size must be less than ${
          MAX_AVATAR_SIZE / 1024 / 1024
        } MB`,
      });
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: "custom",
        path: ["avatar"],
        message: "Invalid image type",
      });
    }
  }
});

export type RegisterSchema = z.infer<typeof registerFormSchema>;

export const registerVendorShema = z.object({
  brand_email: z.email().min(3),
  brand_name: z.string().min(3),
  avatar: z.any().optional(),
});

export type RegisterVendorSchema = z.infer<typeof registerVendorShema>;


export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, "Username or email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
    .regex(/[0-9]/, "Password must contain at least one number (0-9)")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

export type LoginSchema = z.infer<typeof loginSchema>;