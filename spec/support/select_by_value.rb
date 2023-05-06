# Helper used to select an option from a select box by its value (rather than by its text)
# Taken from: https://stackoverflow.com/a/15821255/1857435

def select_by_value(id, value)
  option_xpath = "//*[@id='#{id}']/option[@value='#{value}']"
  option = find(:xpath, option_xpath).text
  select(option, :from => id)
end