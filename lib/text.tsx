import { Fragment } from "react";
/**
 * Replaces the \n characters to <br />.
 *
 * @param text - \n instead of <br />
 * @returns <br /> instead of \n.
 */
export function cl(text: string): any {
  const parts = text.split("\n").map((part, index) => (
    <Fragment key={index}>
      {part}
      {index !== text.split("\n").length - 1 && <br />}
    </Fragment>
  ));
  return <>{parts}</>;
}
/**
 * Replaces the page title.
 *
 * @param text - Page title
 * @returns void
 */
export function setTitle(text: any) {
  document.title = "Waultdex: " + text;
}
/**
 * Splits the text to array if exceeds 221 characters(not including &nbsp;)
 *
 * @param text - text
 * @returns string[]
 */
export function splitText(text: string): string[] {
  const words = text.split(" ");
  const wordCount = words.length;
  const limit = 50;
  if (wordCount > limit) {
    const firstPart = words.slice(0, limit).join(" ");
    const secondPart = words.slice(limit).join(" ");
    return [firstPart, secondPart];
  }
  return [text];
}
