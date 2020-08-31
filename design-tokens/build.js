const StyleDictionaryPackage = require('style-dictionary');

const OUT_DIR = 'src';

function getStyleDictionaryConfig() {
  return {
    source: ['design-tokens/src/globals/**/*.json'],
    platforms: {
      scss: {
        transformGroup: 'tokens-scss',
        buildPath: `${OUT_DIR}/`,
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/variables',
            filter: 'isToken',
          },
        ],
      },
      'icons/scss': {
        transformGroup: 'icons-scss',
        buildPath: `${OUT_DIR}/sass-variables/`,
        prefix: 'oua',
        files: [
          {
            destination: `_icons.scss`,
            format: 'scss/variables',
            filter: 'isIcon',
          },
        ],
      },
      'maps/scss': {
        transformGroup: 'maps-scss',
        transform: 'isMaps',
        buildPath: `${OUT_DIR}/sass-variables/maps/`,
        files: [
          {
            destination: `_spacers.map.scss`,
            format: 'scss/map-flat',
            mapName: 'spacers',
            filter: 'isSpacer',
          },

          {
            destination: `_bootstrap-4-grid-breakpoints.map.scss`,
            format: 'scss/map-flat',
            mapName: 'bootstrap-4-grid-breakpoints',
            filter: 'isBreakpoints',
          },
          {
            destination: `_bootstrap-4-sizes.map.scss`,
            format: 'scss/map-flat',
            mapName: 'bootstrap-4-sizes',
            filter: 'isSizes',
          },
          {
            destination: `_font-sizes.map.scss`,
            format: 'scss/map-flat',
            mapName: 'font-sizes',
            filter: 'isFontSizes',
          },
          {
            destination: `_bg-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'bg-colors',
            filter: 'isBgColors',
          },
          {
            destination: `_bootstrap-4-displays.map.scss`,
            format: 'scss/variables',
            filter: 'isDisplay',
          },
          {
            destination: `_text-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'text-colors',
            filter: 'isTextColors',
          },
          {
            destination: `_fill-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'fill-colors',
            filter: 'isFillColors',
          },
          {
            destination: `_border-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'border-colors',
            filter: 'isBorderColors',
          },
          {
            destination: `_focus-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'focus-colors',
            filter: 'isFocusColors',
          },
          {
            destination: `_hover-colors.map.scss`,
            format: 'scss/map-flat',
            mapName: 'hover-colors',
            filter: 'isHoverColors',
          },
          {
            destination: `_box-sizing.map.scss`,
            format: 'scss/map-flat',
            mapName: 'box-sizing',
            filter: 'isBoxSizing',
          },
        ],
      },
    },
  };
}

//Maps build to be simplified
StyleDictionaryPackage.registerFilter({
  name: 'isSpacer',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'spacer';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isIcon',
  matcher: function (prop) {
    return prop.type === 'icon';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isSizes',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'sizes';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isDisplay',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'displays';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isBreakpoints',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'breakpoint';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isFontSizes',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'font-sizes';
  },
});

StyleDictionaryPackage.registerFilter({
  name: 'isBgColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'bg-colors';
  },
});

StyleDictionaryPackage.registerFilter({
  name: 'isBorderColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'border-colors';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isTextColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'text-colors';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isFillColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'fill-colors';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isHoverColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'hover-colors';
  },
});
StyleDictionaryPackage.registerFilter({
  name: 'isFocusColors',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'focus-colors';
  },
});

StyleDictionaryPackage.registerFilter({
  name: 'isBoxSizing',
  matcher: function (prop) {
    return prop.group === 'map' && prop.type === 'box-sizing';
  },
});

StyleDictionaryPackage.registerFilter({
  name: 'isToken',
  matcher: function (prop) {
    return !(prop.attributes.category === 'alias' || prop.alias) && prop.group !== 'map' && prop.type !== 'icon';
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'isMaps',
  type: 'name',
  transformer: function (prop, options) {
    return [options.prefix].concat(prop.path.slice(1, prop.path.length)).join('');
  },
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-json',
  transforms: ['name/cti/camel', 'size/px', 'color/hex'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'icons-scss',
  transforms: ['name/cti/kebab', 'content/icon'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-scss',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'maps-scss',
  transforms: ['size/px'],
});

console.log('Build started...');

const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig());

StyleDictionary.buildPlatform('scss');
StyleDictionary.buildPlatform('maps/scss');
StyleDictionary.buildPlatform('icons/scss');

console.log('\nEnd processing');

console.log('\n==============================================');
console.log('\nBuild completed!');
