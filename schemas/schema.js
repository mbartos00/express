import { object, string, number, date } from "yup";
import { parse } from "date-fns";

const dateValidator = date()
  .transform((value, originalValue) => {
    if (typeof originalValue === "string") {
      try {
        const parsedDate = parse(originalValue, "yyyy-MM-dd", new Date());
        return parsedDate;
      } catch (error) {
        console.error("Invalid date format", error);
        return null;
      }
    }
    return value;
  })
  .typeError("Please enter a valid date")
  .min(new Date("1920-01-01"), "Date is too early")
  .max(new Date(), "Date can't be in the future");

export const createUserSchema = object({
  username: string()
    .min(2)
    .max(32)
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed for the username")
    .required(),
  id: string().length(32).required(),
});

export const createExerciseSchema = object({
  userId: string().length(32, "Please provide a valid user id").required(),
  description: string().min(2).max(255).required(),
  duration: number().positive().required(),
  date: dateValidator,
});

export const getExerciseListSchema = object({
  userId: string().length(32, "Please provide a valid user id").required(),
  from: dateValidator,
  to: dateValidator,
  limit: number().positive().max(100),
});
