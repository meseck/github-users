export const usernameValidation = (username: string): string => {
  // The GitHub username constraints are:
  if (username.length > 39) {
    return 'The username must not be longer than 39 characters.';
  } else if (RegExp(/^-|-$/).test(username)) {
    return 'The username must not begin or end with a hyphen.';
  } else if (RegExp(/[^a-zA-Z\d\s\-:]/).test(username)) {
    return 'The username may only consist of letters, numbers and simple hyphens.';
  } else if (RegExp(/-{2,}/).test(username)) {
    return 'The username cannot have consecutive hyphens.';
  }
  return 'valid';
};
