/**
 * @type {import('contentful-migration').MigrationFunction} MigrationFunction
 */
module.exports = function (migration) {
  const componentSeo = migration
    .createContentType('componentSeo')
    .name('💎 component - SEO')
    .description('To have SEO-related properties in the pages we render')
    .displayField('internalName');
  componentSeo
    .createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  componentSeo
    .createField('pageTitle')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  componentSeo
    .createField('pageDescription')
    .name('Page description')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  componentSeo
    .createField('canonicalUrl')
    .name('Canonical URL')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  componentSeo
    .createField('nofollow')
    .name('nofollow')
    .type('Boolean')
    .localized(false)
    .required(true)
    .validations([])
    .defaultValue({
      'en-US': false,
    })
    .disabled(false)
    .omitted(false);

  componentSeo
    .createField('noindex')
    .name('noindex')
    .type('Boolean')
    .localized(false)
    .required(true)
    .validations([])
    .defaultValue({
      'en-US': false,
    })
    .disabled(false)
    .omitted(false);

  componentSeo
    .createField('shareImages')
    .name('Share images')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 3,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    });

  componentSeo.changeFieldControl('internalName', 'builtin', 'singleLine', {});

  componentSeo.changeFieldControl('pageTitle', 'builtin', 'singleLine', {
    helpText: 'Sets the meta title of the page.',
  });

  componentSeo.changeFieldControl('pageDescription', 'builtin', 'multipleLine', {
    helpText: 'Sets the page meta description.',
  });

  componentSeo.changeFieldControl('canonicalUrl', 'builtin', 'urlEditor', {
    helpText: 'Consolidates duplicate URLs.',
  });

  componentSeo.changeFieldControl('nofollow', 'builtin', 'boolean', {
    helpText: 'When set to "true", disallows search engines from crawling the links on this page.',
    trueLabel: 'true',
    falseLabel: 'false',
  });

  componentSeo.changeFieldControl('noindex', 'builtin', 'boolean', {
    helpText: 'When set to "true", disallows search engines from indexing this page.',
    trueLabel: 'true',
    falseLabel: 'false',
  });

  componentSeo.changeFieldControl('shareImages', 'builtin', 'assetGalleryEditor', {
    helpText: 'Images that will be used in share previews on social media and in search results.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  const pageLanding = migration
    .createContentType('pageLanding')
    .name('📄 page - Landing')
    .description('To have an entry point for the app')
    .displayField('internalName');
  pageLanding
    .createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  pageLanding
    .createField('seoFields')
    .name('SEO fields')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['componentSeo'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  pageLanding
    .createField('heroBannerHeadline')
    .name('Hero Banner - Headline')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  pageLanding
    .createField('heroBannerHeadlineColor')
    .name('Hero Banner - Headline color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^#([0-9a-f]{3}|[0-9a-f]{6})$',
          flags: 'i',
        },

        message: 'HEX code for color is required',
      },
    ])
    .defaultValue({
      'en-US': '#FFFFFF',
    })
    .disabled(false)
    .omitted(false);

  pageLanding
    .createField('heroBannerImage')
    .name('Hero Banner - Image')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  pageLanding
    .createField('products')
    .name('Products')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 6,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['pageProduct'],
        },
      ],

      linkType: 'Entry',
    });

  pageLanding.changeFieldControl('internalName', 'builtin', 'singleLine', {});

  pageLanding.changeFieldControl('seoFields', 'builtin', 'entryCardEditor', {
    helpText: 'These are the SEO fields used for this specific page.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  pageLanding.changeFieldControl('heroBannerHeadline', 'builtin', 'singleLine', {});
  pageLanding.changeFieldControl('heroBannerHeadlineColor', 'builtin', 'singleLine', {});
  pageLanding.changeFieldControl('heroBannerImage', 'builtin', 'assetLinkEditor', {});
  pageLanding.changeFieldControl('products', 'builtin', 'entryLinksEditor', {});
  const pageProduct = migration
    .createContentType('pageProduct')
    .name('📄 page - Product')
    .description('To output data for a single product')
    .displayField('internalName');

  pageProduct
    .createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  pageProduct
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  pageProduct
    .createField('seoFields')
    .name('SEO fields')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['componentSeo'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  pageProduct
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  pageProduct
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  pageProduct
    .createField('price')
    .name('Price')
    .type('Number')
    .localized(true)
    .required(true)
    .validations([
      {
        range: {
          min: 0,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  pageProduct
    .createField('featuredProductImage')
    .name('Featured product image')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  pageProduct
    .createField('productImages')
    .name('Product images')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 6,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    });

  pageProduct
    .createField('relatedProducts')
    .name('Related products')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 6,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['pageProduct'],
        },
      ],

      linkType: 'Entry',
    });

  pageProduct.changeFieldControl('internalName', 'builtin', 'singleLine', {});

  pageProduct.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'The slug is the part of the URL that indicates which page will be available on https://yourwebsite.com/your-slug-goes-here',
  });

  pageProduct.changeFieldControl('seoFields', 'builtin', 'entryCardEditor', {
    helpText: 'These are the SEO fields used for this specific page',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  pageProduct.changeFieldControl('name', 'builtin', 'singleLine', {});
  pageProduct.changeFieldControl('description', 'builtin', 'multipleLine', {});

  pageProduct.changeFieldControl('price', 'builtin', 'numberEditor', {
    helpText:
      'This is the price for the product, the currency and decimal separator determined by the locale the price is in',
  });

  pageProduct.changeFieldControl('featuredProductImage', 'builtin', 'assetLinkEditor', {
    helpText: 'This image will be shown at the top of the product page and in the product tile',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  pageProduct.changeFieldControl('productImages', 'builtin', 'assetGalleryEditor', {
    helpText:
      'These are all the product images shown on the product page, up to a limit of 6 images',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  pageProduct.changeFieldControl('relatedProducts', 'builtin', 'entryCardsEditor', {
    helpText:
      'These are related products, and will be shown as product tiles at the bottom of the product page, in the order they appear here. The website will display up to 6 items',
    bulkEditing: false,
    showLinkEntityAction: true,
    showCreateEntityAction: false,
  });
};
