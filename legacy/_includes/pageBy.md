{% for arg in include %}
	{% assign field = arg[0] %}
	{% assign needle = arg[1] %}
	{% for page in site.pages %}
		{% if page[field] == needle %}
			{{ page.content }}
		{% endif %}
	{% endfor %}
{% endfor %}
