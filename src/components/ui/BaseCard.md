# BaseCard Component

A flexible, reusable card component that provides a consistent foundation for various card implementations across the application.

## Features

- **Flexible Layout System**: Multiple slots for header, media, content, footer, and actions
- **Dynamic Element Management**: Add or remove elements based on specific use cases
- **Consistent Design**: Maintains design consistency while accommodating variations
- **Multiple Variants**: Support for different visual styles (default, primary, secondary, outline, ghost)
- **Responsive**: Built with responsive design principles
- **Accessible**: Proper semantic HTML and ARIA support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | string | 'div' | HTML tag to render as |
| `variant` | string | 'default' | Visual variant (default, primary, secondary, outline, ghost) |
| `customClass` | string | '' | Additional CSS classes |
| `hoverable` | boolean | true | Enable hover effects |
| `group` | boolean | false | Enable group hover effects |
| `overflowHidden` | boolean | true | Hide overflow content |
| `rounded` | boolean | true | Apply rounded corners |
| `shadow` | boolean | true | Apply shadow effects |
| `header` | string | '' | Header text content |
| `title` | string | '' | Title text content |
| `description` | string | '' | Description text content |
| `footer` | string | '' | Footer text content |
| `image` | string | '' | Image source URL |
| `imageAlt` | string | '' | Image alt text |
| `imageSrcset` | string | '' | Responsive image srcset |
| `imageSizes` | string | '' | Responsive image sizes |
| `overlay` | boolean | false | Enable gradient overlay |
| `headerClass` | string | 'p-4 border-b border-border' | Header CSS classes |
| `mediaClass` | string | 'relative h-48 w-full overflow-hidden' | Media section CSS classes |
| `contentClass` | string | 'p-6 flex flex-col flex-grow' | Content section CSS classes |
| `titleClass` | string | 'text-xl font-bold text-foreground mb-3' | Title CSS classes |
| `descriptionClass` | string | 'text-muted-foreground leading-relaxed mb-6' | Description CSS classes |
| `footerClass` | string | 'p-4 border-t border-border' | Footer CSS classes |
| `actionsClass` | string | 'p-4 space-y-3' | Actions section CSS classes |

## Slots

| Slot | Description |
|------|-------------|
| `header` | Card header content |
| `media` | Custom media content (overrides default image) |
| `badge` | Badge element positioned in top-right of media |
| `media-overlay` | Overlay content positioned over media |
| `title` | Card title content |
| `description` | Card description content |
| `content` | Main card content |
| `footer` | Card footer content |
| `actions` | Action buttons or links |

## Usage Examples

### Simple Card
```vue
<BaseCard
  title="Card Title"
  description="Card description text"
/>
```

### Card with Image and Actions
```vue
<BaseCard
  title="Package Name"
  description="Package description"
  image="/path/to/image.jpg"
  imageAlt="Package image"
>
  <template #actions>
    <button class="btn-primary">Book Now</button>
    <button class="btn-secondary">Learn More</button>
  </template>
</BaseCard>
```

### Custom Styled Card (PDF Card Style)
```vue
<BaseCard
  variant="default"
  :image="pdf.thumbnail_url"
  :imageAlt="pdf.title"
  :hoverable="true"
  :group="true"
  :overlay="true"
  customClass="bg-white"
  :mediaClass="'relative h-48 w-full overflow-hidden'"
  :contentClass="'p-4'"
>
  <template #media-overlay>
    <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
      <h3 class="text-xl font-bold text-white">{{ pdf.title }}</h3>
      <p class="text-sm text-gray-300">{{ pdf.category }}</p>
    </div>
  </template>
  
  <template #actions>
    <div class="flex space-x-4">
      <button class="flex-1 bg-gold text-white py-2 px-4 rounded-md">
        Preview
      </button>
      <button class="flex-1 border border-gold text-gold py-2 px-4 rounded-md">
        Download
      </button>
    </div>
  </template>
</BaseCard>
```

### Article Card Style
```vue
<BaseCard
  tag="router-link"
  :to="articleRoute"
  variant="default"
  :image="article.image"
  :imageAlt="article.title"
  :hoverable="true"
  :group="true"
  customClass="block max-w-lg mx-auto"
  :mediaClass="'w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300'"
  :contentClass="'p-8'"
>
  <template #title>
    <h3 class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
      {{ article.title }}
    </h3>
  </template>
  
  <template #description>
    <p class="text-muted-foreground leading-relaxed mb-6">{{ article.excerpt }}</p>
  </template>
  
  <template #footer>
    <span class="inline-flex items-center text-primary font-semibold group-hover:underline">
      Read More
      <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </span>
  </template>
</BaseCard>
```

## Migration Guide

### From PDFCard.vue
Replace the custom PDFCard implementation:

```vue
<!-- Before -->
<div class="pdf-card relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl group">
  <!-- Custom implementation -->
</div>

<!-- After -->
<BaseCard
  variant="default"
  :image="itinerary.thumbnail_url"
  :imageAlt="itinerary.title"
  :hoverable="true"
  :group="true"
  :overlay="true"
  customClass="pdf-card bg-white"
>
  <!-- Use appropriate slots -->
</BaseCard>
```

### From ArticleCard.vue
Replace the custom ArticleCard implementation:

```vue
<!-- Before -->
<component :is="post.internal ? 'router-link' : 'a'" ...>
  <!-- Custom implementation -->
</component>

<!-- After -->
<BaseCard
  :tag="post.internal ? 'router-link' : 'a'"
  :to="post.internal ? articleRoute : null"
  :href="post.internal ? null : post.link"
  variant="default"
  :image="post.image"
  :imageAlt="post.title"
  :hoverable="true"
  :group="true"
>
  <!-- Use appropriate slots -->
</BaseCard>
```

### From PackageCard.vue
Replace the custom PackageCard implementation:

```vue
<!-- Before -->
<div class="bg-card border group hover:border-primary/50 transition-all duration-300 rounded-lg text-center overflow-hidden w-full">
  <!-- Custom implementation -->
</div>

<!-- After -->
<BaseCard
  variant="default"
  :image="image"
  :imageAlt="title + ' thumbnail'"
  :hoverable="true"
  :group="true"
  customClass="text-center w-full"
>
  <!-- Use appropriate slots -->
</BaseCard>
```

## Best Practices

1. **Use Slots for Flexibility**: Leverage slots for dynamic content rather than props when content structure varies
2. **Maintain Consistency**: Use consistent class patterns across different card implementations
3. **Responsive Design**: Ensure custom classes maintain responsiveness
4. **Accessibility**: Provide proper alt text for images and semantic HTML structure
5. **Performance**: Use lazy loading for images and optimize image sizes

## Component Variants

- **default**: Standard card with border and background
- **primary**: Primary color background with contrasting text
- **secondary**: Secondary color background with contrasting text
- **outline**: Transparent background with colored border
- **ghost**: No background, border, or shadow (minimal style)

## Customization

The component provides extensive customization through:
- CSS class overrides for each section
- Slot-based content structure
- Variant-based styling
- Responsive utility classes
- Custom hover and interaction effects