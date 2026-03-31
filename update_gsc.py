import os

directory = '.'
old_string = 'vlq0h42e0Vv2XxJQoYxQ7EQVFrY3AMs9PqJ5OA1WpT8'
new_string = 'fII78qQyW_SG17i4NZEG2jaoV1cdlCNkUe_a0m7W9Iw'
extensions_to_check = ('.html',)

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

print(f"Successfully updated {count} files with new GSC tag.")
