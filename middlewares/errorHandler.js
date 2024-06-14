const errorHandler = (errors, req, res, next) => {
  if (errors[0]?.type === "typeError" || errors[0]?.origin === "DB") {
    res.status(400).json({ error: `Validation error: ${errors[0].message}` });
  }

  if (!errors[0].origin) {
    res.status(400).json({ error: errors[0] });
  }

  res.status(500).json({ error: "Something went wrong." });
};

export default errorHandler;
