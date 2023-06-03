const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)
  
  // To enable merging of tags
  eleventyConfig.setDataDeepMerge(true)

  // Copy these static files to _site folder
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')

  // To create a filter to determine duration of post
  eleventyConfig.addFilter('readTime', (value) => {
    const content = value
    const textOnly = content.replace(/(<([^>]+)>)/gi, '')
    const readingSpeedPerMin = 450
    return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
  })

  // filter to format post date to year-month-day
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
  })

  // Custom collections
  const now = new Date();

  // Creates a const for all posts that are not drafts and publish date is either today or earlier.
  const livePosts = project => project.date <= now && !project.data.draft;

  eleventyConfig.addCollection("project", collection => {
    return [
      ...collection.getFilteredByGlob("./src/posts/projects/*.md").filter(livePosts)
    ].reverse();
  });

  eleventyConfig.addCollection("hobby", collection => {
    return [
      ...collection.getFilteredByGlob("./src/posts/hobby/*.md").filter(livePosts)
    ].reverse();
  });


  const md = markdownIt({ html: true, linkify: true })
  // md.use(markdownItAnchor, { 
  //   level: [1, 2], 
  //   permalink: markdownItAnchor.permalink.headerLink({ 
  //     safariReaderFix: true,
  //     class: 'header-anchor',
  //   })
  // })
  eleventyConfig.setLibrary('md', md)

  // creates a shortcode that allows inserting images with alt-texts. Usage {% asset_img 'imagename','alt-text' %}
  // you can pass an optional third argument to give the image a custom path. defaults to /assets/img/posts/
  eleventyConfig.addShortcode('asset_img', (filename, alt, path = '/assets/img/posts/') => 
  `<img class="my-4" src="${path}${filename}" alt="${alt}" />`
  )

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk"
  }
}