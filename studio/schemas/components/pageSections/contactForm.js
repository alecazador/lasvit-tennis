export default {
  type: "object",
  name: "contactForm",
  title: "Contact Form",

  fieldsets: [],
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      description: "Headings for this section.",
      validation: (Rule) => Rule.error("This field is required.").required(),
    },
    {
      name: "subheading",
      type: "string",
      title: "Sub-heading or Category",
      description:
        "Sub-headings for this section - single words that break large chunks of text.",
    },
    // TODO: Future requirement to make this dynamic so that Tailwind can pick it up
    // currently not possible given webpack compiles this
    {
      name: "backgroundColor",
      type: "colorlist", // required
      title: "Background Color",
      description:
        "Background color for accents on the contact block. Use carefully as this doesn't always work well with images.",
      validation: (Rule) => Rule.warning("This field is required.").required(),
      options: {
        borderradius: {
          outer: "100%",
          inner: "100%",
        },
        list: [
          { title: "white", value: "#ffffff" },
          { title: "gray", value: "#c0ccda" },
          { title: "gray-dark", value: "#3c4858" },
          { title: "gray-darkest", value: "#1f2d3d" },
          { title: "pink", value: "#FF6A64" },
          { title: "orange", value: "#F15926" },
          { title: "teal-light", value: "#31E2E8" },
          { title: "teal", value: "#20C0D9" },
          { title: "teal-dark", value: "#01ADCA" },
          { title: "yellow", value: "#FFDE4E" },
        ],
      },
    },
    {
      name: "content",
      type: "text",
      title: "Content",
      description: "Explanatory text to use below the heading.",
    },

    // other elements included by default
  ],
  preview: {
    select: {
      title: "heading",
      disabled: "disabled",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
      };
    },
  },
};
