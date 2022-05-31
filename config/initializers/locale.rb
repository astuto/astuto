# Configure I18n to look at subfolders too
I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]

I18n.available_locales = [:en, :it]
I18n.default_locale = :en