# Configure I18n to look at subfolders too
I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]

I18n.available_locales = [:en, :it, :de, :fr, :es, 'pt-BR', 'zh-CN', :ru, :vi]

# Custom pluralization rules
# Those must be mirrored in app/javascript/translations/index.js.erb
I18n::Backend::Simple.include(I18n::Backend::Pluralization)
I18n.backend.store_translations 'zh-CN', i18n: { plural: { rule: lambda { |n| :other } } } # Chinese simplified
I18n.backend.store_translations :vi, i18n: { plural: { rule: lambda { |n| :other } } } # Vietnamese