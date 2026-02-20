import fs from "fs";

const root_dir = "./src/styles";
const data = JSON.parse(fs.readFileSync(`${root_dir}/design.tokens.json`, "utf8"));

// Build a map of all token values for reference resolution
function buildTokenMap(obj, path = [], map = {}) {
  for (const key in obj) {
    const node = obj[key];
    const currentPath = [...path, key];

    if (node?.value && node?.type) {
      const tokenPath = currentPath.join(".");
      map[tokenPath] = node.value;
    }
    
    // Continue traversing even if node has a value (for nested tokens)
    if (typeof node === "object" && node !== null) {
      for (const childKey in node) {
        // Skip metadata properties
        if (childKey !== "value" && childKey !== "type" && childKey !== "description" && childKey !== "$extensions") {
          const childNode = node[childKey];
          if (typeof childNode === "object") {
            buildTokenMap({ [childKey]: childNode }, currentPath, map);
          }
        }
      }
    }
  }
  return map;
}

// Resolve token references like {global-value.color.brand.500.value}
function resolveValue(value, tokenMap) {
  if (typeof value !== "string") return value;
  
  // Match patterns like {path.to.token.value}
  const referencePattern = /\{([^}]+)\}/g;
  
  return value.replace(referencePattern, (match, reference) => {
    // Remove .value suffix from reference if present
    const cleanReference = reference.replace(/\.value$/, "");
    
    if (tokenMap[cleanReference]) {
      // Recursively resolve in case the referenced value also contains references
      return resolveValue(tokenMap[cleanReference], tokenMap);
    }
    
    // If reference not found, return original
    return match;
  });
}

const tokenMap = buildTokenMap(data);

function walk(obj, path = []) {
  let css = "";

  for (const key in obj) {
    const node = obj[key];

    if (node?.value && node?.type) {
      const name = `--${path.join("-")}-${key}`;
      const resolvedValue = resolveValue(node.value, tokenMap);
      css += `  ${name}: ${resolvedValue};\n`;
    } else if (typeof node === "object") {
      css += walk(node, [...path, key]);
    }
  }

  return css;
}

const css = `:root {\n${walk(data["global-value"])} \n${walk(data["semactic-value"])} \n${walk(data["components-value"])}}`;
fs.writeFileSync(`${root_dir}/design.tokens.css`, css);

console.log("✅ CSS variables generated successfully.");