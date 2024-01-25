class PageSectionFeature {
  constructor(data) {

    if(!data){      
      return null
    }

    this.code = data.code
    this.path = data.path
    this.enabled = data.enabled
    this.setSections(data.sections)
  }

  setSections(sections) {
    this.sections = []
    if (sections) {
      sections.forEach((element) => {
        this.sections.push(new Section(element))
      })
    }
  }
}

class Section {
  constructor(data) {
    this.code = data.code
    this.enabled = data.enabled
    this.setFeatureSections(data.featuresSection)
  }

  setFeatureSections(featuresSection) {
    this.featuresSection = []
    if (featuresSection) {
      featuresSection.forEach((element) => {
        this.featuresSection.push(new FeatureSection(element))
      })
    }
  }
}

class FeatureSection {
  constructor(data) {
    this.order = data.order
    this.segment = data.segment
    this.beginDate = data.beginDate
    this.endDate = data.endDate
    this.enabled = data.enabled
    this.setFeature(data.feature)
  }

  setFeature(feature) {
    this.feature = new Feature(feature)
  }
}

class Feature {
  constructor(data) {
    this.code = data.order
    this.enabled = data.enabled
    this.setFeatureType(data.featureType)
    this.setFeatureElements(data.featureElements)
  }

  setFeatureType(featureType) {
    this.featureType = new FeatureType(featureType)
  }

  setFeatureElements(featureElements) {
    this.featureElements = []
    if (featureElements) {
      featureElements.forEach((element) => {
        this.featureElements.push(new FeatureElement(element))
      })
    }
  }
}

class FeatureType {
  constructor(data) {
    this.code = data.order
    this.singleInstance = data.singleInstance
    this.enabled = data.enabled
  }
}

class FeatureElement {
  constructor(data) {
    this.key = data.key
    this.value = data.value
    this.enabled = data.enabled
  }
}

module.exports = PageSectionFeature
