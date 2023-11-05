import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function isJSONString(string) {
  try {
    JSON.parse(string)
  } catch (err) {
    return false
  }
  return true
}

export function getAddressFields() {
  return ['street_address_1', 'street_address_2', 'country', 'postcode', 'city', 'phone']
}

export function getDefaultMetaFields(user_meta) {
  const defaultMetaDetails = {
    meta_fields: ['capabilities']
  }
  const retArr = { ...user_meta }
  retArr.meta_fields.push(...defaultMetaDetails.meta_fields)

  return retArr
}