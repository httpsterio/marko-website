---
layout: main
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
eleventyComputed:
  title: "{{ tag }}"
---  

{% for post in collections[tag] %}
<div class="py-4 sm:py-10">
  <p>
    <span class="text-2xl sm:text-4xl font-bold hover:underline"><a href="{{ project.url }}">{{ project.data.title }}</a></span>
  </p>
  <em>{{ project.date | postDate }}</em>
  <p class="mt-4">{{ project.data.post_excerpt }}... 
    <span class="hover:underline text-indigo-500"><a href="{{ project.url }}">{{ site.translations.readMore }}</a></span>
  </p>
</div>
{% endfor %}

