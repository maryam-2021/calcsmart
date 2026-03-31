import os

directory = '.'
old_string = 'radiant-cendol-ef5153.netlify.app'
new_string = 'all-in-one-calculators.netlify.app'
extensions_to_check = ('.html', '.js', '.xml')

count = 0
for filename in os.listdir(directory):
    if filename.endswith(extensions_to_check):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        if old_string in content:
            new_content = content.replace(old_string, new_string)
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            print(f"Updated {filename}")

print(f"Successfully updated {count} files.")
