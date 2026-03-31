import os
import re

dir_path = './'

html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

for file in html_files:
    if file == 'index.html':
        continue # Skipped since we already handled it
        
    filepath = os.path.join(dir_path, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract title and description
    title_match = re.search(r'<title>(.*?)</title>', content)
    desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    
    if title_match and desc_match:
        title = title_match.group(1)
        desc = desc_match.group(1)
        
        # Check if schema already exists to prevent duplicate injections
        if 'application/ld+json' not in content:
            schema = f'''
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{title.split('|')[0].strip()}",
  "description": "{desc}",
  "applicationCategory": "Utility",
  "operatingSystem": "All"
}}
</script>
</head>'''
            # Replace </head> with the new schema + </head>
            content = content.replace('</head>', schema)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected SEO Schema into {file}")

print("SEO Injection Complete!")
