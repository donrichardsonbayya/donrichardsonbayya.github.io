#!/usr/bin/env python3
"""
Portfolio Project Generator
A simple script to help add new projects to the portfolio website
"""

import json
import os
from datetime import datetime

def create_project_template():
    """Create a template for adding new projects"""
    
    print("🎯 Portfolio Project Generator")
    print("=" * 40)
    
    # Get project details
    project_name = input("Project Name: ").strip()
    project_description = input("Project Description: ").strip()
    
    print("\nSelect Category:")
    print("1. Engineering")
    print("2. Analytics") 
    print("3. Data Science")
    
    category_choice = input("Enter choice (1-3): ").strip()
    categories = {"1": "engineering", "2": "analytics", "3": "data-science"}
    category = categories.get(category_choice, "engineering")
    
    print("\nEnter Technologies (comma-separated):")
    technologies = [tech.strip() for tech in input().split(",")]
    
    live_url = input("Live Demo URL (optional): ").strip()
    github_url = input("GitHub Repository URL (optional): ").strip()
    
    image_path = input("Image path (assets/images/projects/): ").strip()
    if not image_path.startswith("assets/images/projects/"):
        image_path = f"assets/images/projects/{image_path}"
    
    # Generate HTML
    html_template = f'''
<div class="col-lg-4 col-md-6 mb-4 project-item" data-category="{category}" data-aos="fade-up">
    <div class="project-card">
        <div class="project-image">
            <img src="{image_path}" alt="{project_name}" class="img-fluid">
            <div class="project-overlay">
                <div class="project-links">'''
    
    if live_url:
        html_template += f'''
                    <a href="{live_url}" class="project-link" title="View Live">
                        <i class="fas fa-external-link-alt"></i>
                    </a>'''
    
    if github_url:
        html_template += f'''
                    <a href="{github_url}" class="project-link" title="GitHub">
                        <i class="fab fa-github"></i>
                    </a>'''
    
    html_template += f'''
                </div>
            </div>
        </div>
        <div class="project-content">
            <h4 class="project-title">{project_name}</h4>
            <p class="project-description">{project_description}</p>
            <div class="project-tech">'''
    
    for tech in technologies:
        html_template += f'''
                <span class="tech-tag">{tech}</span>'''
    
    html_template += '''
            </div>
        </div>
    </div>
</div>'''
    
    # Save to file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"project_{timestamp}.html"
    
    with open(filename, 'w') as f:
        f.write(html_template.strip())
    
    print(f"\n✅ Project HTML generated: {filename}")
    print("\n📋 Instructions:")
    print("1. Copy the HTML from the generated file")
    print("2. Open index.html")
    print("3. Find the projects grid section")
    print("4. Paste the HTML before the closing </div> of #projects-grid")
    print("5. Save and commit your changes")
    
    return filename

def list_existing_projects():
    """List existing projects from the HTML file"""
    try:
        with open('index.html', 'r') as f:
            content = f.read()
            
        # Simple parsing to extract project titles
        import re
        titles = re.findall(r'<h4 class="project-title">(.*?)</h4>', content)
        
        print("\n📁 Existing Projects:")
        for i, title in enumerate(titles, 1):
            print(f"{i}. {title}")
            
    except FileNotFoundError:
        print("❌ index.html not found. Make sure you're in the portfolio directory.")

def main():
    """Main function"""
    print("Welcome to the Portfolio Project Generator!")
    print("\nWhat would you like to do?")
    print("1. Add a new project")
    print("2. List existing projects")
    print("3. Exit")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == "1":
        create_project_template()
    elif choice == "2":
        list_existing_projects()
    elif choice == "3":
        print("👋 Goodbye!")
    else:
        print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
