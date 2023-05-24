## About the project

This project is a customized version of my [11ty-blog-njk-starter](https://github.com/httpsterio/11ty-blog-njk-starter) project, which is an updated and fixed fork of [Rong Ying's starter](https://github.com/kohrongying/11ty-blog-starter).

It's built with Eleventy and Tailwind

## Start developing

Clone the repo and run `npm install` in the root folder.

Run `npm run start` to start the development server.

Open up `http://localhost:8080` to see the site.

When you edit the markdown files, njk files or css files, the server will rebuild the site and reload the browser automatically.

If you edit the `.eleventy.js` or `tailwind.config.js`, you need to restart the server for it to rebuild the settings.

## What to config

### index.njk

The `/src/index.njk` has the setting `pagination.size` for how many project posts are shown on the frontpage. The default value is 10. If you have more than 10 markdown files in `/src/posts`, it will add a page navigation at the bottom of the page.


### site.json

__```/src/_data/site.json```__ has some settings for the pages, you should also configure these.

`name` is used for the author info and some meta fields.

`url` is used for the generated sitemap.

`title` is used for the title tag and the meta title.

`description` is used for the meta description.

`github`, `twitter` and `linkedin` are used for the author info in the footer.

`toggleTheme` shows the theme toggle link in the navigation menu. If `mainMenu` is set to false, this setting is ignored.

`mainMenu` is used to show or hide the main navigation, ie. if the site is a one-pager or multi-page.

`heroSection` is used to show or hide the hero section.

`projectExcerpt` is used to determine if the front page shows the description for each project or if it'll show all the content. 

### translations.json
__```/src/_data/translations.json```__ has some key-value pairs for translating some links and text on the site.

## TODO

- [ ] Fix math in calculating how many posts should trigger pagination display.

- [x] Fix layout issue for project pages.

- [x] Fix bug where `published = false` posts are still counted in the pagination -> unpublished posts will trigger pagination when it exceeds the pagination size but the amount of posts on the frontpage remains the same. Create a new collection from the published posts and use that for the pagination.