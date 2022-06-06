exports.checker = (result) => {
  if (!result.isEmpty()) {
    const error = { ...result };
    error.name = "ValidationError";
    throw error;
  }
};
