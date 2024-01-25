const database = require('../../database/config.database')

class PageSectionFeatureRepository {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  findByPage = async (page, transaction) => {
    const step = this.LoggerService.addStep('PageSectionFeatureRepository')
    try {
      let query = `SELECT
      p.Code as pageCode,
      p.[Path] as pagePath,
      p.Enabled as pageEnabled,
      s.Id as sectionId,
      s.Code as sectionCode,
      s.Enabled as sectionEnabled,
      fs.FeatureId as featureSectionFeatureId,
      fs.SectionId  as featureSectionSectionId,
      fs.[Order] as featureSectionOrder,
      fs.Segment as featureSectionSegment,
      fs.BeginDate as featureSectionBeginDate,
      fs.EndDate as featureSectionEndDate,
      fs.Enabled as featureSectionEnabled,
      f.Id as featureId,
      f.Code as featureCode,
      f.Enabled as featureEnabled,
      ft.Code as featureTypeCode,
      ft.SingleInstance as featureTypeSingleInstance,
      ft.Enabled as featureTypeEnabled,
      fe.[Key] as featureElementKey,
      fe.Value as featureElementValue,
      fe.Enabled as featureElementEnabled
    FROM
      Page p
    JOIN [Section] s 
    ON
      s.PageId = p.Id
    JOIN FeatureSection fs 
    ON
      fs.SectionId = s.Id
    JOIN Feature f 
    ON
      f.Id = fs.FeatureId
    JOIN FeatureType ft 
    ON
      ft.Id = F.FeatureTypeId
    LEFT JOIN FeatureElement fe 
    ON
      fe.FeatureId = f.Id `

      if (page) {
        query += ` where p.Code = '${page}'`
      }

      const rows = await database.raw(query)

      const data = format(rows)
      step.value.addData({ query, data, transaction })
      return data
    } catch (error) {
      step.value.addData({ inputData: { query, transaction }, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

function format(rows) {
  const pages = []
  for (const row of rows) {
    let page = formatPage(row)
    const hasPage = pages.find((f) => f.code === page.code)
    page = hasPage ?? page

    page.sections = page.sections ?? []
    let section = formatSection(row)
    const hasSection = page.sections.find((f) => f.code === section.code)
    section = hasSection ?? section

    section.featuresSection = section.featuresSection ?? []
    const featureSection = formatFeatureSection(row)
    const feature = formatFeature(row)
    const hasFeatureSection = section.featuresSection.find(
      (f) => f.sectionId === section.id && f.featureId === feature.id
    )
    if (!hasFeatureSection) {
      section.featuresSection.push({ ...featureSection, feature })
    } else {
      const featureElement = formatFeatureElement(row)
      hasFeatureSection.feature.featureElements.push(featureElement)
    }

    if (!hasSection) {
      page.sections.push(section)
    }
    if (!hasPage) {
      pages.push(page)
    }
  }

  return pages
}

function formatPage(row) {
  if (row.pageCode) {
    const page = {
      code: row.pageCode,
      path: row.pagePath,
      enabled: row.pageEnabled,
    }

    return page
  }

  return null
}

function formatSection(row) {
  if (row.sectionCode) {
    const section = {
      id: row.sectionId,
      code: row.sectionCode,
      enabled: row.sectionEnabled,
    }
    return section
  }
}

function formatFeatureSection(row) {
  if (row.featureSectionOrder) {
    const featureSection = {
      sectionId: row.featureSectionSectionId,
      featureId: row.featureSectionFeatureId,
      order: row.featureSectionOrder,
      segment: row.featureSectionSegment,
      beginDate: row.featureSectionBeginDate,
      endDate: row.featureSectionEndDate,
      enabled: row.featureSectionEnabled,
    }
    return featureSection
  }
  return null
}

function formatFeature(row) {
  if (row.featureCode) {
    const feature = {
      id: row.featureId,
      code: row.featureCode,
      enabled: row.featureEnabled,
    }

    const featureType = formatFeatureType(row)
    feature.featureType = featureType

    feature.featureElements = feature.featureElements ?? []
    const featureElement = formatFeatureElement(row)
    feature.featureElements.push(featureElement)

    return feature
  }

  return null
}

function formatFeatureType(row) {
  if (row.featureTypeCode) {
    const featureType = {
      code: row.featureTypeCode,
      singleInstance: row.featureTypeSingleInstance,
      enabled: row.featureTypeEnabled,
    }
    return featureType
  }

  return null
}

function formatFeatureElement(row) {
  if (row.featureElementKey) {
    const featureElement = {
      key: row.featureElementKey,
      value: row.featureElementValue,
      enabled: row.featureElementEnabled,
    }
    return featureElement
  }
  return null
}

module.exports = PageSectionFeatureRepository
