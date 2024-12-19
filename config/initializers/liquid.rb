require Rails.root.join('app/lib/custom_liquid_filters') # Load the custom filters module

# Register the custom filter
Liquid::Template.register_filter(CustomLiquidFilters)