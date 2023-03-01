import { getCurrentLocale } from '@kmon/dapps/dist/modules/translation/utils'
import formatDistanceToNowI18N from 'date-fns/formatDistanceToNow'
import en from 'date-fns/locale/en-US'
import es from 'date-fns/locale/es'
import zh from 'date-fns/locale/zh-CN'

const locales: Record<string, Locale> = {
  en,
  es,
  zh
}

export function formatDistanceToNow(
  date: number | Date,
  options: {
    includeSeconds?: boolean
    addSuffix?: boolean
    locale?: Locale
  } = {}
) {
  const locale = locales[getCurrentLocale().locale]

  if (locale) {
    options.locale = locale
  }

  return formatDistanceToNowI18N(date, options)
}

export function convertTime(secondsData: number) {                    
  const hours   = Math.floor(secondsData / 3600)
  const minutes = Math.floor((secondsData - (hours * 3600)) / 60)
  const seconds = secondsData - (hours * 3600) - (minutes * 60)
  if ( !!hours ) {
    if ( !!minutes ) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${hours}h ${seconds}s`
    }
  }
  if ( !!minutes ) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}
