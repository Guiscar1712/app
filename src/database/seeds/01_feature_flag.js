/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('Page').insert([
    {
      Code: 'page_template',
      Path: '/page_template',
      Description: 'Page Flag example',
      Enabled: false,
    },
  ])

  await knex('Section').insert([
    {
      PageId: 1,
      Code: 'page_section',
      Description: 'Section Flag example',
      Enabled: false,
    },
  ])

  await knex('FeatureType').insert([
    {
      Code: 'feature_type_section',
      Description: 'Feature Type Flag example',
      SingleInstance: true,
      Enabled: false,
    },
  ])

  await knex('Feature').insert([
    {
      FeatureTypeId: 1,
      Code: 'feature_section',
      Segment: 'Feature Flag example',
      Enabled: false,
    },
  ])

  await knex('FeatureElement').insert([
    {
      FeatureId: 1,
      Key: 'feature_element_001',
      Value: 'feature element 001',
      Enabled: false,
    },
    {
      FeatureId: 1,
      Key: 'feature_element_002',
      Value: 'feature element 002',
      Enabled: false,
    },
  ])

  await knex('FeatureSection').insert([
    {
      FeatureId: 1,
      SectionId: 1,
      Order: 1,
      Segment: 'Feature Flag example',
      BeginDate: '2023-11-01 00:00:00.000',
      EndDate: '2023-12-31 23:59:59.999',
      Enabled: false,
    },
  ])
}
