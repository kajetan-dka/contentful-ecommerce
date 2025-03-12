/**
 * @type {import('contentful-migration').MigrationFunction} MigrationFunction
 */
module.exports = function (migration) {
  const heroBanner = migration.createContentType('heroBanner', {
    displayField: 'title',
    name: 'Hero Banner',
  });

  heroBanner.createField('title').name('Title').type('Symbol').required(true).localized(false);

  heroBanner
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .required(true)
    .localized(false);

  heroBanner
    .createField('ctaButton')
    .name('CTA Button')
    .type('Symbol')
    .required(true)
    .localized(false);

  heroBanner.createField('image').name('Image').type('Link').linkType('Asset');
};
