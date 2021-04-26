import React from "react";

const InternalLinkRender = ({ children }) => <span>{children} 🔗</span>;

export default {
  title: "Internal link to another document",
  name: "linkInternal",
  type: "reference",
  description: "Locate a document you want to link to",
  to: [{ type: "post" }, { type: "page" },{ type: "course" }],
  blockEditor: {
    icon: () => "🔗",
    render: InternalLinkRender,
  },
};
