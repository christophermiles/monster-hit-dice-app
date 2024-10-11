import frowser from 'frowser'

export default function getBrowser() {
    return frowser.getParser(navigator.userAgent)
}