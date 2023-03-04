import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Link from "./Link";
import Check from "./icons/Check";
import Clipboard from "./icons/Clipboard";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", jsx);
SyntaxHighlighter.registerLanguage("scss", scss);

function BlockWrapper({ children }) {
  return <pre>{children}</pre>;
}

function InlineWrapper({ children }) {
  return <>{children}</>;
}

function CodeTag({ children }) {
  return <code>{children}</code>;
}

function HighlightedCode({ children, displayInline, language, ...props }) {
  return (
    <SyntaxHighlighter
      useInlineStyles={false}
      PreTag={displayInline ? InlineWrapper : BlockWrapper}
      CodeTag={CodeTag}
      language={language}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  );
}

function ButtonCopyToClipboard({ text, ...props }) {
  const [copied, setCopied] = useState(false);
  const onCopy = (event) => {
    event.preventDefault();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={text} {...props}>
      <Link to="#" className="copy-to-clipboard" onClick={onCopy} tabIndex={-1}>
        {copied ? <Check className="check" /> : <Clipboard className="clipboard" />}
      </Link>
    </CopyToClipboard>
  );
}

export default function Code({
  children,
  language = "html",
  display = "block",
  className,
  ...props
}) {
  const displayInline = display === "inline";

  if (displayInline) {
    return <HighlightedCode {...{ children, displayInline, language, ...props }} />;
  }

  return (
    <div className={className ? `code ${className}` : "code"}>
      <ButtonCopyToClipboard text={children.toString()} />
      <HighlightedCode {...{ children, displayInline, language, ...props }} />
    </div>
  );
}
