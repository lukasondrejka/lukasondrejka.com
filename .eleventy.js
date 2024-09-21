const eleventySass = require('eleventy-sass');
const htmlMinifier = require('html-minifier');

const inputDir = 'src';
const outputDir = 'dist';

module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy({
    [`${inputDir}/_static`]: '/',
  });

  // Compile scss files
  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function(contents, inputPath) {
        return (data) => data.page.filePathStem.replace(/^\/_scss\//, '/css/') + '.css';
      }
    },
    sass: {
      style: 'compressed',
      sourceMap: false,
    },
  });

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    } else {
      return content;
    }
  });

  return {
    dir: {
      input: inputDir,
      output: outputDir,
    },
  };
}
