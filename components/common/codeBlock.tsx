import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code,
  customStyle,
}: {
  code: string;
  customStyle: React.CSSProperties;
}) {
  return (
    <SyntaxHighlighter
      customStyle={customStyle}
      language="html"
      style={vscDarkPlus}
    >
      {code}
    </SyntaxHighlighter>
  );
}
