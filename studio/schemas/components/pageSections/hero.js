export default {
  type: "object",
  name: "hero",
  title: "Hero",

  fieldsets: [
    {
      name: "basic",
      title: "Basic Settings",
      options: {
        collapsible: true, 
        collapsed: true, 
        columns: 2, 
      },
    },
    {
      name: "image",
      title: "Image Settings",
      options: {
        collapsible: true, 
        collapsed: true, 
        columns: 1, 
      },
    },
    {
      name: "details",
      title: "Detailed Settings",
      options: {
        collapsible: true, 
        collapsed: true, 
        columns: 1, 
      },
    },
  ],
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      fieldset: "basic",
      description:
        "Headings should be short & catchy, descriptive, and only a couple of words long.",
      validation: (Rule) =>
        Rule.required().error("This field is required."),
    },
    {
      name: "subheading",
      type: "string",
      title: "Sub-heading or Category",
      fieldset: "basic",
      description:
        "Sub-headings are event shorter, can be used as categories - single words that break large chunks of text.",
      validation: (Rule) =>
        Rule.required().error("This field is required."),
    },
    {
      name: "backgroundColor",
      type: "colorlist", // required
      title: "Background Color",
      description:
        "Used as the background color for the section. Use carefully as this doesn't always work well with images.",
      validation: (Rule) =>
        Rule.required().error("This field is required."),
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
      description:
        "Usually 1-2 sentences used in the heading as a lead-in to the section detail.",
      validation: (Rule) => Rule.required().error("This field is required."),

    },
    {
      name: "mainImage",
      type: "mainImage",
      title: "Main Image",
      fieldset: "image",
      description:
        "Image used in the layout e.g. hero image, feature image etc.. Other images can be included when writing the body.",
      validation: (Rule) => Rule.required().error("This field is required."),

    },
    {
      name: "buttons",
      type: "array",
      title: "Buttons",
      description:
        "Add up to 2 buttons to go to a specific internal or external page.",
      of: [
        {
          title: "Button",
          type: "button",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "subheading",
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title}`,
        subtitle: `(Hero Block)`,
      };
    },
  },
};