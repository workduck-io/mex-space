import { EMAIL_REG } from '../constants/regex'

export const MultiEmailValidate = (emailsRaw: string): boolean => {
  const isValid = getWrongEmails(emailsRaw).length === 0
  return isValid
}

export const getWrongEmails = (emailsRaw: string): string[] => {
  const emails = emailsRaw.split(',').map((email) => email.trim())
  const wrongEmails = emails.filter((email: string): boolean => !EMAIL_REG.test(email))

  return wrongEmails
}

export const getEmailStart = (email: string) => email?.substring(0, email?.indexOf('@')) ?? 'null'
