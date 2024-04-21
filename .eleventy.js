const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"src/assets/img": "assets/img"});

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  eleventyConfig.addFilter("renderRichTextAsHtml", (value) =>
    documentToHtmlString(value)
  );

  /** wiki links */
  /* https://www.npmjs.com/package/@photogabble/eleventy-plugin-interlinker */
  eleventyConfig.addPlugin(
    require('@photogabble/eleventy-plugin-interlinker'),
    {
      defaultLayout: 'layouts/embed.liquid'
    }
  );

  /**************** Markdown Plugins********************/
  let markdownIt = require("markdown-it");
  var markdownItAttrs = require('markdown-it-attrs');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", markdownLib);
  const markdownItRenderer = new markdownIt();

  eleventyConfig.addFilter('markdownify', (str) => {
    return markdownItRenderer.renderInline(str);
  });

  // base folder structure
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
