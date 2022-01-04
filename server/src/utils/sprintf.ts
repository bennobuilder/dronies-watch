// https://stackoverflow.com/questions/3318621/javascript-how-to-have-value-in-string-represented-by-s-and-then-replaced-with/35754033
export function sprintf(template: string, ...values: string[]) {
  return template.replace(/%s/g, () => {
    return values.shift() || 'NOT_DEFINED';
  });
}
