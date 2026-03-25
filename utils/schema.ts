import { z } from "zod";
import { commonValidations } from "./validation";

// Registration schema with comprehensive validation
export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: commonValidations.email,
  password: commonValidations.password,
  address: z.object({
    company: z.string().optional(),
    addressLine: z.string().min(1, "Address line is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  })
});

// Login schema (for future use)
export const loginSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, "Password is required"),
});

// Generic validation schema (keeping existing for backward compatibility)
const schema = z.object({
  name: z.string().min(3),
  email: z.string().email()
});

export default schema;