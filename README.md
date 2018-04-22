# wp-theme-template
WordPress theme template to fire up your WP project.
Put together by Control Digital.

Fork it and use it if you like it.

## Structure
WordPress consists mostly of templates. Most of these templates are defaults that are used within the framework

### Posts
- index.php: First file that WP looks at. This is the page that initially loads and shows all of the blogposts
- home.php: This is a more clean replacement for the index.php file and also shows the blogposts
- single.php: Single page of a post

### Pages
- page.php: The default page template for the pages
- front-page.php: The homepage template for a page

### Partials
-	header.php: Template that contains the beginning of the HTML document such as `<head>` and meta tags
- footer.php: Template which contains the ending of the HTML document. Scripts can be loaded in here
- sidebar.php: Optional sidebar template for displaying a sidebar on the page
- comments.php: Optional custom comments template

### Archives
- archive.php: Overview of a post type
- category.php: Overview of post type category
- taxonomy.php: Overview of a taxonomy post type
- tag.php: Overview of tag taxonomy

### Functionality
- functions.php: All the functionality and reused functions should be placed here

### Search
- search.php: Search template to show search results

### Style
- style.css: Main style sheet which contains the info and styles of this theme
