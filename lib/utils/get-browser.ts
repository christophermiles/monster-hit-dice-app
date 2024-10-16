import frowser from 'frowser'

export default function getBrowser(skipFeatureDetection = true) {
  return frowser.getParser(navigator.userAgent, skipFeatureDetection)
}
