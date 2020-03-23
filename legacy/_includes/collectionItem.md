{% for item in site[include.collection] %}
    {% assign name = item.path | split:"/" | last | split:"." | first %}
    {% if name == include.name or path == include.path%}
        {% assign collectionItem = item %}
    {% endif %}
{% endfor %}
