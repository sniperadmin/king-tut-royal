-- Compatibility view: section_templates from component_templates
CREATE OR REPLACE VIEW section_templates AS
SELECT 
  id,
  name,
  type AS category, -- map 'type' to 'category' expected by edge function
  default_props AS template,
  preview_image,
  is_active,
  created_at
FROM component_templates;
